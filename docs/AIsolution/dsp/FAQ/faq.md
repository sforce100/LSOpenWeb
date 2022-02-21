
# 常见问题

## 离在线语音交互

### 如何接入讯飞云端语音识别、语音合成等能力？

讯飞云端语音识别、语音合成等能力可通过 SDK、硬件接入、WebSocket API 协议等方式接入。您可按以下文档链接先行开发试用，如需购买更多接口调用次数，请联系讯飞商务购买。

[语音听写（流式版）WebAPI 文档 | 讯飞开放平台文档中心 (xfyun.cn)](https://www.xfyun.cn/doc/asr/voicedictation/API.html)

### 云端语音识别效果不符合预期，怎么办？

识别效果偏低有如下可能的原因：

- 录音质量差，如有明显底噪、失真严重，此时请拉取本地录音进行分析，排除MIC、本地算法、硬件底噪等问题
- 本地集成了VAD时，送上云端的音频是截断音频。此时请排查本地VAD模块参数配置是否合理，或优化本地VAD
- 本地未集成VAD模块，音频被云端VAD截断。请排查测试集音频是否常有停顿，且停顿超过EOS配置的秒数；如认为停顿时间正常，建议将EOS配置时间加长到400ms以上，但不建议无限制加长，EOS配置过长会影响交互响应时间
- 如您所在的专业领域词汇的识别率稍低，可针对您的应用（产品）中出现的专有词汇，通过上传热词的方式来提高识别率。例如“燕京啤酒”在通用领域可能会被识别成“眼睛啤酒”，但是当您上传了热词后，识别成功率会大概率提升。热词可以直接在我的应用中进行上传配置，生效时间是10~60分钟
- 其他原因请联系FAE分析

### 云端语义理解未能成功返回结果？

首先请检查目标技能是否已勾选并保存、发布上线。如有，请查看云端是否返回错误码，并根据以下错误码链接排查请求错误：

[错误码查询 - 讯飞开放平台 (xfyun.cn)](https://www.xfyun.cn/document/error-code)

如请求正常，请读取应答码"rc"，该应答码用于标识用户请求响应的状态，如rc=3表示业务操作失败，没搜索到结果或信源异常，此时请求信源有问题，URL的访问出现异常，可能包括网络访问问题、播放格式支持问题、https证书过期等。如rc=4，表示文本没有匹配的技能场景，技能不理解或不能处理该文本，可将文本加入自定义问答列表、自行开发相关技能，或联系聆思FAE解决。
### CSK+872中，如何制作CSK4002固件？

**步骤1.用lstudio生成工程**

【芯片型号及方案】选择 4002；
【基础固件版本】选择4.2.0（直接选线上最新的版本即可）；
【板型模板】选择lskits-csk4002,其他如下：

![image-20220216104511488](.\files\onffline_tone_build.png)



**步骤2.项目创建成功后，找到 `application.lini` 配置文件，固件的协议模式，修改为“通用双工协议”，如下：**

![image-20220216105905371](.\files\onffline_tone_proto.png)

**步骤3.I2S输出设置，其中选择通道如下:**

![image-20220216110133818](.\files\onffline_tone_audio.png)

**步骤4.UART设置，和上位机的通讯设置：**

   打开`application.lini` 配置文件，删掉默认的TXD2,RXD2,再选择4，5 pin作TXD2，RXD2

![image-20220216113301928](.\files\onffline_tone_hardware1.png)



![image-20220216113510600](.\files\onffline_tone_hardware2.png)

选择后如下:

![image-20220216113735746](.\files\onffline_tone_hardware3.png)

**步骤5.交互配置**

进入交互配置`interact.lini` 配置文件,加入唤醒词：

![image-20220216114036050](.\files\onffline_tone_wakeup.png)

**步骤6.编译及烧录**

使用如下命令重新打包生成固件：

```
lisa build
```

使用如下命令烧录固件到对应的硬件设备中：

```
lisa flash
```

### CSK+872中，离线命令词在872上如何作对应提示语音？

1.用lstudio生成工程

​    见链接

2.交互配置

进入交互配置`interact.lini` 配置文件,加入唤醒词及命令词：

![image-20220217112622895](.\files\onffline_tone.png)

3.修改提示音

在xr872加入提示音见SDK文档tools\tone_tool\提示音打包说明文档.md：

4.修改xr872代码

修改`evs_client.c` 中代码：

```
static int
_runnable_offline_wakeup(void *user_data)
{
	int *key_id = (int*)user_data;
#define CASE_MAP(sid, tone_id)                                               \
	case (sid):                                                              \
		evs_soundplayer_play(s_client->m_sound_player, get_tone_url(tone_id)); \
		break;
	switch (*key_id) {
		case 501: {
			uint32_t rand32 = OS_Rand32();
			int random_value = rand32 % 4;
			char *wakeup_url = NULL;
			switch (random_value) {
				case 0:
					wakeup_url = get_tone_url(TONE_ID_1);
					break;
				case 1:
					wakeup_url = get_tone_url(TONE_ID_2);
					break;
				case 2:
					wakeup_url = get_tone_url(TONE_ID_3);
					break;
				case 3:
					wakeup_url = get_tone_url(TONE_ID_4);
					break;
				default:
					wakeup_url = get_tone_url(TONE_ID_1);
					break;
			}
			evs_soundplayer_play(s_client->m_sound_player, wakeup_url);
		} break;
			CASE_MAP(1, TONE_ID_172)
			CASE_MAP(2, TONE_ID_173)
			CASE_MAP(3, TONE_ID_174)
			CASE_MAP(4, TONE_ID_24)
		default:
			break;
	}
	evs_free(user_data);
#undef CASE_MAP
	return EVS_EVENT_NORMAL;
}
```

其中CASE_MAP(1, TONE_ID_172)对应上文中“打开风扇”这个词条，依次排后

5.编译CSK及烧录

使用如下命令重新打包生成固件：

```
lisa build
```

使用如下命令烧录固件到对应的硬件设备中：

```
lisa flash
```

6.编译XR872及烧录

参考XR872文档

### CSK+872中，如何作TCP录音？

1.872烧写特定的可作录音的fw,并按正常配置后连上网络

2.[下载工具](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/public/lsopen/%E5%9C%A8%E7%A6%BB%E7%BA%BF%E8%AF%AD%E9%9F%B3/%E7%A6%BB%E5%9C%A8%E7%BA%BF%E5%B7%A5%E5%85%B7/TCP%E5%BD%95%E9%9F%B3%E5%B7%A5%E5%85%B7.7z)，打开工具目录如下。打开record.bat

![img](.\files\tcp_recorder01.png)



``` 
server.exe LINGSI-2.4G LS$123456VIP# 18 100
```

其中LINGSI-2.4G为路由名字，LS$123456VIP#为路由密码，18为对应的电脑上的串口号。注意：请保证电脑和待测872板子在同一局域网内

2.运行record.bat

![image-20220212182508185](.\files\tcp_recorder02.png)

3.停止运行record.bat，在目录下发现record.pcm，可用其他工具或目录中的pcm2wav作转换后打开，其格式为16bit16k4通道，如用pcm2wav:

```
Pcm2Wav.exe record.pcm out.wav 4 16000 16
```



