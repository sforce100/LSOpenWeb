---
sidebar_label: 云端扫描笔接口说明
sidebar_position: 5
---

# 扫描笔云端接口说明

## 更新记录

| 版本 | 更新说明                                                     | 责任人 | 日期      |
| ---- | ------------------------------------------------------------ | ------ | --------- |
| 1.0  | 将扫描笔api接口能力与EVS标准协议内容作区分；新增学习园地、学情数据等云端接口    | 刘钟蔚 | 2022.04.20 |
| 1.1  | 新增学王词典接口请求和返回示例    | 刘钟蔚 | 2022.05.20 |

## 词典查询接口

### 单词查询

你可以在设备上选择一个单词，查询单词释义。

#### 接口地址

```
GET https://api.iflyos.cn/external/ocr/dict
```

#### 请求header

```
Authorization: Bearer {token}
```

> {token}为设备端token

#### 请求参数

| 参数名 | 类型   | 说明               |
| ------ | ------ | ------------------ |
| q     | string | 指定翻译单词、单词 |
| type  | string | 词典类型：youdao、xuewang，新设备默认选择xuewang不可更改，没填写时默认使用云端配置xuewang |

### 单字返回示例（学王词典）

```
{
    "analyzing": "象形字",
    "content": "小",
    "details": [
        {
            "antonyms": [
                "大"
            ],
            "definition": [
                {
                    "description": "在体积、面积、数量、力量、强度等方面不及一般或不及比较的对象",
                    "sample": [
                        "「小山」",
                        "「小厂」",
                        "「帽子小了一点。」"
                    ]
                },
                {
                    "description": "短时间地",
                    "sample": [
                        "「小睡」",
                        "「小坐」。"
                    ]
                },
                {
                    "description": "稍微",
                    "sample": [
                        "「小有才干」",
                        "「牛刀小试」。"
                    ]
                },
                {
                    "description": "略微少于、将近",
                    "sample": [
                        "「小五十的人了。」"
                    ]
                },
                {
                    "description": "排行最末的",
                    "sample": [
                        "「小女儿」",
                        "「小弟弟」。"
                    ]
                },
                {
                    "description": "年纪小的人",
                    "sample": [
                        "「上有老，下有小。」"
                    ]
                },
                {
                    "description": "妾",
                    "sample": [
                        "「小妾」。"
                    ]
                },
                {
                    "description": "称自己或跟自己有关的人或事物",
                    "sample": [
                        "「小人」",
                        "「小女」。"
                    ]
                },
                {
                    "description": "称人、排行次序、某些人等",
                    "sample": [
                        "「小李」",
                        "「小王」。"
                    ]
                }
            ],
            "grade": 3,
            "pronounce": {
                "symbol": "xiǎo",
                "url": "http://ksyundata.zhinengtongbu.com/hanzizidian/pymp3/xi%C7%8Eo.mp3?sign=6D3819656696C9C7404F3A037659A30E&time=1652970549"
            },
            "related": {
                "idiom": [
                    "黄口小儿",
                    "家道小康",
                    "因小失大",
                    "短小精干",
                    "小肚鸡肠",
                    "大呼小叫",
                    "非同小可",
                    "小康之家",
                    "大同小异",
                    "区区小事"
                ],
                "prefix": [
                    "小孩",
                    "小道",
                    "小看"
                ],
                "suffix": [
                    "细小"
                ]
            },
            "sample": [
                "他是个阳奉阴违的【小人】。",
                "这部【小说】歌颂了子弟兵的英雄事迹。"
            ],
            "spelling": [
                {
                    "section": [
                        0
                    ],
                    "url": "https://cdn.iflyos.cn/public/dictionary_youdao/char_spelling/ee88d2cac3090e3cec1426dcc5f602f1"
                },
                {
                    "section": [
                        1
                    ],
                    "url": "https://cdn.iflyos.cn/public/dictionary_youdao/char_spelling/f5a2ae1a23af036e204361c01676eeb3"
                },
                {
                    "section": [
                        2,
                        3
                    ],
                    "url": "https://cdn.iflyos.cn/public/dictionary_youdao/char_spelling/3a4717fed5341951974fbde6a7deca44"
                }
            ],
            "synonyms": [
                "稍"
            ]
        }
    ],
    "grade": 3,
    "level": "一级",
    "riddle": "尘土飞扬(打一汉字)",
    "side": "小",
    "stroke_orders": null,
    "strokes": {
        "gif": "http://ksyundata.zhinengtongbu.com/hanzizidian/gif/%E5%B0%8F.gif?sign=1756E0DCED750D5A2ED36D2AE5C25DFF&time=1652970549",
        "storkes_medians": [],
        "strokescount": 3,
        "strokesorder": [],
        "strokespath": []
    },
    "structures": "独体结构",
    "traditional": "小",
    "type": "characters"
}
```


| 参数                           | 类型      | 说明                                                         |
| :----------------------------- | :-------- | :----------------------------------------------------------- |
| analyzing | String    |  解形                   |
| content                        | String    | 汉字内容        |
| details                        | JSONArray | 汉字详细信息，若汉字有多个发音，且多个发音有不同含义，则此处details会有多个； |
| details_synonyms               | String    | 近义词                                                       |
| details_antonyms               | String    | 反义词                                                       |
| details_definition             | JSONArray | 汉字解释                                                     |
| details_definition_description | String    | 释义                                                         |
| details_definition_sample      | JSONArray | 示例                                                         |
| details_pronunce_symbol        | String    | 拼音                                                         |
| details_pronunce_url           | String    | 拼音音频链接                                                 |
| details_related                | JSONArray | 相关词                                                       |
| details_related_idiom          | JSONArray | 相关成语                                                     |
| details_related_Prefix         | JSONArray | 相关词语（词首）                                             |
| details_related_suffix         | JSONArray | 相关词语（词尾）                                             |
| details_sample                 | String    | 例句                                                         |
| details_spelling               | JSONArray | 汉字拼读信息                                                 |
| details_spelling_section       | JSONArray | 拼音分区，如[0,1]表示拼音的前两个字符                        |
| details_spelling_url           | String    | 分区后，各部分对应的发音url                                  |
| grade                          | String    | 年级                                                         |
| level                          | String    | 字级                                                         |
| riddle                         | String    | 字谜                                                         |
| side                           | String    | 偏旁                                                         |
| stroke_orders                  | String    | 笔画                                                       |
| strokes                        | JSONArray | 汉字笔画信息                                                 |
| strokes_gif                    | String    | 笔画gif图                  |
| strokes_strokescount           | String    | 笔画数                                                       |
| strokes_strokesorder           | JSONArray | 笔画名称（已无用）                                                     |
| strokes_strokespath            | JSONArray | 每一笔画svg路径  （已无用）                                             |
| strokes_storkes_medians        | JSONArray | 笔画坐标列表，用于展示每一笔画的动画（已无用）  |
| type                           | String    | 汉字类型固定值为【characters】                               |
| structures                     | String    | 结构                                                         |
| traditional                    | String    | 繁体                                                         |

### 词语返回示例（学王词典）

```
{
    "content": "美丽",
    "details": [
        {
            "antonyms": [
                "难看",
                "丑陋",
                "黯淡",
                "丑恶"
            ],
            "definition": [
                {
                    "description": "好看；能给人美感的。",
                    "sample": [
                        "美丽的容貌。",
                        "让青春更美丽。"
                    ]
                }
            ],
            "pronounce": [
                {
                    "symbol": [
                        "měi",
                        "lì"
                    ],
                    "url": "https://cdn.iflyos.cn/public/dictionary_youdao/chinese_url/da4cb7ad18731fd1f1766e46b36f0ffb"
                }
            ],
            "sentence": [
                "远远望去，天山山脉层峦叠嶂，美丽极了。",
                "翡翠是一种美丽的小鸟，毛色好看极了。",
                "美丽的三峡风光，像一幅幅绚丽的图画。",
                "绿树和鲜花把广场点缀得格外美丽。",
                "看那彩霞满天的壮景，真是美丽极了。",
                "仰望灿烂的星空，我的脑海里充满了美丽的遐想。",
                "美丽富饶的洞庭之滨是我的家乡。",
                "紫色的山峰衬托着几朵白云，美丽极了。",
                "公园里的荷花，有的绽开了笑脸，有的含苞欲放，美丽极了。",
                "我的故乡太湖之滨，是富饶美丽的鱼米之乡。",
                "这姑娘不但容貌美丽，心地也很善良。",
                "关于牵牛星和织女星，民间有个美丽的传说。",
                "这幢别墅中西浑然一体，实在是美丽！",
                "她那双明媚的大眼睛多么美丽动人！",
                "日出的时候，海上的景色特别美丽。",
                "全校师生群策群力，把校园建设得非常美丽。",
                "她望着闪烁的星空，沉浸在美丽的幻想之中。",
                "我仰望星空，心中充满美丽的遐想。",
                "百花盛开的春天是美丽的，果实累累的金秋更加迷人。",
                "我们要多栽树多种花，让校园变得更加美丽。"
            ],
            "synonyms": [
                "漂亮",
                "标致",
                "俊俏",
                "富丽",
                "秀美",
                "美观",
                "美貌",
                "俏丽",
                "优美",
                "奇丽",
                "素丽",
                "文雅",
                "美艳",
                "斑斓",
                "大度",
                "锦绣",
                "瑰丽",
                "俊美",
                "秀丽",
                "时髦"
            ]
        }
    ],
    "type": "word"
}
```

| 参数                           | 类型      | 说明                     |
| :----------------------------- | :-------- | :----------------------- |
| content                        | String    | 词语内容                 |
| type                           | String    | 中文词语固定值为【word】 |
| details                        | JSONArray | 词语详情                 |
| details_pronunce               | JSONArray | 词语发音信息             |
| details_pronunce_symbol        | String    | 词语拼音                 |
| details_pronunce_url           | String    | 词语发音url              |
| details_definition             | JSONArray | 词语解释                 |
| details_definition_description | String    | 词语释义                 |
| details_definition_sample      | String    | 词语例句                 |
| details_synonyms               | String    | 近义词                   |
| details_antonyms               | String    | 反义词                   |
| sentence      | String    | 词语例句                 |


### 成语返回示例（学王词典）

```
{
    "content": "光彩夺目",
    "details": [
        {
            "antonyms": [
                "暗淡无光",
                "黯然无光",
                "黯然失色",
                "一团漆黑"
            ],
            "appraise": "褒义词",
            "definition": [
                {
                    "description": "夺目：耀眼。形容鲜艳耀眼。也用来形容某些艺术作品和艺术形象的极高成就。"
                }
            ],
            "id": 7892,
            "origin": "明·凌濛初《初刻拍案惊奇》第一卷：“玉台翠树，光彩夺目。”",
            "poem": [],
            "pronounce": [
                {
                    "symbol": [
                        "guāng",
                        "cǎi",
                        "duó",
                        "mù"
                    ],
                    "url": "http://ksyundata.zhinengtongbu.com/chengyucidian/mp3/%E5%85%89%E5%BD%A9%E5%A4%BA%E7%9B%AE.mp3?sign=F2B62EBD0B6871EDF685C74DB5265C30&time=1652974627"
                }
            ],
            "sentence": [
                "1.国庆之夜，天安门广场燃放礼花，五彩缤纷，光彩夺目。"
            ],
            "story": "　　西晋时期，有一个人叫做石崇。石崇原本在荆州担任刺史，他靠着抢劫外地商人，积累了很多的钱。后来石崇被调到京城去做卫尉，在京城，石崇开始大量花费自己之前积累的钱。晋国的君主有一个舅舅叫做王凯。王恺也像石崇一样，非常地铺张浪费，他竟然还想办法与石崇比谁更富有。有一次，王恺得到了一株珊瑚，他十分得意，拿到石崇家去炫耀，“你看，我最近的得到的一株珊瑚，很好看吧？这可是非常少见的！”但是没想到石崇却拿出了六七株珊瑚，一株株都非常的鲜艳耀眼，让人移不开眼睛。石崇说：“刚好我最近也得到了几株，这些送给你吧。”王恺感叹说：“哎，我还是不如石崇有钱啊！”\n　　“光彩夺目”这个成语就用来指某些东西非常的耀眼出众。",
            "synonyms": [
                "光彩射人",
                "光采夺目",
                "光华夺目",
                "光彩照人",
                "光彩溢目",
                "光辉灿烂"
            ],
            "usage": "联合式；作谓语、定语；形容颜色鲜艳耀眼",
            "usage_frequency": "常用"
        }
    ],
    "type": "idiom"
}
```

