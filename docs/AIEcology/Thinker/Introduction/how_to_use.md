---
sidebar_label: 使用方法  #文档名称
sidebar_position: 3  # 文档排序：1就是排第一
---

# 快速开始
聆思工具链中包括Linger和Thinker，两者相互衔接，必须联合使用。Thinker依赖于Linger的计算图导出，两者使用同一个算子标准库。
整个工具链的使用贯穿模型落地的整个生命周期，大致可以分为六个阶段：
## 1. 工具链安装 
 [环境配置](../Introduction/env.md)
(支持pip、源码、docker等多种安装方式)


## 2. 模型设计阶段
  算法研究人员在完成模型结构设计后，使用随机初始化参数，过一遍linger+thinker工具链，工具链会对该模型的参数可适配性、内存占用和运行效率进行评估，避免后期不满求应用需求而设计返工。
  
## 3. 模型量化训练和导出
  [linger](https://github.com/LISTENAI/linger)作为pytorch的插件，一键导入。从浮点训练阶段就开始对模型参数进行规范处理，浮点模型训练完成后，添加少量代码即可进入量化训练阶段。[Linger](https://github.com/LISTENAI/linger)采用QAT量化方式，对于CV模型能做到完全无损或基本无损。
  量化训练完成后，使用自带的工具，一键导出。
  [模型量化训练和导出示例](../Inference_Engine/model_quant.md)

## 4. 模型分析和打包
  使用Thinker离线工具tpacker对计算图的参数检查、计算图优化和内存分析检查。最后将计算图序列化成引擎执行器所需要的格式，并对运行内存进行预分配。
  [打包示例](../Inference_Engine/thinker_packer.md)

## 5. 推理执行
  直接加载离线工具序列化的资源。在少量修改甚至零修改的情况下，实现计算图在VENUS芯片上的落地应用。
  [运行示例](../Example/example.md)

## 6. 辅助功能
  查看算子性能统计和中间结果数据
  [辅助工具](../Tools/tool.md)
