---
sidebar_label: 相关工具  
sidebar_position: 1 
---

# 1. 导图工具ONNX
pytorch 动态模型到静态模型

## 1.1 什么是ONNX
- Open Neural Network Exchange（ONNX，开放神经网络交换）格式，是一个用于表示深度学习模型的标准，可使模型在不同框架之间进行转移。
- ONNX 为 AI 模型提供开源格式。它定义了可扩展的计算图模型，以及内置运算符和标准数据类型的定义。最初的 ONNX 专注于推理所需的功能 ONNX 解释计算图的可移植，它使用 graph 的序列化格式。它不一定是框架选择在内部使用和操作计算的形式。例如，如果在优化过程中操作更有效，则实现可以在存储器中以不同方式表示模型。

## 1.2 如何导出 ONNX 模型 
### 1.2.1 torch 官方导出 ONNX
torch官方提供了从PyTorch导出onnx的接口：
```python
torch.onnx.export(model, args, f, export_params=True, verbose=False, training=TrainingMode.EVAL, input_names=None, output_names=None, aten=False, export_raw_ir=False, operator_export_type=None, opset_version=None, _retain_param_name=True, do_constant_folding=True, example_outputs=None, strip_doc_string=True, dynamic_axes=None, keep_initializers_as_inputs=None, custom_opsets=None, enable_onnx_checker=True, use_external_data_format=False)
```
常用参数：
- `export_params`：该参数默认为True，也就是会导出训练好的权重；若设置为False，则导出的是没有训练过的模型。
- `verbose`：默认为False，若设置为True，则会打印导出onnx时的一些日志，便于分析网络结构。
- `opset_version`：onnx op集合版本号，在linger中通常设置为11或12。
- `dynamic_axes`：可以指定哪些维度是变化的，例如当我们导出模型的时候，输入的第一个维度是batch_size，但是这个维度应该是动态变化的，可以通过该参数指定这个可以动态变化。

导出的简单示例
``` python
import torch
import torch.onnx
torch_model = Model()
# set the model to inference mode
torch_model.eval()
dummy_input = torch.randn(1,3,244,244)
torch.onnx.export(torch_model,dummy_input,"test.onnx")

```

### 1.2.2 使用 linger 导出 onnx
如果调用`linger.init(...)`接口后，使用`torch.onnx.export`会被自动替换为`linger.onnx.export`进行调用，即`torch.onnx.export = linger.onnx.export`

```python
import linger
.....
linger.init(...)
torch.onnx.export(...) # 实际上调用的是 linger.onnx.export
```

- 导出支持动态输入大小的图

``` python
torch.onnx.export(torch_model,               # model being run
                  x,                         # model input (or a tuple for multiple inputs)
                  "super_resolution.onnx",   # where to save the model (can be a file or file-like object)
                  export_params=True,        # store the trained parameter weights inside the model file
                  opset_version=12,          # the ONNX version to export the model to
                  do_constant_folding=True,  # whether to execute constant folding for optimization
                  input_names = ['input'],   # the model's input names
                  output_names = ['output'], # the model's output names
                  dynamic_axes={'input' : {0 : 'batch_size'},    # variable lenght axes
                                'output' : {0 : 'batch_size'}})
```

其中 dynamic_axes使用有几种形式:

- 仅提供索引信息
例如下例子表示 把`input_1`的`0,2,3`维作为动态输入，第`1`仍然保持固定输入，'input_2'第`0`维作为动态输入，`output`的`0,1`维作为动态输入，对于动态输入的维度，PyTorch会自动给该维度生成一个名字以替换维度信息
``` python
dynamic_axes = {'input_1':[0, 2, 3],
                  'input_2':[0],
                  'output':[0, 1]}

```

