
# 常见问题

## 跟踪云台方案

### 云台调试驱动安装

1.用Google Chrome打开tools/csk_view_finder/src/index.html

![image-20220321154928531](./files/sit02.png)

2.在Google Chrome中打开使用必读：

![image-20220321155039427](./files/sit03.png)

3.选译下载并安装

![image-20220321155133696](./files/sit04.png)


4.安装后在电脑设备管理中确认如下设备:

![image-20220321155213355](./files/sit05.png)

### 如何对电机速度作微调

1.根据真正的硬件情况修改`task_tracker.c` 中`move_time`值代码：

```
static void
motor_move_smooth(int16_t offset)
{
	// 偏移到屏幕边线/3时以最大速度轿
	// 最大速度䶿个时间单仿1ms)走一櫿
	uint16_t max_dist = POS_C * 1 / 2;
	uint32_t move_time = 200; // 一次最多走200ms
	int32_t move_steps = (abs(offset) - (STA_WIDTH / 2)) * move_time / max_dist;
	move_steps *= offset / abs(offset);

	last_move_distance += (move_steps - last_move_distance) * 2 / 3;
	last_move_duration = move_time;

	motor_start(last_move_distance, last_move_duration);

	motor_running = true;
}
```



### 如何抓取图像log

1.用Google Chrome打开tools/csk_view_finder/src/index.html

![image-20220322193250437](./files/sit09.png)



2.选取设备，然后连接：

![image-20220322193822856](files\sit10.png)

3.在出现在界面中点开始记录

![image-20220322193947134](files\sit11.png)

4.然后再停止记录：

![image-20220322194114367](files\sit12png)



5.把相关记录提交至工单

生成的csk_cv_XXXXXXXXX.zip文件给到FAE





