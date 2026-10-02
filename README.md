# DSHLive2D

![DSHLive2D](assets/icon.webp)

作者：小红书号 4190947207｜GitHub：[B612plant](https://github.com/B612plant)

## 通过官方 Harness 安装

在 Harness 插件管理中选择从 npm 安装，输入 `dsh-plugin-live2d-stage`。命令行方式：

```sh
npx @deepseek-ai/dsh plugin --profile web add dsh-plugin-live2d-stage
```

桌面版使用插件管理界面，安装后重启，再打开「设置 → DSHLive2D」。此插件是社区插件，通过官方 Harness 的 npm 安装机制加载；不代表 DeepSeek 官方出品或背书。

发布包内含构建产物、默认角色、图标和第三方许可，无需拉取本项目或运行构建。应用内预览支持 Harness Web；独立桌面悬浮目前支持 Windows x64，依赖系统已有 WebView2 Runtime。

适配 DeepSeek Harness Desktop 0.2.0-rc.2。插件提供应用内预览和独立透明置顶窗口，提供可拖动、隐藏和缩放的 Live2D 演出画布。

## 默认模型

内置 Hiyori（桃濑日和），资源位于插件 `character/hiyori`，来自 Live2D Hiyori 示例模型，保留原有模型文件和第三方许可。首次启动自动初始化角色和 8 个动作，无需上传或下载。后续保留用户已选择的角色及动作改名。

## 使用

启用插件并重启 DeepSeek 后，打开「设置 → DSHLive2D」，点击「导入角色 ZIP」。ZIP 从根目录递归查找唯一的 `.moc3`，优先读取匹配的 `.model3.json`，校验其纹理、动作、表情和物理文件。每个 ZIP 对应一个角色；多模型压缩包请先拆分。角色列表切换会联动预览和动作列表。

没有 model3.json 时，插件会生成配置，按路径顺序枚举 PNG 纹理、motion3.json、exp3.json 和唯一 physics3.json。moc3 不是完整资源包，必须提供纹理；多纹理模型建议保留原始 model3.json，确保纹理槽位顺序正确。文件路径须位于模型目录内，不支持父目录引用、加密 ZIP、链接或路径重复。限制：压缩包 128 MiB、解压 512 MiB、5000 项、单项 128 MiB。

设置页可控制预览显隐、选择角色、搜索动作和试播。点击「试播」会关闭设置并展示演出。修改角色或动作名称后移开输入焦点即可保存。动作稳定 ID 不随名称改变。角色数据保存在 `%DSH_HOME%/live2d-stage`，默认 `%USERPROFILE%/.dsh/live2d-stage`，独立于安装目录，升级插件不会覆盖模型。

## Agent 能力

- `live2d_list_actions`：当前角色和动作列表。
- `live2d_play_action(characterId, actionId)`：选择一个动作；预览须已加载。
- `live2d_action_status(eventId)`：读取播放回执；queued 仅表示排队，played 表示播放器接受播放，非完整动画播放结束。

在「设置 → DSHLive2D」开启「动作控制（将消耗更多 token）」后，插件才注册三个工具并追加选择说明，允许每轮回复前选择至多一个符合对话内容的动作；关闭会立即移除工具和说明。默认关闭。Hiyori 的 8 个动作已按动画参数与实际播放核对命名；上传模型请先试播，再改名或点击「确认名称」，未确认的动作不提供给 Agent。实际是否遵循取决于 Agent；插件不修改宿主推理循环、不额外发起模型请求，也不在失败时强制重试。应用内预览和独立悬浮窗口均未就绪时不能播放；再次打开时不重播过期动作。多窗口同时打开会各自演出。

## 构建、安装与验证

源码位于本仓库 `src`，Live2D SDK 与播放器位于 `vendor/live2d`。运行 `npm ci`、`npm run build` 和 `npm test`。`test/host-smoke.mjs` 使用目标 Electron Node 模式检查目标版工具契约，`test/browser-smoke.mjs <model.zip>` 使用隔离数据目录验证实际 WebGL 演出。

`install.mjs <target-directory>` 将经过构建的发布文件部署到目标的 `plugins/dsh-plugin-live2d-stage` 并注册当前用户桌面 profile；它保留原配置备份，不修改 app.asar。安装后重启 DeepSeek Harness 生效。卸载可在宿主插件管理界面禁用插件，角色目录保留。

运行依赖：已有 Live2D Core、Framework 与 ZIP 库 unzipper 及其传递依赖的打包代码；React、Cordis、DSH 工具由宿主提供。没有新增 npm 安装依赖。ZIP 库用于跨平台、带体量限制的内存读取；替代方案是平台命令解压或手写 ZIP 解析，前者依赖系统环境，后者增加格式兼容维护。esbuild、Playwright 只用于开发，不部署。发布字节数、文件数与 SHA-256 见源项目 `build/reports/live2d-plugin/install.json`；无需模型下载，用户上传模型不计入插件载荷。所有 SDK 和第三方许可保留在 licenses。

## 桌面悬浮（Windows x64）

「设置 → DSHLive2D → 桌面悬浮」默认关闭，开启后在 DeepSeek Harness 之外显示独立透明、无边框、置顶窗口，文字使用实色和描边。默认仅显示角色，没有标题、提示或状态文字。直接拖拽角色移动整个画布；双击进入调整：拖动人物改变偏移、滚轮缩放人物，拖动画布四边及四角改变窗口大小；不显示设置面板或滑条。按 Escape 或再次双击退出调整。右侧叉号关闭显示。模型缩放/偏移按角色保存，原生窗口位置保存于用户数据目录。开关持久保存，角色切换会同步。悬浮开启时隐藏应用内浮层，宿主退出时窗口退出。它仍使用宿主本地服务，不能脱离宿主进程单独运行。

新增运行组件为 .NET Framework WPF 小型窗口、Microsoft WebView2 SDK 1.0.3537.50 的 Core/Wpf/Loader 与许可（准确字节和 SHA-256 见 `native/dependency.json`），复用 Windows 已安装的 WebView2 Runtime，不下载浏览器。独立网页捆绑已有 React/ReactDOM；宿主界面仍共享宿主 React。必要性：目标宿主没有对插件开放独立窗口桥接，WPF CompositionControl 支持透明置顶；替代方案修改 app.asar 会侵入宿主，另带 Electron 会大幅增加体量。编译器使用系统 .NET Framework csc，仅开发时需要；完整 NuGet SDK ZIP/解压缓存不发布。

先从 `native/dependency.json` 中的固定微软 NuGet 地址取得 SDK（校验 packageSha256），解压到开发缓存，再执行 `powershell -NoProfile -File native/build.ps1 -SdkDirectory <SDK目录>`。脚本校验所有使用文件的哈希。`test/native-smoke.mjs` 验证真实透明置顶窗口、模型播放、权限范围和退出；`test/profile-smoke.mjs ... --settings-ui` 验证真实宿主设置开关。



## 缩放清晰度

人物缩放直接改变 Live2D 的实际渲染区域尺寸，画布按显示尺寸乘屏幕 devicePixelRatio 重建像素缓冲，不再通过 CSS scale 拉伸低分辨率画面。跨 DPI 屏幕变化会触发重绘。已验证 30%–300% 人物缩放与 100%/150%/200% DPI 共 18 个组合。最高可见细节仍受模型原始纹理分辨率限制。

应用内浮层使用完整视口尺寸的透明合成层，只有角色画布接受鼠标操作。设置页显示加载状态；恢复功能已移至人物右侧的「重置」按钮。

## 人物右侧控制栏

依次为 Lucide 图标：type、face-slightly-smiling-plus、move、reload（上游 rotate-cw）、square-arrow-right-exit/enter、x。悬浮切换在应用内显示 exit，点击移出 Harness；桌面显示 enter，点击移入 Harness。切换保持 Agent 动作开关。文本在应用内点击时打开独立桌面悬浮对话窗口，在桌面窗口内点击可展开/收起对话；工作区和会话均来自当前 Harness 的 workspaceRegistry 与 sessionController；可按工作区筛选已有会话，只有明确选中工作区才能新建对话。不会读取 Nirei 数据库，也不会用进程工作目录作为新会话目录。支持发送文本与读取回复。沿用 DeepSeek Harness 原有模型、上下文和权限检查，不另建模型客户端；若 Agent 需要权限确认，仍在主窗口处理。对话回复按已完成消息刷新，支持 Ctrl+Enter 发送。每次打开重新读取当前宿主列表，不沿用跨 profile 的旧会话选择。

动作打开当前角色动作预览列表，不要求开启 Agent 动作控制。十字按钮始终拖动整个画布。重置恢复默认人物大小、居中偏移及画布右下角位置。关闭同时关闭人物显示、桌面悬浮和 Agent 动作控制，不删除模型或终止已有对话。可从设置重新启用人物显示。

桌面窗口的短期认证仅开放 Live2D 资源、预览、关闭及聊天专用接口；没有宿主全局凭据。新增七个 Lucide 静态 SVG（含 ISC 许可，来源为 lucide-static 官方发布包），仅用于工具栏；不安装完整图标库，不新增 npm 运行或开发依赖。字节和文件增量记录在 build/reports/live2d-plugin/interaction-update.json。

## 独立开发
```sh
npm ci
npm run build
npm test
```

`vendor/live2d` 保留渲染所需的 Live2D 引擎、Cubism 源码和许可，`character` 保留默认模型。内置已编译的 Windows 悬浮程序；仅修改 C# 时需要依照 `native/dependency.json` 获取并校验开发 SDK 后执行 `native/build.ps1`。

开发依赖固定版本并由 package-lock.json 锁定：esbuild 用于打包；Playwright 用于浏览器回归；React、ReactDOM、unzipper 用于生成现有运行代码。它们不是新增运行时安装依赖，npm 发布包不含 node_modules、vendor 源码、测试、SDK 缓存或构建报告。相比链接原项目，独立保留这些源码可复现构建。准确载荷字节和文件清单由 `npm pack --json` 产生。