| 参数                           | 类型      | 说明                  |
| :----------------------------- | :-------- | :-------------------- |
| content                        | String    | 成语内容              |
| type                           | String    | 成语固定值为【idiom】 |
| details                        | JSONArray | 成语详情              |
| details_pronunce               | JSONArray | 成语发音信息          |
| details_pronunce_symbol        | String    | 成语拼音              |
| details_pronunce_url           | String    | 成语发音url           |
| details_definition             | JSONArray | 成语解释              |
| details_definition_description | String    | 成语释义              |
| details_origin                 | String    | 成语来源              |
| details_synonyms               | String    | 近义词                |
| details_antonyms               | String    | 反义词                |
| details_story                  | String    | 成语故事              |
| details_poem                   | JSONArray | 成语相关诗歌          |
| details_story                  | String    | 成语故事              |
| appraise                | String    | 褒义/贬义             |
| usageFrequency                 | String    | 常用程度             |
| usage                  | String    | 成语用法           |

### 古诗词返回示例（学王词典）

```
{
    "content": "赋得古原草送别（节选）",
    "details": [
        {
            "appreciation": "此诗通过对古原上野草的描绘，抒发送别友人时的依依惜别之情。它可以看成是一曲野草颂，进而是生命的颂歌。全诗章法谨严，用语自然流畅，对仗工整，写景抒情水乳交融，意境浑成，是“赋得体”中的绝唱。原上草或有所指，但喻意并无确定。“野火烧不尽，春风吹又生，”却作为一种“韧劲”而有口皆碑，传诵千古。诗的首句“离离原上草”，紧紧扣住题目“古原草”三字，并用叠字“离离”描写春草的茂盛。第二句“一岁一枯荣”，进而写出原上野草秋枯春荣，岁岁循环，生生不已的规律。第三、四句“野火烧不尽，春风吹又生”，一句写“枯”，一句写“荣”，是“枯荣”二字意思的发挥。不管烈火怎样无情地焚烧，只要春风一吹，又是遍地青青的野草，极为形象生动地表现了野草顽强的生命力。",
            "articles_num": [
                "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E5%8F%A4%E8%AF%97%E6%96%87%E8%AF%8D%E5%85%B8/%E8%AF%97%E8%AF%8D/ID00023_001.mp3?sign=B43FFB9958BDF24837C169E0B8CF28B2&time=1652975005",
                "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E5%8F%A4%E8%AF%97%E6%96%87%E8%AF%8D%E5%85%B8/%E8%AF%97%E8%AF%8D/ID00023_002.mp3?sign=A17E6FC7CD06605C72021BBACB5A5D93&time=1652975005",
                "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E5%8F%A4%E8%AF%97%E6%96%87%E8%AF%8D%E5%85%B8/%E8%AF%97%E8%AF%8D/ID00023_003.mp3?sign=9F6FEF9E25F47A1318E42DD62ACDCC10&time=1652975005",
                "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E5%8F%A4%E8%AF%97%E6%96%87%E8%AF%8D%E5%85%B8/%E8%AF%97%E8%AF%8D/ID00023_004.mp3?sign=247BDE376B2167D8D3F9D4034967926F&time=1652975005"
            ],
            "author": "白居易",
            "author_id": "ZZ0001",
            "author_num": "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E5%8F%A4%E8%AF%97%E6%96%87%E8%AF%8D%E5%85%B8/%E4%BD%9C%E8%80%85/ID00023_ZZ.mp3?sign=45821FF33ED8F6311A97C8DAB7D59A29&time=1652975005",
            "dynasties": "唐",
            "dynasties_num": "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E5%8F%A4%E8%AF%97%E6%96%87%E8%AF%8D%E5%85%B8/%E6%9C%9D%E4%BB%A3/ID00023_CD.mp3?sign=64409FB3245C1D22107E66803E6BD4BF&time=1652975005",
            "keyword": "二年级，咏物，写景",
            "poem": [
                "离离原上草，一岁一枯荣。",
                "野火烧不尽，春风吹又生。"
            ],
            "title": "赋得古原草送别（节选）",
            "title_num": "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E5%8F%A4%E8%AF%97%E6%96%87%E8%AF%8D%E5%85%B8/%E8%AF%97%E8%AF%8D/ID00023.mp3?sign=855E232D57F10BBF6E5B5C8AC271FD19&time=1652975005",
            "translation": "古原上长满茂盛的青草，年年岁岁枯萎了又昌荣。原野上的大火无法烧尽，春风一吹它又遍地滋生。",
            "type": "诗",
            "word_interpretation": "【离离】青草茂盛的样子。【枯】枯萎。荣，茂盛。野草每年都会茂盛一次，枯萎一次。"
        }
    ],
    "type": "poem"
}
```

| 参数                           | 类型      | 说明                  |
| :----------------------------- | :-------- | :-------------------- |
| title                 | String    | 标题 |
| titleNum                      | String    | 标题mp3地址           |
| dynasties             | JSONArray | 朝代          |
| dynastiesNum                      | JSONArray | 朝代mp3地址             |
| author        | String    | 作者            |
| authorId  | String    | 作者id           |
| authorNum          | String    | 作者MP3地址           |
| articles  | String    | 原文         |
| articlesNum  | String    | 原文MP3地址           |
| translation | String    | 译文         |
| wordInterpretation   | String    | 字解      |
| appreciation   | String    | 赏析     |
| keyword  | String    | 关键字    |


### 单词返回示例（学王词典）

```
{
    "content": "cool",
    "details": [
        {
            "anton": [
                "warm",
                "increase",
                "excited",
                "friendly"
            ],
            "definition": [
                {
                    "description": [
                        "凉爽的",
                        "冷静的",
                        "出色的"
                    ],
                    "property": "adj",
                    "tag": null
                },
                {
                    "description": [
                        "使……冷却",
                        "使……平静下来"
                    ],
                    "property": "vt",
                    "tag": null
                },
                {
                    "description": [
                        "变凉",
                        "平息"
                    ],
                    "property": "vi",
                    "tag": null
                },
                {
                    "description": [
                        "凉爽",
                        "凉爽的空气"
                    ],
                    "property": "n",
                    "tag": null
                },
                {
                    "description": [
                        "冷静地"
                    ],
                    "property": "adv",
                    "tag": null
                },
                {
                    "description": [
                        "(Cool)人名",
                        "(法)科尔",
                        "(英)库尔"
                    ],
                    "property": "n",
                    "tag": null
                }
            ],
            "derivation": [
                {
                    "description": " 冷却器；清凉剂",
                    "property": "n.",
                    "word": "cooler"
                },
                {
                    "description": " 冷静地；沉着地",
                    "property": "n.",
                    "word": "coolly"
                },
                {
                    "description": " 冷；凉爽；冷静",
                    "property": "n.",
                    "word": "coolness"
                },
                {
                    "description": " 冷却剂",
                    "property": "v.",
                    "word": "coolant"
                }
            ],
            "example": [],
            "example_url_list": [
                "http://ksyundata.zhinengtongbu.com/onlinedic/%E5%8D%95%E8%AF%8D%E4%BE%8B%E5%8F%A5/cool_LJ01.mp3?sign=BE5CFB0E23419A8959C66F5B08ECA57A&time=1652975097",
                "http://ksyundata.zhinengtongbu.com/onlinedic/%E5%8D%95%E8%AF%8D%E4%BE%8B%E5%8F%A5/cool_LJ02.mp3?sign=0C5F10374F921E6C0F6788EBA0A7078D&time=1652975097",
                "http://ksyundata.zhinengtongbu.com/onlinedic/%E5%8D%95%E8%AF%8D%E4%BE%8B%E5%8F%A5/cool_LJ03.mp3?sign=F4D9ECFF8EE1059EE44577F8CD86586D&time=1652975097"
            ],
            "expressions": [
                {
                    "description": [
                        "保持冷静"
                    ],
                    "expression": "stay cool "
                },
                {
                    "description": [
                        "真酷"
                    ],
                    "expression": "so cool "
                },
                {
                    "description": [
                        "冷却",
                        "平静下来"
                    ],
                    "expression": "cool down "
                },
                {
                    "description": [
                        "变凉",
                        "平静下来"
                    ],
                    "expression": "cool off "
                },
                {
                    "description": [
                        "凉爽的微风"
                    ],
                    "expression": "cool breeze "
                },
                {
                    "description": [
                        "抑制住感情，沉着冷静"
                    ],
                    "expression": "play it cool "
                },
                {
                    "description": [
                        "保持冷静",
                        "保持凉爽",
                        "镇定自若"
                    ],
                    "expression": "keep cool "
                },
                {
                    "description": [
                        "冷静的头脑"
                    ],
                    "expression": "cool head "
                },
                {
                    "description": [
                        "十分冷静"
                    ],
                    "expression": "cool as a cucumber "
                },
                {
                    "description": [
                        "寒色"
                    ],
                    "expression": "cool color "
                },
                {
                    "description": [
                        "冒失鬼"
                    ],
                    "expression": "cool hand "
                },
                {
                    "description": [
                        "冷色"
                    ],
                    "expression": "cool colour "
                },
                {
                    "description": [
                        "沉不住气"
                    ],
                    "expression": "blow one"
                }
            ],
            "gif": "cool.gif",
            "high_textbook_paraphrase": "",
            "is_level4": 1,
            "is_level6": 1,
            "middle_textbook_paraphrase": "adj. 酷的；凉爽的；绝妙的；凉快的；妙极的n. 酷",
            "natural_spell_url": "http://ksyundata.zhinengtongbu.com/onlinedic/%E8%87%AA%E7%84%B6%E6%8B%BC%E8%AF%BB/cool_ZRPD.mp3?sign=E711598A582726D82ED2CBFA807EAE71&time=1652975097",
            "picture": "http://ksyundata.zhinengtongbu.com/onlinedic/%E5%8A%A8%E6%BC%AB%E5%8D%95%E8%AF%8D/cool.gif?sign=82F4415F40633A96E84F7A2DB435742A&time=1652975097",
            "primary_textbook_paraphrase": "int. 太妙了；酷；真棒adj. 令人满意的；绝妙的；凉爽的；凉快的；冷静的；沉着的；酷的；极好的；妙极的；很棒的；一流的；[非正式]极有魅力的；时髦的v. 使变凉",
            "pronounce": [
                {
                    "property": "adj.",
                    "symbol": "[kuːl]",
                    "url": "http://ksyundata.zhinengtongbu.com/onlinedic/%E8%8B%B1%E5%BC%8F%E5%8F%91%E9%9F%B3/ys01144.mp3?sign=DA2FD8BA1ABECE02D9D1CBEAB52815B9&time=1652975097"
                }
            ],
            "related": [
                {
                    "description": "微风；和风轻而易举的事",
                    "word": "breeze"
                },
                {
                    "description": "寒冷的；凉飕飕的；阴冷的不友好的；冷淡的",
                    "word": "chilly"
                },
                {
                    "description": "气候",
                    "word": "climate"
                },
                {
                    "description": "云；云朵云状物（如尘雾、烟雾、一群飞行的昆虫）",
                    "word": "cloud"
                },
                {
                    "description": "冷；寒冷；（尤指）低气温感冒；伤风冷的；寒冷的；冰凉的冷淡的；冷漠的；不热情的（食物，饮料）未热过的，已凉的",
                    "word": "cold"
                },
                {
                    "description": "潮湿的；潮乎乎的",
                    "word": "damp"
                },
                {
                    "description": "细雨；零星小雨；毛毛雨下毛毛雨；下细雨",
                    "word": "drizzle"
                },
                {
                    "description": "（气候）少雨的，干旱的干的；干燥的（使）变干；弄干；吹干",
                    "word": "dry"
                },
                {
                    "description": "雾迷惘；困惑使雾气笼罩使迷惘；使困惑",
                    "word": "fog"
                },
                {
                    "description": "霜结霜",
                    "word": "frost"
                }
            ],
            "spelling": [
                {
                    "section": [
                        0
                    ],
                    "url": "https://cdn.iflyos.cn/public/dictionary_youdao/to_chinese_spelling/e1694f74cde2d13fdaa7b711d6b13050"
                },
                {
                    "section": [
                        1,
                        2
                    ],
                    "url": "https://cdn.iflyos.cn/public/dictionary_youdao/to_chinese_spelling/19ae734aa05e57edb0645b22d1905923"
                },
                {
                    "section": [
                        3
                    ],
                    "url": "https://cdn.iflyos.cn/public/dictionary_youdao/to_chinese_spelling/ac0c911fb0f6bbb53cd47600d85db536"
                }
            ],
            "syllabification": "c-oo-l",
            "synon": [
                "refrigerate",
                "wane",
                "cold",
                "chilly",
                "calm",
                "unfriendly",
                "fashionable"
            ],
            "tenses": {
                "comparative": "cooler",
                "highest": "coolest",
                "past": "cooled",
                "pastParticiple": "cooled",
                "presentParticiple": "cooling",
                "thirdPersonSingular": "cools"
            },
            "update_date": null,
            "us_pronounce": [
                {
                    "property": null,
                    "symbol": "[kul]",
                    "url": "http://ksyundata.zhinengtongbu.com/onlinedic/%E7%BE%8E%E5%BC%8F%E5%8F%91%E9%9F%B3/ms01144.mp3?sign=75D5E9F665C61D9B47FF57797A9B9903&time=1652975097"
                }
            ],
            "word_attr": 443
        }
    ],
    "type": "en_word"
}
```

