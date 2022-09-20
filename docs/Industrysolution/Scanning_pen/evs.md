---
sidebar_label: 云端扫描笔协议说明
sidebar_position: 4
---

# 扫描笔云端协议说明


## 更新记录

| 版本 | 更新说明                                                     | 责任人 | 日期      |
| ---- | ------------------------------------------------------------ | ------ | --------- |
| 1.00  | 初版定义                                                     | 李逸卿 | 2021.1.14 |
| 1.01  | 新增文本翻译接口，用于收藏夹中的句子翻译                     | 李逸卿 | 2021.1.19 |
| 1.02  | 修改语音翻译和文本翻译协议，新增`translation`字段            | 李逸卿 | 2021.1.25 |
| 1.03  | 新增图像帧数据协议说明                                       | 梁展晖 | 2021.2.02 |
| 1.04  | 新增多行扫描请求方式                                         | 李逸卿 | 2021.3.2  |
| 1.05  | 多行扫描请求更改为实时扫描参数，修改多行扫描交互方式         | 梁展晖 | 2021.3.7  |
| 1.06  | 增加翻译语种字段：recognizer.visual_result增加data.from、data.to字段，recognizer.trans_result增加data.from、data.to字段 | 梁展晖 | 2021.3.9  |
| 1.07  | 更新单词查询接口地址 | 梁展晖 | 2021.3.11  |
| 1.08  | 增加jpeg格式协议说明。帧头数据格式FMT增加JPEG: 0x30，保留数据添加jpeg说明 | 梁展晖 | 2021.3.22  |
| 1.09  | visuale_in请求增加参数image_metadata.reverse，支持竖向拼接图片 | 梁展晖 | 2021.3.24 |
| 1.10 | visual_in请求添加debug, image_debug字段用于调试 | 梁展晖 | 2021.5.27 |
| 1.11 | 增加请求上限限制：翻译上限：256字符，ocr上限：4090px | 李逸卿 | 2021.6.3 |
| 1.12 | 1. visual_in增加tokenization字段，用于**开启/关闭中文分词**；2. visual_result增加segs字段，用于返回中文分词结果 | 胡星晨 | 2021.7.16 |
| 1.13 | 1. 更新**词典接口**，支持中文单字、单词、成语以及英文单词查询；2. 优化中文分词逻辑 | 胡星晨 | 2021.8.11 |
| 1.14 | 1. 请求协议visual_in新增**词典开关**`dictionary`和**教育内容开关**`resources` ，返回结果`profile`新增`DICTIONARY`代表词典内容返回，`RESOURCES`代表教育内容返回。；2. 词典中文单字接口返回新增字典`strokes.gif`，供分辨率低屏幕展示笔画。 | 刘钟蔚 | 2021.9.17 |
| 1.15 | 1. 修正`image_metadata.tokenization`字段 | 刘钟蔚 | 2021.9.18 |
| 1.16 | **词典查询**的英文单词返回新增`details_us_pronunce`美式发音字段。 | 刘钟蔚 | 2021.9.28 |
| 1.17 | 更新**口语练习**相关协议和接口说明 | 张毅 | 2021.10.22 |
| 1.18 | 更新词典**诗词**返回相关协议和接口说明 | 刘钟蔚 | 2021.12.13 |
| 1.19 | 新增语速设置接口说明 | 刘钟蔚 | 2021.12.15 |
| 2.00 | 精简文档，只保留EVS协议部分 | 刘钟蔚 | 2022.05.01 |
| 2.01 | 新增`visual_in`中`profile`字段`CUSTOM_JXW_SEARCHTOPIC`，用于云端搜题 | 刘钟蔚 | 2022.07.14 |
| 2.02 | 搜题字段修改为`SEARCHTOPIC`，用于云端搜题；增加小蛙搜题服务 | 刘钟蔚 | 2022.09.20 |



## 已有能力

