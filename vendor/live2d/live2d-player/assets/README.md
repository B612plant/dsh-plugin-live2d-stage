# 对话气泡资源

- `dialogue-bubble.png`：用户提供的透明 PNG，原样复制（1774 × 887）。
- `dialogue-bubble-departing.png`：内置 image_gen 编辑结果，仅用于 `BubbleArtwork` 中下边框小范围修补。其返回背景不透明，切勿直接展示该文件。SVG 保留原始透明作品、去掉尾巴区域，并把编辑裁剪到实心修补边框，从而保留猫、丝带及其他原有装饰。

最终编辑提示（内置工具，无 CLI）：

> Use case: precise-object-edit. This image is a UI speech bubble asset, the exact supplied image is the edit target. Make ONLY ONE CHANGE: remove the pointed speech tail protruding downwards near the lower-left (below the small star, between about 20% and 30% of the image width), and reconstruct the rounded bubble's normal smooth almost horizontal lower border and its dashed inner blue line continuously across that small area. The final bubble must have NO speech pointer or tail anywhere. Preserve all the other existing pixels/design as closely as possible: blue-white watercolor gradient pill body, cat peeking top-left, exclamation decorations, small bottom-left star, right blue bow/ribbon, orbit and sparkle decorations, two pawprints. Preserve original 2:1 canvas aspect ratio and exact framing, position and size. Keep the blank interior, no text, no new objects. Background must remain genuinely transparent alpha, including the region where the speech tail was removed. Do not redraw or redesign the cat, bow, borders, colors or layout. This will cross-switch with the original image during a fade animation, so matching alignment and scale is critical.
