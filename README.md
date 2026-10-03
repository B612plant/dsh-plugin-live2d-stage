# DSHLive2D

<img src="assets/icon.webp" alt="DSHLive2D" width="128" />

让 Live2D 角色陪你使用 DeepSeek Harness：支持桌面悬浮、动作预览，以及 Agent 根据对话选择动作。

作者：小红书号 **4190947207** · GitHub：[B612plant](https://github.com/B612plant)

## 安装

1. 在 DeepSeek Harness 的插件管理中添加 npm 插件：`dsh-plugin-live2d-stage`。
2. 安装后重启 Harness。
3. 打开 **设置 → DSHLive2D**，启用「Harness 内使用」。

内置 Hiyori（桃濑日和）及 8 个动作，首次使用无需导入模型。

这是社区插件。Harness 内使用支持 Harness Web；桌面悬浮支持 **Windows x64**，需要系统已安装 WebView2 Runtime。已适配 Harness Desktop 0.2.0-rc.2。

## 使用

- **切换角色**：在设置中选择角色，动作列表随之切换。
- **导入模型**：上传包含 `.moc3` 和纹理的 ZIP，每个 ZIP 一个角色；建议保留原始 `.model3.json`。
- **动作控制**：开启后，Agent 可以根据对话选择动作，会增加 token 消耗。导入的动作需先试播、准确命名并确认。
- **调整位置**：直接拖拽角色移动画布；双击进入调整，拖动人物改变位置、滚轮缩放人物、拖动画布边缘调整大小；按 **Esc 保存并退出**。

人物右侧按钮从上到下：

| 按钮 | 用途 |
| --- | --- |
| 文本 | 打开对话，使用当前 Harness 的工作区和会话 |
| 动作 | 预览当前角色的动作 |
| 拖拽 | 移动画布 |
| 重置 | 恢复默认大小和右下角位置 |
| 移出／移入 | 在 Harness 内显示与桌面悬浮之间切换 |
| 关闭 | 关闭人物、桌面悬浮和 Agent 动作控制 |

关闭后可在设置中重新启用。桌面对话需要 Harness 保持运行，权限确认仍在主窗口处理。

## 数据与许可

角色和配置默认保存在 `%USERPROFILE%\.dsh\live2d-stage`；设置 `DSH_HOME` 后使用其下的 `live2d-stage` 目录。升级插件不会覆盖已导入的模型。

内置 Hiyori 来自 Live2D 示例模型。模型、Cubism SDK 和其他第三方组件仍受各自许可约束，详见 [licenses](licenses)。

## 开发

本仓库可独立构建：

```sh
npm ci
npm run build
npm test
```

已包含编译好的 Windows 悬浮程序。修改 C# 后，按 `native/dependency.json` 获取并校验 SDK，再执行：

```powershell
powershell -NoProfile -File native/build.ps1 -SdkDirectory <SDK目录>
```