在开始对接iFLYOS之前，请先查阅[线上文档](https://doc.iflyos.cn/device/evs/)的已有能力，本文档主要描述新增能力。

在扫描笔的实现过程中，主要需要实现以下能力：

| name                                                         | 说明                                            | 实现要求 |
| ------------------------------------------------------------ | ----------------------------------------------- | -------- |
| [recognizer](https://doc.iflyos.cn/device/evs/reference/recognizer.html) | 识别器，这是iFLYOS交互的基础                    | 必须实现 |
| [audio_player](https://doc.iflyos.cn/device/evs/reference/audio_player.html) | 音频播放器，在扫描笔项目中播放的内容是TTS语音   | 必须实现 |
| [system](https://doc.iflyos.cn/device/evs/reference/system.html) | 系统相关                                        | 必须实现 |
| [speaker](https://doc.iflyos.cn/device/evs/reference/speaker.html) | 扬声器控制                                      | 必须实现 |
| [screen](https://doc.iflyos.cn/device/evs/reference/screen.html) | 屏幕控制                                        | 可选实现 |
| [interceptor](https://doc.iflyos.cn/device/evs/reference/interceptor.html) | 自定义拦截器，是iFLYOS 实现自定义语义理解的基础 | 可选实现 |


## 扫描翻译

#### 业务流程图

![](./files/21.png)

在流程图中可以看出：

1. 设备端一次请求会收到至少4个iFLYOS的回复
2. 设备端通过流的方式传输图片至iFLYOS云端
3. 若开启中文分词，且原文包含中文时，iFLYOS将返回原文分词结果，否则返回原文原始文本

### 请求协议visual_in

```json
{
  "iflyos_header": {...},
  "iflyos_context": {...},
  "iflyos_request": {
    "header": {
      "name": "recognizer.visual_in",
      "request_id": "xxxxxxxx"
    },
    "payload": {
      "profile": "OCR_TRANS_TTS",
      "realtime": "true",
      "image_metadata":{
        "reverse": "true",
        "tokenization":"true",
        "dictionary":"true", // 20210917新增: 词典开关
	"dict_type":"xuewang", // 20220520新增: 词典类型
        "resources":"true", // 20210917新增: 教育内容开关
      	"height": "128",
      	"image_data_debug": "false",
      	"debug": "false"
	"searchtopic_ability": "01", // 20210920新增：搜题能力
      	"searchtopic_service": "XW01" // 20210920新增：搜题服务方
      }
    }
  }
}

```



| 参数                  | 类型    | 说明                                                         | 必填 |
| :-------------------- | :------ | :----------------------------------------------------------- | :--- |
| iflyos_header         | Object  | 构建的通用 iflyos_header                                     | 是   |
| iflyos_context        | Object  | 构建的通用 iflyos_context                                    | 是   |
| profile               | String  | 请求操作，具体取值见下表                                     | 是   |
| realtime              | Boolean | 实时识别，多行扫描时必须开启，会实时返回识别结果。实时识别也支持单行扫描，与原单行扫描协议一致。 | 是   |
| image_metadata        | Object  | 图像相关信息                                                 | 是   |
| image_metadata.height | Int     | 图片高度，单位是px                                           | 是   |
| image_metadata.reverse | boolean     | 竖向拼接图片，默认为`false`                                           | 否   |
| image_metadata.tokenization | Boolean | 中文分词，设置为`true`且原文为中文，则返回中文分词结果。若未开启或原文为英文，则返回原文原始文本。 |  |
| image_metadata.dictionary | Boolean | 词典开关，设置为`true`时调用词典接口 | 否 |
| image_metadata.dict_type | Boolean | 词典类型 | 否 |
| image_metadata.resources | Boolean | 教育内容开关，设置为`true`时调用教育内容接口 | 否 |
| image_metadata.image_debug | boolean     | 设置为`true`时，云端暂存设备上报的数据用于从调试接口获取图片等数据，仅供开发调试使用。此时请务必将原图使用jpeg算法压缩后传输。默认为`false`      | 否   |
| image_metadata.debug | boolean     | 设置为`true`时，云端收集ocr相关信息用于算法调试，仅供开发调试使用，默认为`false` 。处于debug模式时扫描图片，云端不会返回识别结果，只会将采集后的图片保存，用于后续算法优化。 | 否   |
| image_metadata.searchtopic_ability | string   | 01：扫描搜题； | 否   |
| image_metadata.searchtopic_service | string   | JXW01：学王搜题，需要申请商务授权；XW01：小蛙搜题，不返回搜题结果 | 否   |


`profile`取值

| `profile` 取值 | 说明                                   |
| :------------- | :------------------------------------- |
| OCR            | 图像识别，返回识别结果                 |
| OCR_TTS        | 图像识别，语音合成识别结果             |
| OCR_TRANS      | 图像识别，翻译识别结果                 |
| OCR_TRANS_TTS  | 图像识别，翻译识别结果，合成原文和译文 |
| SEARCHTOPIC | 用于云端搜题（注：具体请求服务需要在`image_metadata.searchtopic`中定义） |
| TEXTBOOK       | 教材指读，暂未开放                     |

##### 发送图像数据

在发送`image_in`请求后，客户端流传图像二进制元数据。通过`__END__`标记数据发送完成。

> 注意：
>
> - 传输图片时，按列从上到下，从左到右传输。
> - 多行扫描时，开始扫描发一个`visual_in`请求，发送图片数据，换行时发送换行帧。当用户在超时时间（建议2s）内没有扫描新的数据，发送`__END__`标记结束识别。

##### 图像帧数据协议说明

![1](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/tmp/1.png)

##### 多行扫描换行帧

协议格式与图像帧数据协议一致，仅`图像类型`固定为`0xFF`，其他字段任意，无帧数据。

**换行帧示例**

![2](https://iflyos-external.oss-cn-shanghai.aliyuncs.com/tmp/2.png)

##### 帧头保留数据说明

###### JPEG

当图像格式为JPEG（0x30）时，保留数据为数据帧长度: uint16, 小端字节序

### 请求协议text_in

```json
{
  "iflyos_header": {...},
  "iflyos_context": {...},
  "iflyos_request": {
    "header": {
      "name": "recognizer.text_in",
      "request_id": "xxxxxxxx"
    },
    "payload": {
      "query": "请求的文本",
      "with_tts": true,
      "reply_key": "xxxxxx"
      "profile": "OCR_TRANS_TTS", //0614新增
    }
  }
}

```

| 参数                  | 类型    | 说明                                                         | 必填 |
| :-------------------- | :------ | :----------------------------------------------------------- | :--- |
| iflyos_header         | Object  | 构建的通用 iflyos_header                                     | 是   |
| iflyos_context        | Object  | 构建的通用 iflyos_context                                    | 是   |
| query              | String | 需要请求的文本	 | 是   |
| profile               | String  | 请求操作，具体取值见下表（不填则默认请求云端语义链路）                               | 否   |
| with_tts    | Bool  | 是否需要语音回复，如果你希望用户点击按钮的时候，不要出现提示音，那么可以设置为 false，默认为：true	                    | 否   |
| reply_key	    |String  | 如果接收到 name 为 recognizer.expect_reply 的响应的话，重新打开麦克风识别的时候，需要填入响应中返回的 reply_key 中的取值  | 否   |

`profile`取值

| `profile` 取值 | 说明                                   |
| :------------- | :------------------------------------- |
| OCR_TRANS_TTS          | 返回翻译结果、原文TTS结果、译文TTS结果、中文分词结果                 |
| OCR_TRANS_TTS_DIC       | 返回翻译结果、原文TTS结果、译文TTS结果、词典结果、教育内容结果、中文分词结果             |
| OCR_TRAN_DIC     | 返回翻译结果、词典结果、教育内容结果、中文分词结果             |
| OCR_TTS_DIC  | 原文TTS结果、词典结果、教育内容结果、中文分词结果 |


### 返回示例


##### OCR结果/翻译结果

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "recognizer.visual_result"
      },
      "payload": {
        "is_last": true,
        "profile": "OCR",
        "data": {
          "code": 0,
          "description": "success",
          "sid": "xxxxxxx",
          "content":"null",
           segs：['欢迎','购买','聆','思','智能','扫描','笔',]
          "from": null,
          "to": null
        }
      }
    }
  ]
}
```


| 参数             | 类型   | 说明                                                         | 必有 |
| ---------------- | ------ | ------------------------------------------------------------ | ---- |
| is_last          | Bool   | 是否为最终结果，`true`表示当前文本为最终结果，`false`表示当前文本不是最终状态，只有在原文识别，实时扫描的情况下会出现取值为`false` | 是   |
| profile          | String | AI引擎名称，取值为`OCR`，`TRANS`或`TEXTBOOK`（暂未开放）     | 是   |
| data             | Object | 引擎处理结果                                                 | 是   |
| data.code        | Int    | 请求结果代码，0代表成功。[错误码查询](https://www.xfyun.cn/document/error-code) | 是   |
| data.description | String | 请求结果说明                                                 | 是   |
| data.sid         | String | 图像识别请求的唯一标识                                       | 是   |
| data.content     | String | 1. 若`profile`取值为`OCR`，`is_last`为 `false` 时，返回扫描识别的文本结果。；`is_last`为 `true` 时，返回`null`；2. 若`profile`取值为`TRANS`，则这里返回的是翻译的结果。；3. 若设备处于`debug`模式，则这里固定返回”原图已采集完成“ | 是   |
| Data.segs | String | 1. 若设备开启分词，处于单行扫描模式，且原文包含中文；或处于多行扫描， 且 `is_last`为 `true` 时，返回分词结果，词与词之间通过英文逗号隔开；2. 其余情况此处返回`null` | 是 |
| data.from     | String | 1. 若`profile`为`TRANS`时表示翻译原语种。取值:；**cn**(中文)；**en**(英文)；2. 若`profile`为其他时值为`null` | 否   |
| data.to     | String | 1. 若`profile`为`TRANS`时表示翻译结果语种。取值:；**cn**(中文)；**en**(英文)；2. 若`profile`为其他时值为`null` | 否  |

##### 词典结果

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "recognizer.visual_result"
      },
      "payload": {
        // 新增profile: "DICTIONARY"
        "profile": "DICTIONARY",
        // data中内容与词典接口返回结果相同
        "data": {
	    	"content":"愚公移山",
    		"type":"idiom",
	    	"details":[
	        {
            "pronunce":[
                {
                    "symbol":[
                        "yú",
                        "gōng",
                        "yí",
                        "shān"
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "definition":[
                {
                    "description":[
                        "比喻坚持不懈地改造自然和坚定不移地进行斗争。"
                    ]
                }
            ],
            "origin":"《列子·汤问》记载：愚公家门前有两大座山挡着路，他决...",
            "synonyms":[
                "锲而不舍",
                "持之以恒"
            ],
            "antonyms":[
                "虎头蛇尾",
                "有头无尾"
            ],
            "story":"传说古代有两座大山间住着一个90岁的愚公，他每次出门因大山阻隔，要绕很大的弯子......",
            "poem":[
                "太行、王屋二山，方七百里，高万仞，本在冀州之南，河阳之北。",
                "北山愚公者，年且九十，面山而居...",
                "河曲智叟笑而止之曰..."
            ]
        }
    ]
}
```

| 参数    | 类型   | 说明                                                         | 必有 |
| ------- | ------ | ------------------------------------------------------------ | ---- |
| profile | String | `DICTIONARY`为词典返回内容                                   | 是   |
| data    | Object | data中内容与词典接口返回结果相同，可参考本文档[词典查询接口](#中文单字返回示例) | 是   |

##### 教育内容结果

```json
{
    "iflyos_meta": {
											……
    },
    "iflyos_responses": [
        {
            "header": {
                "name": "recognizer.visual_result"
            },
            "payload": {
                "is_last": true,
                "profile": "RESOURCES",
                "data": {
                    "resources": [
                        {
                            "type": "poem",
                            "title": "静夜思",
                            "score": 10001.4380398989,
                            "extra": {
                                "review": [
                                    [
                                        {
                                            "url": "https://cdn.iflyos.cn/public/ocr_resources/poem_review/7a53928fa4dd31e82c6ef826f341daec.mp3",
                                            "title": "创作背景",
                                            "content_url": "https://console.iflyos.cn/api/v1/ocr/resources/value?type=poem&id=10&key=review_0"
                                        }
                                    ],
                                    [
                                        {
                                            "url": "https://cdn.iflyos.cn/public/ocr_resources/poem_review/1905aedab9bf2477edc068a355bba31a.mp3",
                                            "title": "赏析",
                                            "content_url": "https://console.iflyos.cn/api/v1/ocr/resources/value?type=poem&id=10&key=review_1"
                                        }
                                    ],
                                    [
                                        {
                                            "url": "https://cdn.iflyos.cn/public/ocr_resources/poem_review/28267ab848bcf807b2ed53c3a8f8fc8a.mp3",
                                            "title": "版本说明",
                                            "content_url": "https://console.iflyos.cn/api/v1/ocr/resources/value?type=poem&id=10&key=review_2"
                                        }
                                    ],
                                    [
                                        {
                                            "url": "https://cdn.iflyos.cn/public/ocr_resources/poem_review/1141938ba2c2b13f5505d7c424ebae5f.mp3",
                                            "title": "评析",
                                            "content_url": "https://console.iflyos.cn/api/v1/ocr/resources/value?type=poem&id=10&key=review_3"
                                        }
                                    ]
                                ],
                                "explain": [
                                    [
                                        {
                                            "url": "https://cdn.iflyos.cn/public/ocr_resources/poem_explain/7f5d04d189dfb634e6a85bb9d9adf21e.mp3",
                                            "title": "译文及注释",
                                            "content_url": "https://console.iflyos.cn/api/v1/ocr/resources/value?type=poem&id=10&key=explain_0"
                                        }
                                    ]
                                ],
                                "author": "李白",
                                "audio_url": "https://cdn.iflyos.cn/public/ocr_resources/poem_audio/1d8cf949089ce92c96a3e8e60c6cc19e.mp3"
                            },
                            "content": "床前明月光，疑是地上霜。举头望明月，低头思故乡。"
                        },
                        {
                            "type": "poem",
                            "title": "满庭芳·静夜思",
                            "score": 10000.9036120772,
                            "extra": {
                                "review": [],
                                "explain": [],
                                "author": "辛弃疾",
                                "audio_url": "https://cdn.iflyos.cn/public/ocr_resources/poem_audio/16537a893ccfbec9727293bb3cdd4962.mp3"
                            },
                            "content": "云母屏开，珍珠帘闭，防风吹散沉香。离情抑郁，金缕织硫黄。柏影桂枝交映，从容起，弄水银堂。连翘首，惊过半夏，凉透薄荷裳。一钩藤上月，寻常山夜，梦宿沙场。早已轻粉黛，独活空房。欲续断弦未得，乌头白，最苦参商。当归也！茱萸熟，地老菊花黄。"
                        },
                        {
                            "type": "audio",
                            "title": "静夜思",
                            "score": 10001.4380398989,
                            "extra": {
                                "audio_url": "http://mp3play.61gequ.com/audio/33/1604-1532945740516.mp3"
                            },
                            "content": null
                        }
                    ]
                }
            }
        }
    ]
}
```

| 参数                      | 类型   | 说明                                         | 必有 |
| ------------------------- | ------ | -------------------------------------------- | ---- |
| profile                   | String | `RESOURCES`为教育内容库的内容返回            | 是   |
| data                      | Object | 返回结果                                     | 是   |
| resources                 | Object | 资源结果                                     | 是   |
| type                      | String | 单词、词语、四字成语、文言文、古诗词、歇后语 | 是   |
| title                     | String | 内容标题                                     | 是   |
| score                     | float  | 内容匹配置信度                               | 是   |
| content                   | String | 详细内容                                     | 是   |
| extra                     | Object | 更多的内容，不同类型资源不同                 | 否   |
| extra.review              | Object | 故事、文言文复习相关内容                     | 否   |
| extra.review.title        | String | 内容类型                                     | 否   |
| extra.review.url          | String | 复习音频链接                                 | 否   |
| extra.review.content_url  | String | 复习音频文本                                 | 否   |
| extra.explain             | Object | 故事、文言文译文                             | 否   |
| extra.explain.title       | String | 内容类型                                     | 否   |
| extra.explain.url         | String | 译文音频链接                                 | 否   |
| extra.explain.content_url | String | 译文音频文本                                 | 否   |

##### TTS

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "audio_player.audio_out"
      },
      "payload": {
        "type": "TTS",
        "url": "http://tts.iflyos.cn/tts/sadf.mp3?token=xxxxxxxx",
        "secure_url": "https://tts.iflyos.cn/tts/sadf.mp3?token=xxxxxxxx",
        "behavior": "SERIAL",
        "resource_id": "e52e7xxxxxxxxxxxe52e7"
		"content_type": "original"
      }
    }
  ]
}

```


| 参数         | 类型   | 说明                                                         | 必有 |
| :----------- | :----- | :----------------------------------------------------------- | :--- |
| type         | String | 播放器类型，此处取值`TTS`                                    | 是   |
| behavior     | String | 资源播放方式。&lt;br&gt;当`type`取值为`TTS`时，`behavior`取值：&lt;br&gt;- SERIAL：串行TTS，执行时阻塞，播完TTS才可以执行下一个指令）&lt;br&gt;- PARALLEL：并行，执行不阻塞，开始播放TTS时可以同时执行后续指令。若该字段未出现，默认为SERIAL | 否   |
| url          | String | 内容播放地址，可能放的是http的链接，设备解析速度会更快，但有可能会被劫持 | 否   |
| secure_url   | String | 内容播放的安全地址，放的是不会被劫持的https链接，但设备解析速度可能会相对慢一些 | 否   |
| resource_id  | String | 内容ID                                                       | 否   |
| content_type | String | TTS类型，取值为` original`代表原文，取值为`translation`代表译文。仅在图片/语音/文本翻译过程中会出现 | 否   |

#### 上限说明

- OCR识别服务最长支持`4090px`长度的图片，若扫描内容超长，云端将会回复报错的TTS。
- 翻译服务最多支持256字符的翻译长度，若翻译内容超长，云端会在译文文本和TTS处返回报错提示。

> 注意：
>
> 当设备端处于debug模式时，每次完成扫描，云端均会下发”原图已采集完成“的TTS音频，表示本次数据采集已完成。



## 语音翻译

流程图

![](./files/22.png)


### 请求示例

语音翻译请求
```json
{
  "iflyos_header": {...},
  "iflyos_context": {...},
  "iflyos_request": {
    "header": {
      "name": "recognizer.audio_in",
      "request_id": "xxxxxxxx"
    },
    "payload": {
      "enable_vad": false,
      "profile": "CLOSE_TALK",
      "format": "AUDIO_L16_RATE_16000_CHANNELS_1",
      "translation": true
    }
  }
}
```




| 参数           | 类型   | 说明                                                         | 必填 |
| :------------- | :----- | :----------------------------------------------------------- | :--- |
| iflyos_header  | Object | 构建的通用 iflyos_header                                     | 是   |
| iflyos_context | Object | 构建的通用 iflyos_context                                    | 是   |
| enable_vad     | Bool   | 是否使用云端VAD，此处需取值为`false`。                       | 否   |
| profile        | String | 音频输入的处理引擎。近场取值`CLOSE_TALK`，远场取值`FAR_FIELD`。 | 是   |
| format         | String | 音频编码类型，取值见下表                                     | 是   |
| translation    | Bool   | 本次请求是否需要翻译。默认取值为FALSE，若取值为TRUE，将只翻译不请求NLU | 否   |


### 返回示例

##### 语音识别结果

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "recognizer.intermediate_text"
      },
      "payload": {
        "text": "明天的天气怎么样",
        "is_last": false
      }
    }
  ]
}
```
##### 语音翻译结果

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "recognizer.trans_result"
      },
      "payload": {
        "code": 0,
        "description": "success",
        "sid": "xxxxxxx",
        "data":{
          "dst": "Hello World ",
          "src": "你好世界",
          "from": "cn",
          "to": "en"
        }
      }
    }
  ]
}
```
| 参数        | 类型   | 说明                                                         | 必有 |
| ----------- | ------ | ------------------------------------------------------------ | ---- |
| code        | Int    | 请求结果代码，0代表成功。[错误码查询](https://www.xfyun.cn/document/error-code) | 是   |
| description | String | 请求结果说明                                                 | 是   |
| sid         | String | 图像识别请求的唯一标识                                       | 是   |
| data        | Object | 图像识别请求的结果                                           | 是   |
| data.dst    | String | 译文文本                                                     | 是   |
| data.src    | String | 原文文本                                                     | 是   |
| data.from     | String | 翻译原语种。取值:；**cn**(中文)；**en**(英文) | 是 |
| data.to     | String | 翻译结果语种。取值:；**cn**(中文)；**en**(英文) | 是 |

##### TTS

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "audio_player.audio_out"
      },
      "payload": {
        "type": "TTS",
        "url": "http://tts.iflyos.cn/tts/sadf.mp3?token=xxxxxxxx",
        "secure_url": "https://tts.iflyos.cn/tts/sadf.mp3?token=xxxxxxxx",
        "behavior": "SERIAL",
        "resource_id": "e52e7xxxxxxxxxxxe52e7"
		"content_type": "translation"
      }
    }
  ]
}

```
| 参数         | 类型   | 说明                                                         | 必有 |
| :----------- | :----- | :----------------------------------------------------------- | :--- |
| type         | String | 播放器类型，此处取值`TTS`                                    | 是   |
| behavior     | String | 资源播放方式。&lt;br&gt;当`type`取值为`TTS`时，`behavior`取值：&lt;br&gt;- SERIAL：串行TTS，执行时阻塞，播完TTS才可以执行下一个指令）&lt;br&gt;- PARALLEL：并行，执行不阻塞，开始播放TTS时可以同时执行后续指令。若该字段未出现，默认为SERIAL | 否   |
| url          | String | 内容播放地址，可能放的是http的链接，设备解析速度会更快，但有可能会被劫持。 | 否   |
| secure_url   | String | 内容播放的安全地址，放的是不会被劫持的https链接，但设备解析速度可能会相对慢一些 | 否   |
| resource_id  | String | 内容ID                                                       | 否   |
| content_type | String | TTS类型，取值为` original`代表原文，取值为`translation`代表译文。仅在图片/语音/文本翻译过程中会出现 | 否   |