- 对于给定的索引信息，指定名字
对于`input_1`，指定动态维0、1、2的名字分别为`batch`、`width`、`height`，其他输入同理
``` python
dynamic_axes = {'input_1':{0:'batch',
                             1:'width',
                             2:'height'},
                  'input_2':{0:'batch'},
                  'output':{0:'batch',
                            1:'detections'}
```
- 将上面两者进行混用
``` python
dynamic_axes = {'input_1':[0, 2, 3],
                  'input_2':{0:'batch'},
                  'output':[0,1]}
```
- 带有可选参数的导出
例如想命名输入输出tensor名字或者比较超前的op可以加上`torch.onnx.OperatorExportTypes.ONNX_ATEN_FALLBACK`
``` python
import torch
import torch.onnx
torch_model = ...
# set the model to inference mode
torch_model.eval()
dummy_input = torch.randn(1,3,244,244)
torch.onnx.export(torch_model,dummy_input,"test.onnx",
                    opset_version=11,input_names=["input"],output_names=["output"],operator_export_type=torch.onnx.OperatorExportTypes.ONNX_ATEN_FALLBACK)
```
- torch.no_grad()报错
torch 1.6 版本后，需要`with torch.no_grad()`,即

``` python
import torch
import torch.onnx
torch_model = ...
# set the model to inference mode
torch_model.eval()
dummy_input = torch.randn(1,3,244,244)
with torch.no_grad():
    torch.onnx.export(torch_model,dummy_input,"test.onnx",
                        opset_version=11,input_names=["input"],output_names=["output"],operator_export_type=torch.onnx.OperatorExportTypes.ONNX_ATEN_FALLBACK)
```
`警告`：如果不使用`with torch.no_grad()`，则会报以下错误
>RuntimeError: isDifferentiableType(variable.scalar_type()) INTERNAL ASSERT FAILED at "/pytorch/torch/csrc/autograd/functions/utils.h":59, please report a bug to PyTorch.

# 2. 分析工具

## 2.1 wb_analyse 分析工具

```python
#                         原始浮点基线权重 pth          分析日志保存地址
linger.wb_analyse('data.ignore/tool_test.pt',  'data.ignore/wb_anylse.log')
#-------------------------------------------------------------------------------------
```
或者采用如下的方法：
```python

checkpoint = torch.load("best_checkpoint.pth")

checkpoint = checkpoint['state_dict']
#                  也可以传入加载后的pth     分析日志保存地址默认为./wb_analyse.log
linger.wb_analyse(checkpoint)
```

```python
'''
日志如下所示  Multiple = Max / Mean , Versu = Max / Dynamic 
+-------------------------------------------------------+--------------------+--------------------+-----------------+--------------------+-----------------+
|                       Layer_name                      |        Mean        |        Max         |     Multiple    |    Dynamic 0.99    |      Versu      |
+-------------------------------------------------------+--------------------+--------------------+-----------------+--------------------+-----------------+
|               encoder.conv1.conv.weight               |   tensor(0.8093)   |   tensor(4.0748)   |  tensor(5.0348) |   tensor(3.2437)   |  tensor(1.2562) |
|                encoder.conv1.conv.bias                |   tensor(0.1000)   |   tensor(0.1000)   |  tensor(1.0000) |   tensor(0.1000)   |    tensor(1.)   |
|                encoder.conv1.bn.weight                |   tensor(0.4724)   |   tensor(1.2380)   |  tensor(2.6208) |   tensor(1.0338)   |  tensor(1.1975) |
|                 encoder.conv1.bn.bias                 |   tensor(0.3030)   |   tensor(1.9110)   |  tensor(6.3075) |   tensor(1.5030)   |  tensor(1.2714) |
|          encoder.conv1.bn.num_batches_tracked         |  tensor(6185962)   |  tensor(6185962)   |    tensor(1.)   |  tensor(6185962)   |    tensor(1.)   |
+-------------------------------------------------------+--------------------+--------------------+-----------------+--------------------+-----------------+
'''
```

## 2.2 out_analyse 分析工具 

`(初版，复杂模型可能不适用)`

- 分析网络每一层的输出分布，日志形式同权重分析日志

