/** 角色动作显示名映射：key = `${group}:${index}`，value = 展示名（前后台共用） */
export type MotionAliasMap = Record<string, string>;

export interface MotionActionItem {
  /** 稳定 ID，与前后台协议一致：`${group}:${index}` */
  id: string;
  group: string;
  index: number;
  /** 展示名（可编辑）；智能体可用此名触发 */
  label: string;
  /** 未自定义时的默认展示名 */
  defaultLabel: string;
  fileName: string;
  /** 模型内技术组名（不可改，用于实际播放） */
  technicalKey: string;
}

export interface MotionCommand {
  /** 可为技术组名、展示名，或 `group:index` */
  group: string;
  index: number;
}

export interface ResolvedMotion {
  group: string;
  index: number;
  id: string;
  label: string;
}

function fileBaseName(file: string): string {
  const fileName = file.split('/').pop() ?? file;
  return fileName.replace(/\.motion3\.json$/i, '').replace(/\.exp3\.json$/i, '').replace(/\.exp3$/i, '');
}

/** 默认展示名：优先文件可读名，否则组名 */
export function defaultMotionLabel(group: string, file: string, index: number, groupSize: number): string {
  const base = fileBaseName(file);
  // 去掉常见前缀如 GB-
  const cleaned = base.replace(/^GB[-_]?/i, '').trim() || base;
  if (groupSize > 1) {
    return `${cleaned}（${group} #${index}）`;
  }
  // 组名本身已是中文（如 Tap脸）时，用文件名更友好
  if (/[\u4e00-\u9fff]/.test(cleaned)) {
    return cleaned;
  }
  return groupSize > 1 ? `${group} · ${cleaned}` : `${group}`;
}

export function motionActionId(group: string, index: number): string {
  return `${group}:${index}`;
}

/** 从角色 motionGroups + 别名表生成动作列表 */
export function buildMotionActionList(
  motionGroups: Record<string, string[]> | undefined | null,
  aliases: MotionAliasMap = {},
): MotionActionItem[] {
  if (!motionGroups) {
    return [];
  }

  const items: MotionActionItem[] = [];
  for (const [group, files] of Object.entries(motionGroups)) {
    files.forEach((file, index) => {
      const id = motionActionId(group, index);
      const fileName = file.split('/').pop() ?? file;
      const defaultLabel = defaultMotionLabel(group, file, index, files.length);
      const label = (aliases[id]?.trim() || defaultLabel);
      items.push({
        id,
        group,
        index,
        label,
        defaultLabel,
        fileName,
        technicalKey: group,
      });
    });
  }
  return items;
}

/**
 * 从智能体回复中解析动作参数，并剥离指令文本。
 * 支持：
 * - [[motion:展示名]] / [[motion:Group:0]] / [[motion:Group]]
 * - JSON：{"motion":"打招呼"} / {"name":"大笑","index":0} / {"group":"Tap脸","no":0}
 */
