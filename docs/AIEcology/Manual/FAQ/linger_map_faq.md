---
sidebar_label: 导图常见问题  
sidebar_position: 3  
---

# Linger导图问题

## linger导图错乱及其解决方法
linger 导出的 onnx 图中 dequant 错乱 或者 图中节点有断裂，可参照下面过程操作

### 调试选项
torch.onnx.export提供以下选项供调试：
-   is_update_dequant = True      # 设为False，关闭添加dequant节点（&删除identity结点）的过程  
-   is_scoped_info    = True      # 设为False，关闭添加和删除节点scope name信息的过程  
-   debug_dump        = False     # 设为True，保存中间各步的onnx结果，仅供调试使用, （建议使用此选项时不要对以上两个选项做修改）


```python
dummy_input = torch.ones(1,3,224,224)  #模拟输入
with torch.no_grad():
        linger.onnx.export_debug(net, dummy_input,"export_debug.onnx",export_params=True,opset_version=12,operator_export_type=torch.onnx.OperatorExportTypes.ONNX_ATEN_FALLBACK,is_update_dequant = False,is_scoped_info=False,debug_dump=False)
```

## 旧版linger导图错误
当使用旧版linger导出的onnx图中仅有 dequant添加错乱情况 ，可参照下面过程修复

- conda create 新环境 安装最新版linger (方法仅供参考，保证有一个最新版的linger版本即可)
- linger.fix_dequant(ori_onnx, False)   ##原始出错的onnx模型名称 | 是否检测修复后onnxinfer能否运行(设True时需已安装onnxinfer)
- 最后将修复好的onnx保存为 后缀多了_fix.onnx

```python
##                    原始出错的onnx模型名称      | 是否检测修复后onnxinfer能否运行
linger.fix_dequant("dbpagec2_wrong.onnx",            False)
```