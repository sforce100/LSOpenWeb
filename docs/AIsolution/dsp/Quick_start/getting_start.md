---
sidebar_label: 快速体验
sidebar_position: 2
---

# 快速体验离在线语音交互demo

> 本文主要介绍如何快算上手体验 LSKits 离在线开发板（CSK+XR872AT），阅读本文后，你将了解到
>
> 1.如何通过【小飞在线】APP在为开发板配网。
>
> 2.如何通过语音交互与配套APP，体验 LSKits 离在线开发板功能。
>
> 3.如何为离在线开发板烧录固件。



## 1.做好准备

### 1.1.准备LSKits离在线开发套件

首先，你需要准备一个聆思官方推出的简易开发套件，请在[服务市场](https://www.aifuwus.com/onstage/cmddetail?product_type=2888)或关注聆思科技公众号（LISTENAI）获取。拿到开发套件后，将底板与 CSK+XR872AT 核心板通过插针拼接在一起，如下图：

![](./files/LSKits_XR872AT.jpg)

::: info 

LSKitsV1.1默认不再提供 CSK+XR872AT核心板，如有需要，请联系商务进行确认。

:::


### 1.2.下载小飞在线APP

你需要使用【小飞在线】APP 为开发板进行配网，[点击此处](https://www.iflyos.cn/download/app/)下载。下载完成后，输入手机号码登录/注册。



## 2.配网

打开小飞在线 APP，按照下图操作流程为开发板配网：

- 打开 APP，进入底部**【我的】**菜单栏，点击页面顶部的**【添加主控设备】**。若你有多台设备，可在顶部卡片区域一直左滑，直至出现【添加主控设备】按键；

- 在设备列表中选择**【 LSKits_XR872AT 公板】**，进入下一步；

- 输入 WiFi 账号与密码，如果是安卓手机，会自动获取当前正在连接的 WiFi 信息；如果是 IOS 手机，第一次需要手动输入 WiFi 账号密码，之后选择记住密码，以后配网会自动填充；输入 WiFi 信息后，进入下一步；

- 长按开发板中的**【MUTE】**键，如下图。听到开发板播报已进入配网模式的提示音后，在 APP 端勾选**【设备已进入配网模式】**选项，点击下一步；

  ![](./files/mute.jpg)

- 如果是 IOS 手机，需要按照指引，切换至系统设置中的无线局域网页面，选择热点前缀为**【LA】**的热点并连接，连接成功后，再切换回小飞在线 APP；（安卓系统下，APP端会自动寻找热点并连接，无需切换至系统页面）

- APP端显示正在配网中，IOS 手机此处等待时间较长，最长可能需要20s，请耐心等待；安卓手机较快；

- 配网成功后，APP 端会展示成功提示，此时设备端也会播报联网成功的 TTS，配网流程结束；

![](./files/iflyhome.png)



## 3.”小飞小飞，今天天气怎么样？“

Cool ！，你已经成功为开发板配网。接下来你可以通过【小飞小飞】唤醒开发板，iFLYOS 平台集成了上百个语音技能，以及千万级级音频资源，足以覆盖用户绝大多数的使用场景。你可以[点击此处](https://www.iflyos.cn/skills)查看技能介绍与常用说法。

你可以试着说：

“小飞小飞，今天天气怎么样？”

“小飞小飞，给我讲个故事。”

“小飞小飞，帮我定个三点的闹钟。“

”小飞小飞，你最喜欢谁？“

除了直接进行语音交互，你还可以通过小飞在线APP，体验离在线开发板的功能：

- 可在【对话记录】中查看与开发版的历史对话记录。
- 可在【发现】中，选择音频资源，推送至开发版中播放。
- 可在【技能】中，查看设备具备的技能，以及每个技能的功能与示例语料。
- 可在【家居】中，绑定智能家居设备，实现语音控制设备。
- 可在【我的】-【最近播放】中，查看开发板的最近的音频播放记录。
- 可在【我的】-【我的收藏】中，查看你收藏的音频。
- 可在【我的】-【我的闹钟】中，查看你设置的闹钟，并支持对闹钟进行编辑。
- 可在【我的】-【内容账号】中，绑定你的酷狗音乐与喜马拉雅账号，获取更好的音频点播体验。

:::tip

音乐属于付费资源，需要单独付费，如果希望在开发板上体验音乐，可联系聆思商务开通音乐权限。

:::



## 4.尝试烧录固件

虽然 LSKits 在出厂时已烧录固件，但为了确保你能够顺利进行二次开发，我们建议你尝试烧录固件。包括 CSK 固件与 XR872AT 固件。

### 4.1.XR872AT固件烧录

- 下载 [XR872AT 固件](https://open.listenai.com/resource/open/doc_resource%2F%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97%2F%E7%A6%BB%E5%9C%A8%E7%BA%BF%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%2F%E7%A6%BB%E5%9C%A8%E7%BA%BF%E5%9B%BA%E4%BB%B6%E7%83%A7%E5%BD%95%2Fxr_system.img)

- 下载 [XR872AT 固件烧录工具](https://open.listenai.com/resource/open/doc_resource%2F%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97%2F%E7%A6%BB%E5%9C%A8%E7%BA%BF%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%2F%E7%A6%BB%E5%9C%A8%E7%BA%BF%E5%9B%BA%E4%BB%B6%E7%83%A7%E5%BD%95%2Fxradio_phoenixMC_v3.1.0909b.zip)

- 将XR872AT核心板底部的开关封贴撕开，将开关1，2上拨，3，4下拨；如下图：

  ![](./files/XR872AT_switch.png)

  

- 使用串口板将 XR872AT的 UART0（标识17）与电脑连接。连接位置如下，串口板 RX 连接 LSKits 底板 TX0，串口板 TX 连接 LSKits RX0。 

  ![](./files/XR872AT_UART.png)

- 按住 【XR872 BOOT】键，如下图：

![](./files/XR872AT_boot.png)

- 打开下载的固件烧录工具 phoenix.MIC ，按下图步骤操作：

  - 将串口波特率设置为921600。
  - 找到串口并勾选。若未显示串口，可在设备管理器中查看是否有USB设备，若没有，则尝试重新插拔串口；若有设备，查看是否需要安装驱动，若需要，安装驱动即可。
  - 选择已下载好的固件
  - 点击升级固件，此时需要保持 LSKits 的【XR872 BOOT】键一直处于按压状态
  - 当进度条开始变化时，松开【XR872 BOOT】键
  - 待烧录完成后，重新为 LSKits 上电，若开机时播报提示音，则说明固件烧录成功且运行正常。

  ![](./files/XR872AT_burn.png)

:::tip

1.固件开始烧录后，不要急于松开【XR872 BOOT】键，需要等进度条超过3%后再松开。

2.切勿一直长按【XR872 BOOT】键，长按将会导致固件烧录失败。

:::



### 4.2.CSK固件烧录

- 下载[CSK固件](https://open.listenai.com/resource/open/doc_resource%2F%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97%2F%E7%A6%BB%E5%9C%A8%E7%BA%BF%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%2F%E7%A6%BB%E5%9C%A8%E7%BA%BF%E5%9B%BA%E4%BB%B6%E7%83%A7%E5%BD%95%2Fcsk4002.zip)。**（唤醒词是“小优小优”）**

- 接通 LSKits 电源，同时按住底板的【XR872 BOOT】和【CSK UPDATE】键。如下图：

![](./files/csk_boot.png)

- 解压固件压缩包，打开 usb_burn.bat ，将自动开启烧录。

:::warning

烧录 CSK 固件时，为避免 XR872AT 对 CSK 造成影响，需要一直按住【XR872 BOOT】和【CSK UPDATE】键，固件烧录结束后才可以松开，若中途松开，需要重新烧录。

:::



## 5.了解更多

干的漂亮！你已经学会了如何为开发板配网，并能够熟练烧录固件。接下来，你可以通过阅读以下文章，加深对离在线方案的了解：

- [方案介绍](/AIsolution/dsp/Quick_start/developer_guides)

如果想了解离在线方案中 CSK 固件的制作，可查看：

- [制作离在线项目的 CSK 固件](/AIsolution/dsp/firmware_development/CSK_online_firmware)

了解如何在 iFLYOS 创建设备，可查看

- [创建你的 iFLYOS 设备](/AIsolution/dsp/firmware_development/Create_iFLYOS_equipment)

在项目开发过程中如果需要帮助，可以通过工单系统向我们获取技术支持：

- [工单系统](https://open.listenai.com/cloud_project)
