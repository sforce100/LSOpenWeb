---
sidebar_label: 使用方法  #文档名称
sidebar_position: 3  # 文档排序：1就是排第一
---
# 使用方法

## 1. 环境配置

## 1.1 通过源码直接安装
### 1.1.1 x86-linux平台

推荐使用conda创建新环境，并使用如下版本的python依赖：
- python 3.7.0
- torch: 1.9.0
- torchvision: 0.10.0
- onnx: 1.7.0
- protobuf: 3.8.0

一键安装
``` sh
git clone https://git-in.iflytek.com/RS_RDG_AI_Group/bitbrain/linger.git
cd linger
sh install.sh
```


### 1.1.x 其他平台
即将推出

## 1.2 验证安装
``` python
Python 3.7.3 (default, Jul 8 2020, 22:11:17)
[GCC 7.3.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import linger
>>> 
```

## 1.3 通过pip安装

## 1.4 通过docker进行安装

## 2 接口使用说明

## 2.1  基础接口使用说明

### 2.1.1 init接口
```python
replace_modules = (nn.Conv2d, nn.ConvTranspose2d, nn.Linear)
net = linger.init(net, quant_modules=replace_modules, mode=linger.QuantMode.MaxValue, 
        data_bits=8, parameter_bits=8, out_bits=8, )
```
- 该接口将原始的浮点网络进行module级别的替换成定点网络，可以在替换完成之后打印网络进行观察差别
- quant_modules指明需要量化的module类型，上述示例表明量化三种OP类型，其余OP类型不做量化
- mode参数指明采用的量化方式，包含MaxValue与QValue两种方式，Max方式表示采用最值进行量化，Q值则采用2的幂次进行量化
- data_bits: 指明输入采用的量化bit数， parameter_bits：指明weight采用的量化bit数
- out_bits:输出量化的bit数，针对op输出进行量化，默认参数为None，表明所有OP采用float32输出的混合精度方式，o_bits=8表明输出为int8

### 2.1.2 disable_qunat接口
```python
linger.disable_quant(net.last_fc)
net = linger.init(net, ...)
```
- 该接口指定某些层不做量化操作，通过相应层的module设置即可，该接口需要在init之前使用，没有disable的其他层会采用init的方式进行量化
- 该接口主要用于网络最后与loss相关的层，该层不应该做int8的量化操作，否则会增大整体的训练损失,建议一般网络最后一层都采用disable避免量化损失较大

### 2.1.3 quant_module接口
```python
linger.quant_module(net.last_fc, data_bits=16, parameter_bits=16, out_bits=32)
net = linger.init(net, ...)
```
- 该接口指定某些层采用特定bit位的量化操作，而不是使用init中的全局配置参数，该接口需要在init之前调用，但是需要注意，某些平台的硬件可能会不支持data_bits和out_bits非8的量化策略如NPU以及Castor平台等

### 2.1.4 自动融合BN接口
```python
linger.trace_layers(root_model=net, target_model=net.sub_module, (x,y), fuse_bn=True, ahead_conv_relu=True,ahead_bn_relu=True,ahead_linear_relu=True)
net = linger.init(net, ***)
```
- 该接口主要用于量化训练过程消除BN结构，加速推理过程，同时统计相关OP+ReLU的节点，量化统计scale过程采用正值操作
- root_model表示原始的model，target_model为需要融合BN的子model，(x, y)为子model的输入，多个输入的情况下采用元组包括
- fuse_bn表示是否需要融合BN，False表示不融合，True表示融合操作, ahead_conv_relu表明是否针对conv-relu结构统计conv的scale_o采用正值方向，其余参数配置含义一致
- 该接口需要在init之前调用，同时只能执行一次，目前不允许网络trace多个部分,建议放在所有配置操作的最前面

### 2.1.5 参数加载接口
```python
# inline操作
net = linger.init(net, ...)
net.load_state_dict(torch.load('**.pt'))
```
- 参数加载的方式与标准的浮点加载一致，load_state_dict调用需要在init之后调用，不支持直接访问net.state_dict()进行参数匹配操作，如有需求，建议直接在外面针对参数名称进行修改,之后调用标准的load_state_dict接口操作

### 1.6 查表量化训练接口
```python
net = net.init(net, ***)
```
- 参数主要用于配置lstmint， gruint等时序网络中的sigmoid, tanh等函数的查表操作

## 3. 进阶接口使用说明
- 一般情况下基础接口能解决大部分问题，也是我们常用的，进阶接口是在效果存在损失时才会用到的
- 直接量化具有较大损失，可能数据分布存在奇异值的问题，通过在量化训练中添加normalize功能约束整体的数据分布，统计截断之后的scale,避免奇异值的影响