| 参数                               | 类型      | 说明                                  |
| :--------------------------------- | :-------- | :------------------------------------ |
| content                            | String    | 单词文本内容                          |
| type                               | String    | 英文单词类型固定为【en_word】         |
| details                            | JSONArray | 英文单词详情                          |
| details_pronunce                   | JSONArray | 发音信息                              |
| details_pronunce_symbol            | JSONArray | 音标                                  |
| details_pronunce_url               | String    | 单词发音url                           |
| details_us_pronunce                   | JSONArray | 美式发音信息                              |
| details_us_pronunce_symbol            | JSONArray | 美式音标                                  |
| details_us_pronunce_url               | String    | 单词美式发音url                           |
| details_spelling                   | JSONArray | 拼读信息                              |
| details_spelling_section           | String    | 音标分区，如[0,1]表示音标的前两个字符 |
| details_spelling_url               | String    | 分区后，各部分对应的发音url           |
| details_definition                 | JSONArray | 单词解释                              |
| details_definition_property        | String    | 词性                                  |
| details_definition_description     | String    | 释义                                  |
| details_definition_tag             | String    | 标签                                  |
| details_derivation                 | JSONArray | 派生词信息                            |
| details_derivation_word            | String    | 派生词内容                            |
| details_derivation_property        | String    | 派生词词性                            |
| details_derivation_description     | String    | 派生词释义                            |
| details_tenses                     | JSONArray | 时态                                  |
| details_tenses_presentParticiple   | String    | 现在分词                              |
| details_tenses_past                | String    | 过去时态                              |
| details_tenses_pastParticiple      | String    | 过去分词                              |
| details_tenses_thirdPersonSingular | String    | 第三人称单数                          |
| details_expressions                | JSONArray | 短语                                  |
| details_expressions_expression     | String    | 短语内容                              |
| details_expressions_description    | String    | 短语解释                              |
| details_related                    | JSONArray | 相关词汇                              |
| details_related_word               | String    | 相关词汇内容                          |
| details_related_description        | String    | 相关词汇描述                          |
| details_picture                    | String    | 单词主题图片                          |
| isLevel4              | String    | 是否四级                             |
| isLevel6     | String    | 是否六级                       |
| wordAttr | String    | 单词属性(位运算)                         |
| primaryTextbookParaphrase            | JSONArray | 小学词性+释义                               |
| middleTextbookParaphrase    | String    | 中学词性+释义                        |
| highTextbookParaphrase   | String    |  高中词性+释义                             |
| syllabification              | JSONArray | 音节划分                           |
| synon        | String    | 近义词                        |
| anton        | String    | 反义词               |
| naturalSpellUrl                   | String    | 拼读发音链接                          |
| example                   | String    | 例句                 |
| exampleUrlList                | String    | 例句音频                |
| picture  | String    | 插图url                | 

### 拼音返回示例（学王词典）

```
{
    "content": "zōu",
    "details": [
        {
            "all_read_num": "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E6%8B%BC%E9%9F%B3%E5%BA%93/%E6%95%B4%E9%9F%B3/ZD01357.mp3?sign=A25D574A05268B78EDFAD0ABB550456D&time=1653042494",
            "all_tone": "zōu",
            "chinese_character": "",
            "id": 2118,
            "spell_num": "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E6%8B%BC%E9%9F%B3%E5%BA%93/%E6%8B%BC%E8%AF%BB/PD01357.mp3?sign=F836BB84B29135219E316B960B125596&time=1653042494",
            "spell_split": "zōu-z-ōu-zōu",
            "update_date": null
        }
    ],
    "type": "pinyin"
}
```


| 参数                               | 类型      | 说明                                  |
| :--------------------------------- | :-------- | :------------------------------------ |
| content                            | String    | 拼音文本内容                          |
| all_read_num                              | String    | 拼音发音链接         |
| all_tone                            | JSONArray | 拼音                        |
| spell_num                  | JSONArray | 拼音拼读链接                              |
| spell_split            | JSONArray | 拼读方法                                  |



中文单字返回示例（有道词典，已不使用）

```json
{
    "content":"好",
    "type":"characters",
    "side":"女",
    "structures":"左右",
    "grade":"1",
    "details":[
        {
            "pronunce":{
                "symbol":"hǎo",
                "url":"http://dict.cn/mp3.php?q=efVw7 "
            },
            "spelling":[
                {
                    "section":[
                        1,
                        2
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "synonyms":[
                "美",
                "佳"
            ],
            "antonyms":[
                "糟",
                "坏",
                "差"
            ],
            "sample":[
                "她画画很好",
                "我们今天的生活很美好"
            ],
            "errorpronewords":[
            ],
            "definition":[
                {
                    "description":"身体强壮的，事事顺心的。",
                    "sample":[
                        "好身手",
                        "您好",
                        "安好",
                        "好身体"
                    ]
                },
                {
                    "description":"方便，便利。",
                    "sample":[
                        "好用",
                        "好办",
                        "好使",
                        "好弄",
                        "拿走东西好让我进去。"
                    ]
                },
                {
                    "description":"和谐，友爱，平和。",
                    "sample":[
                        "交好",
                        "友好",
                        "相好",
                        "和好",
                        "好朋友"
                    ]
                }
            ],
            "related":{
                    "idiom":[
                        "不好意思",
                        "好事多磨",
                        "花好月圆"
                    ],
                    “prefix":[
                        "好像",
                        "好好",
                        "好处",
                        "好多",
                        "好看",
                        "好些"
                    ],
                    "suffix":[
                        "不好",
                        "只好",
                        "良好"
                    ]
                }
        },
        {
            "pronunce":{
                "symbol":"hào",
                "url":"http://dict.cn/mp3.php?q=efVw7 "
            },
            "spelling":[
                {
                    "section":[
                        1,
                        2
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "synonyms":[
            ],
            "antonyms":[
            ],
            "sentences":[
            ],
            "errorpronewords":[
            ],
            "definition":[
                {
                    "description":"喜欢，和“讨厌”相反。",
                    "sample":[
                        "爱好",
                        "好奇",
                        "好动",
                        "好学",
                        "好高骛远"
                    ]
                },
                {
                    "description":"不时，频频发生。",
                    "sample":[
                        "菠萝不快点吃掉就好烂。"
                    ]
                }
            ],
            "related":[
                {
                    "idiom":[
                        "好吃懒做",
                        "好大喜功",
                        "好高骛远",
                        "好为人师"
                    ],
                    "Prefix":[
                        "好事",
                        "好奇",
                        "好奇心"
                    ],
                    "suffix":[
                        "爱好",
                        "嗜好",
                        "洁身自好"
                    ]
                }
            ]
        }
    ],
    "strokes":{
            "strokescount":"6",
            "gif": "https://staging-api.iflyos.cn/external/ocr/stroke_gif/5LqU",
            "strokesorder":[
                "PD",
                "P",
                "H",
                "HP",
                "WG",
                "H"
            ],
            "strokespath":[
                "M 330 202 Q 361 175 399 134 Q 415 119 424 118 Q 433 118 439 128 Q 446 138 442 170 Q 435 206 361 247 L 319 270 Q 292 286 258 304 Q 237 314 240 335 Q 261 393 281 453 L 293 492 Q 317 568 337 644 Q 347 690 366 715 Q 379 737 373 750 Q 360 769 313 797 Q 294 810 276 801 Q 263 794 273 778 Q 303 733 247 486 L 236 442 Q 218 373 195 336 Q 185 314 206 296 Q 254 268 294 233 L 330 202 Z",
                "M 294 233 Q 287 226 281 217 Q 250 180 196 143 Q 183 134 165 124 Q 149 114 133 104 Q 120 95 131 92 Q 212 86 327 199 Q 328 200 330 202 L 361 247 Q 406 322 421 385 Q 449 488 463 510 Q 473 526 458 537 Q 416 576 387 569 Q 374 565 378 550 Q 387 531 387 507 L 385 481 Q 384 469 382 455 Q 375 376 319 270 L 294 233 Z",
                "M 387 507 Q 341 501 293 492 L 247 486 Q 183 479 115 468 Q 94 465 61 471 Q 48 471 45 462 Q 41 450 49 441 Q 68 422 96 400 Q 106 396 118 402 Q 190 436 236 442 L 281 453 Q 320 463 362 474 Q 372 478 385 481 C 414 489 417 511 387 507 Z",
                "M 671 521 Q 788 635 822 648 Q 843 655 835 672 Q 831 688 760 725 Q 739 735 716 725 Q 661 703 575 676 Q 553 669 498 669 Q 473 669 482 648 Q 491 635 511 623 Q 544 605 578 627 Q 597 636 691 676 Q 706 682 719 673 Q 732 664 726 649 Q 693 595 655 531 C 640 505 649 500 671 521 Z",
                "M 717 430 Q 702 497 671 521 L 655 531 Q 648 535 640 538 Q 618 547 608 540 Q 595 533 608 519 Q 645 491 653 444 Q 656 434 659 421 L 668 384 Q 701 204 658 103 Q 643 76 607 83 Q 576 89 548 94 Q 536 97 542 85 Q 546 78 564 65 Q 604 31 618 5 Q 628 -14 645 -11 Q 660 -10 687 17 Q 775 107 726 391 L 717 430 Z",
                "M 726 391 Q 783 397 947 397 Q 966 398 971 406 Q 977 416 960 430 Q 909 467 848 454 Q 793 445 717 430 L 659 421 Q 562 409 452 393 Q 431 392 447 375 Q 460 362 478 357 Q 497 351 514 356 Q 586 375 668 384 L 726 391 Z"
            ],
            "storkes_medians":[
                [
                    [
                        282,
                        788
                    ],
                    [
                        307,
                        769
                    ],
                    [
                        327,
                        733
                    ],
                    [
                        264,
                        465
                    ],
                    [
                        216,
                        321
                    ],
                    [
                        235,
                        298
                    ],
                    [
                        386,
                        194
                    ],
                    [
                        411,
                        166
                    ],
                    [
                        424,
                        133
                    ]
                ],
                [
                    [
                        390,
                        556
                    ],
                    [
                        417,
                        530
                    ],
                    [
                        424,
                        516
                    ],
                    [
                        422,
                        504
                    ],
                    [
                        387,
                        361
                    ],
                    [
                        338,
                        255
                    ],
                    [
                        304,
                        207
                    ],
                    [
                        260,
                        165
                    ],
                    [
                        206,
                        127
                    ],
                    [
                        137,
                        97
                    ]
                ],
                [
                    [
                        59,
                        457
                    ],
                    [
                        107,
                        434
                    ],
                    [
                        373,
                        491
                    ],
                    [
                        380,
                        501
                    ]
                ],
                [
                    [
                        493,
                        656
                    ],
                    [
                        517,
                        646
                    ],
                    [
                        550,
                        644
                    ],
                    [
                        680,
                        692
                    ],
                    [
                        706,
                        699
                    ],
                    [
                        743,
                        696
                    ],
                    [
                        771,
                        669
                    ],
                    [
                        765,
                        657
                    ],
                    [
                        677,
                        546
                    ],
                    [
                        674,
                        535
                    ],
                    [
                        663,
                        536
                    ]
                ],
                [
                    [
                        613,
                        530
                    ],
                    [
                        637,
                        519
                    ],
                    [
                        659,
                        499
                    ],
                    [
                        674,
                        474
                    ],
                    [
                        687,
                        432
                    ],
                    [
                        711,
                        289
                    ],
                    [
                        709,
                        166
                    ],
                    [
                        692,
                        92
                    ],
                    [
                        672,
                        59
                    ],
                    [
                        648,
                        41
                    ],
                    [
                        551,
                        85
                    ]
                ],
                [
                    [
                        449,
                        384
                    ],
                    [
                        504,
                        377
                    ],
                    [
                        860,
                        427
                    ],
                    [
                        906,
                        426
                    ],
                    [
                        960,
                        412
                    ]
                ]
        }
    ]
}
```

