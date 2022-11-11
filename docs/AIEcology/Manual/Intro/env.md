---
sidebar_label: 环境配置  #文档名称
sidebar_position: 2  # 文档排序：1就是排第一
---

# Linger环境配置

## 通过源码直接安装

### x86-linux平台

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


### 其他平台
即将推出

## 验证安装
``` python
Python 3.7.3 (default, Jul 8 2020, 22:11:17)
[GCC 7.3.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import linger
>>> 
```

## 通过pip安装

## 通过docker进行安装


# Thinker环境配置
## pip安装方式

### 配置本地环境
```Shell
conda create -n thinker python==3.8.5
conda activate thinker
pip install -U pip
cat requirements.txt | xargs -n 1 pip install
```
若无法执行，则采用手动安装requirements中的各种库

查看已创建的环境
```Shell
conda info --env
```

查看当前环境中已安装的包
```Shell
conda list
```
删除不要的环境有两种方式：
```Shell
conda activate base(或者 conda deactivate xxx)
conda remove -n xxx --all
```

## 安装thinker
pip install pythinker

即可使用离线工具tpacker对模型进行打包

# 源码编译方式

## 下载源码
```Shell
  mkdir thinker
  git clone https://github.com/LISTENAI/thinker/thinker.git
```
## 配置本地环境
```Shell
conda create -n thinker python==3.8.5
conda activate thinker
pip install -U pip
cat requirements.txt | xargs -n 1 pip install
```
若无法执行，则采用手动安装requirements中的各种库

查看已创建的环境
```Shell
conda info --env
```

查看当前环境中已安装的包
```Shell
conda list
```
删除不要的环境有两种方式：
```Shell
conda activate base(或者 conda deactivate xxx)
conda remove -n xxx --all
```
## x86_linux编译
  * gcc版本最好为5.4.0及以上
  * 修改script/x86_linux.sh和test/auto_test.sh脚本中的**CMAKE**的路径, 版本建议为3.0及以上
  * 执行编译脚本
  ```Shell
  bash scripts/x86_linux.sh
  ```

# 镜像文件安装方式

## 安装docker(如果已安装请忽略，建议使用Centos系统)
* [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
* [Debian](https://docs.docker.com/engine/install/debian/)
* [Centos](https://docs.docker.com/engine/install/centos/)
* [其他 LINUX 发行版](https://docs.docker.com/engine/install/binaries/)
安装完成后，运行下面的命令，验证是否安装成功
```Shell
$ docker version
```
如果出现"Got permission denied"权限报错，说明当前用户权限不够，需要添加权限
docker 需要用户具有 sudo 权限，为了避免每次命令都输入sudo，可以把用户加入 docker 用户组
```Shell
$ sudo groupadd docker  # 添加docker用户组
$ sudo gpasswd -a $USER docker   # 将登陆用户加入到docker用户组中
$ newgrp docker     # 更新用户组
$ docker ps    # 测试docker命令是否可以使用sudo正常使用
```
再次执行"docker version"命令，发现不再出现"Got permission denied"权限报错，继续下一步。

启动docker服务
```Shell
$ sudo service start docker # service  命令的用法
$ sudo systemctl start docker # systemctl 命令的用法
```

## 获取thinker镜像并加载
### 方案1:docker官网下载安装 thinker 镜像

1、拉取镜像
```Shell
$ docker pull bzcai2022:thinker:0.1.0
```
2、运行容器
```Shell
$ docker container run -it bzcai2022/thinker:0.1.0 /bin/bash
``` 
如果一切正常，运行上面的命令以后，就会返回一个命令行提示符。
```Shell
root@66d80f4aaf1e:/thinker#
```  
这表示你已经在容器里面了，返回的提示符就是容器内部的 Shell 提示符。能够执行命令。
```Shell
root@66d80f4aaf1e:/thinker# ./scripts/x86_linux.sh
```
### 方案2：下载thinker源码，使用源码中的Dockerfile文件, 生成image文件
1、下载thinker源码
```Shell
  mkdir thinker
  git clone https://github.com/LISTENAI/thinker/thinker.git
```
2、生成image文件
```Shell
$ docker image build -t thinker:0.1.0 . (.表示当前路径)
```
(注: x86_linux.sh 脚本中 CMAKE_ROOT 根据 anoconda 路径修改 , module load gcc 可以注释掉)
3、生成容器
```Shell
$ docker container run -it thinker:0.1.0 /bin/bash
```
4、测试环境
```Shell
root@66d80f4aaf1e:/thinker# ./scripts/x86_linux.sh
```
## 容器的退出
image 文件生成的容器实例，本身也是一个文件，称为容器文件。查看容器文件
```Shell
$ docker container ls # 列出本机正在运行的容器
$ docker container ls --all # 列出本机所有容器，包括终止运行的容器
```
终止运行的容器文件
```Shell
$ docker container kill [containID] 
```

### 容器内部的退出
|  方式  |  结果       |  再次启动  |
| ----   | ----        |----   |
|exit     |退出后,容器消失并销毁，ps查不到|docker start容器名/容器id|
|ctrl + D     |退出后,容器消失并销毁，ps查不到|docker start容器名/容器id|
|先按 ctrl + p,再按 ctrl + q  |退出后,容器后台运行，ps能查到|docker start容器名/容器id|

***

## 容器与宿主机的文件交互
* 查询容器ID
```Shell
$ docker ps 
```
* 从宿主机拷文件到容器里面
docker cp 要拷贝的文件路径 容器名：要拷贝到容器里面对应的路径
```Shell
$ docker cp model 2ef7893f06bc:thinker  
```
* 从容器里面拷文件到宿主机
docker cp 容器名：要拷贝的文件在容器里面的路径       要拷贝到宿主机的相应路径
```Shell
$ docker cp 2ef7893f06bc:/models /opt
```

