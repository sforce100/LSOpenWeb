---
sidebar_label: 相关工具  #文档名称
sidebar_position: 1  # 文档排序：1就是排第一
---


# 1. thinker分析工具

## 性能分析
修改编译脚本scripts中的-Dthinker_PROFILE=ON， 打开性能分析，会打印每个op的执行时间

## 一致性分析
* 修改编译脚本scripts中的-Dthinker_DUMP=ON，会dump每个op的处理结果，以txt保存，以tensor的名称命名
* 调用onnxinfer输出每个op的结果，与thinker的结果进行对比分析


# 2.自动化测试
## 工作原理
  * 使用Gitlab-Runner实现CI/CD，工作原理请参考[zhuanlan.zhihu.com/p/344233428]
## 测试部署
  * 在内网如何部署Gitlab环境，请参考
## 添加用例
### 上传资源
  * curl -uadmin:AP3h3WrN1BkgU3akdKntKsNmtkyT51QAX9ZU5X -T xx/xx/xx.onnx  "/thinker/models/"
  * 其中admin:AP3h3WrN1BkgU3akdKntKsNmtkyT51QAX9ZU5X为存放所有测试用例和onnx计算图的git仓库的账密
### 修改批处理文件
  * 打开auto_test.sh，在23行后面添加down_model_config ** ** ** **
  * 4个输入参数分别表示待测试用例的目录名称、量化训练后的onnx计算图、输入数据二进制格式、输出数据二进制格式
### 增加测试段
  * 打开auto_test/linux_x86/test_x86.cpp文件
  * 复制34~129行的SECTION，新建一个SECTION,重命名后，修改需要加载的bin文件路径即可
### 本地测试
  * 在根目录下运行 sh auto_test/auto_test.sh，模拟自动化测试流程，如果通过则将相应代码上传到git，否则修改相应问题
