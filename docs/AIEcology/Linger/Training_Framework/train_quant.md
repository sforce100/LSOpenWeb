---
sidebar_label: 量化训练  #文档名称
sidebar_position: 2  # 文档排序：1就是排第一
---

# 量化训练

量化训练目标
- 对标目标平台，即进行目标平台的op适配
- 进行基于训练的量化训练
- 导出规范的onnx模型

## 1.直接原始浮点网络转定点网络进行训练
- 原始网络定义：
```
  class Net(nn.Module):
      def __init__(self):
          super(Net, self).__init__()
          self.conv = nn.Conv2d(10, 10, kernel_size=3, stride=1,
                       padding=1, bias=True)
          self.bn = nn.BatchNorm2d(10)
          self.relu = nn.ReLU()
          self.fc = nn.Linear(250, 100)
      def forward(self, x):
          x = self.conv(x)
          x = self.bn(x)
          x = self.relu(x)
          n, c, h, w = x.shape
          x = x.view((n, c*h*w))  
          x = self.fc(x)
          return x
```
- 融合BN操作
```
linger.trace_layers(net, net, aa, fuse_bn = True) #aa为网络forwward的输入，此处主要是trace整体的网络结构(trace的作用参考pytorch文档)，用以替换Conv-BN对为normalizeConvBN2d
```
- 融合之后的网络结构
```
Net(
  (conv): NormalizeConvBN2d(
    normalize_data:None,normalize_weight:None,normalize_bias:None,ahead_relu:True
    (conv): Conv2d(10, 10, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
    (bn): BatchNorm2d(10, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  )
  (bn): EmptyBatchNorm()
  (relu): ReLU()
  (fc): Linear(in_features=25000, out_features=100, bias=True)
)

```
- 所有的Conv-BN结构变换为自定义的NormalizeConvBN2d结构，方便做浮点normalize时进行约束处理
- 采用linger.init进行定点OP转换，可自定义量化OP
```
replace_tuple = (nn.Conv2d, linger.NormalizeConvBN2d, nn.Linear) 
net = linger.init(net, quant_modules=replace_module)
```
- 也可以采用默认设置
```
net = linger.init(net)
```
- 量化完成之后的模型为
```
Net(
  (conv): Conv2dInt(10, 10, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
  (bn): EmptyBatchNorm()
  (relu): ReLU()
  (fc): LinearInt(in_features=25000, out_features=100, bias=True)
)
```
- 加载参数与原始浮点网络加载参数方式一致，必须在定点init之后进行加载
```
net.load_state_dict(torch.load('data.ignore/convbn_quant.pt'))
```

- 定点化module准备完成之后即可做后续的finetune训练，与标准的浮点训练无任何不同，训练完成导出onnx存储的参数均是定点参数


## 2.Normalize浮点网络进行训练之后转换定点网络
 用以解决直接定点量化训练效果较差，需要先对浮点的输出进行Normalize约束,使其针对定点化更加友好

- 前面经过双阶段教程介绍了如何转换浮点与定点网络，相比于直接由原始浮点转int，normalize浮点转定点增加了一些normalize的设置
- disable_normalize用于支持特定层不做normalize, normalize_module支持特定层不同normalize 大小， 初始化之后进行加载权重之后既可以做normalize浮点训练. normalize_layers用于替换所有module到NormalizeModule进行后续的训练
```
    linger.disable_normalize(net.fc)
    linger.trace_layers(net, net, aa)
    normalize_modules = (nn.Conv2d, nn.Linear, nn.BatchNorm2d, linger.NormalizeConvBN2d)
    net = linger.normalize_layers(net, normalize_modules=normalize_modules, normalize_weight_value=8, normalize_bias_value=8, normalize_output_value=8)
    net.load_state_dict(torch.load('data.ignore/convbn_float.pt'))
    net.cuda()
    #train process
    out2 = net(aa)
    torch.save(net.state_dict(), 'data.ignore/convbn_normalize.pt')
```
- normalize之后的网络
```
Net(
  (conv): NormalizeConvBN2d(
    normalize_data:8,normalize_weight:8,normalize_bias:8,ahead_relu:True
    (conv): Conv2d(10, 10, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
    (bn): BatchNorm2d(10, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  )
  (bn): EmptyBatchNorm()
  (relu): ReLU()
  (fc): Linear(in_features=25000, out_features=100, bias=True)
)
```
- Normalize之后即可进行浮点训练，改变整体的浮点输出分布用于后续定点化训练，训练位置参考88行，训练完之后存储normalize之后的模型用于后续的定点训练

- normalize module 训练完成之后进入定点训练过程，注意，此处浮点训练完保存了normalizeModule的权重，定点模型可以直接加载此处的权重，model.state_dict中是带有conv.conv与conv.bn 前缀的

- 一般来说第二阶段量化定点训练，继承上一阶段浮点normalize的所有设置，加载保存的浮点normalize checkpoint后开始训练，注意此处设置的quant_modules要与上一阶段的normalize_modules对应，disable_normalize和第disable_quant对应**
```
    linger.disable_normalize(net.fc)
    linger.trace_layers(net, net, aa)
    normalize_modules = (nn.Conv2d, nn.Linear, nn.BatchNorm2d, linger.NormalizeConvBN2d)
    net = linger.normalize_layers(net, normalize_modules=normalize_modules, normalize_weight_value=8, normalize_bias_value=8, normalize_output_value=8)
    linger.disable_quant(net.fc)
    net = linger.init(net)
    net.load_state_dict(torch.load('data.ignore/convbn_normalize.pt'))
    net.cuda()
    out3 = net(aa)
```
- 定点之后的网络变换为
```
Net(
  (conv): Conv2dInt(10, 10, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
  (bn): EmptyBatchNorm()
  (relu): ReLU()
  (fc): Linear(in_features=25000, out_features=100, bias=True)
)
```
```
Net(
  (conv): Conv2dInt(10, 10, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
  (bn): EmptyBatchNorm()
  (relu): ReLU()
  (fc): Linear(in_features=25000, out_features=100, bias=True)
)
(Pdb) net.conv.normalize_data
8
(Pdb) net.conv.normalize_weight
8
(Pdb) net.conv.normalize_bias  
8
```

## 3.Normalize浮点网络不进行训练转换定点网络  
只作为不同层设置不同normalize大小的中间转换
```
    linger.disable_normalize(net.fc)
    linger.trace_layers(net, net, aa)
    normalize_modules = (nn.Conv2d, nn.Linear, nn.BatchNorm2d)
    net = linger.normalize_layers(net, normalize_modules=normalize_modules, normalize_weight_value=8, normalize_bias_value=8, normalize_output_value=8)
    linger.disable_quant(net.fc)
    net = linger.init(net)
    net.load_state_dict(torch.load('data.ignore/convbn_normalize.pt'))
    net.cuda()
    out3 = net(aa)
```
- normalize_layers与init之间没有save_state_dict操作，只支持在init之后进行一次load_state_dict操作