- normalize_layers 动态设置特定层不同的normalize 策略,目前只针对Conv2(1)d, Linear, ConvTranspose2d有效，时许模型不支持
```
linger.trace_layers(net, net.trace_module, (x, y), fuse_bn=True)
linger.disable_normalize(net.last_fc)
normalize_modules = (nn.Conv2d,nn.Linear)
linger.normalize_module(net.mid_conv, normalize_weight_value=16, normalize_bias_value=16, normalize_output_value=16)
net = linger.normalize_layers(net, normalize_modules = normalize_modules, normalize_weight_value=8, normalize_bias_value=8, normalize_output_value=8) #normalize_dynamic_percent参数目前只推荐调试定位异常层时使用，不推荐实际训练时使用
linger.disable_quant(net.last_fc)
quant_modules = (nn.Conv2d, nn.Linear)
net = linger.init(net, quant_modules = quant_modules, ...)
//load_state_dict操作
```
- 通过normalize_layers配置全局的normalize数值，disable_normalize用于设置某一层不做normalize操作，
- normalize_module用于配置某一层采用特定的normalize数值进行约束
- init之后会将normalize之后的网络的normalize数值代入量化OP中，从而实现动态配置相关normalize数值的功能


## 4 算子替换
### 4.1 LSTMP
- linger中实现LSTMP、UBLSTMP与asr-extension封装的lstmp有不同门的顺序也不同
- 注意pytorch-asr-extension库中的LSTMP为( input_dim, cell_num, hidden_size ) 本实现为（input_size, hidden_size, cell_size )  注意交换位置
- 首先本实现中lstmp只支持batch_first  而且只与asr中lstmp封装的c++ 代码保持一致多余的clip_mask等操作  需要显式保留写出来  
- 若输入为 T*B*D  则应 transpose 后 再进本实现的lstmp  输出同样  
- 还有如果lstmp输入有initial_state, 则 应当为 (1, batch_size, hidden_size) 和 (1, batch_size, cell_size)  （若batchsize不为1，也可直接传（batch_size, hidden_size) 和 (batch_size, cell_size)）
- 可参照下方  修改checkpoint的门的顺序, 去掉最后四个fc的key修改即可  
  
```python

checkpoint = torch.load("state_dict.pt")  #original checkpoint

model_dict = {}
for k,v in checkpoint.items():
    if 'weight_x' in k:
        new_key = k.replace('weight_x', 'input_linearity.weight')
        v_chunk = v.chunk(4, 0)
        v = torch.cat([v_chunk[0], v_chunk[1], v_chunk[3], v_chunk[2]], dim=0)
    elif 'weight_bias' in k:
        new_key = k.replace('weight_bias', 'input_linearity.bias')
        v_chunk = v.chunk(4, 1)
        v = torch.cat([v_chunk[0], v_chunk[1], v_chunk[3], v_chunk[2]], dim=1)
    elif 'weight_r' in k:
        new_key = k.replace('weight_r', 'state_linearity.weight')
        v_chunk = v.chunk(4, 0)
        v = torch.cat([v_chunk[0], v_chunk[1], v_chunk[3], v_chunk[2]], dim=0)
    elif 'weight_p' in k:
        new_key = k.replace('weight_p', 'state_projection.weight')
    else:
        new_key = k
    # print('new_key: ', new_key)
    if 'weight_bias' in k:
        model_dict[new_key] = v.data.reshape(-1)
    else:
        model_dict[new_key] = v.data

net.load_state_dict(model_dict)  ##load replaced checkpoint

```

### 4.2 NoralizeFastLSTMP
- 本实现中NormalizeFastLSTMP 直接移植了torch的nn.LSTM实现过来与asr-extension封装的lstmp有不同门的顺序也不同
- 注意pytorch-asr-extension库中的LSTMP为( input_dim, cell_num, hidden_size )    intx中的普通LSTMP为（input_size, hidden_size, cell_size )  注意交换位置
- 而 NormalizeFastLSTMP 继承的torch的nn.LSTM实现中为( input_dim, hidden_size, proj_size )
- nn.LSTM在torch1.9及之后多了一个proj_size的参数(以下统称nn.LSTMP)，默认为0，即为原始的lstm，>0即对应LSTMP实现
- Note : 必须在torch1.9.0及以后版本  才生效 ！！！