```python
model = resnet50().cuda()
### 加载训练好的浮点checkpoint
model.load_state_dict(checkpoint)
### 给定一个网络的真实的典型输入，不要用随机数据
typical_input = torch.randn([1,3,224,224]).cuda()

with linger.Dumper() as dumper:
    # model.eval()
    dumper.analyse_layer_output(model,match_pattern="root.")   # match_pattern 可支持查看对应哪些层
    model(typical_input) #跑一遍前向
    dumper.save_out_analyse_log(save_log_path="Analyse_layer_output.log") #日志保存路径
## 此接口会在当前目录生成一个名为"Analyse_layer_output.log"的文件
```
- 根据日志中Multiple = Max / Mean , Versu = Max / Dynamic0.99 两个的数值进行分析
- 一般情况希望输出分布的均值和最值不要相差太大  这两个倍数供参考
- 当Versu大于10倍时，说明此层输出的分布最值有明显异常，对量化很不友好  ，日志中会在此层数据下面打印！！！提示
- 一般推荐对于异常层来说，对其进行精细的normalize约束设置，向均值方向约束（不代表约束到均值），目的仅为抹除异常的最值即可

```python
'''
日志如下所示  Multiple = Max / Mean , Versu = Max / Dynamic 
+----------------------------+----------------+-----------------+--------------------+----------------+--------------------+
|         Layer_name         |      Mean      |       Max       | Multiple(Max/Mean) |  Dynamic 0.99  | Versu(Max/Dynamic) |
+----------------------------+----------------+-----------------+--------------------+----------------+--------------------+
|         root.conv1         | tensor(0.7991) |  tensor(4.9494) |   tensor(6.1935)   | tensor(1.6482) |   tensor(3.0028)   |
|          root.bn1          | tensor(1.1000) | tensor(11.8600) |  tensor(10.7815)   | tensor(2.5022) |   tensor(4.7399)   |
|         root.relu          | tensor(0.4383) |  tensor(7.7810) |  tensor(17.7513)   | tensor(0.8851) |   tensor(8.7912)   |
|        root.maxpool        | tensor(0.3245) |  tensor(7.7810) |  tensor(23.9802)   | tensor(0.8358) |   tensor(9.3091)   |
|    root.layer1.0.conv1     | tensor(0.7606) |  tensor(7.7810) |  tensor(10.2294)   | tensor(1.4041) |   tensor(5.5418)   |
|     root.layer1.0.bn1      | tensor(0.6418) |  tensor(4.2427) |   tensor(6.6106)   | tensor(1.5714) |   tensor(2.7000)   |
|     root.layer1.0.relu     | tensor(0.3977) |  tensor(2.7954) |   tensor(7.0291)   | tensor(0.8981) |   tensor(3.1128)   |
|    root.layer1.0.conv2     | tensor(0.1164) |  tensor(2.7954) |  tensor(24.0151)   | tensor(0.5088) |   tensor(5.4937)   |
+----------------------------+----------------+-----------------+--------------------+----------------+--------------------+
'''
```

## 2.3 linger导图错乱及其解决方法
linger 导出的 onnx 图中 dequant 错乱 或者 图中节点有断裂，可参照下面过程操作

### 2.3.1 调试选项
torch.onnx.export提供以下选项供调试：
-   is_update_dequant = True      # 设为False，关闭添加dequant节点（&删除identity结点）的过程  
-   is_scoped_info    = True      # 设为False，关闭添加和删除节点scope name信息的过程  
-   debug_dump        = False     # 设为True，保存中间各步的onnx结果，仅供调试使用, （建议使用此选项时不要对以上两个选项做修改）


```python
dummy_input = torch.ones(1,3,224,224)  #模拟输入
with torch.no_grad():
        linger.onnx.export_debug(net, dummy_input,"export_debug.onnx",export_params=True,opset_version=12,operator_export_type=torch.onnx.OperatorExportTypes.ONNX_ATEN_FALLBACK,is_update_dequant = False,is_scoped_info=False,debug_dump=False)
```

### 2.3.2 旧版linger导图错误
当使用旧版linger导出的onnx图中仅有 dequant添加错乱情况 ，可参照下面过程修复

- conda create 新环境 安装最新版linger (方法仅供参考，保证有一个最新版的linger版本即可)
- linger.fix_dequant(ori_onnx, False)   ##原始出错的onnx模型名称 | 是否检测修复后onnxinfer能否运行(设True时需已安装onnxinfer)
- 最后将修复好的onnx保存为 后缀多了_fix.onnx

```python
##                    原始出错的onnx模型名称      | 是否检测修复后onnxinfer能否运行
linger.fix_dequant("dbpagec2_wrong.onnx",            False)
```

