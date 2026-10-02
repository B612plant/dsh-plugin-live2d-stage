/** Optional localized labels supplied by the presentation plugin. */
export type PlayerTranslator = (message: string, values?: readonly unknown[]) => string;
const english: Record<string,string> = {
 '拖拽移动画面 · 滚轮缩放':'Drag to move · Scroll to zoom',
 'Live2D 角色舞台':'Live2D character stage',
 '请在动画资源中为当前角色选择模型':'Select a model for this character',
 '角色加载中...':'Loading character…', '等待初始化':'Waiting to initialize',
 '正在加载 Live2D 角色...':'Loading Live2D character…',
 'Live2D 初始化失败，请确认浏览器支持 WebGL2':'Live2D initialization failed; WebGL2 is required',
 '{0} 已就绪':'{0} is ready', '已卸载':'Unloaded', '正在切换至 {0}...':'Switching to {0}…',
};
export const defaultPlayerTranslator: PlayerTranslator = (message, values=[]) => (english[message] ?? message).replace(/\{(\d+)\}/g, (match,index) => Number(index)<values.length ? String(values[Number(index)]) : match);