export function extractMotionCommands(raw: string): {
  text: string;
  commands: MotionCommand[];
} {
  const commands: MotionCommand[] = [];
  let text = raw;

  text = text.replace(
    /\[\[\s*motion\s*:\s*([^\]\n]+?)\s*\]\]/gi,
    (_match, body: string) => {
      const parts = body.split(':').map((p) => p.trim()).filter(Boolean);
      if (parts.length === 0) {
        return '';
      }
      // [[motion:Group:0]] vs [[motion:展示名含冒号?]] — 末段为纯数字则视为 index
      if (parts.length >= 2 && /^\d+$/.test(parts[parts.length - 1]!)) {
        const index = Number.parseInt(parts[parts.length - 1]!, 10) || 0;
        const group = parts.slice(0, -1).join(':');
        commands.push({ group, index });
      } else {
        commands.push({ group: parts.join(':'), index: 0 });
      }
      return '';
    },
  );

  text = text.replace(
    /(?:^|\n)\s*(\{(?:[^{}]|"[^"]*")*\})\s*$/m,
    (match, jsonPart: string) => {
      try {
        const parsed = JSON.parse(jsonPart) as Record<string, unknown>;
        const group =
          (typeof parsed.motion === 'string' && parsed.motion) ||
          (typeof parsed.name === 'string' && parsed.name) ||
          (typeof parsed.group === 'string' && parsed.group) ||
          (typeof parsed.action === 'string' && parsed.action) ||
          null;
        if (!group) {
          return match;
        }
        const indexRaw = parsed.index ?? parsed.no ?? parsed.motionIndex ?? 0;
        const index =
          typeof indexRaw === 'number'
            ? indexRaw
            : Number.parseInt(String(indexRaw), 10) || 0;
        commands.push({ group, index });
        return '';
      } catch {
        return match;
      }
    },
  );

  text = text.replace(/\n{3,}/g, '\n\n').trim();
  return { text, commands };
}

/** 按技术组名模糊匹配 */
export function resolveMotionGroup(
  requested: string,
  motionGroups: Record<string, string[]>,
): string | null {
  const keys = Object.keys(motionGroups);
  if (keys.includes(requested)) {
    return requested;
  }

  const lower = requested.toLowerCase();
  const exactIgnoreCase = keys.find((key) => key.toLowerCase() === lower);
  if (exactIgnoreCase) {
    return exactIgnoreCase;
  }

  const includes = keys.find(
    (key) => key.includes(requested) || requested.includes(key),
  );
  return includes ?? null;
}

function toResolved(action: MotionActionItem): ResolvedMotion {
  return {
    group: action.group,
    index: action.index,
    id: action.id,
    label: action.label,
  };
}

/**
 * 将智能体/UI 传入的名称解析为真实动作。
 * 匹配优先级：id(group:index) → 展示名 → 技术组名(+index) → 模糊文件/展示名
 */
export function resolveMotionRef(
  requested: string,
  index: number,
  motionGroups: Record<string, string[]>,
  actions: MotionActionItem[],
): ResolvedMotion | null {
  const trimmed = requested.trim();
  if (!trimmed) {
    return null;
  }

  // 1) 完整 id：Idle:0 / 表情:2
  const byId = actions.find((a) => a.id === trimmed);
  if (byId) {
    return toResolved(byId);
  }

  // 2) 展示名（前后台一致）
  const byLabel = actions.find((a) => a.label === trimmed || a.defaultLabel === trimmed);
  if (byLabel) {
    return toResolved(byLabel);
  }

  const byLabelIgnoreCase = actions.find(
    (a) =>
      a.label.toLowerCase() === trimmed.toLowerCase() ||
      a.defaultLabel.toLowerCase() === trimmed.toLowerCase(),
  );
  if (byLabelIgnoreCase) {
    return toResolved(byLabelIgnoreCase);
  }

  // 3) 技术组名 + index。必须在模糊匹配之前，否则「表情」会命中组内第一项。
  const exactGroup = Object.keys(motionGroups).find(
    (key) => key === trimmed || key.toLowerCase() === trimmed.toLowerCase(),
  );
  if (exactGroup) {
    const files = motionGroups[exactGroup] ?? [];
    const safeIndex = Math.max(0, Math.min(index, Math.max(files.length - 1, 0)));
    const id = motionActionId(exactGroup, safeIndex);
    const action = actions.find((a) => a.id === id);
    return {
      group: exactGroup,
      index: safeIndex,
      id,
      label: action?.label ?? exactGroup,
    };
  }

  // 4) 短名模糊：如「脱帽」匹配「脱帽子」/ 文件名含脱帽。不要用组名做包含匹配。
  const bySoftLabel = actions.find((a) => {
    const candidates = [a.label, a.defaultLabel, a.fileName];
    return candidates.some((c) => {
      const n = c
        .replace(/\.motion3\.json$/i, '')
        .replace(/\.exp3\.json$/i, '')
        .replace(/^GB[-_]?/i, '');
      if (!n) {
        return false;
      }
      return n.includes(trimmed) || trimmed.includes(n);
    });
  });
  if (bySoftLabel) {
    return toResolved(bySoftLabel);
  }

  const group = resolveMotionGroup(trimmed, motionGroups);
  if (group) {
    const files = motionGroups[group] ?? [];
    const safeIndex = Math.max(0, Math.min(index, Math.max(files.length - 1, 0)));
    const id = motionActionId(group, safeIndex);
    const action = actions.find((a) => a.id === id);
    return {
      group,
      index: safeIndex,
      id,
      label: action?.label ?? group,
    };
  }

  return null;
}

/** 导出供智能体 / 后台使用的名称对照表 */
export function buildMotionNameCatalog(actions: MotionActionItem[]): Array<{
  name: string;
  id: string;
  group: string;
  index: number;
  fileName: string;
}> {
  return actions.map((a) => ({
    name: a.label,
    id: a.id,
    group: a.group,
    index: a.index,
    fileName: a.fileName,
  }));
}
