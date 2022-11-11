---
sidebar_label: 快速开始  
sidebar_position: 3  
---
# 快速开始

1. [安装](../Intro/env.md)：支持pip、源码、docker等多种安装方式
2. [浮点-定点两阶段量化训练](../Training_Framework/train_clamp.md): 先进行浮点网络的约束训练，再针对量化友好的浮点模型进行量化训练微调
3. 模型量化训练和导出
  [linger](https://github.com/LISTENAI/linger)作为pytorch的插件，一键导入。从浮点训练阶段就开始对模型参数进行规范处理，浮点模型训练完成后，添加少量代码即可进入量化训练阶段。[Linger](https://github.com/LISTENAI/linger)采用QAT量化方式，对于CV模型能做到完全无损或基本无损。
  量化训练完成后，使用自带的工具，一键导出。
  [模型量化训练](../Training_Framework/train_quant.md)
  [导图示例](../Training_Framework/mapping.md)


4. 模型分析和打包
  使用Thinker离线工具tpacker对计算图的参数检查、计算图优化和内存分析检查。最后将计算图序列化成引擎执行器所需要的格式，并对运行内存进行预分配。
  [打包示例](../Inference_Engine/thinker_packer.md)

5. 推理执行
  直接加载离线工具序列化的资源。在少量修改甚至零修改的情况下，实现计算图在VENUS芯片上的落地应用。
  [运行示例](../Example/example.md)