| 参数                           | 类型      | 说明                                                         |
| :----------------------------- | :-------- | :----------------------------------------------------------- |
| content                        | String    | 汉字内容                                                     |
| type                           | String    | 汉字类型固定值为【characters】                               |
| side                           | String    | 偏旁                                                         |
| structures                     | String    | 结构                                                         |
| grade                          | String    | 年级                                                         |
| details                        | JSONArray | 汉字详细信息，若汉字有多个发音，且多个发音有不同含义，则此处details会有多个； |
| details_pronunce               | String    | 汉字读音信息                                                 |
| details_pronunce_symbol        | String    | 拼音                                                         |
| details_pronunce_url           | String    | 读音音频链接                                                 |
| details_spelling               | JSONArray | 汉字拼读信息                                                 |
| details_spelling_section       | JSONArray | 拼音分区，如[0,1]表示拼音的前两个字符                        |
| details_spelling_url           | String    | 分区后，各部分对应的发音url                                  |
| details_synonyms               | String    | 近义词                                                       |
| details_antonyms               | String    | 反义词                                                       |
| details_sample                 | String    | 例句                                                         |
| details_errorpronewords        | String    | 易错词                                                       |
| details_definition             | JSONArray | 汉字解释                                                     |
| details_definition_description | String    | 释义                                                         |
| details_definition_sample      | JSONArray | 示例                                                         |
| details_related                | JSONArray | 相关词                                                       |
| details_related_idiom          | JSONArray | 相关成语                                                     |
| details_related_Prefix         | JSONArray | 相关词语（词首）                                             |
| details_related_suffix         | JSONArray | 相关词语（词尾）                                             |
| strokes                        | JSONArray | 汉字笔画信息                                                 |
| strokes_gif                    | String    | 笔画gif图，供分辨率低屏幕展示（未上线）                      |
| strokes_strokescount           | String    | 笔画数                                                       |
| strokes_strokesorder           | JSONArray | 笔画名称                                                     |
| strokes_strokespath            | JSONArray | 每一笔画svg路径                                              |
| strokes_storkes_medians        | JSONArray | 笔画坐标列表，用于展示每一笔画的动画，参见：https://www.skishore.me/makemeahanzi/ |

中文词语返回示例（有道词典，已不使用）

```json
{
    "content":"美丽",
    "type":"word",
    "details":[
        {
            "pronunce":[
                {
                    "symbol":[
                        "měi",
                        "lì"
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "definition":[
                {
                    "description":"喜欢，和“讨厌”相反。",
                    "sample":[
                        "漂亮的住宅"
                    ]
                }
            ],
            "synonyms":[
                "秀丽",
                "奇丽"
            ],
            "antonyms":[
                "难看",
                "丑陋"
            ]
        }
    ]
}
```

| 参数                           | 类型      | 说明                     |
| :----------------------------- | :-------- | :----------------------- |
| content                        | String    | 词语内容                 |
| type                           | String    | 中文词语固定值为【word】 |
| details                        | JSONArray | 词语详情                 |
| details_pronunce               | JSONArray | 词语发音信息             |
| details_pronunce_symbol        | String    | 词语拼音                 |
| details_pronunce_url           | String    | 词语发音url              |
| details_definition             | JSONArray | 词语解释                 |
| details_definition_description | String    | 词语释义                 |
| details_definition_sample      | String    | 词语例句                 |
| details_synonyms               | String    | 近义词                   |
| details_antonyms               | String    | 反义词                   |

中文成语返回示例（有道词典，已不使用）