```python
"""
( input_dim, hidden_size, proj_size ) 
+--------------------------+-----------------------------------------+
|   pytorch-asr-extension  |  ( input_dim, hidden_size, proj_size )   |
+==========================+=========================================+
|    intx中的普通LSTMP      |  ( input_dim, proj_size, hidden_size )   |
+--------------------------+-----------------------------------------+
|  NormalizeFastLSTMP(nn.LSTM) |  ( input_dim, hidden_size, proj_size )   |
+--------------------------+-----------------------------------------+
"""
#从nn.LSTMP 转为 intx普通LSTMP的 逻辑
#注意nn.LSTMP 中会比普通的LSTMP多一个bias的参数，从nn.LSTMP 转为 intx普通LSTMP时，注意将bias_ih_l0和bias_hh_l0 相加 赋给input_linearity.bias， 反向同理
#而从intx普通LSTMP 转为 nn.LSTMP时，注意input_linearity.bias直接赋给bias_ih_l0，bias_hh_l0直接置零值， 反向同理

for k,v in checkpoint.items():
    if 'weight_ih_l0' in k and 'reverse' not in k:
        new_key = k.replace('weight_ih_l0', 'input_linearity.weight')
    elif 'bias_ih_l0' in k and 'reverse' not in k:
        new_key = k.replace('bias_ih_l0', 'input_linearity.bias')
        v = v.unsqueeze(0)
        bias = v
    elif 'weight_hh_l0' in k and 'reverse' not in k:
        new_key = k.replace('weight_hh_l0', 'state_linearity.weight')
    elif 'weight_hr_l0' in k and 'reverse' not in k:
        new_key = k.replace('weight_hr_l0', 'state_projection.weight')
    elif 'bias_hh_l0' in k and 'reverse' not in k:
        new_key = k.replace('bias_hh_l0', 'input_linearity.bias')
        v = v.unsqueeze(0)
        bias = v + bias
    elif 'lstmp.weight_ih_l0_reverse' in k:
        new_key = k.replace('lstmp.weight_ih_l0_reverse', 'lstmp2.input_linearity.weight')
    elif 'lstmp.bias_ih_l0_reverse' in k:
        new_key = k.replace('lstmp.bias_ih_l0_reverse', 'lstmp2.input_linearity.bias')
        v = v.unsqueeze(0)
        bias = v
    elif 'lstmp.weight_hh_l0_reverse' in k:
        new_key = k.replace('lstmp.weight_hh_l0_reverse', 'lstmp2.state_linearity.weight')
    elif 'lstmp.weight_hr_l0_reverse' in k:
        new_key = k.replace('lstmp.weight_hr_l0_reverse', 'lstmp2.state_projection.weight')
    elif 'lstmp.bias_hh_l0_reverse' in k:
        new_key = k.replace('lstmp.bias_hh_l0_reverse', 'lstmp2.input_linearity.bias')
        v = v.unsqueeze(0)
        bias = v + bias
    else:
        new_key = k
    if 'bias_hh_l0' in k :
        model_dict[new_key] = bias.data.reshape(-1)
    else:
        model_dict[new_key] = v.data

```

```python
#双向LSTMP替换
input_size = 100
hidden_size = 100
cell_num = 50

# self.lstmp = nn.LSTM(input_size, hidden_size, num_layers=1, batch_first=True, bidirectional=True, proj_size = 50)
self.lstmp = linger.LSTMP(100, 50, 100, batch_first=True, go_forward=True)
self.lstmp2 = linger.LSTMP(100, 50, 100, batch_first=True, go_forward=False)

```

### 4.3 FastURLSTMP
- 本实现中FastUBLSTMP 中直接移植了torch最新版的nn.LSTM实现过来 正反向的lstmp都通过nn.LSTM来变相实现

- Note : 必须在torch1.9.0及以后版本才生效
- 以下为intx普通UBLSTMP到FASTUBLSTMP的state_dict key替换逻辑仅供参考
```python

checkpoint = torch.load('dump_ub/torch_ublstmp.pt')
model_dict = {}
bias = None
for k,v in checkpoint.items():
    if "backward_lstmp" in k or "forward_lstmp" in k:
        if 'input_linearity.weight' in k:
            new_key = k.replace('input_linearity.weight', 'weight_ih_l0')
        elif 'input_linearity.bias' in k:
            new_key = k.replace('input_linearity.bias', 'bias_ih_l0')
            bias = v
            zeros_bias = torch.zeros_like(bias)  ##给予bias_hh_l0 以全0值
            new_key_2 = k.replace('input_linearity.bias', 'bias_hh_l0')
            model_dict[new_key_2] = zeros_bias.data
        elif 'state_linearity.weight' in k:
            new_key = k.replace('state_linearity.weight', 'weight_hh_l0')
        elif 'state_projection.weight' in k:
            new_key = k.replace('state_projection.weight', 'weight_hr_l0')
        else:
            new_key = k

        model_dict[new_key] = v.data
    else:
        model_dict[k] = v

net.load_state_dict(model_dict)

```

