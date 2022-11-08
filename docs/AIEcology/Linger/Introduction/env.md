---
sidebar_label: 环境配置  #文档名称
sidebar_position: 2  # 文档排序：1就是排第一
---

## 环境配置

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