```json
{
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

| 参数                           | 类型      | 说明                  |
| :----------------------------- | :-------- | :-------------------- |
| content                        | String    | 成语内容              |
| type                           | String    | 成语固定值为【idiom】 |
| details                        | JSONArray | 成语详情              |
| details_pronunce               | JSONArray | 成语发音信息          |
| details_pronunce_symbol        | String    | 成语拼音              |
| details_pronunce_url           | String    | 成语发音url           |
| details_definition             | JSONArray | 成语解释              |
| details_definition_description | String    | 成语释义              |
| details_origin                 | String    | 成语来源              |
| details_synonyms               | String    | 近义词                |
| details_antonyms               | String    | 反义词                |
| details_story                  | String    | 成语故事              |
| details_poem                   | JSONArray | 成语相关诗歌          |

中文诗词返回示例（有道词典，已不使用）

```json
{
    "content": "静夜思",
    "details": [
        {
            "poem": [
                "床前明月光，疑是地上霜。",
                "举头望明月，低头思故乡。"
            ]
        }
    ],
    "type": "poem"
}
```


英文单词返回示例（有道词典，已不使用）

```json
{
    "content":"eat",
    "type":"en_word",
    "details":[
        {
            "pronunce":[
                {
                    "symbol":[
                        "iːt"
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "us_pronounce": [
                {
                    "symbol": "iːt",
                    "url": "https://api.iflyos.cn/external/ocr/audio/f02e00e49881ea3b912b99cf48498baa"
                }
            ],
            "spelling":[
                {
                    "section":[
                        1,
                        2
                    ],
                    "url":"http://dict.cn/mp3.php?q=efVw7 "
                }
            ],
            "definition":[
                {
                    "property":"v.",
                    "description":[
                        "吃；食",
                        "用餐"
                    ],
                    "tag":"动作动词"
                }
            ],
            "derivation":[
                {
                    "word":"eater",
                    "property":"n.",
                    "description":"食者"
                },
                {
                    "word":"eatable",
                    "property":"adj.",
                    "description":"可吃的"
                }
            ],
            "tenses":{
                "presentParticiple":"eating",
                "past":"ate",
                "pastParticiple":"eaten",
                "thirdPersonSingular":"eats"
            },
            "expressions":[
                {
                    "expression":"eat well",
                    "description":[
                        "健康首选；吃得营养；吃的好；胃口好"
                    ]
                },
                {
                    "expression":"eat well",
                    "description":[
                        "健康首选；吃得营养；吃的好；胃口好"
                    ]
                }
            ],
            "related":[
                {
                    "word":"drove",
                    "description":"驾驶、人群"
                },
                {
                    "word":"eater",
                    "description":"食者"
                }
            ],
            "picture":"http://oimagec5.ydstatic.com/image?id=8035347685817079127&amp;product=kid-dict "
        }
    ]
}
```

| 参数                               | 类型      | 说明                                  |
| :--------------------------------- | :-------- | :------------------------------------ |
| content                            | String    | 单词文本内容                          |
| type                               | String    | 英文单词类型固定为【en_word】         |
| details                            | JSONArray | 英文单词详情                          |
| details_pronunce                   | JSONArray | 发音信息                              |
| details_pronunce_symbol            | JSONArray | 音标                                  |
| details_pronunce_url               | String    | 单词发音url                           |
| details_us_pronunce                   | JSONArray | 美式发音信息                              |
| details_us_pronunce_symbol            | JSONArray | 美式音标                                  |
| details_us_pronunce_url               | String    | 单词美式发音url                           |
| details_spelling                   | JSONArray | 拼读信息                              |
| details_spelling_section           | String    | 音标分区，如[0,1]表示音标的前两个字符 |
| details_spelling_url               | String    | 分区后，各部分对应的发音url           |
| details_definition                 | JSONArray | 单词解释                              |
| details_definition_property        | String    | 词性                                  |
| details_definition_description     | String    | 释义                                  |
| details_definition_tag             | String    | 标签                                  |
| details_derivation                 | JSONArray | 派生词信息                            |
| details_derivation_word            | String    | 派生词内容                            |
| details_derivation_property        | String    | 派生词词性                            |
| details_derivation_description     | String    | 派生词释义                            |
| details_tenses                     | JSONArray | 时态                                  |
| details_tenses_presentParticiple   | String    | 现在分词                              |
| details_tenses_past                | String    | 过去时态                              |
| details_tenses_pastParticiple      | String    | 过去分词                              |
| details_tenses_thirdPersonSingular | String    | 第三人称单数                          |
| details_expressions                | JSONArray | 短语                                  |
| details_expressions_expression     | String    | 短语内容                              |
| details_expressions_description    | String    | 短语解释                              |
| details_related                    | JSONArray | 相关词汇                              |
| details_related_word               | String    | 相关词汇内容                          |
| details_related_description        | String    | 相关词汇描述                          |
| details_picture                    | String    | 单词主题图片                          |

## 语速设置

**endpoint**

https://api.iflyos.cn

**headers**

```http
Content-Type: application/json
Authorization: Bearer {token}
```

token为设备token

### 获取设备语速配置

```
GET /external/ocr/device/voice_config
```

#### 响应示例

```json
{
    "english": "middle",
    "mandarin": "slow"
}
```

####  响应字段

| 参数名   | 说明                           |
| -------- | ------------------------------ |
| english  | 英语语速配置(slow,middle,fast) |
| mandarin | 中文语速配置(slow,middle,fast) |

### 更新设备语速配置

```
POST /external/ocr/device/update_voice_config
```

####  请求参数

| 参数名   | 说明                   | 必填 | 示例    |
| -------- | ---------------------- | ---- | ------- |
| language | 语种(english,mandarin) | 是   | english |
| speed    | 语速(slow,middle,fast) | 是   | fast    |

####  响应示例

```json
Status: 200 OK

{
    "message": "更新成功"
}
```


## 口语练习


:::info
1. 该功能需要提前联系商务开通。
2. 该功能复用语音评测，点击查看接入协议：[语音评测](https://doc.iflyos.cn/device/upgrades/evaluate.html)，使用方法：
    1. 通过`口语练习题目请求接口`，获取口语练习题目。
    2. 按照口语试题text格式填写要求。
    3. 请求口语评测接口：`evaluate.category`取值`read_choice`。
    4. 参考口语练习示例返回，实现前端UI交互界面。
:::


## 英语作文批改

:::info

1. 该功能需要提前联系商务开通。
2. 注意：该功能为创新型能力，目前只能保证基础效果，面对引擎未覆盖场景时会存在一定的准确性问题；接入该能力时，必须参考聆思提供《扫描笔产品设计指南》中关于作文批改一节。

:::

**请求headers**

```
Authorization: Bearer {token}
Content-Type: application/json
```

token为设备token

### 接口地址

```
POST https://api.iflyos.cn/external/ocr_tool/correcting/correct
```

### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| text | String | 批改文本 | 是 |
| record_id | Integer | 要覆盖的记录id，会覆盖对应id的批改记录，不传时创建新的批改记录 | 否 |

### 返回示例

```json
{
    "category": "chapter_learn", //业务类型码
    "disDimResult": {   // 多维度统计结果
      "adva_word_num": 4,
      "ccNum": "3", // 篇章连接词个数
      "paraNum": "1", // 段落个数：段落数依赖于输入的段落标记，对于txt输入，段落固定为1；json输入根据输入的段落信息进行计数；
      "sentAveLen": "16.500000",// 篇章句子的平均长度
      "wordAveDiff": "0.000000",// 词汇平均难度（初高中及CET单词）
      "wordAveLen": "3.757576", //篇章单词平均长度
      "wordRichness": "0.676768" //词汇丰富度
    },
    "displayResultList": [  //篇章全部结果
      {
        "lineName": "0", //句子编号
        "lineResult": [], // 当前句子的批改结果
        "lineStr": "As we know, the Internet is a convenient tool to improve our knowledge and skills.", //句子内容
        "modify_sent": "",
        "paraType": "1", //是否为首句
        "startCharPos": "0"  // 当前句子起始字符，在整篇文章中的位置。注意是字符位置，该位置相比输入的原始文章可能有轻微偏移，建议采用滑动匹配方案
      },
      {
        "lineName": "1",
        "lineResult": [
          {
            "candidates": [],  // 纠错结果
            "comment": "[高级表达]be addicted to意为沉溺于...，属于高中高分短语，用得很棒！   Sometimes , we choose to be addicted to TV series or games to kill time.有些时候，我们选择电视连续剧或游戏来打发时间。",  // 当前批改结果的评语
            "cur_pos": -1,
            "know_id": "",
            "know_keys": "",
            "know_str": "",
            "level": "Good", // Error: 错误 Warn: 警示 Info: 一般信息 Good: 亮点表达，当前主要针对短语
            "muti_position": [
              {
                "endPos": "147",
                "startPos": "132"
              }
            ],
            "obj3_content": "",
            "position": [
              {
                "endPos": "147",
                "startPos": "132"
              }
            ],
            "prob": 1,  //当前批改的置信度（往往是默认为1）
            "raterCategory": "",
            "rule_id": "-1",
            "str": "be addicted to",  //当前批改命中的关键词，如果需要高亮批改命中字段，需要关注该字段
            "token_word": "",
            "type": "高级表达"  // 批改结果类型，以负面结果为主。正面结果有：高级表达、短语学习2类；负面结果42类，主要有：书写不规范、中式英语、主谓一致错误、名词单复数错误等；如果内容为乱填内容，没有该值
          }
        ],
        "lineStr": "However, our life will be greatly affected if we are addicted to it.",
        "modify_sent": "",
        "paraType": "0",
        "startCharPos": "83"
      },
      {
        "lineName": "2",
        "lineResult": [
          {
            "candidates": [],
            "comment": "[高级表达]短语go from bad to worse意为：每况愈下，属于高中水平短语",
            "cur_pos": -1,
            "know_id": "",
            "know_keys": "",
            "know_str": "",
            "level": "Good",
            "muti_position": [
              {
                "endPos": "235",
                "startPos": "212"
              }
            ],
            "obj3_content": "",
            "position": [
              {
                "endPos": "235",
                "startPos": "212"
              }
            ],
            "prob": 1,
            "raterCategory": "",
            "rule_id": "-1",
            "str": "go from bad to worse",
            "token_word": "",
            "type": "高级表达"
          }
        ],
        "lineStr": "For example your grades may go down and your health will be going from bad to worse.",
        "modify_sent": "For example , your grades may go down and your health will be going from bad to worse .",
        "paraType": "0",
        "startCharPos": "152"
      },
      {
        "lineName": "3",
        "lineResult": [],
        "lineStr": "To make things worse, it can also damage the relationship with your family.",
        "modify_sent": "",
        "paraType": "0",
        "startCharPos": "237"
      },
      {
        "lineName": "4",
        "lineResult": [
          {
            "candidates": [],
            "comment": "[高级表达]短语get rid of意为：摆脱；除掉；除去，属于高中水平短语",
            "cur_pos": -1,
            "know_id": "",
            "know_keys": "",
            "know_str": "",
            "level": "Good",
            "muti_position": [
              {
                "endPos": "359",
                "startPos": "349"
              }
            ],
            "obj3_content": "",
            "position": [
              {
                "endPos": "359",
                "startPos": "349"
              }
            ],
            "prob": 1,
            "raterCategory": "",
            "rule_id": "-1",
            "str": "get rid of",
            "token_word": "",
            "type": "高级表达"
          }
        ],
        "lineStr": "So I think it is high time that you got rid of the bad habit.",
        "modify_sent": "",
        "paraType": "0",
        "startCharPos": "313"
      },
      {
        "lineName": "5",
        "lineResult": [],
        "lineStr": "It is a good idea for you to read some meaningful books and do some physical exercise.",
        "modify_sent": "",
        "paraType": "0",
        "startCharPos": "375"
      }
    ],
    "engine_version": "3.5.0.1046",  //引擎版本号
    "personalizedComments": "文章内容丰富;连词however等使用的较好;使用部分高级词汇(如：relationship,be addicted to,get rid of)等;下次写作希望能够加强多种句式结构的学习;", // 个性化总评
    "remarkResultList": [
      {
        "comments": "能够使用一些长难词,词汇丰富,词语讲究,颇显功底", // 分维度评语
        "type": "wordFea", // 维度类型；wordFea –词汇, sentFea –句子, paperFea –篇章, contentFea –内容
        "value": 12.104226666666667 // 满分15分，一般高于10分才应该是正常作文水平，低于10分评语准确率较低。
      },
      {
        "comments": "句子长短错落有致,句式复杂多变,状语从句用的不错",
        "type": "sentFea",
        "value": 12.91665
      },
      {
        "comments": "全篇连接紧凑,没有什么语法错误",
        "type": "paperFea",
        "value": 12.083335
      },
      {
        "comments": "基本符合题意",
        "type": "contentFea",
        "value": 12
      }
    ], 
    "rule_version": "",  //引擎使用的规则版本号
    "typeResultList": [  // 整篇文章结果类型统计，以负面结果为主。正面结果有：高级表达、短语学习2类；负面结果42类，主要有：书写不规范、中式英语、主谓一致错误、名词单复数错误等；
      {
        "comment": "高级表达3个", 
        "level": "Good",
        "num": 3,
        "type": "高级表达"
      }
    ]
  }
```

:::info
1. 当前引擎没有对请求结果的正确与否进行判断，请在设备端完成不正确请求结果的拦截（如非英文作文的中文内容、电话号码等）。
- 请求批改的内容英文单词若低于10个，不允许请求作文批改服务。
- 请求批改的内容英文单词若高于1000个，不允许请求作文批改服务。
- 去除掉请求批改的内容中的非英文、英文符号标点、阿拉伯数后，再请求作文批改服务。
2. 字段取值注意：由于作文批改引擎返回结果非常多，计算方式也十分复杂，设备端无需将引擎返回结果全部返回，只需要显示关键内容即可：
- 个性化总评 `personalizedComment` 
- 篇章句子有效的评分结果 `displayResultList.lineResult`中的批改结果的评语`comment`，批改命中关键词`str`、批改类型`type。
3. `remarkResultList.value`的值低于10分已不再可信。
:::



### 获取当前设备批改记录

#### 接口地址

```
GET https://api.iflyos.cn/external/ocr_tool/correcting/correct_records
```

#### 请求headers

```
Authorization: Bearer {token}
```

#### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| page | String | 页数，默认1 | 否 |
| size | String | 每页记录数，默认10 | 否 |

#### 返回示例

```json
{
    "total": 1,
    "correct_records": [
        {
            "content": "测试课文批改22222",
            "id": 3,
            "inserted_at": "2021-11-30T07:31:50Z",
            "result": {
                "category": "chapter_learn",
                "disDimResult": {
                    "adva_word_num": 0,
                    "ccNum": "0",
                    "paraNum": "1",
                    "sentAveLen": "1.000000",
                    "wordAveDiff": "0.000000",
                    "wordAveLen": "5.000000",
                    "wordRichness": "1.000000"
                },
                "displayResultList": [
                    {
                        "lineName": "0",
                        "lineResult": [],
                        "lineStr": "22222",
                        "modify_sent": "",
                        "paraType": "1",
                        "startCharPos": "9"
                    }
                ],
                "engine_version": "3.5.0.1041",
                "personalizedComments": "本文词汇量较少;词汇量稍显不足;下次写作希望能够丰富词汇量;加强多种句式结构的学习;增加对高级词汇的运用;",
                "remarkResultList": [
                    {
                        "comments": "用词水平较高,词汇丰富,缺少高级词汇",
                        "type": "wordFea",
                        "value": 8.333333333333334
                    },
                    {
                        "comments": "句子比较单调,句式较简单",
                        "type": "sentFea",
                        "value": 1.25
                    },
                    {
                        "comments": "全篇脉络不够清晰,没有什么语法错误",
                        "type": "paperFea",
                        "value": 7.5
                    },
                    {
                        "comments": "基本符合题意",
                        "type": "contentFea",
                        "value": 5
                    }
                ],
                "rule_version": ""
            }
        }
    ]
}
```

| 参数      | 类型   | 说明               |
| :-------- | :----- | :----------------- |
| content   | String | 批改原文           |
| inserted_at | String | 批改记录时间       |
| result      | String | 批改结果 |


## 学习园地

**请求headers**

```
Authorization: Bearer {token}
Content-Type: application/json
```

### 拼音学习

:::info
1. 先调用拼音列表接口，获取拼音列表。
2. 用拼音列表中具体某个拼音调用拼音内容接口，获取详细发音。
:::

#### 拼音列表

##### 接口地址

```
GET https://api.iflyos.cn/external/ocr_tool/learning_garden/pinyins
```

##### 返回示例

```json
{
    "list": [  
        "a",
        "b",
        "c",
        ……
        "z"
    ],
    "value": {
        "ɑ": [
            "ɑ",
            "ɑi",
            "ɑn",
            "ɑng",
            "ɑo"
        ],
        ……
        "z": [
            "zɑ",
            "zɑi",
            "zɑn",
            ……
        ]
    }
}
```

#### 拼音详情

##### 接口地址

```
POST https://api.iflyos.cn/external/ocr_tool/learning_garden/pinyin/detail
```

##### 请求headers

```
Authorization: Bearer {token}
```

##### 请求body

```json
{
    "word": "an"  
}
```

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| word | String | 拼音 | 是 |

##### 返回示例

```json
[
    {
        "all_read_url": "https://cdn.iflyos.cn/public/ocr_resources/jxw/pinyins/421c26880cad27a45d206b966b190f0b/all_read.mp3",
        "all_tone": "É n",
        "hash": "421c26880cad27a45d206b966b190f0b",
        "spell_split": "É n-É n",
        "spell_url": "https://cdn.iflyos.cn/public/ocr_resources/jxw/pinyins/421c26880cad27a45d206b966b190f0b/spell.mp3",
        "word": "ɑn"
    },
    {
        "all_read_url": "https://cdn.iflyos.cn/public/ocr_resources/jxw/pinyins/3695310332635673779a74f03ad123b3/all_read.mp3",
        "all_tone": "Ä n",
        "hash": "3695310332635673779a74f03ad123b3",
        "spell_split": "Ä n-Ä n",
        "spell_url": "https://cdn.iflyos.cn/public/ocr_resources/jxw/pinyins/3695310332635673779a74f03ad123b3/spell.mp3",
        "word": "ān"
    },
    {
        "all_read_url": "https://cdn.iflyos.cn/public/ocr_resources/jxw/pinyins/c11bcde4644aa78d2b782693c4933dcb/all_read.mp3",
        "all_tone": "Ã¡n",
        "hash": "c11bcde4644aa78d2b782693c4933dcb",
        "spell_split": "Ã¡n-Ã¡n",
        "spell_url": "https://cdn.iflyos.cn/public/ocr_resources/jxw/pinyins/c11bcde4644aa78d2b782693c4933dcb/spell.mp3",
        "word": "án"
    },
    {
        "all_read_url": "https://cdn.iflyos.cn/public/ocr_resources/jxw/pinyins/cb157782fbd8e3f17bd222845e1bd8e6/all_read.mp3",
        "all_tone": "Ç n",
        "hash": "cb157782fbd8e3f17bd222845e1bd8e6",
        "spell_split": "Ç n-Ç n",
        "spell_url": "https://cdn.iflyos.cn/public/ocr_resources/jxw/pinyins/cb157782fbd8e3f17bd222845e1bd8e6/spell.mp3",
        "word": "ǎn"
    },
    {
        "all_read_url": "https://cdn.iflyos.cn/public/ocr_resources/jxw/pinyins/4a9176351386d104b71150fb18407e6a/all_read.mp3",
        "all_tone": "Ã n",
        "hash": "4a9176351386d104b71150fb18407e6a",
        "spell_split": "Ã n-Ã n",
        "spell_url": "https://cdn.iflyos.cn/public/ocr_resources/jxw/pinyins/4a9176351386d104b71150fb18407e6a/spell.mp3",
        "word": "àn"
    }
]
```

| 参数      | 类型   | 说明               |
| :-------- | :----- | :----------------- |
| all_read_url   | String | 整读地址           |
| all_tone   | String | 整音           |
| spell_url | String | 拼读地址       |
| spell_split | String | 拼读拆分       |
| hash      | String | 拼音hash |


### 科目学习

:::info
1. 先调用内容目录接口。
2. 根据目录中的内容ID调用内容详情接口，获取内容详情。
:::

#### 内容目录

接口地址：

```
GET https://api.iflyos.cn/external/ocr_tool/learning_garden/menu?type=MiddleSchoolListeningTraining
```

请求headers：

```
Authorization: Bearer {token}
```

请求参数：

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| type | String | 类型：MiddleSchoolListeningTraining（中学听力训练）;PrimarySchoolEnglishReading（小学英语阅读）；MiddleSchoolEnglishReading（中学英语阅读）；PrimarySchoolAncientPoetry（小学古诗词）；MiddleSchoolAncientPoetry（中学古诗词）；PrimarySchoolEnglishGrammar（小学英语语法）；MiddleSchoolEnglishGrammar（中学英语语法）；ArithmeticFormula（算术口诀） | 是 |

返回示例：

```json
[{
    "list": [
        {
            "list": [
                {
                    "list": [
                        {
                            "list": [
                                {
                                    "func": "同步显示",
                                    "list": [
                                        {
                                            "id": "A0001",
                                            "name": ""
                                        }
                                    ],
                                    "name": "第一组"
                                },
                                {
                                    "func": "同步显示",
                                    "list": [
                                        {
                                            "id": "A0002",
                                            "name": ""
                                        }
                                    ],
                                    "name": "第二组"
                                }
                            ],
                            "name": ""
                        }
                    ],
                    "name": "跳转"
                }
            ],
            "name": "寒暄"
        }
    ],
    "name": "听力训练"
}]
```

| 参数      | 类型   | 说明               |
| :-------- | :----- | :----------------- |
| name | String | 名称 |
| list | Object | - |
| list.name | String | 大组别名称 |
| list.list | Object | 大组别内容 |
| list.list.name | String | - |
| list.list.list | Object | - |
| list.list.list.name | Object | - |
| list.list.list.list | Object | - |
| list.list.list.list.func | String | 描述 |
| list.list.list.list.name | String | 组别 |
| list.list.list.list.list | Object | - |
| list.list.list.list.list.name | Object | 名称 |
| list.list.list.list.list.id | String | 通过该id调用内容详情接口，获取详细的内容数据 |


#### 内容详情

##### 接口地址

```
GET https://api.iflyos.cn/external/ocr_tool/learning_garden/menu_content?type=MiddleSchoolListeningTraining&id=A0001,A0002
```

##### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| type | String | 类型：MiddleSchoolListeningTraining（中学听力训练）;PrimarySchoolEnglishReading（小学英语阅读）；MiddleSchoolEnglishReading（中学英语阅读）；PrimarySchoolAncientPoetry（小学古诗词）；MiddleSchoolAncientPoetry（中学古诗词）；PrimarySchoolEnglishGrammar（小学英语语法）；MiddleSchoolEnglishGrammar（中学英语语法）；ArithmeticFormula（算术口诀） | 是 |
| id | String | 内容id列表，可用,分隔 | 是 |

##### 返回示例


```json
//中学听力训练
[
    {
        "content": "Hello, Mrs. Williams. How are you?\n你好，威廉姆斯夫人，你好吗?\nFine, thanks.\n很好，谢谢。\nGood afternoon, Mr. Collins.\n下午好，科林斯先生。\nGood afternoon, Alice.\n下午好，艾丽斯。\nHi, I'm Tom Black.\n嗨，我是汤姆·布莱克。\nHi, Tom. How do you do?\n嗨，汤姆。你好！\nAre you Alice Williams?\n你是艾丽斯·威廉姆斯吗?\nYes, I am.\n是的，我是。\nHow are you this afternoon, Mrs. Williams?\n你今天下午怎么样，威廉姆斯太太？\nGreat, thank you. And you？\n很好，谢谢。你呢？\nAre you Jane Black?\n你是简·布莱克吗？\nNo, I am not. I'm Jane Bill.\n不，我不是。我是简·比尔。\nHow is Mr. Collins this morning?\n科林斯先生今天早上好吗？\nHe is very well, thank you.\n他很好，谢谢。\nHow are you doing, Jane?\n你怎么样，简？\nNot bad, thanks. And you?\n还不错，谢谢。你呢？\nHow are you this evening, Mary?\n今晚你过得好吗，玛丽？\nFine, thank you, Mr. Collins. How are you?\n很好，谢谢你，科林斯先生。你怎么样？\nGoodbye, Tom.\n再见，汤姆。\nBye, Jane. See you tomorrow.\n再见，简，明天见。\nGood evening, Eddy.\n晚上好，艾迪。\nGood evening, Mrs. Collins. How are you?\n晚上好，科林斯太太。你好吗？\nGood night, Mike.\n晚安，迈克。\nGood night, Jane. See you tomorrow morning.\n晚安，简，明早见。\nSee you tomorrow, Tom.\n明天见，汤姆。\nSee you, Alice.\n明天见，艾丽斯。\nGood morning, Lucy. How is you brother?\n早上好，露西。你弟弟好吗？\nHe is very well, thank you.\n他很好，谢谢你。\nGood night, Lucy. See you tomorrow morning.\n晚安，露西。明早见。\nSee you, Eddy.\n再见，艾迪。",
        "func": "同步显示",
        "id": "A0001",
        "info": "w01v001.mp3",
        "title": "",
        "url": "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E4%B8%AD%E5%AD%A6%E7%95%8C%E9%9D%A2/%E8%8B%B1%E8%AF%AD/%E4%B8%AD%E5%AD%A6%E5%90%AC%E5%8A%9B%E8%AE%AD%E7%BB%83/TLXL000001/mp3/w01v001.mp3?sign=3065432ACA2E24EF25EA21A77FBCFD79&time=1650037844"
    }
]
//小学英语阅读
[
    {
        "content": "Come here and look at these pictures. This is a picture of a man, Mr Brown, and a boy, Richard. Mr Brown is the father of Richard Brown. And Richard Brown is the son of Mr Brown. That is a picture of a woman, Mrs Brwon, and a girl, Mary Brown. Mrs Brown is the wife of Mr Brown and the mother of Mary Brown. Mary Brown is Richard's sister. \n   【参考译文】\n    过来看看这些照片。这张照片上有一个男人——布朗先生和一个男孩——理查德。布朗先生是理查德·布朗的父亲。理查德·布朗是布朗先生的儿子。那张照片上有一个女人——布朗夫人和一个女孩——玛丽·布朗。布朗夫人是布朗先生的妻子，是玛丽·布朗的母亲。玛丽·布朗是理查德的姐姐。",
        "func": "同步显示",
        "id": "A0001",
        "info": "020.mp3",
        "title": "",
        "url": "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%B0%8F%E5%AD%A6%E7%95%8C%E9%9D%A2/%E8%8B%B1%E8%AF%AD/%E5%B0%8F%E5%AD%A6%E8%8B%B1%E8%AF%AD%E9%98%85%E8%AF%BB/YYYD000001/mp3/020.mp3?sign=65595EEE4434D86EE127A9AA7FD218F4&time=1650037897"
    }
]
//小学古诗词
[
    {
        "content": {
            "auth": "骆宾王",
            "cont": [
                "鹅，鹅，鹅，",
                "曲项向天歌。",
                "白毛浮绿水，",
                "红掌拨清波。"
            ],
            "dynasty": "唐",
            "title": "咏鹅"
        },
        "func": "同步显示",
        "id": "A0001",
        "info": "咏鹅_【唐】骆宾王.mp3",
        "title": "原文",
        "url": "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%B0%8F%E5%AD%A6%E7%95%8C%E9%9D%A2/%E8%AF%AD%E6%96%87/%E5%B0%8F%E5%AD%A6%E5%8F%A4%E8%AF%97%E8%AF%8D/GHXXGSC112/mp3/%E5%92%8F%E9%B9%85_%E3%80%90%E5%94%90%E3%80%91%E9%AA%86%E5%AE%BE%E7%8E%8B.mp3?sign=7CB441863E64F59E70B62E00AD8D9ECD&time=1650037936"
    },
    {
        "content": "【项】：脖子。\n【掌】：诗中指鹅的脚掌。\n【拨】：划动，拨开。",
        "func": "同步显示",
        "id": "A0002",
        "info": "",
        "title": "注释",
        "url": ""
    },
    {
        "content": "在水中嬉戏的白鹅，弯曲着脖子对天高歌。\n一身雪白的羽毛浮在绿水之上，用红色的脚掌拨动着清澈的水波。",
        "func": "同步显示",
        "id": "A0004",
        "info": "",
        "title": "译文",
        "url": ""
    },
    {
        "content": "骆宾王，唐代著名诗人，他擅长七言歌行和五言律诗，与王勃、杨炯、卢照邻一起，被人们称为“初唐四杰”。",
        "func": "同步显示",
        "id": "A0003",
        "info": "",
        "title": "诗人",
        "url": ""
    }
]
//小学英语语法
[
    {
        "content": "(1)经常性或习惯性的动作，常与表示频率度的时间状语连用。\n时间状语： every…, sometimes, at…, on Sunday\nI leave home for school at 7 every morning.\n(2)客观真理，客观存在，科学事实。\nThe earth moves around the sun.\nShanghai lies in the east of China.\n(3)表示格言或警句中。\nPride goes before a fall. 骄者必败。\n注意：此用法如果出现在宾语从句中，即使主句是过去时，从句谓语也要用一般现在时。\n例：Columbus proved that the earth is round.\n(4)现在时刻的状态、能力、性格、个性。\nI don't want so much.\nAnn Wang writes good English but does not speak well.",
        "func": "同步显示",
        "id": "A0001",
        "info": "",
        "title": "",
        "url": ""
    },
    {
        "content": "\\(\textcolor{红色}{例题：}\\)We speak English ______.  \nA.every days      \nB.everyday    \nC.every day\n\\(\textcolor{红色}{解析：}\\)这里的时态是一般现在时，表示经常性的动作，常与时间状语连用。A表述错误。B是形容词，通常作定语。C是副词，通常作状语。\n\\(\textcolor{红色}{答案：}\\)C\n\n\\(\textcolor{红色}{例题：}\\)My grandma ____ skiing every winter.  \nA.go      \nB.goes    \nC.went\n\\(\textcolor{红色}{解析：}\\)“every winter 每年冬天”为现在的时间状语，通常要与一般现在时连用；又因为“my grandma”是第三人称单数主语，根据主谓一致原则，其谓语动词要用第三人称单数形式；综合所得，答案选B。\n\\(\textcolor{红色}{答案：}\\)B",
        "func": "同步显示",
        "id": "A0002",
        "info": "",
        "title": "",
        "url": ""
    },
    {
        "bigqlist": [
            {
                "name": "<font color=\"#FF0000\">请选正确的答案。</font>",
                "smallqlist": [
                    {
                        "answer": "B",
                        "options": [
                            "A.snow",
                            "B.snows",
                            "C.snowing"
                        ],
                        "parse": "解析：句意：冬天下雪。表示客观真理，应用一般现在时态，故动词用snows。选B。",
                        "qtype": "选择测试",
                        "title": "1.It ______ in winter."
                    }
                ]
            },
            {
                "name": "<font color=\"#FF0000\">请选正确的答案。</font>",
                "smallqlist": [
                    {
                        "answer": "A",
                        "options": [
                            "A.go",
                            "B.goes",
                            "C.going"
                        ],
                        "parse": "解析：表示经常或反复的动作用一般现在时态，由于主语We是第一人称复数形式，故动词应用go。故选A。",
                        "qtype": "选择测试",
                        "title": "2.We often ______ to Shanghai."
                    }
                ]
            },
            {
                "name": "<font color=\"#FF0000\">请选正确的答案。</font>",
                "smallqlist": [
                    {
                        "answer": "B",
                        "options": [
                            "A.Does",
                            "B.Do",
                            "C.Are"
                        ],
                        "parse": "解析：由答语可知问句是一个一般现在时的一般疑问句，意思是：你认识这个男孩吗？故助动词应该用Do的一般现在时形式。选B。",
                        "qtype": "选择测试",
                        "title": "3.—______ you know the boy?}\n—Yes,I do."
                    }
                ]
            },
            {
                "name": "<font color=\"#FF0000\">请选正确的答案。</font>",
                "smallqlist": [
                    {
                        "answer": "C",
                        "options": [
                            "A.Does you do your homework everyday?",
                            "B.Do I do my homework everyday?",
                            "C.Do you do your homework everyday?"
                        ],
                        "parse": "解析：在一般现在时的肯定句中，如果实意动词作谓语，变为一般疑问句时要借助助动词Do/Does提问。主语I/We需替换成you，再把句号变成问号。选C。",
                        "qtype": "选择测试",
                        "title": "4.“I do my homework everyday.”的一般疑问句形式是？"
                    }
                ]
            },
            {
                "name": "<font color=\"#FF0000\">请选正确的答案。</font>",
                "smallqlist": [
                    {
                        "answer": "C",
                        "options": [
                            "A.work",
                            "B.working",
                            "C.works"
                        ],
                        "parse": "解析：“工作”是经常性发生的动作，故要用一般现在时来表示。He是第三人称单数主语，故用works。选C。",
                        "qtype": "选择测试",
                        "title": "5.He ______ eight hours a day."
                    }
                ]
            }
        ],
        "func": "考试系统",
        "id": "A0003",
        "title": "即学即练"
    }
]
//中学英语语法
    {
        "content": "名词是表示人、地方、事物或抽象概念的名称的词。可以说名词是万物之名称。它们可以是：\n    人的名字：Joe(乔)，Liu Ylng(刘英)             地方名称：China(中国)，Paris(巴黎)\n    职业称呼：teacher(教师)，driver(司机)         物品名称：pen(钢笔)，dictionary(词典)\n    行为名称：study(学习，研究)，act(行为，动作)  抽象概念：history(历史)，grammar(语法)",
        "func": "同步显示",
        "id": "A0003",
        "info": "",
        "title": "",
        "url": ""
    },
    {
        "content": "总的来说，英语中名词可以分为普通名词和专有名词两大类。按其所表示的事物的性质。名词又可分为可数名词和不可数名词两类。具体分类如下：\n<img src='jpg/24501.jpg' />\n\\(\textcolor{红色}{【巧学妙记】：}\\)\n      不可数名词歌诀\n金、木、水、火、土；肉、面、茶、布。\n\\(\textcolor{红色}{说明：}\\)\n金(gold)、木(wood)、水(water)、火(fire)、土(soil)；肉(meat)、面(flour)、茶(tea)、布(cloth)。\n1.专有名词\n表示具体的人、事物、地点或机构的专有名称。\n如：the Great Wall(长城)，Tom(汤姆)，America(美国)，the People's Republic of China(中华人民共和国)\n\\(\textcolor{红色}{注意：}\\)\n许多专有名词实际上是由普通名词组成的，但组成专有名词后，这些普通名词的第一个字母必须大写。\n2.普通名词\n表示某一类人或事物的名称。普通名词可分为以下四种类型：\n(1)个体名词：表示个体的人或事物的名词。\napple(苹果)，ship(轮船)，river(江河)，book(书)，table(桌子)等。\n(2)集体名词；表示一群人或一些事物的名词。\nfamily(家庭／家庭成员)，class(班级／班级同学)，people(人/人民)，team(队／队员)等。\n(3)物质名词：表示无法分为个体实物的名词。\nink(墨水)，tea(茶)，fire(火)，water(水)，rain(雨)，air(空气)，bread(面包)等。\n(4)抽象名词：表示抽象概念的名词，如表示动作、状态、品质或其他抽象概念的名词。\nhappiness(幸福)，friendship(友谊)，health(健康)等。\n\\(\textcolor{红色}{注意：}\\)\n名词分为可数名词和不可数名词并非绝对。如物质名词在表示不同种类／类别的该物质时也可用作可数名词，可以有复数形式。\nThere are two kinds of breads in the shop.那个商店里有两种面包。\nThese are frozen foods.这些是冷冻食品。",
        "func": "同步显示",
        "id": "A0004",
        "info": "",
        "title": "",
        "url": ""
    }    
//算数口诀
[
    {
        "bigqlist": [
            {
                "name": "",
                "smallqlist": [
                    {
                        "answers": [
                            "2"
                        ],
                        "parse": "",
                        "qtype": "填空测试",
                        "title": "1+1",
                        "titleMp3": "ji0.mp3",
                        "url": "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%B0%8F%E5%AD%A6%E7%95%8C%E9%9D%A2/%E6%95%B0%E5%AD%A6/%E7%AE%97%E6%9C%AF%E5%8F%A3%E8%AF%80/GHSSKJ0001/mp3/ji0.mp3?sign=EF7A97175351A464B37F316BCD3C2335&time=1650038151"
                    },
                    {
                        "answers": [
                            "3"
                        ],
                        "parse": "",
                        "qtype": "填空测试",
                        "title": "1+2",
                        "titleMp3": "ji9.mp3",
                        "url": "http://ksyundata.zhinengtongbu.com/%E5%9B%BA%E5%8C%96%E6%95%B0%E6%8D%AE/%E5%B0%8F%E5%AD%A6%E7%95%8C%E9%9D%A2/%E6%95%B0%E5%AD%A6/%E7%AE%97%E6%9C%AF%E5%8F%A3%E8%AF%80/GHSSKJ0001/mp3/ji9.mp3?sign=AF59D03C93FAF37DF5347FC7DCCBF85B&time=1650038151"
                    },
                
            }
    }
]
```

| 参数      | 说明   | 类型           |
| :-------- | :----- | :----------------- |
| func | 描述 | String |
| id | id | Number |
| title | 标题 | Object |
| content | 内容 | String |
| url | 资源地址 | String |
| info | 资源信息 | String |
| name | 固定文案 | String |
| smallqlist | 题目内容 | String |
| smallqlist.answer |  正确答案 |  String |
| smallqlist.options | 选项列表|  String |
| smallqlist.parse | 答案解析 |  String |
| smallqlist.qtype | 题目类型，当前只有选择测试题 |  String |
| smallqlist.title | 题目|  String |

## K12音频资源

### 一级资源分类列表

##### 接口地址

```
GET https://api.iflyos.cn/external/ocr_tool/learning_garden/media/category
```

##### 返回示例

```json
[
    {
        "category": "story",
        "name": "精选故事"
    },
    {
        "category": "nursery_rhyme",
        "name": "快乐儿歌"
    },
    {
        "category": "enlightenment",
        "name": "儿童启蒙"
    }
]
```

| 参数      | 说明   | 类型           |
| :-------- | :----- | :----------------- |
| category | 分类-story: 精选故事；nursery_rhyme: 快乐儿歌；enlightenment: 儿童启蒙 | String |
| name | 标题 | Object |


### 二级资源分类列表

#### 接口地址

```
GET https://api.iflyos.cn/external/ocr_tool/learning_garden/media/section?category=nursery_rhyme&page=1&size=10
```

##### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| id | Number | 类-story: 精选故事；nursery_rhyme: 快乐儿歌；enlightenment: 儿童启蒙 | 是 |
| type | String | 类型，默认为音频数据（MP3格式），可选填为video（视频数据，MP4格式） | 否 |
| page | Integer | 页码 | 否 |
| size | Integer | 每页条数（默认一页10条） | 否 |

##### 返回示例

```json
{
    "items": [
        {
            "category": "nursery_rhyme",
            "cover": "http://xxxxx.jpg",
            "hash": "xxxxxxx",
            "name": "说英文",
            "type": "media"
        }
    ],
    "total": 44
}
```

| 参数      | 类型   | 说明               |
| :-------- | :----- | :----------------- |
| total | 总数 | Integer |
| items.cover | 封面 | String |
| items.hash | hash | String |
| items.name | 标题 | String |

### 音频内容详情

##### 接口地址

```
GET https://api.iflyos.cn/external/ocr_tool/learning_garden/media/items?hash=xxxx&page=1&size=10
```

##### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| hash | String | 内容hash | 是 |
| page | Integer | 页码 | 否 |
| size | Integer | 每页条数（默认一页10条） | 否 |


##### 返回示例

```json
{
    "items": [
        {
            "cover": "https://xxxxxx",
            "hash": "MTUxNA==",
            "key": "xxxxx",
            "subtitle": "",
            "title": "xxxx",
            "url": "http://xxxxxx"
        },
    "total": 100
}
```


| 参数      | 类型   | 说明               |
| :-------- | :----- | :----------------- |
| total | 总数 | Integer |
| items.hash | hash | String |
| items.cover | 封面 | String |
| items.key | key | String |
| items.subtitle | 副标题 | String |
| items.title | 标题 | String |
| items.url | 播放链接 | String |

## 加入/删除生词本/摘抄

**请求headers**

```
Authorization: Bearer {token}
Content-Type: application/json
```

token为设备token

### 新增收藏

#### 接口地址

```
POST https://api.iflyos.cn/external/ocr_tool/notebook/create
```

#### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| notebook | array | 批量创建列表 | 是 |
| notebook.type | string | 内容类型：word(生词本)、text(文本摘抄) | 是 |
| notebook.language_type | string | 语言类型：中文(chinese)、英文(english)、韩文(korean)、日文(japanese)、俄文(russian) | 是 |
| notebook.content | string | 文本内容 | 是 |

#### 请求示例

```json
{
    "notebook": [
        {
            "type": "word",
            "language_type": "english",
            "content": "testA"
        },
        {
            "type": "word",
            "language_type": "english",
            "content": "testB"
        },
        {
            "type": "text",
            "language_type": "english",
            "content": "test x test"
        }
    ]
}
```

#### 返回示例

```json
{
    "message": "创建成功"
}
```

### 获取生词本列表

#### 接口地址

```
POST https://api.iflyos.cn/external/ocr_tool/notebook/get_list
```

#### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| type | string | 内容类型word(生词本)、text(文本摘抄) | 是 |
| page | integer | 页数，默认1 | 否 |
| size | integer | 每页记录数，默认10 | 否 |

#### 返回示例

```json
{
    "notebook": [
        {
            "content": "testB",
            "id": 13,
            "language_type": "chinese",
            "type": "text"
        }
    ],
    "page": 1,
    "size": 10,
    "total": 1
}
```

#### 返回字段

| 参数     | 类型   | 说明   |
| :------- | :----- | :----- |
| notebook | array | 生词本列表 |
| notebook.id | integer | 收藏内容id |
| notebook.type | string | 内容类型 |
| notebook.language_type | string | 语言类型 |
| notebook.content | string | 内容 |
| page | integer | 当前分页参数页码 |
| size | integer | 当前分页参数每页数量 |
| total | integer | 总记录数 |

### 删除生词本记录

#### 接口地址

```
POST https://api.iflyos.cn/external/ocr_tool/notebook/delete
```

#### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| ids | array | id列表 | 是 |

#### 请求示例

```json
{
    "ids": [1,2,3]
}
```

#### 返回示例

```json
{
    "message": "删除成功"
}
```

## 学情数据

:::info
学情数据中的获取记录接口，只供第三方云端接口调用，不支持设备端调用。
:::

**调用地址**

```http
https://api.iflyos.cn
```

**请求headers**

```
Accpet: application/json
Content-Type: application/json
X-Timestamp: 1545402610
X-Nonce: 3e50b5c09287df5ac90721f1256ca3e7
X-Sign: e2817c8e25a10afd749c1afd1b039ef3
```

**校验签名**

所有请求headers必须带上签名参数，签名通过字符串拼接X-Timestampe + X-Nonce + 请求body + client_secret再计算md5**(小写)**
client_secret与client_id对应，在设备管理平台查询

* X-Timestamp: 发起请求的时间戳，单位: 秒
* X-Nonce: 32位随机字符串
* X-Sign: md5(X-Timestamp + X-Nonce + body + client_secret)

### 获取扫描记录

#### 接口地址

```
POST https://api.iflyos.cn/external/ocr_process/cloud/get_records
```

#### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| client_id | String | 设备client_id | 是 |
| device_id | String | 设备device_id | 是 |
| page | Integer | 页码，默认为1 | 否 |
| size | Integer | 每页数量，默认为10，最大为100 | 否 |

#### 响应说明

```json
{
    "data": [
        {
            "client_id": "ceb62135-38a7-42c3-b721-842f3ed596a8",
            "device_id": "EVSInspector::DEFAULT_2",
            "inserted_at": "2022-04-12T07:32:45Z",
            "language": "cn",
            "request_id": "13f91c629762030d0417274abe2eced6",
            "text": "永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。此地有崇山峻岭，茂林修竹；又有清流激湍，映带左右，引以为流觞曲水，列坐其次。虽无丝竹管弦之盛，一觞一咏，亦足以畅叙幽情。",
            "translation": "In the ninth year of Yonghe, at the age of Guichou, at the beginning of late spring, he met at the Orchid Pavilion of Kuaiji Shanyin, and repaired the matter. Qunxian Bi Zhi, Shaochang Xianji. Here there are lofty mountains, luxuriant forests and bamboo, and there is a clear stream, which reflects the left and right sides of the belt, leading to the winding water of the flowing cup, which ranks second. Although there is no prosperity of string, bamboo and orchestral strings, one cup and one chant are enough to express feelings freely."
        }
    ],
    "total": 1
}
```


### 获取语音翻译记录

#### 接口地址

```
POST https://api.iflyos.cn/external/ocr_process/cloud/get_translation
```

#### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| client_id | String | 设备client_id | 是 |
| device_id | String | 设备device_id | 是 |
| page | Integer | 页码，默认为1 | 否 |
| size | Integer | 每页数量，默认为10，最大为100 | 否 |

#### 响应说明

```json
{
    "data": [
        {
            "client_id": "ceb62135-38a7-42c3-b721-842f3ed596a8",
            "device_id": "EVSInspector::DEFAULT_2",
            "inserted_at": "2022-04-12T07:33:47Z",
            "language": "cn",
            "text": "播放一首歌",
            "translation": "Play a song."
        }
    ],
    "total": 1
}
```


### 获取口语评测记录

#### 接口地址

```
POST https://api.iflyos.cn/external/ocr_process/cloud/get_evaluate
```

#### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| client_id | String | 设备client_id | 是 |
| device_id | String | 设备device_id | 是 |
| page | Integer | 页码，默认为1 | 否 |
| size | Integer | 每页数量，默认为10，最大为100 | 否 |

#### 响应说明

```json
{
    "data": [
        {
            "audio_url": "https://cdn.iflyos.cn/public/evaluate_result_audio/xxxx.wav",
            "client_id": "c1",
            "data": {
                "accuracy_score": 0.0,
                "content": "fish",
                "language": "en",
                "phone_score": 0,
                "tone_score": 0,
                "total_score": 0.0,
                "type": "read_word",
                "words": [
                    {
                        "syll_score": 0.0,
                        "total_score": 0.0,
                        "word": "fish"
                    }
                ]
            },
            "device_id": "d1",
            "id": 1,
            "inserted_at": "2022-04-08T08:22:16Z"
        }
    ],
    "total": 1
}
```

### 获取生词本/摘抄记录

#### 接口地址

```
POST https://api.iflyos.cn/external/ocr_process/cloud/get_notebook
```

#### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| client_id | String | 设备client_id | 是 |
| device_id | String | 设备device_id | 是 |
| notebook.type | string | 内容类型：word(生词本)、text(文本摘抄)，默认返回全部 | 否 |
| page | Integer | 页码，默认为1 | 否 |
| size | Integer | 每页数量，默认为10，最大为100 | 否 |

#### 响应说明

```json
{
    "data": [
        {
            "content": "testB",
            "id": 13,
            "language_type": "chinese",
            "type": "text"
        }
    ],
    "total": 1
}
```

#### 返回字段

| 参数     | 类型   | 说明   |
| :------- | :----- | :----- |
| data | array | 生词本列表 |
| data.id | integer | 收藏内容id |
| data.type | string | 内容类型 |
| data.language_type | string | 语言类型 |
| data.content | string | 内容 |
| total | integer | 总记录数 |


### 获取作文批改记录

#### 接口地址

```
POST https://api.iflyos.cn/external/ocr_process/cloud/get_correcting
```

#### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| client_id | String | 设备client_id | 是 |
| device_id | String | 设备device_id | 是 |
| page | Integer | 页码，默认为1 | 否 |
| size | Integer | 每页数量，默认为10，最大为100 | 否 |

#### 响应说明

```json
{
    "data": [
        {
            "content": "test correct",
            "id": 1,
            "inserted_at": "2022-04-12T11:33:41Z",
            "result": {
                "category": "chapter_learn",
                "disDimResult": {
                    "adva_word_num": 0,
                    "ccNum": "0",
                    "paraNum": "1",
                    "sentAveLen": "2.000000",
                    "wordAveDiff": "1.000000",
                    "wordAveLen": "5.500000",
                    "wordRichness": "1.000000"
                },
                "displayResultList": [
                    {
                        "lineName": "0",
                        "lineResult": [
                            {
                                "candidates": [],
                                "comment": "[词性错误]请检查test correct，表达不规范，建议修改词性或表达。",
                                "cur_pos": 0,
                                "know_id": "",
                                "know_keys": "",
                                "know_str": "",
                                "level": "Error",
                                "muti_position": [
                                    {
                                        "endPos": "12",
                                        "startPos": "0"
                                    }
                                ],
                                "obj3_content": "表达不规范，建议修改词性或表达。",
                                "position": [
                                    {
                                        "endPos": "12",
                                        "startPos": "0"
                                    }
                                ],
                                "prob": 1,
                                "raterCategory": "",
                                "rule_id": "Speech256",
                                "str": "test correct",
                                "token_word": "test",
                                "type": "词性错误"
                            },
                            {
                                "candidates": [],
                                "comment": "[名词单复数错误]请检查test，可数名词单数不单独使用。建议使用复数或加冠词。",
                                "cur_pos": 0,
                                "know_id": "knwcnt1",
                                "know_keys": "test",
                                "know_str": "名词-普通名词-可数名词-可数名词的单复数",
                                "level": "Error",
                                "muti_position": [
                                    {
                                        "endPos": "4",
                                        "startPos": "0"
                                    }
                                ],
                                "obj3_content": "可数名词单数不单独使用。建议使用复数或加冠词。",
                                "position": [
                                    {
                                        "endPos": "4",
                                        "startPos": "0"
                                    }
                                ],
                                "prob": 1,
                                "raterCategory": "",
                                "rule_id": "Nn13",
                                "str": "test",
                                "token_word": "test",
                                "type": "名词单复数错误"
                            }
                        ],
                        "lineStr": "test correct",
                        "modify_sent": "",
                        "paraType": "1",
                        "startCharPos": "0"
                    }
                ],
                "engine_version": "3.5.0.1046",
                "personalizedComments": "本文词汇量较少;词汇量稍显不足;文中有严重语法错误(如:test)的使用错误,影响对文章要表达的意思的理解;下次写作希望能够丰富词汇量;加强多种句式结构的学习;增加对高级词汇的运用;注意语法的正确使用;",
                "remarkResultList": [
                    {
                        "comments": "用词水平较高,词汇丰富,缺少高级词汇",
                        "type": "wordFea",
                        "value": 8.8889
                    },
                    {
                        "comments": "句子比较单调,句式较简单",
                        "type": "sentFea",
                        "value": 1.25
                    },
                    {
                        "comments": "全篇脉络不够清晰,语法错误较多",
                        "type": "paperFea",
                        "value": 0
                    },
                    {
                        "comments": "基本符合题意",
                        "type": "contentFea",
                        "value": 3
                    }
                ],
                "rule_version": "",
                "typeResultList": [
                    {
                        "comment": "词性错误1个",
                        "level": "Error",
                        "num": 1,
                        "type": "词性错误"
                    },
                    {
                        "comment": "名词单复数错误1个",
                        "level": "Error",
                        "num": 1,
                        "type": "名词单复数错误"
                    }
                ]
            }
        }
    ],
    "total": 1
}
```

## 离线使用记录上传

:::info
该接口用于同步离线情况下使用扫描笔产生的学习数据到云端。
:::

### 离线ocr记录上传

#### 接口地址

```
POST https://api.iflyos.cn/external/ocr_process/cloud/upload_records
```

#### 请求参数

| 参数     | 类型   | 说明   | 必填 |
| :------- | :----- | :----- | :--- |
| records | String | 设备client_id | 是 |
| records.text | String | ocr结果 | 是 |
| records.language | String | ocr语种 | 是 |
| records.translation | String | ocr翻译结果 | 否 |
| records.to_language | String | ocr翻译语种 | 否 |

#### 请求示例

```json
{
    "records": [
        {
            "language": "cn",
            "to_language": "en",
            "text": "testsetset",
            "translation": "xjsjdflasdj"
        }
    ]
}
```
