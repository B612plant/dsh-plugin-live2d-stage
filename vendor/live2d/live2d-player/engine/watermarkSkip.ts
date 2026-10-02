const WATERMARK_LABEL = /水印|watermark|logo/i;

export interface WatermarkParameterOverride {
  id: string;
  /** 空格对应表情里的目标值；未知时用参数最大值（通常为 1，即隐藏）。 */
  value: number | null;
}

export interface WatermarkSkipPlan {
  parameters: WatermarkParameterOverride[];
  parts: string[];
}

export function isWatermarkLabel(name: string | null | undefined): boolean {
  return Boolean(name && WATERMARK_LABEL.test(name));
}

export function parseWatermarkSkipFromCdi(cdi: unknown): WatermarkSkipPlan {
  const parameters: WatermarkParameterOverride[] = [];
  const parts: string[] = [];
  if (!cdi || typeof cdi !== 'object') {
    return { parameters, parts };
  }
  const root = cdi as { Parameters?: unknown; Parts?: unknown };
  if (Array.isArray(root.Parameters)) {
    for (const item of root.Parameters) {
      if (!item || typeof item !== 'object') {
        continue;
      }
      const record = item as { Id?: unknown; Name?: unknown };
      if (typeof record.Id === 'string' && isWatermarkLabel(String(record.Name ?? ''))) {
        parameters.push({ id: record.Id, value: null });
      }
    }
  }
  if (Array.isArray(root.Parts)) {
    for (const item of root.Parts) {
      if (!item || typeof item !== 'object') {
        continue;
      }
      const record = item as { Id?: unknown; Name?: unknown };
      if (typeof record.Id === 'string' && isWatermarkLabel(String(record.Name ?? ''))) {
        parts.push(record.Id);
      }
    }
  }
  return { parameters, parts };
}

export function parseSpaceHotkeyExpressionFile(vtube: unknown): string | null {
  if (!vtube || typeof vtube !== 'object') {
    return null;
  }
  const hotkeys = (vtube as { Hotkeys?: unknown }).Hotkeys;
  if (!Array.isArray(hotkeys)) {
    return null;
  }
  for (const hotkey of hotkeys) {
    if (!hotkey || typeof hotkey !== 'object') {
      continue;
    }
    const record = hotkey as { Triggers?: unknown; File?: unknown; Action?: unknown };
    const triggers = record.Triggers;
    if (!triggers || typeof triggers !== 'object') {
      continue;
    }
    const keys = Object.values(triggers as Record<string, unknown>)
      .filter((value): value is string => typeof value === 'string');
    if (!keys.some((key) => key.toLowerCase() === 'space')) {
      continue;
    }
    if (typeof record.File === 'string' && record.File.toLowerCase().endsWith('.exp3.json')) {
      return record.File.replace(/\\/g, '/');
    }
  }
  return null;
}

export function parseExpressionParameterValues(expression: unknown): WatermarkParameterOverride[] {
  if (!expression || typeof expression !== 'object') {
    return [];
  }
  const parameters = (expression as { Parameters?: unknown }).Parameters;
  if (!Array.isArray(parameters)) {
    return [];
  }
  const result: WatermarkParameterOverride[] = [];
  for (const item of parameters) {
    if (!item || typeof item !== 'object') {
      continue;
    }
    const record = item as { Id?: unknown; Value?: unknown };
    if (typeof record.Id !== 'string') {
      continue;
    }
    const value = typeof record.Value === 'number' ? record.Value : null;
    result.push({ id: record.Id, value });
  }
  return result;
}

export function mergeWatermarkPlans(
  cdi: WatermarkSkipPlan,
  expressionValues: WatermarkParameterOverride[],
): WatermarkSkipPlan {
  const byId = new Map<string, WatermarkParameterOverride>();
  for (const parameter of cdi.parameters) {
    byId.set(parameter.id, { ...parameter });
  }
  const cdiIds = new Set(byId.keys());
  for (const parameter of expressionValues) {
    if (!cdiIds.has(parameter.id)) {
      continue;
    }
    byId.set(parameter.id, {
      id: parameter.id,
      value: parameter.value,
    });
  }
  return {
    parameters: [...byId.values()],
    parts: [...cdi.parts],
  };
}

export function hasWatermarkSkip(plan: WatermarkSkipPlan): boolean {
  return plan.parameters.length > 0 || plan.parts.length > 0;
}

async function fetchJson(url: string): Promise<unknown | null> {
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch {
    return null;
  }
}

function joinUrl(dir: string, file: string): string {
  const base = dir.endsWith('/') ? dir : `${dir}/`;
  return `${base}${file.replace(/^\/+/, '')}`;
}

export async function loadWatermarkSkipPlan(
  modelDirUrl: string,
  model3Json: string,
): Promise<WatermarkSkipPlan> {
  const model3 = await fetchJson(joinUrl(modelDirUrl, model3Json));
  const displayInfo =
    model3 && typeof model3 === 'object'
      ? (model3 as { FileReferences?: { DisplayInfo?: unknown } }).FileReferences?.DisplayInfo
      : null;
  const cdi =
    typeof displayInfo === 'string' && displayInfo
      ? await fetchJson(joinUrl(modelDirUrl, displayInfo))
      : null;
  const fromCdi = parseWatermarkSkipFromCdi(cdi);

  const vtubeName = model3Json.replace(/\.model3\.json$/i, '.vtube.json');
  const vtube = await fetchJson(joinUrl(modelDirUrl, vtubeName));
  const expressionFile = parseSpaceHotkeyExpressionFile(vtube);
  const expression =
    expressionFile ? await fetchJson(joinUrl(modelDirUrl, expressionFile)) : null;
  const fromExpression = parseExpressionParameterValues(expression);

  return mergeWatermarkPlans(fromCdi, fromExpression);
}

export function applyWatermarkSkip(
  cubismModel: {
    getParameterIndex: (id: unknown) => number;
    getParameterMaximumValue: (index: number) => number;
    setParameterValueByIndex: (index: number, value: number) => void;
    setPartOpacityById: (id: unknown, opacity: number) => void;
  },
  idManager: { getId: (id: string) => unknown },
  plan: WatermarkSkipPlan,
): void {
  for (const parameter of plan.parameters) {
    const handle = idManager.getId(parameter.id);
    const index = cubismModel.getParameterIndex(handle);
    if (index < 0) {
      continue;
    }
    const value =
      parameter.value == null
        ? cubismModel.getParameterMaximumValue(index)
        : parameter.value;
    cubismModel.setParameterValueByIndex(index, value);
  }
  for (const partId of plan.parts) {
    cubismModel.setPartOpacityById(idManager.getId(partId), 0);
  }
}