#### 上限说明

翻译服务最多支持256字符的翻译长度，若翻译内容超长，云端会在译文文本和TTS处返回报错提示。

## 文本翻译

### 请求示例

```json
{
  "iflyos_header": {...},
  "iflyos_context": {...},
  "iflyos_request": {
    "header": {
      "name": "recognizer.text_in",
      "request_id": "xxxxxxxx"
    },
    "payload": {
      "query": "请求的文本",
      "with_tts": true,
      "translation": true
    }
  }
}
```



| 参数           | 类型   | 说明                                                         | 必填 |
| :------------- | :----- | :----------------------------------------------------------- | :--- |
| iflyos_header  | Object | 构建的通用 iflyos_header                                     | 是   |
| iflyos_context | Object | 构建的通用 iflyos_context                                    | 是   |
| query          | String | 请求文本                                                     | 是   |
| with_tts       | Bool   | 是否需要语音回复，如果你希望用户点击按钮的时候，不要出现提示音，那么可以设置为 false，默认为：true | 否   |
| translation        | Bool | 本次请求是否需要翻译。默认取值为FALSE，若取值为TRUE，将只翻译不请求NLU    | 否   |

### 返回示例

##### 文本翻译结果

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "recognizer.trans_result"
      },
      "payload": {
        "code": 0,
        "description": "success",
        "sid": "xxxxxxx",
        "data":{
          "dst": "Hello World ",
          "src": "你好世界",
          "from": "cn",
          "to": "en"
        }
      }
    }
  ]
}
```

| 参数        | 类型   | 说明                                                         | 必有 |
| ----------- | ------ | ------------------------------------------------------------ | ---- |
| code        | Int    | 请求结果代码，0代表成功。[错误码查询](https://www.xfyun.cn/document/error-code) | 是   |
| description | String | 请求结果说明                                                 | 是   |
| sid         | String | 图像识别请求的唯一标识                                       | 是   |
| data        | Object | 图像识别请求的结果                                           | 是   |
| data.dst    | String | 译文文本                                                     | 是   |
| data.src    | String | 原文文本                                                     | 是   |
| data.from     | String | 翻译原语种。取值:；**cn**(中文)；**en**(英文) | 是 |
| data.to     | String | 翻译结果语种。取值:；**cn**(中文)；**en**(英文) | 是 |

##### TTS

```json
{
  "iflyos_responses": [
    ...,
    {
      "header": {
        "name": "audio_player.audio_out"
      },
      "payload": {
        "type": "TTS",
        "url": "http://tts.iflyos.cn/tts/sadf.mp3?token=xxxxxxxx",
        "secure_url": "https://tts.iflyos.cn/tts/sadf.mp3?token=xxxxxxxx",
        "behavior": "SERIAL",
        "resource_id": "e52e7xxxxxxxxxxxe52e7"
		"content_type": "translation"
      }
    }
  ]
}

```

| 参数         | 类型   | 说明                                                         | 必有 |
| :----------- | :----- | :----------------------------------------------------------- | :--- |
| type         | String | 播放器类型，此处取值`TTS`                                    | 是   |
| behavior     | String | 资源播放方式。&lt;br&gt;当`type`取值为`TTS`时，`behavior`取值：&lt;br&gt;- SERIAL：串行TTS，执行时阻塞，播完TTS才可以执行下一个指令）&lt;br&gt;- PARALLEL：并行，执行不阻塞，开始播放TTS时可以同时执行后续指令。若该字段未出现，默认为SERIAL | 否   |
| url          | String | 内容播放地址，可能放的是http的链接，设备解析速度会更快，但有可能会被劫持。 | 否   |
| secure_url   | String | 内容播放的安全地址，放的是不会被劫持的https链接，但设备解析速度可能会相对慢一些 | 否   |
| resource_id  | String | 内容ID                                                       | 否   |
| content_type | String | TTS类型，取值为` original`代表原文，取值为`translation`代表译文。仅在图片/语音/文本翻译过程中会出现 | 否   |

#### 上限说明

翻译服务最多支持256字符的翻译长度，若翻译内容超长，云端会在译文文本和TTS处返回报错提示。

