---
sidebar_label: 算子列表  
sidebar_position: 1  
---

# 算子列表
## 目前支持量化的算子

| PyTorch(float32)   | linger算子名称                            | linger导出onnx算子名称                              | 支持关闭的设置                     |
| ------------------ | ----------------------------------------- | --------------------------------------------------- | ---------------------------------- |
| nn.BatchNorm2d     | [BatchNorm2dInt](#batchnorm2dint)         | BatchNorm2dInt                                      | -                                  |
| nn.LayerNorm2d     | [LayerNorm2dInt](#layernorm2dint)         | LayerNorm2dInt                                      | -                                  |
| nn.Linear          | [LinearInt](#linearint)                   | LinearInt                                           | -                                  |
| nn.Conv1d          | [Conv1dInt](#conv1dint)                   | Conv1dInt                                           | -                                  |
| nn.Conv2d          | [Conv2dInt](#conv2dint)                   | Conv2dInt                                           | -                                  |
| nn.ConvTranspose2d | [ConvTranspose2dInt](#convtranspose2dint) | ConvTranspose2dInt                                  | -                                  |
| nn.AvgPool2d       | [AvgPool2dInt](#avgpool2dint)             | AvgPool2dInt                                        | -                                  |
| nn.MaxPool2d       | [iqMaxPool2d](#iqMaxPool2d)               | MaxPool2d                                           | -                                  |
| nn.GRU             | [GRUInt](#gruint)                         | GRUInt/GRUInt_Is8_Is64/GRUInt_Is8_Is64_If32         | -                                  |
| nn.LSTM            | [LSTMInt](#lstmint)                       | LSTMInt/LSTMInt_Is8_Is64/LSTMInt_Is8_Is64_If32_If32 | -                                  |
| nn.Relu            | [iqRelu](#relu)                           | Relu                                                | -                                  |
| nn.RELU6           | [ReLU6Int](#reLU6Int)                     | Clip                                                | -                                  |
| torch.bmm          | [BmmInt](#bmmint)                         | BmmInt                                              | -                                  |
| torch.sigmoid      | [iqSigmoid](#iqsigmoid)                   | iqSigmoid                                           | `linger.SetIQTensorSigmoid(False)` |
| torch.tanh         | [iqTanh](#iqtanh)                         | iqTanh                                              | `linger.SetIQTensorTanh(False)`    |
| torch.clamp        | [iqClamp](#iqclamp)                       | iqClamp                                             | `linger.SetIQTensorClamp(False)`   |
| torch.cat          | [iqCat](#iqcat)                           | iqCat                                               | `linger.SetIQTensorCat(False)`     |
| torch.transpose    | [iqTranspose](#iqtranspose)               | Transpose                                           | -                                  |
| view               | [iqView](#iqview)                         | Reshape                                             | -                                  |
| reshape            | [iqReshape](#iqreshape)                   | Reshape                                             | -                                  |
| squeeze            | [iqSqueeze](#iqsqueeze)                   | Squeeze                                             | -                                  |
| unsqueeze          | [iqUnsqueeze](#iqunsqueeze)               | Unsqueeze                                           | -                                  |
| flatten            | [iqFlatten](#iqFlatten)                   | Flatten                                             | -                                  |
| split              | -                                         | -                                                   | -                                  |
| slice              | [slice](#slice)                           | Slice                                               | -                                  |
| sum                | [iqSum](#iqSum)                           | iqSum                                               | `linger.SetIQTensorSum(False)`     |
| add                | [iqAdd](#iqadd)                           | iqAdd                                               | `linger.SetIQTensorAdd(False)`     |
| sub                | -                                         | -                                                   | -                                  |
| mul                | [iqMul](#iqmul)                           | iqMul                                               | `linger.SetIQTensorMul(False)`     |
| div                | [iqDiv](#iqDiv)                           | iqDiv                                               | `linger.SetIQTensorDiv(False)`     |
| upsample           | -                                         | -                                                   | -                                  |
| nn.Embedding       | [EmbeddingInt](#EmbeddingInt)             | Gather                                              | -                                  |
| quant              | [quant](#quant)                           | Quant                                               | -                                  |
| dequant            | [dequant](#dequant)                       | Dequant                                             | -                                  |
| requant            | [Requant](#Requant)                       | Requant                                             | -                                  |
| layernorm          | [LayerNormInt](#LayerNormInt)             | LayerNormInt                                        | -                                  |
| softmax            | [SoftmaxInt](#SoftmaxInt)                 | SoftmaxInt                                          | -                                  |
| logsoftmax         | [LogSoftmaxInt](#LogSoftmaxInt)           | LogSoftmaxInt                                       | -                                  |
| flip               | [iqFlip](#iqFlip)                         | Slice                                               | -                                  |
| var                | [iqVar](#iqVar)                           | iqVar                                               | -                                  |
| -                  | [channel_shuffle](#channel_shuffle)       | ShuffleChannel                                      | `SetFunctionChannelShuffleQuant(False)`|

