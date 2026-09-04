window.__ModuleLoader__.load({
	id: "dsh-trajectory-graph",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// css-modules:/Users/GillianChen/Documents/Cursor Project/deepseek-harness/dsh-trajectory-graph/src/client/GraphView.module.css
var require_GraphView = __commonJS({
  "css-modules:/Users/GillianChen/Documents/Cursor Project/deepseek-harness/dsh-trajectory-graph/src/client/GraphView.module.css"(exports, module2) {
    var css5 = ".tYthiW_root{box-sizing:border-box;width:100%;height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);flex-direction:column;display:flex;position:relative;overflow:hidden}.tYthiW_toolbar{border-bottom:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);flex:none;align-items:center;gap:8px;padding:8px 12px;display:flex}.tYthiW_modes{gap:4px;display:flex}.tYthiW_mode{appearance:none;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;border:0;border-radius:7px;margin:0;padding:4px 10px;font-size:12px}.tYthiW_mode[aria-pressed=true]{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary);font-weight:600}.tYthiW_spacer{flex:1}.tYthiW_note{color:var(--dsw-alias-label-tertiary);font-size:11px}.tYthiW_reset{appearance:none;box-shadow:var(--dsw-elevation-panel);background:var(--dsw-alias-button-elevated-fill);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;border:0;border-radius:8px;padding:4px 10px;font-size:12px}.tYthiW_reset:hover,.tYthiW_mode:hover{background:var(--dsw-alias-button-floating-hover)}.tYthiW_mode:focus-visible,.tYthiW_reset:focus-visible,.tYthiW_railTurn:focus-visible,.tYthiW_railStep:focus-visible,.tYthiW_railMore:focus-visible,.tYthiW_drawerClose:focus-visible,.tYthiW_drawerRow:focus-visible,.tYthiW_tlSpan:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.tYthiW_timeline{border-bottom:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);flex-direction:column;flex:none;gap:4px;padding:8px 12px;display:flex}.tYthiW_tlHead{justify-content:flex-end;display:flex}.tYthiW_tlPlot{gap:8px;display:flex}.tYthiW_tlLabels{width:36px;color:var(--dsw-alias-label-tertiary);text-align:right;flex-direction:column;justify-content:space-between;font-size:10px;display:flex}.tYthiW_tlBody{border:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);border-radius:7px;flex:1;height:48px;position:relative;overflow:hidden}.tYthiW_tlSpan{background:var(--dsw-alias-state-business-primary);opacity:.7;cursor:pointer;border:0;border-radius:3px;height:12px;padding:0;position:absolute}.tYthiW_tlSpanSel{opacity:1;outline:2px solid var(--dsw-alias-label-primary);outline-offset:1px}.tYthiW_tlSpan[data-error=true]{background:var(--dsw-alias-state-error-primary)}.tYthiW_tlBand,.tYthiW_tlBrush{pointer-events:none;position:absolute;inset-block:0}.tYthiW_tlBand{background:var(--dsw-alias-state-business-primary);opacity:.12}.tYthiW_tlBrush{border-inline:1px solid var(--dsw-alias-state-business-primary);background:var(--dsw-alias-state-business-primary);opacity:.24}.tYthiW_tlHover{background:var(--dsw-alias-label-secondary);pointer-events:none;width:1px;position:absolute;inset-block:0}.tYthiW_tlEdge{background:var(--dsw-alias-state-business-primary);pointer-events:none;width:1px;position:absolute;inset-block:0}.tYthiW_tlTick{background:var(--dsw-alias-border-l3);pointer-events:none;width:.5px;position:absolute;inset-block:0}.tYthiW_tlEarlier{inset-block:0;z-index:1;appearance:none;border:0;border-right:1px dashed var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-layer-3);width:14px;color:var(--dsw-alias-label-tertiary);font:inherit;cursor:pointer;padding:0;font-size:10px;position:absolute;left:0}.tYthiW_tlEarlier[aria-disabled=true]{cursor:default}.tYthiW_tlEarlier:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}.tYthiW_body{flex:1;min-width:0;min-height:0;display:flex}.tYthiW_rail{border-right:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);flex-direction:column;flex:none;width:192px;min-height:0;display:flex}.tYthiW_railList{--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);flex-direction:column;flex:1;gap:2px;min-height:0;padding:6px;display:flex;overflow:auto}.tYthiW_railFoot{border-top:.5px solid var(--dsw-alias-border-l1);flex:none;padding:6px}.tYthiW_railTurnHead{align-items:baseline;display:flex}.tYthiW_railSub{color:var(--dsw-alias-label-tertiary);font-size:10px;display:block}.tYthiW_railBetween{color:var(--dsw-alias-label-tertiary);padding:3px 9px;font-size:10px;display:block}.tYthiW_railTurn,.tYthiW_railStep,.tYthiW_railMore{appearance:none;width:100%;color:var(--dsw-alias-label-secondary);font:inherit;text-align:left;cursor:pointer;background:0 0;border:1px solid #0000;border-radius:8px;margin:0;padding:7px 9px;font-size:12px}.tYthiW_railTurn[aria-pressed=true],.tYthiW_railStep[aria-pressed=true]{border-color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.tYthiW_railHalt{color:var(--dsw-alias-state-warn-label);margin-left:6px;font-size:10.5px}.tYthiW_railSteps{border-left:.5px solid var(--dsw-alias-border-l2);flex-direction:column;margin:0 0 4px 10px;padding-left:6px;display:flex}.tYthiW_railStep,.tYthiW_railMore{padding:3px 6px;font-size:10.5px}.tYthiW_railCompaction{color:var(--dsw-alias-label-tertiary);padding:3px 6px;font-size:10px}.tYthiW_drawer{border-left:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);flex-direction:column;flex:none;width:240px;display:flex;overflow:auto}.tYthiW_drawerHead{border-bottom:.5px solid var(--dsw-alias-border-l1);justify-content:space-between;align-items:center;gap:8px;padding:8px 10px;font-weight:600;display:flex}.tYthiW_drawerClose{appearance:none;background:var(--dsw-alias-bg-layer-2);color:inherit;font:inherit;cursor:pointer;border:0;border-radius:6px;margin:0;padding:4px 8px;font-size:12px}.tYthiW_drawerEmpty{color:var(--dsw-alias-label-secondary);margin:0;padding:8px 10px;font-size:12px}.tYthiW_drawerGroups{--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);flex:1;min-height:0;padding:6px 8px 18px;overflow:auto}.tYthiW_groupHead{appearance:none;width:100%;color:var(--dsw-alias-label-primary);font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:7px;align-items:center;gap:8px;padding:7px 8px;font-size:12.5px;display:flex}.tYthiW_groupHead:hover{background:var(--dsw-alias-bg-layer-2)}.tYthiW_groupHead:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-2px}.tYthiW_groupName{font-weight:600}.tYthiW_groupCount{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}.tYthiW_groupTotal{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;margin-left:auto;font-size:11px}.tYthiW_drawerList{border-left:.5px solid var(--dsw-alias-border-l2);flex-direction:column;margin:0 0 6px 4px;padding:0 0 0 8px;list-style:none;display:flex}.tYthiW_drawerRow{appearance:none;width:100%;color:var(--dsw-alias-label-secondary);font:inherit;text-align:left;background:0 0;border:0;border-radius:6px;align-items:center;gap:9px;margin:0;padding:5px 8px;font-size:11.5px;display:flex}button.tYthiW_drawerRow{cursor:pointer}button.tYthiW_drawerRow:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}.tYthiW_rowMuted{opacity:.5}.tYthiW_rowSwatch{background:var(--graph-seg);border-radius:2px;flex:none;width:6px;height:6px}.tYthiW_rowLead{min-width:52px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;white-space:nowrap;flex:none}.tYthiW_rowBody{font-family:var(--dsw-font-mono,ui-monospace, monospace);text-overflow:ellipsis;white-space:nowrap;flex:1;overflow:hidden}.tYthiW_rowTrail{min-width:52px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;text-align:right;flex:none}.tYthiW_rowOk,.tYthiW_rowBad{corner-shape:round;border-radius:50%;flex:none;width:6px;height:6px}.tYthiW_rowOk{background:var(--dsw-alias-state-success-primary)}.tYthiW_rowBad{background:var(--dsw-alias-state-error-primary)}.tYthiW_canvas{background:radial-gradient(circle at 1px 1px, var(--dsw-alias-border-l1) 1px, transparent 0) 0 0 / 22px 22px, var(--dsw-alias-bg-base);flex:1;min-width:0;min-height:0;overflow:auto}.tYthiW_scaler{transform-origin:0 0;position:relative}.tYthiW_stage{position:relative}.tYthiW_wires{pointer-events:none;position:absolute;inset:0;overflow:visible}.tYthiW_wire{fill:none;stroke:var(--dsw-alias-state-business-primary);stroke-linejoin:round;stroke-linecap:round}.tYthiW_wireEmph{stroke:var(--dsw-alias-state-success-primary)}.tYthiW_wireDash{stroke-dasharray:3 4}.tYthiW_wireDim{opacity:.15}.tYthiW_flow,.tYthiW_flowEmph{fill:none;stroke-linejoin:round;stroke-linecap:round;stroke-dasharray:5 7;animation:.9s linear infinite tYthiW_graph-flow}.tYthiW_flow{stroke:var(--dsw-alias-brand-primary)}.tYthiW_flowEmph{stroke:var(--dsw-alias-state-success-primary)}@keyframes tYthiW_graph-flow{to{stroke-dashoffset:-12px}}.tYthiW_head{fill:var(--dsw-alias-state-business-primary)}.tYthiW_headEmph{fill:var(--dsw-alias-state-success-primary)}.tYthiW_tip{fill:var(--dsw-alias-label-tertiary);paint-order:stroke;stroke:var(--dsw-alias-bg-base);stroke-width:3.5px;stroke-linejoin:round;font-size:10px}.tYthiW_tipEmph{fill:var(--dsw-alias-state-success-primary)}.tYthiW_step circle{fill:var(--dsw-alias-bg-base);stroke:var(--dsw-alias-label-tertiary);stroke-width:1.2px}.tYthiW_step text{fill:var(--dsw-alias-label-secondary);text-anchor:middle;font-size:9.5px;font-weight:700}.tYthiW_node{appearance:none;text-align:left;font:inherit;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);box-shadow:var(--dsw-elevation-panel);cursor:grab;touch-action:none;user-select:none;border:0;border-radius:11px;flex-direction:column;gap:4px;margin:0;padding:9px 11px;display:flex;position:absolute;overflow:hidden}.tYthiW_node:hover{background:var(--dsw-alias-interactive-bg-hover)}.tYthiW_node:focus-visible{outline:2px solid var(--graph-accent,var(--dsw-alias-state-business-primary));outline-offset:2px}.tYthiW_nodeDragging{cursor:grabbing;z-index:9}.tYthiW_nodeFaded{opacity:.18}.tYthiW_node[data-kind=session]{--graph-accent:var(--dsw-alias-brand-primary)}.tYthiW_node[data-kind=core]{--graph-accent:var(--dsw-alias-state-business-primary)}.tYthiW_node[data-kind=llm]{--graph-accent:var(--dsw-alias-label-primary-bluish)}.tYthiW_node[data-kind=tools]{--graph-accent:var(--dsw-alias-state-success-primary)}.tYthiW_node[data-kind=storage]{--graph-accent:var(--dsw-alias-state-warn-label)}.tYthiW_node[data-kind=external]{--graph-accent:var(--dsw-alias-label-secondary)}.tYthiW_node[data-kind=security]{--graph-accent:var(--dsw-alias-label-tertiary)}.tYthiW_reserved{box-shadow:none;border:1px dashed var(--dsw-alias-border-l3);opacity:.5;background:0 0}.tYthiW_headRow{align-items:baseline;gap:6px;display:flex}.tYthiW_dot{corner-shape:round;background:var(--graph-accent);border-radius:50%;flex:none;width:7px;height:7px;transform:translateY(-1px)}.tYthiW_title{white-space:nowrap;flex:none;font-size:13px;font-weight:600}.tYthiW_kind{border:.5px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);letter-spacing:.09em;text-transform:uppercase;border-radius:3px;flex:none;padding:0 3px;font-size:8.5px;line-height:1.5}.tYthiW_badge{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;margin-left:auto;font-size:10.5px}.tYthiW_source{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:10.5px;overflow:hidden}.tYthiW_segs{flex-wrap:wrap;gap:2px 9px;display:flex}.tYthiW_segOn,.tYthiW_segOff{font-variant-numeric:tabular-nums;white-space:nowrap;align-items:center;gap:4px;font-size:10.5px;display:inline-flex}.tYthiW_segOn{color:var(--graph-seg);font-weight:700}.tYthiW_segOff{color:var(--dsw-alias-label-tertiary)}.tYthiW_segSwatch{background:var(--graph-seg);border-radius:2px;flex:none;width:6px;height:6px}.tYthiW_segOff .tYthiW_segSwatch{opacity:.5}.tYthiW_segBar{background:var(--dsw-alias-bg-layer-3);border-radius:4px;gap:1.5px;height:8px;display:flex;overflow:hidden}.tYthiW_segFill,.tYthiW_segFillOn{background:var(--graph-seg);height:100%;transition:opacity .2s;display:block}.tYthiW_segFill{opacity:.4}.tYthiW_segFillOn{opacity:1}[data-seg=system]{--graph-seg:var(--dsw-alias-state-business-primary)}[data-seg=tools]{--graph-seg:var(--dsw-alias-brand-primary)}[data-seg=context]{--graph-seg:var(--dsw-alias-state-warn-primary)}[data-seg=history]{--graph-seg:var(--dsw-alias-label-tertiary)}[data-seg=results]{--graph-seg:var(--dsw-alias-state-success-primary)}.tYthiW_meta,.tYthiW_last{font-variant-numeric:tabular-nums;text-overflow:ellipsis;white-space:nowrap;font-size:10.5px;overflow:hidden}.tYthiW_meta{color:var(--dsw-alias-label-secondary)}.tYthiW_last{color:var(--dsw-alias-label-tertiary)}.tYthiW_flag,.tYthiW_flagBad{font-variant-numeric:tabular-nums;white-space:nowrap;border-radius:4px;margin-left:auto;padding:0 4px;font-size:9.5px}.tYthiW_flag{background:var(--dsw-alias-bg-layer-3);color:var(--dsw-alias-label-secondary)}.tYthiW_flagBad{background:var(--dsw-alias-state-error-bg);color:var(--dsw-alias-state-error-label)}.tYthiW_flag~.tYthiW_flagBad,.tYthiW_flag~.tYthiW_badge,.tYthiW_flagBad~.tYthiW_badge{margin-left:0}@media (prefers-reduced-motion:reduce){.tYthiW_node,.tYthiW_wire,.tYthiW_tip,.tYthiW_nodeFaded,.tYthiW_wireDim,.tYthiW_segFill,.tYthiW_segFillOn{transition:none}.tYthiW_flow,.tYthiW_flowEmph{animation:none}}";
    var tagId = "dsh-trajectory-graph/GraphView.module.css";
    if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {
      tag = document.createElement("style");
      tag.dataset.plugin = "dsh-trajectory-graph";
      tag.dataset.pluginCss = tagId;
      tag.textContent = css5;
      document.head.appendChild(tag);
    }
    var tag;
    var classMap = { "spacer": "tYthiW_spacer", "rowBad": "tYthiW_rowBad", "tlBody": "tYthiW_tlBody", "drawerRow": "tYthiW_drawerRow", "flag": "tYthiW_flag", "tlSpanSel": "tYthiW_tlSpanSel", "flagBad": "tYthiW_flagBad", "tlEarlier": "tYthiW_tlEarlier", "nodeFaded": "tYthiW_nodeFaded", "tlHead": "tYthiW_tlHead", "segOff": "tYthiW_segOff", "dot": "tYthiW_dot", "groupTotal": "tYthiW_groupTotal", "rowSwatch": "tYthiW_rowSwatch", "rowLead": "tYthiW_rowLead", "drawerGroups": "tYthiW_drawerGroups", "tip": "tYthiW_tip", "segFillOn": "tYthiW_segFillOn", "groupName": "tYthiW_groupName", "rowBody": "tYthiW_rowBody", "railFoot": "tYthiW_railFoot", "segBar": "tYthiW_segBar", "segFill": "tYthiW_segFill", "tlPlot": "tYthiW_tlPlot", "tlTick": "tYthiW_tlTick", "canvas": "tYthiW_canvas", "title": "tYthiW_title", "wires": "tYthiW_wires", "rowTrail": "tYthiW_rowTrail", "segSwatch": "tYthiW_segSwatch", "tlBrush": "tYthiW_tlBrush", "meta": "tYthiW_meta", "step": "tYthiW_step", "groupCount": "tYthiW_groupCount", "last": "tYthiW_last", "railSteps": "tYthiW_railSteps", "root": "tYthiW_root", "tlBand": "tYthiW_tlBand", "scaler": "tYthiW_scaler", "tipEmph": "tYthiW_tipEmph", "modes": "tYthiW_modes", "drawerHead": "tYthiW_drawerHead", "drawerEmpty": "tYthiW_drawerEmpty", "wireDim": "tYthiW_wireDim", "railTurnHead": "tYthiW_railTurnHead", "railCompaction": "tYthiW_railCompaction", "flowEmph": "tYthiW_flowEmph", "body": "tYthiW_body", "node": "tYthiW_node", "drawerClose": "tYthiW_drawerClose", "tlEdge": "tYthiW_tlEdge", "railStep": "tYthiW_railStep", "tlHover": "tYthiW_tlHover", "reserved": "tYthiW_reserved", "kind": "tYthiW_kind", "headRow": "tYthiW_headRow", "drawerList": "tYthiW_drawerList", "stage": "tYthiW_stage", "railList": "tYthiW_railList", "headEmph": "tYthiW_headEmph", "flow": "tYthiW_flow", "badge": "tYthiW_badge", "segOn": "tYthiW_segOn", "mode": "tYthiW_mode", "note": "tYthiW_note", "railTurn": "tYthiW_railTurn", "railHalt": "tYthiW_railHalt", "toolbar": "tYthiW_toolbar", "reset": "tYthiW_reset", "tlSpan": "tYthiW_tlSpan", "rail": "tYthiW_rail", "rowMuted": "tYthiW_rowMuted", "tlLabels": "tYthiW_tlLabels", "timeline": "tYthiW_timeline", "drawer": "tYthiW_drawer", "groupHead": "tYthiW_groupHead", "rowOk": "tYthiW_rowOk", "railSub": "tYthiW_railSub", "railBetween": "tYthiW_railBetween", "wire": "tYthiW_wire", "wireEmph": "tYthiW_wireEmph", "wireDash": "tYthiW_wireDash", "head": "tYthiW_head", "nodeDragging": "tYthiW_nodeDragging", "source": "tYthiW_source", "segs": "tYthiW_segs", "graph-flow": "tYthiW_graph-flow", "railMore": "tYthiW_railMore" };
    module2.exports = classMap;
    module2.exports.default = classMap;
  }
});

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/GraphView.tsx
var import_react3 = require("react");
var import_GraphView4 = __toESM(require_GraphView(), 1);

// src/client/format.ts
var THOUSAND = 1e3;
function grouped(value) {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function compactTokens(value, t) {
  if (value < THOUSAND) return String(Math.round(value));
  return t("unit.tokensCompact", {
    value: (value / THOUSAND).toFixed(1).replace(/\.0$/, "")
  });
}
function exactTokens(value, t) {
  return t("unit.tokens", { value: grouped(value) });
}
function durationSeconds(milliseconds, t) {
  return t("unit.seconds", {
    value: (milliseconds / THOUSAND).toFixed(2).replace(/\.?0+$/, "")
  });
}
function clockTime(timestamp) {
  const date = new Date(timestamp);
  const pad = (value, width) => String(value).padStart(width, "0");
  return `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)}.${pad(date.getMilliseconds(), 3)}`;
}
function durationMillis(milliseconds, t) {
  return t("unit.milliseconds", { value: grouped(milliseconds) });
}

// src/client/project.ts
var EMPTY_TRAJECTORY = {
  eventNodes: [],
  eventLocations: /* @__PURE__ */ new Map(),
  requests: [],
  callSchemas: /* @__PURE__ */ new Map(),
  partial: null,
  runningCalls: []
};
var ASSEMBLE_SEGMENTS = [
  "system",
  "tools",
  "context",
  "history",
  "results"
];
var USER_PREVIEW_CHARACTERS = 60;
function usageOf(value) {
  if (typeof value !== "object" || value === null) return { input: 0, output: 0, cacheRead: 0 };
  const usage = value;
  return {
    input: usage.inputTokens ?? 0,
    output: usage.outputTokens ?? 0,
    cacheRead: usage.cacheReadTokens ?? 0
  };
}
function blockText(block) {
  if (block.type === "text" || block.type === "reasoning") return block.text;
  if (block.type === "tool-call") return block.arguments;
  if (block.type === "tool-result") return contentText(block.content);
  return "";
}
function contentText(blocks) {
  return blocks.map(blockText).join("\n");
}
function assistantBlockText(block) {
  if (block.kind === "text" || block.kind === "reasoning") return block.text;
  if (block.kind === "tool-call") return block.argsRaw;
  return "";
}
function assistantText(node) {
  return node.blocks.map(assistantBlockText).join("\n");
}
function previewOf(text) {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.length > USER_PREVIEW_CHARACTERS ? `${compact.slice(0, USER_PREVIEW_CHARACTERS).trimEnd()}\u2026` : compact;
}
function locationTurnStep(seq, locations) {
  const location = locations.get(seq);
  if (location === void 0) return null;
  if (location.kind === "step") return { turn: location.turn.turn, step: location.step.step };
  if (location.kind === "turn") return { turn: location.turn.turn, step: 0 };
  return null;
}
function countBlocks(node) {
  let think = 0;
  let text = 0;
  let call = 0;
  for (const block of node.blocks) {
    if (block.kind === "reasoning") think += 1;
    else if (block.kind === "text") text += 1;
    else if (block.kind === "tool-call") call += 1;
  }
  return { think, text, call };
}
function stepTiming(node) {
  const timing = node.timing;
  if (timing === void 0) return null;
  if (timing.stepStartTime === null || timing.firstTokenTime === null) return null;
  return {
    ttftMs: timing.firstTokenTime - timing.stepStartTime,
    generationMs: timing.completedTime - timing.firstTokenTime
  };
}
function ensureTurn(turns, turn) {
  const existing = turns.get(turn);
  if (existing !== void 0) return existing;
  const created = { turn, steps: /* @__PURE__ */ new Map(), compactions: [], ended: false };
  turns.set(turn, created);
  return created;
}
function ensureStep(turn, step, requestNumber) {
  const existing = turn.steps.get(step);
  if (existing !== void 0) return existing;
  const created = {
    turn: turn.turn,
    step,
    requestNumber,
    calls: 0,
    results: 0,
    toolErrors: 0,
    toolMs: 0,
    toolCounts: {},
    thinkBlocks: 0,
    textBlocks: 0,
    callBlocks: 0,
    messages: 0,
    logEvents: 0,
    status: "complete",
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
    userChars: 0,
    callChars: 0,
    systemChars: 0,
    toolsChars: 0,
    contextChars: 0,
    ownResultChars: 0,
    historyChars: 0,
    historyKnown: false
  };
  turn.steps.set(step, created);
  return created;
}
var GraphProjector = class {
  constructor() {
    __publicField(this, "first");
    __publicField(this, "snapshot", EMPTY_TRAJECTORY);
  }
  /**
   * Ingest new tail events and rebuild derived request fields.
   * @param snapshot - Latest Trajectory snapshot.
   * @returns the session-wide graph index.
   */
  project(snapshot) {
    const first = snapshot.eventNodes[0];
    if (first !== this.first) {
      this.first = first;
    }
    this.snapshot = snapshot;
    return this.build();
  }
  build() {
    const snapshot = this.snapshot;
    const turns = /* @__PURE__ */ new Map();
    const userTurns = [];
    const betweenTurnCompactions = [];
    let users = 0;
    let assistants = 0;
    let thinkBlocks = 0;
    let textBlocks = 0;
    let callBlocks = 0;
    let tools = 0;
    let toolErrors = 0;
    let retries = 0;
    let compactions = 0;
    let compactionNodes = 0;
    let logEvents = 0;
    const spans = [];
    const orderedRequests = [...snapshot.requests].sort((left, right) => left.startSeq - right.startSeq);
    for (const [index, request] of orderedRequests.entries()) {
      const number = index + 1;
      if (request.purpose === "compaction") {
        compactions += 1;
        const turn = request.turn;
        if (turn === null) {
          betweenTurnCompactions.push({ requestNumber: number, afterTurn: lastTurnNumber(turns) });
          continue;
        }
        ensureTurn(turns, turn).compactions.push({ requestNumber: number, turn });
        continue;
      }
      const acc = ensureTurn(turns, request.turn);
      const step = ensureStep(acc, request.step, number);
      step.status = request.status === "error" ? "error" : request.status;
      if (request.promptChange !== void 0) step.promptKind = request.promptChange.kind;
      if (request.retry !== void 0) step.retry = request.retry;
      if (request.maxRetries !== void 0) step.maxRetries = request.maxRetries;
      const usage = usageOf(request.usage);
      step.inputTokens += usage.input;
      step.outputTokens += usage.output;
      step.cacheReadTokens += usage.cacheRead;
      const prompt = request.prompt;
      if (prompt !== void 0) {
        step.systemChars = prompt.system.length;
        step.toolsChars = JSON.stringify(prompt.tools).length;
      }
    }
    let historyChars = 0;
    for (const node of snapshot.eventNodes) {
      logEvents += 1;
      const located = locationTurnStep(node.seq, snapshot.eventLocations);
      const owner = located === null || located.step === 0 ? void 0 : ensureStep(ensureTurn(turns, located.turn), located.step, 0);
      if (owner !== void 0) {
        owner.logEvents += 1;
        if (!owner.historyKnown) {
          owner.historyChars = historyChars;
          owner.historyKnown = true;
        }
      }
      switch (node.kind) {
        case "user": {
          users += 1;
          const turn = located?.turn ?? 0;
          userTurns.push(turn);
          if (turn > 0) ensureTurn(turns, turn);
          const text = contentText(node.content);
          historyChars += text.length;
          if (owner !== void 0) {
            owner.userText = previewOf(text);
            owner.userChars += text.length;
          }
          spans.push({
            id: `user-${node.seq}`,
            lane: 0,
            turn: turn === 0 ? null : turn,
            step: located?.step ?? 1,
            start: node.time,
            end: node.time
          });
          break;
        }
        case "steering": {
          users += 1;
          userTurns.push(located?.turn ?? 0);
          historyChars += contentText(node.content).length;
          break;
        }
        case "context": {
          const text = contentText(node.content);
          historyChars += text.length;
          if (owner !== void 0) owner.contextChars += text.length;
          break;
        }
        case "assistant": {
          assistants += 1;
          const blocks = countBlocks(node);
          thinkBlocks += blocks.think;
          textBlocks += blocks.text;
          callBlocks += blocks.call;
          const acc = ensureTurn(turns, node.turn);
          const step = ensureStep(acc, node.step, 0);
          step.thinkBlocks += blocks.think;
          step.textBlocks += blocks.text;
          step.callBlocks += blocks.call;
          step.calls += blocks.call;
          step.messages += 1;
          for (const block of node.blocks) {
            if (block.kind === "tool-call") step.callChars += block.argsRaw.length;
          }
          if (step.toolPreview === void 0) {
            const firstCall = node.blocks.find((block) => block.kind === "tool-call");
            if (firstCall?.kind === "tool-call") {
              step.toolPreview = { name: firstCall.name, argsRaw: firstCall.argsRaw };
            }
          }
          if (step.assistantPreview === void 0) {
            const firstText = node.blocks.find((block) => block.kind === "text" || block.kind === "reasoning");
            if (firstText !== void 0) {
              step.assistantPreview = previewOf(firstText.text);
            }
          }
          const timing = stepTiming(node);
          if (timing !== null) step.timing = timing;
          historyChars += assistantText(node).length;
          if (node.interrupted === true) acc.halt = "stopped";
          spans.push({
            id: `assistant-${node.seq}`,
            lane: 1,
            turn: node.turn,
            step: node.step,
            start: timing === null ? node.time : node.time - timing.ttftMs - timing.generationMs,
            end: node.time,
            ...timing === null ? {} : { ttftMs: timing.ttftMs, generationMs: timing.generationMs }
          });
          break;
        }
        case "tool-result": {
          tools += 1;
          if (node.isError) toolErrors += 1;
          const text = contentText(node.content);
          historyChars += text.length;
          if (owner !== void 0) {
            owner.results += 1;
            owner.ownResultChars += text.length;
            if (node.isError) owner.toolErrors += 1;
            if (node.callTime !== null) owner.toolMs += node.time - node.callTime;
            const name = node.call?.name;
            if (name !== void 0) owner.toolCounts[name] = (owner.toolCounts[name] ?? 0) + 1;
          }
          spans.push({
            id: `tool-${node.seq}`,
            lane: 2,
            turn: located?.turn ?? null,
            step: located?.step ?? null,
            start: node.callTime ?? node.time,
            end: node.time,
            callId: node.callId,
            ...node.isError ? { isError: true } : {}
          });
          break;
        }
        case "model-retry": {
          retries += 1;
          break;
        }
        case "turn-error": {
          ensureTurn(turns, node.turn).halt = "error";
          ensureTurn(turns, node.turn).ended = true;
          break;
        }
        case "turn-max-tokens": {
          ensureTurn(turns, node.turn).halt = "max_tokens";
          ensureTurn(turns, node.turn).ended = true;
          break;
        }
        case "compaction": {
          compactionNodes += 1;
          break;
        }
        default:
          break;
      }
    }
    for (const call of snapshot.runningCalls) {
      const step = ensureStep(ensureTurn(turns, call.turn), call.step, 0);
      step.calls += 1;
      step.status = "running";
      step.toolCounts[call.name] = (step.toolCounts[call.name] ?? 0) + 1;
      if (step.toolPreview === void 0) {
        step.toolPreview = { name: call.name, argsRaw: call.argsRaw };
      }
    }
    if (snapshot.partial !== null) {
      const acc = ensureTurn(turns, snapshot.partial.turn);
      const step = ensureStep(acc, snapshot.partial.step, 0);
      step.status = "running";
    }
    let inputTokens = 0;
    let outputTokens = 0;
    let provider;
    let model;
    let requestConfig;
    const promptKinds = [];
    for (const request of orderedRequests) {
      const usage = usageOf(request.usage);
      inputTokens += usage.input;
      outputTokens += usage.output;
      if (request.purpose === "assistant") {
        provider = request.provenance?.provider ?? provider;
        model = request.provenance?.model ?? model;
        requestConfig = request.requestConfig ?? request.prompt?.config ?? requestConfig;
        if (request.promptChange !== void 0) promptKinds.push(request.promptChange.kind);
      }
    }
    const turnList = [...turns.values()].sort((left, right) => left.turn - right.turn).map((acc) => {
      const steps = [...acc.steps.values()].filter((step) => step.step > 0).sort((left, right) => left.step - right.step);
      const lastStep = steps[steps.length - 1]?.step;
      return {
        turn: acc.turn,
        steps: steps.map((step, index) => ({
          turn: step.turn,
          step: step.step,
          requestNumber: step.requestNumber,
          ...step.promptKind === void 0 ? {} : { promptKind: step.promptKind },
          calls: step.calls,
          results: step.results,
          incomingResults: steps[index - 1]?.results ?? 0,
          toolErrors: step.toolErrors,
          toolMs: step.toolMs,
          toolCounts: step.toolCounts,
          thinkBlocks: step.thinkBlocks,
          textBlocks: step.textBlocks,
          callBlocks: step.callBlocks,
          messages: step.messages,
          logEvents: step.logEvents,
          isLast: step.step === lastStep,
          status: step.status,
          inputTokens: step.inputTokens,
          outputTokens: step.outputTokens,
          cacheReadTokens: step.cacheReadTokens,
          ...step.timing === void 0 ? {} : { timing: step.timing },
          ...step.retry === void 0 ? {} : { retry: step.retry },
          ...step.maxRetries === void 0 ? {} : { maxRetries: step.maxRetries },
          ...step.userText === void 0 ? {} : { userText: step.userText },
          userChars: step.userChars,
          callChars: step.callChars,
          ownResultChars: step.ownResultChars,
          ...step.toolPreview === void 0 ? {} : { toolPreview: step.toolPreview },
          ...step.assistantPreview === void 0 ? {} : { assistantPreview: step.assistantPreview },
          segmentChars: {
            system: step.systemChars,
            tools: step.toolsChars,
            context: step.contextChars,
            history: step.historyChars,
            results: steps[index - 1]?.ownResultChars ?? 0
          }
        })),
        compactions: acc.compactions,
        ended: acc.ended || acc.halt !== void 0,
        ...acc.halt === void 0 ? {} : { halt: acc.halt }
      };
    });
    const latest = turnList[turnList.length - 1];
    return {
      turns: turnList,
      latestTurn: latest === void 0 ? null : latest.turn,
      spans,
      betweenTurnCompactions,
      users,
      userTurns,
      assistants,
      thinkBlocks,
      textBlocks,
      callBlocks,
      tools,
      toolErrors,
      retries,
      compactions: Math.max(compactions, compactionNodes),
      logEvents,
      inputTokens,
      outputTokens,
      ...provider === void 0 ? {} : { provider },
      ...model === void 0 ? {} : { model },
      ...requestConfig === void 0 ? {} : { requestConfig },
      running: snapshot.partial !== null || snapshot.runningCalls.length > 0,
      promptKinds
    };
  }
};
function lastTurnNumber(turns) {
  const opened = [...turns.keys()];
  return opened[opened.length - 1] ?? null;
}
function stepsInScope(snapshot, scope) {
  if (scope.kind === "session") return snapshot.turns.flatMap((turn2) => turn2.steps);
  if (scope.kind === "turn") {
    const turn2 = snapshot.turns.find((item) => item.turn === scope.turn);
    return turn2 === void 0 ? [] : turn2.steps;
  }
  const turn = snapshot.turns.find((item) => item.turn === scope.turn);
  const step = turn?.steps.find((item) => item.step === scope.step);
  return step === void 0 ? [] : [step];
}
function scopeTotals(snapshot, scope) {
  const steps = stepsInScope(snapshot, scope);
  const toolCounts = {};
  const requestNumbers = [];
  let calls = 0;
  let results = 0;
  let toolErrors = 0;
  let toolMs = 0;
  let thinkBlocks = 0;
  let textBlocks = 0;
  let callBlocks = 0;
  let messages = 0;
  let logEvents = 0;
  let inputTokens = 0;
  let outputTokens = 0;
  let cacheReadTokens = 0;
  let ttftMs = 0;
  let generationMs = 0;
  let timedSteps = 0;
  let retries = 0;
  let maxRetries = 0;
  for (const step of steps) {
    calls += step.calls;
    results += step.results;
    toolErrors += step.toolErrors;
    toolMs += step.toolMs;
    thinkBlocks += step.thinkBlocks;
    textBlocks += step.textBlocks;
    callBlocks += step.callBlocks;
    messages += step.messages;
    logEvents += step.logEvents;
    inputTokens += step.inputTokens;
    outputTokens += step.outputTokens;
    cacheReadTokens += step.cacheReadTokens;
    if (step.timing !== void 0) {
      ttftMs += step.timing.ttftMs;
      generationMs += step.timing.generationMs;
      timedSteps += 1;
    }
    if (step.retry !== void 0) retries += step.retry;
    if (step.maxRetries !== void 0) maxRetries = Math.max(maxRetries, step.maxRetries);
    if (step.requestNumber > 0) requestNumbers.push(step.requestNumber);
    for (const [name, count] of Object.entries(step.toolCounts)) {
      toolCounts[name] = (toolCounts[name] ?? 0) + count;
    }
  }
  return {
    steps: steps.length,
    calls,
    results,
    toolErrors,
    toolMs,
    toolCounts,
    thinkBlocks,
    textBlocks,
    callBlocks,
    messages,
    logEvents,
    inputTokens,
    outputTokens,
    cacheReadTokens,
    ttftMs,
    generationMs,
    timedSteps,
    retries,
    maxRetries,
    requestNumbers
  };
}
function inactiveEdges(snapshot, scope) {
  const dimmed = /* @__PURE__ */ new Set();
  const steps = stepsInScope(snapshot, scope);
  if (steps.length === 0) {
    return /* @__PURE__ */ new Set([
      "e_in",
      "e_req",
      "e_llm",
      "e_msg",
      "e_call",
      "e_gate",
      "e_ws",
      "e_logA",
      "e_logT",
      "e_derive",
      "e_end"
    ]);
  }
  if (!steps.some((step) => step.calls > 0)) {
    dimmed.add("e_call");
    dimmed.add("e_gate");
    dimmed.add("e_ws");
    dimmed.add("e_logT");
  }
  if (scope.kind === "step") {
    const step = steps[0];
    if (step === void 0) return dimmed;
    if (step.step > 1) dimmed.add("e_in");
    if (!step.isLast) dimmed.add("e_end");
    else dimmed.add("e_derive");
    return dimmed;
  }
  if (!steps.some((step) => step.step > 1)) dimmed.add("e_derive");
  const ended = scope.kind === "session" ? snapshot.turns.some((turn) => turn.ended) : snapshot.turns.find((turn) => turn.turn === scope.turn)?.ended ?? false;
  if (!ended) dimmed.add("e_end");
  return dimmed;
}
var REQUEST_FOCUS = [
  "input",
  "assemble",
  "request",
  "llm",
  "assistant",
  "tool"
];
var CONTEXT_FOCUS = [
  "assemble",
  "log",
  "request",
  "llm",
  "tool"
];
function focusedNodes(mode) {
  if (mode === "panorama") return /* @__PURE__ */ new Set();
  if (mode === "request") return new Set(REQUEST_FOCUS);
  return new Set(CONTEXT_FOCUS);
}
function defaultScope(snapshot) {
  if (snapshot.latestTurn === null) return { kind: "session" };
  return { kind: "turn", turn: snapshot.latestTurn };
}
function assembleSegments(snapshot, scope) {
  const steps = stepsInScope(snapshot, scope);
  const kinds = new Set(steps.flatMap((step) => step.promptKind === void 0 ? [] : [step.promptKind]));
  const system = kinds.has("initial") || kinds.has("system") || kinds.has("system-and-tools");
  const tools = kinds.has("initial") || kinds.has("tools") || kinds.has("system-and-tools");
  const laterStep = steps.some((step) => step.step > 1);
  const laterTurn = scope.kind === "session" ? snapshot.turns.some((turn) => turn.turn > 1) : scope.turn > 1;
  const chars = { system: 0, tools: 0, context: 0, history: 0, results: 0 };
  let inputTokens = 0;
  for (const step of steps) {
    for (const id of ASSEMBLE_SEGMENTS) chars[id] += step.segmentChars[id];
    inputTokens += step.inputTokens;
  }
  const active = {
    system,
    tools,
    context: kinds.size > 0,
    history: laterTurn || laterStep,
    // A step's own tool results reach the model through the next step's
    // assembly, so what a step admits decides this segment rather than the
    // calls the scope itself issued.
    results: steps.some((step) => step.incomingResults > 0)
  };
  const total = ASSEMBLE_SEGMENTS.reduce((sum, id) => sum + chars[id], 0);
  return ASSEMBLE_SEGMENTS.map((id) => ({
    id,
    active: active[id],
    tokens: total === 0 ? 0 : Math.round(inputTokens * chars[id] / total),
    weight: total === 0 ? 1 : Math.max(1, Math.round(chars[id] / total * 100))
  }));
}
var RAIL_HEAD = 3;
var RAIL_TAIL = 2;
var RAIL_FOLD = 7;
function railSteps(steps, expanded) {
  if (expanded || steps.length <= RAIL_FOLD) return { shown: steps, hidden: 0 };
  const head = steps.slice(0, RAIL_HEAD);
  const tail = steps.slice(steps.length - RAIL_TAIL);
  return { shown: [...head, ...tail], hidden: steps.length - RAIL_HEAD - RAIL_TAIL };
}
function locationInScope(location, scope) {
  if (scope.kind === "session") return true;
  if (location === void 0) return false;
  if (location.kind === "session" || location.kind === "unresolved") return false;
  if (location.turn.turn !== scope.turn) return false;
  if (scope.kind === "turn") return true;
  return location.kind === "step" && location.step.step === scope.step;
}
function createGraphSource(target) {
  const projector = new GraphProjector();
  let last;
  let cached;
  return {
    getSnapshot: () => {
      const traj = target.getSnapshot() ?? EMPTY_TRAJECTORY;
      if (cached === void 0 || traj !== last) {
        last = traj;
        cached = projector.project(traj);
      }
      return cached;
    },
    subscribe: (listener) => target.subscribe(listener)
  };
}

// src/client/cards.ts
var CHANGE_KEYS = {
  "initial": "change.initial",
  "system": "change.system",
  "tools": "change.tools",
  "system-and-tools": "change.systemAndTools"
};
var STATUS_KEYS = {
  running: "status.pending",
  complete: "status.completed",
  error: "status.failed"
};
function toolDistribution(counts) {
  return Object.entries(counts).map(([name, count]) => `${name} ${count}`).join(" \xB7 ");
}
var TOOL_PREVIEW_CHARACTERS = 48;
function toolCallPreview(preview2) {
  const args = preview2.argsRaw.replace(/\s+/g, " ").trim();
  const joined = args === "" ? preview2.name : `${preview2.name} ${args}`;
  return joined.length > TOOL_PREVIEW_CHARACTERS ? `${joined.slice(0, TOOL_PREVIEW_CHARACTERS).trimEnd()}\u2026` : joined;
}
function optionsRow(config) {
  if (config === void 0) return "";
  const parts = [];
  if (config.reasoningEffort !== void 0) parts.push(`reasoningEffort ${config.reasoningEffort}`);
  if (config.thinking !== void 0) parts.push(`thinking ${config.thinking}`);
  if (config.temperature !== void 0) parts.push(`temperature ${config.temperature}`);
  if (config.maxTokens !== void 0) parts.push(`maxTokens ${config.maxTokens}`);
  return parts.join(" \xB7 ");
}
function haltBadge(halt, t) {
  if (halt === "error") return t("status.failed");
  if (halt === "stopped") return t("halt.stopped");
  if (halt === "max_tokens") return t("halt.maxTokens");
  return "";
}
function promptChangeRow(step, t) {
  const kind = step.promptKind;
  if (kind !== void 0) return t("card.promptChange", { change: t(CHANGE_KEYS[kind]) });
  if (step.incomingResults > 0) return t("card.promptResults");
  return t("card.promptUnchanged");
}
function requestBadge(scope, requestNumbers, t) {
  const first = requestNumbers[0];
  const last = requestNumbers[requestNumbers.length - 1];
  if (first === void 0 || last === void 0) return "";
  if (scope.kind === "session") return t("request.count", { count: requestNumbers.length });
  if (first === last) return t("request.label", { request: first });
  return t("request.range", { from: first, to: last });
}
function cardReadings(snapshot, scope, t) {
  const totals = scopeTotals(snapshot, scope);
  const steps = stepsInScope(snapshot, scope);
  const step = scope.kind === "step" ? steps[0] : void 0;
  const turn = scope.kind === "session" ? void 0 : snapshot.turns.find((item) => item.turn === scope.turn);
  const users = scope.kind === "session" ? snapshot.users : snapshot.userTurns.filter((item) => item === scope.turn).length;
  const halt = scope.kind === "session" ? snapshot.turns.find((item) => item.halt !== void 0)?.halt : turn?.halt;
  const firstStep = step !== void 0 && step.step === 1;
  const stepCount = Math.max(1, totals.steps);
  const resumed = Math.max(0, totals.steps - (scope.kind === "session" ? snapshot.turns.length : 1));
  const distribution = toolDistribution(totals.toolCounts);
  const options = optionsRow(snapshot.requestConfig);
  const identity = [snapshot.model, snapshot.provider].filter((part) => part !== void 0).join(" \xB7 ");
  const endedTurns = snapshot.turns.filter((item) => item.ended).length;
  const toolPreviewStep = step ?? [...steps].reverse().find((item) => item.toolPreview !== void 0);
  const toolInvocation = toolPreviewStep?.toolPreview === void 0 ? void 0 : toolCallPreview(toolPreviewStep.toolPreview);
  const assistantPreviewStep = step ?? [...steps].reverse().find((item) => item.assistantPreview !== void 0);
  const assistantInvocation = assistantPreviewStep?.assistantPreview;
  return {
    input: {
      badge: step === void 0 ? users === 0 ? void 0 : String(users) : firstStep ? "1" : void 0,
      meta: step === void 0 ? users === 0 ? void 0 : t("card.inputSourceCount", { count: users }) : firstStep ? t("card.inputSource") : t("card.inputResumed"),
      last: step === void 0 ? resumed === 0 ? void 0 : t("card.restResumed", { count: resumed }) : firstStep ? step.userText === void 0 ? void 0 : t("card.userQuote", { text: step.userText }) : t("card.wokenBy", { count: step.incomingResults })
    },
    assemble: {
      badge: totals.inputTokens === 0 ? void 0 : compactTokens(
        step === void 0 ? Math.round(totals.inputTokens / stepCount) : step.inputTokens,
        t
      ),
      last: step !== void 0 ? promptChangeRow(step, t) : scope.kind === "turn" ? t("card.assembleTurn", { count: totals.steps }) : t("card.assembleSession", {
        compactions: snapshot.compactions,
        changes: snapshot.promptKinds.length
      })
    },
    request: {
      badge: requestBadge(scope, totals.requestNumbers, t),
      flag: step !== void 0 ? step.retry === void 0 ? void 0 : t("card.retry", { retry: step.retry, maximum: step.maxRetries ?? totals.maxRetries }) : totals.retries === 0 ? void 0 : t("card.retryCount", { count: totals.retries }),
      meta: totals.timedSteps === 0 ? void 0 : step?.timing !== void 0 ? t("card.timing", {
        ttft: durationSeconds(step.timing.ttftMs, t),
        generation: durationSeconds(step.timing.generationMs, t),
        total: durationSeconds(step.timing.ttftMs + step.timing.generationMs, t)
      }) : t("card.timingAverage", {
        ttft: durationSeconds(totals.ttftMs / totals.timedSteps, t),
        generation: durationSeconds(totals.generationMs / totals.timedSteps, t)
      }),
      last: totals.inputTokens + totals.outputTokens === 0 ? void 0 : t("card.usage", {
        input: step === void 0 ? compactTokens(totals.inputTokens, t) : exactTokens(totals.inputTokens, t),
        cached: step === void 0 ? compactTokens(totals.cacheReadTokens, t) : exactTokens(totals.cacheReadTokens, t),
        output: step === void 0 ? compactTokens(totals.outputTokens, t) : exactTokens(totals.outputTokens, t)
      })
    },
    assistant: {
      badge: totals.messages === 0 ? void 0 : String(totals.messages),
      meta: assistantInvocation ?? t("card.blocks", {
        think: totals.thinkBlocks,
        text: totals.textBlocks,
        call: totals.callBlocks
      }),
      last: assistantInvocation === void 0 ? totals.messages === 0 ? void 0 : t("card.messages", { count: totals.messages }) : t("card.blocks", {
        think: totals.thinkBlocks,
        text: totals.textBlocks,
        call: totals.callBlocks
      })
    },
    tool: {
      badge: totals.calls === 0 ? void 0 : String(totals.calls),
      flagBad: totals.toolErrors === 0 ? void 0 : t("card.toolsFailed", { count: totals.toolErrors }),
      meta: toolInvocation ?? (step !== void 0 ? t("card.toolsNone") : t("card.toolsIdle")),
      last: step !== void 0 ? step.isLast ? t("card.toolsLastStep") : t(STATUS_KEYS[step.status]) : distribution === "" ? void 0 : distribution
    },
    log: {
      badge: totals.logEvents === 0 ? void 0 : String(totals.logEvents),
      meta: t(
        step !== void 0 ? "card.logStep" : scope.kind === "turn" ? "card.logTurn" : "card.logSession",
        { count: totals.logEvents }
      )
    },
    turnend: {
      badge: haltBadge(halt, t),
      meta: step !== void 0 ? step.isLast ? turn?.ended === true ? t("card.turnendFired") : t("card.turnendReady") : t("card.turnendPending") : scope.kind === "turn" ? turn?.ended === true ? t("card.turnendFired") : t("card.turnendRunning") : t("card.turnendSession", {
        ended: endedTurns,
        running: snapshot.turns.length - endedTurns
      })
    },
    llm: { meta: identity, last: options },
    workspace: {
      badge: totals.results === 0 ? void 0 : String(totals.results),
      meta: distribution === "" ? step === void 0 ? void 0 : t("card.workspaceIdle") : Object.keys(totals.toolCounts).join(" \xB7 ")
    }
  };
}

// src/client/topology.ts
var GRAPH_CANVAS_WIDTH = 1240;
var GRAPH_CANVAS_HEIGHT = 760;
var GRAPH_SNAP_GRID = 10;
var GRAPH_NODES = [
  {
    id: "input",
    x: 365,
    y: 36,
    w: 270,
    h: 104,
    kind: "session",
    titleKey: "node.input",
    kindKey: "kind.session",
    source: "agent/pre-step \u2192 step/start \u2192 user/message"
  },
  {
    id: "assemble",
    x: 290,
    y: 178,
    w: 420,
    h: 124,
    kind: "core",
    titleKey: "node.assemble",
    kindKey: "kind.core",
    source: "system-prompt/assemble"
  },
  {
    id: "request",
    x: 365,
    y: 348,
    w: 270,
    h: 104,
    kind: "llm",
    titleKey: "node.request",
    kindKey: "kind.llm",
    source: "agent/request \u2192 llm/stream"
  },
  {
    id: "assistant",
    x: 365,
    y: 490,
    w: 270,
    h: 98,
    kind: "session",
    titleKey: "node.assistant",
    kindKey: "kind.session",
    source: "assistant/chunk* \u2192 assistant/message"
  },
  {
    id: "tool",
    x: 365,
    y: 626,
    w: 270,
    h: 98,
    kind: "tools",
    titleKey: "node.tool",
    kindKey: "kind.tools",
    source: "tool/call \u2192 pre \u2192 execute \u2192 post \u2192 tool/result"
  },
  {
    id: "log",
    x: 40,
    y: 348,
    w: 200,
    h: 104,
    kind: "storage",
    titleKey: "node.log",
    kindKey: "kind.storage",
    source: "ctx.sessions \xB7 append-only"
  },
  {
    id: "turnend",
    x: 940,
    y: 486,
    w: 250,
    h: 98,
    kind: "core",
    titleKey: "node.turnend",
    kindKey: "kind.core",
    source: "agent/turn-stopping \u2192 turn/end"
  },
  {
    id: "llm",
    x: 940,
    y: 342,
    w: 250,
    h: 118,
    kind: "external",
    titleKey: "node.llm",
    kindKey: "kind.external",
    source: "api.deepseek.com"
  },
  {
    id: "sandbox",
    x: 740,
    y: 626,
    w: 170,
    h: 98,
    kind: "security",
    titleKey: "node.sandbox",
    kindKey: "kind.security",
    source: "ctx.sandbox",
    reserved: true
  },
  {
    id: "workspace",
    x: 940,
    y: 626,
    w: 250,
    h: 98,
    kind: "external",
    titleKey: "node.workspace",
    kindKey: "kind.external",
    source: "ctx.fs \xB7 ctx.shell"
  }
];
var GRAPH_EDGES = [
  { id: "e_in", from: "input", to: "assemble", width: 2, step: 1, label: "user/message" },
  { id: "e_req", from: "assemble", to: "request", width: 2.7, step: 2, label: "agent/request" },
  { id: "e_llm", from: "request", to: "llm", width: 2.7, step: 3, both: true, label: "llm/stream" },
  { id: "e_msg", from: "request", to: "assistant", width: 2.7, step: 4, label: "assistant/chunk*" },
  { id: "e_call", from: "assistant", to: "tool", width: 2.7, step: 5, label: "tool/call" },
  { id: "e_gate", from: "tool", to: "sandbox", width: 2, label: "tools/pre-execute" },
  { id: "e_ws", from: "sandbox", to: "workspace", width: 2, dash: true },
  { id: "e_logA", from: "assistant", to: "log", width: 2, label: "assistant/message" },
  { id: "e_logT", from: "tool", to: "log", width: 2.7, step: 6, label: "tool/result" },
  {
    id: "e_derive",
    from: "log",
    to: "assemble",
    width: 3.4,
    step: 7,
    emph: true,
    labelKey: "edge.derive"
  },
  { id: "e_end", from: "assistant", to: "turnend", width: 2, dash: true, labelKey: "edge.end" }
];
var GRAPH_NODE_BY_ID = Object.fromEntries(
  GRAPH_NODES.map((node) => [node.id, node])
);
var GRAPH_DEFAULT_POSITIONS = Object.fromEntries(
  GRAPH_NODES.map((node) => [node.id, { x: node.x, y: node.y }])
);

// src/client/edges.ts
var WIDTH_BANDS = [
  { floor: 0.75, width: 3.4 },
  { floor: 0.4, width: 2.7 },
  { floor: 0.15, width: 2 }
];
var THINNEST = 1.5;
function bandFor(load, heaviest) {
  const share = load <= 0 ? 0 : load / heaviest;
  for (const band of WIDTH_BANDS) {
    if (share >= band.floor) return band.width;
  }
  return THINNEST;
}
function callLoads(snapshot, scope) {
  const totals = scopeTotals(snapshot, scope);
  const turn = scope.kind === "session" ? void 0 : snapshot.turns.find((item) => item.turn === scope.turn);
  const users = scope.kind === "session" ? snapshot.users : snapshot.userTurns.filter((item) => item === scope.turn).length;
  const openedTurns = scope.kind === "session" ? snapshot.turns.length : 1;
  const ended = scope.kind === "session" ? snapshot.turns.filter((item) => item.ended).length : turn?.ended === true ? 1 : 0;
  return {
    e_in: users,
    e_req: totals.steps,
    e_llm: totals.steps,
    e_msg: totals.messages,
    e_call: totals.calls,
    e_gate: totals.calls,
    e_ws: totals.calls,
    e_logA: totals.messages,
    e_logT: totals.results,
    // Every step past its turn's first was re-derived from the session log.
    e_derive: Math.max(0, totals.steps - openedTurns),
    e_end: ended
  };
}
function tokenLoads(snapshot, scope) {
  const totals = scopeTotals(snapshot, scope);
  const steps = stepsInScope(snapshot, scope);
  let promptChars = 0;
  let userChars = 0;
  let callChars = 0;
  let resultChars = 0;
  let derivedChars = 0;
  for (const step of steps) {
    for (const id of ASSEMBLE_SEGMENTS) promptChars += step.segmentChars[id];
    userChars += step.userChars;
    callChars += step.callChars;
    resultChars += step.ownResultChars;
    derivedChars += step.segmentChars.history + step.segmentChars.results;
  }
  const factor = promptChars === 0 ? 0 : totals.inputTokens / promptChars;
  return {
    e_in: userChars * factor,
    e_req: totals.inputTokens,
    e_llm: totals.inputTokens,
    e_msg: totals.outputTokens,
    e_call: callChars * factor,
    e_gate: callChars * factor,
    e_ws: callChars * factor,
    e_logA: totals.outputTokens,
    e_logT: resultChars * factor,
    e_derive: derivedChars * factor,
    e_end: 0
  };
}
function edgeWidths(snapshot, scope, mode) {
  const loads = mode === "calls" ? callLoads(snapshot, scope) : tokenLoads(snapshot, scope);
  const heaviest = Object.values(loads).reduce((high, load) => Math.max(high, load), 0);
  return Object.fromEntries(GRAPH_EDGES.map((spec) => [
    spec.id,
    heaviest === 0 ? spec.width : bandFor(loads[spec.id], heaviest)
  ]));
}

// src/client/GraphDrawer.tsx
var import_react = require("react");
var import_GraphView = __toESM(require_GraphView(), 1);
var import_jsx_runtime = require("react/jsx-runtime");
function Row({
  row,
  onOpen
}) {
  const callId = row.callId;
  const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    row.segment !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: import_GraphView.default.rowSwatch, "data-seg": row.segment, "aria-hidden": "true" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: import_GraphView.default.rowLead, children: row.lead }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: import_GraphView.default.rowBody, children: row.body }),
    row.trailing !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: import_GraphView.default.rowTrail, children: row.trailing }),
    row.ok !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: row.ok ? import_GraphView.default.rowOk : import_GraphView.default.rowBad, "aria-hidden": "true" })
  ] });
  if (callId === void 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: row.muted === true ? `${import_GraphView.default.drawerRow} ${import_GraphView.default.rowMuted}` : import_GraphView.default.drawerRow, children: body });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type: "button",
      className: import_GraphView.default.drawerRow,
      onClick: () => {
        onOpen(callId);
      },
      children: body
    }
  ) });
}
function GraphDrawer({
  title,
  groups,
  onClose,
  onOpen,
  t
}) {
  const [closed, setClosed] = (0, import_react.useState)(/* @__PURE__ */ new Set());
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { className: import_GraphView.default.drawer, role: "complementary", "aria-label": t("drawer.aria"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: import_GraphView.default.drawerHead, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: import_GraphView.default.drawerClose, onClick: onClose, children: t("drawer.close") })
    ] }),
    groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: import_GraphView.default.drawerEmpty, children: t("drawer.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: import_GraphView.default.drawerGroups, children: groups.map((item) => {
      const open = item.open !== closed.has(item.id);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: import_GraphView.default.drawerGroup, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            type: "button",
            className: import_GraphView.default.groupHead,
            "aria-expanded": open,
            onClick: () => {
              setClosed((current) => {
                const next = new Set(current);
                if (!next.delete(item.id)) next.add(item.id);
                return next;
              });
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: import_GraphView.default.groupName, children: item.title }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: import_GraphView.default.groupCount, children: item.rows.length }),
              item.total !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: import_GraphView.default.groupTotal, children: item.total })
            ]
          }
        ),
        open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: import_GraphView.default.drawerList, children: item.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { row, onOpen }, row.id)) })
      ] }, item.id);
    }) })
  ] });
}

// src/client/GraphRail.tsx
var import_GraphView2 = __toESM(require_GraphView(), 1);
var import_jsx_runtime2 = require("react/jsx-runtime");
function stepLabel(step, t) {
  if (step.requestNumber > 0) {
    return `${t("request.label", { request: step.requestNumber })} \uFF5C ${t("group.step", { step: step.step })}`;
  }
  return t("group.step", { step: step.step });
}
function haltLabel(turn, t) {
  if (turn.halt === "error") return t("status.failed");
  if (turn.halt === "stopped") return t("halt.stopped");
  if (turn.halt === "max_tokens") return t("halt.maxTokens");
  return "";
}
function turnSummary(turn, t) {
  const steps = turn.steps.length;
  const calls = turn.steps.reduce((sum, step) => sum + step.calls, 0);
  return t("rail.summary", {
    steps: t(steps === 1 ? "summary.steps.one" : "summary.steps.other", { count: steps }),
    toolCalls: t(calls === 1 ? "summary.toolCalls.one" : "summary.toolCalls.other", { count: calls })
  });
}
function BetweenTurns({
  snapshot,
  afterTurn,
  t
}) {
  return snapshot.betweenTurnCompactions.filter((item) => item.afterTurn === afterTurn).map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: import_GraphView2.default.railBetween, children: t("request.compaction", { section: t("section.betweenTurns") }) }, `btc-${item.requestNumber}`));
}
function GraphRail({
  snapshot,
  scope,
  expanded,
  onScope,
  onExpand,
  t
}) {
  const selectedTurn = scope.kind === "session" ? null : scope.turn;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("nav", { className: import_GraphView2.default.rail, "aria-label": t("rail.aria"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: import_GraphView2.default.railList, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(BetweenTurns, { snapshot, afterTurn: null, t }),
      snapshot.turns.map((turn) => {
        const pressed = selectedTurn === turn.turn && scope.kind !== "session";
        const halt = haltLabel(turn, t);
        const folded = pressed ? railSteps(turn.steps, expanded) : void 0;
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "button",
            {
              type: "button",
              className: import_GraphView2.default.railTurn,
              "aria-pressed": scope.kind === "turn" && scope.turn === turn.turn,
              onClick: () => {
                onScope({ kind: "turn", turn: turn.turn });
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: import_GraphView2.default.railTurnHead, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("turn.label", { turn: turn.turn }) }),
                  halt !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: import_GraphView2.default.railHalt, children: halt })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: import_GraphView2.default.railSub, children: turnSummary(turn, t) })
              ]
            }
          ),
          folded !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: import_GraphView2.default.railSteps, children: [
            folded.shown.map((step) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: import_GraphView2.default.railStep,
                "aria-pressed": scope.kind === "step" && scope.step === step.step,
                onClick: () => {
                  onScope({ kind: "step", turn: turn.turn, step: step.step });
                },
                children: stepLabel(step, t)
              },
              step.step
            )),
            turn.compactions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: import_GraphView2.default.railCompaction, children: t("request.labelCompaction", { request: item.requestNumber }) }, `c-${item.requestNumber}`)),
            folded.hidden > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: import_GraphView2.default.railMore, onClick: onExpand, children: t("rail.expand") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(BetweenTurns, { snapshot, afterTurn: turn.turn, t })
        ] }, turn.turn);
      })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: import_GraphView2.default.railFoot, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        type: "button",
        className: import_GraphView2.default.railTurn,
        "aria-pressed": scope.kind === "session",
        onClick: () => {
          onScope({ kind: "session" });
        },
        children: t("scope.session")
      }
    ) })
  ] });
}

// src/client/GraphTimeline.tsx
var import_react2 = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var import_GraphView3 = __toESM(require_GraphView(), 1);

// src/client/timeline.ts
function deriveGraphTimeline(spans, mode) {
  if (spans.length === 0) return null;
  const ordered = [...spans].sort((left, right) => left.start - right.start || left.id.localeCompare(right.id));
  const placed = mode === "sequence" ? ordered.map((span, index) => ({ span, start: index, end: index + 1 })) : ordered.map((span) => ({ span, start: span.start, end: Math.max(span.end, span.start + 1) }));
  const start = placed.reduce((low, item) => Math.min(low, item.start), Number.POSITIVE_INFINITY);
  const end = placed.reduce((high, item) => Math.max(high, item.end), Number.NEGATIVE_INFINITY);
  const turnTicks = [];
  for (const item of placed) {
    const turn = item.span.turn;
    if (turn === null || turnTicks.some((tick) => tick.turn === turn)) continue;
    turnTicks.push({ turn, at: item.start });
  }
  return { start, end: Math.max(end, start + 1), spans: placed, turnTicks };
}
function spanInScope(span, scope) {
  if (scope.kind === "session") return true;
  if (span.turn !== scope.turn) return false;
  if (scope.kind === "turn") return true;
  return span.step === scope.step;
}
function scopeBand(model, scope) {
  const covered = model.spans.filter((item) => spanInScope(item.span, scope));
  const first = covered[0];
  if (first === void 0) return null;
  return {
    start: covered.reduce((low, item) => Math.min(low, item.start), first.start),
    end: covered.reduce((high, item) => Math.max(high, item.end), first.end)
  };
}
function spanScope(span) {
  if (span.turn === null) return { kind: "session" };
  if (span.step === null) return { kind: "turn", turn: span.turn };
  return { kind: "step", turn: span.turn, step: span.step };
}
function scopeForSpans(spans) {
  const only = spans[0];
  if (only === void 0) return null;
  if (spans.length === 1) return spanScope(only);
  const [turn, ...moreTurns] = new Set(spans.flatMap((span) => span.turn === null ? [] : [span.turn]));
  if (turn === void 0 || moreTurns.length > 0) return { kind: "session" };
  const [step, ...moreSteps] = new Set(spans.flatMap((span) => span.step === null ? [] : [span.step]));
  if (step === void 0 || moreSteps.length > 0) return { kind: "turn", turn };
  return { kind: "step", turn, step };
}

// src/client/GraphTimeline.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var MINIMUM_DRAG_PX = 3;
var MINIMUM_ZOOM_OPERATIONS = 4;
var MINIMUM_ZOOM_MS = 20;
var TIMELINE_TOOLTIP_DELAY_MS = 500;
var ZOOM_RATE = 15e-4;
var EDGE_PAN_ZONE_FRACTION = 0.08;
var EDGE_PAN_STEP_FRACTION = 0.025;
var MAXIMUM_EDGE_PAN_PX = 32;
function laneKey(lane) {
  if (lane === 0) return "column.input";
  if (lane === 1) return "column.model";
  return "column.tools";
}
function clampFraction(value) {
  return Math.min(1, Math.max(0, value));
}
function orderedBand(left, right) {
  return left <= right ? { start: left, end: right } : { start: right, end: left };
}
function spanTooltip(span, t) {
  const heading = t(laneKey(span.lane));
  const range = t("timeline.range", { from: clockTime(span.start), to: clockTime(span.end) });
  const total = t("timeline.total", { duration: durationMillis(span.end - span.start, t) });
  const split = span.ttftMs === void 0 || span.generationMs === void 0 ? null : t("timeline.ttftDecoding", {
    ttft: durationMillis(span.ttftMs, t),
    decoding: durationMillis(span.generationMs, t)
  });
  return [`${heading} ${range}`, [total, split].filter((part) => part !== null).join(" \xB7 ")].join("\n");
}
function GraphTimeline({
  spans,
  scope,
  onScope,
  hasEarlier,
  onLoadEarlier,
  loadingEarlier,
  t
}) {
  const [mode, setMode] = (0, import_react2.useState)("sequence");
  const [viewport, setViewport] = (0, import_react2.useState)(null);
  const [draft, setDraft] = (0, import_react2.useState)(null);
  const [hover, setHover] = (0, import_react2.useState)(null);
  const trackRef = (0, import_react2.useRef)(null);
  const dragRef = (0, import_react2.useRef)(null);
  const panRef = (0, import_react2.useRef)(null);
  const brushedRef = (0, import_react2.useRef)(false);
  const model = (0, import_react2.useMemo)(() => deriveGraphTimeline(spans, mode), [spans, mode]);
  const fullStart = model?.start ?? 0;
  const fullDuration = Math.max(1, (model?.end ?? 1) - fullStart);
  const domainDuration = viewport === null ? fullDuration : Math.min(fullDuration, Math.max(1, viewport.end - viewport.start));
  const domainStart = viewport === null ? fullStart : Math.min(Math.max(viewport.start, fullStart), fullStart + fullDuration - domainDuration);
  (0, import_react2.useEffect)(() => {
    const track = trackRef.current;
    if (track === null) return;
    const onWheel = (event) => {
      event.preventDefault();
      const rect = track.getBoundingClientRect();
      const anchor = clampFraction((event.clientX - rect.left) / Math.max(1, rect.width));
      const floor = Math.min(
        mode === "sequence" ? MINIMUM_ZOOM_OPERATIONS : MINIMUM_ZOOM_MS,
        fullDuration
      );
      const next = Math.min(
        fullDuration,
        Math.max(floor, domainDuration * Math.exp(event.deltaY * ZOOM_RATE))
      );
      if (next >= fullDuration) {
        setViewport(null);
        return;
      }
      const anchored = domainStart + anchor * domainDuration;
      const start = Math.min(
        Math.max(anchored - anchor * next, fullStart),
        fullStart + fullDuration - next
      );
      setViewport({ start, end: start + next });
    };
    track.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      track.removeEventListener("wheel", onWheel);
    };
  }, [domainDuration, domainStart, fullDuration, fullStart, mode]);
  const fractionAt = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return clampFraction((event.clientX - rect.left) / Math.max(1, rect.width));
  };
  const overSpan = (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    return target?.closest("[data-span]") !== null;
  };
  const onPointerDown = (event) => {
    if (typeof event.currentTarget.setPointerCapture === "function") {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (event.button === 2) {
      if (viewport === null) return;
      panRef.current = { pointerId: event.pointerId, clientX: event.clientX, start: domainStart };
      return;
    }
    if (event.button !== 0) return;
    const anchor = domainStart + fractionAt(event) * domainDuration;
    dragRef.current = { pointerId: event.pointerId, anchor, clientX: event.clientX };
    setDraft({ start: anchor, end: anchor });
  };
  const onPointerMove = (event) => {
    setHover({ fraction: fractionAt(event), overSpan: overSpan(event) });
    const pan = panRef.current;
    if (pan !== null && pan.pointerId === event.pointerId) {
      const rect = event.currentTarget.getBoundingClientRect();
      const delta = (event.clientX - pan.clientX) / Math.max(1, rect.width);
      const start = Math.min(
        Math.max(pan.start - delta * domainDuration, fullStart),
        fullStart + fullDuration - domainDuration
      );
      setViewport({ start, end: start + domainDuration });
      return;
    }
    const drag = dragRef.current;
    if (drag === null || drag.pointerId !== event.pointerId) return;
    let nextDomainStart = domainStart;
    if (viewport !== null) {
      const rect = event.currentTarget.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const edgeWidth = Math.min(
        MAXIMUM_EDGE_PAN_PX,
        Math.max(1, rect.width * EDGE_PAN_ZONE_FRACTION)
      );
      const direction = localX < edgeWidth ? -1 : localX > rect.width - edgeWidth ? 1 : 0;
      if (direction !== 0) {
        const edgeDistance = direction < 0 ? edgeWidth - localX : localX - (rect.width - edgeWidth);
        const strength = clampFraction(edgeDistance / edgeWidth);
        const desiredStart = domainStart + direction * domainDuration * EDGE_PAN_STEP_FRACTION * Math.max(0.2, strength);
        nextDomainStart = Math.min(
          Math.max(desiredStart, fullStart),
          fullStart + fullDuration - domainDuration
        );
        if (nextDomainStart !== domainStart) {
          setViewport({ start: nextDomainStart, end: nextDomainStart + domainDuration });
        }
      }
    }
    const pointTime = nextDomainStart + fractionAt(event) * domainDuration;
    setDraft(orderedBand(drag.anchor, pointTime));
  };
  const onPointerEnd = (event) => {
    const pan = panRef.current;
    if (pan !== null && pan.pointerId === event.pointerId) {
      panRef.current = null;
      return;
    }
    const drag = dragRef.current;
    if (drag === null || drag.pointerId !== event.pointerId) return;
    const band2 = orderedBand(drag.anchor, domainStart + fractionAt(event) * domainDuration);
    dragRef.current = null;
    setDraft(null);
    if (Math.abs(event.clientX - drag.clientX) < MINIMUM_DRAG_PX) return;
    brushedRef.current = true;
    const covered = (model?.spans ?? []).filter((item) => item.end >= band2.start && item.start <= band2.end).map((item) => item.span);
    const next = scopeForSpans(covered);
    if (next !== null) onScope(next);
  };
  const onPointerCancel = () => {
    dragRef.current = null;
    panRef.current = null;
    setDraft(null);
    setHover(null);
  };
  const resetViewport = () => {
    setViewport(null);
  };
  const onKeyDown = (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    resetViewport();
  };
  const band = model === null ? null : scopeBand(model, scope);
  const selection = draft ?? band;
  const percent = (value) => (value - domainStart) / domainDuration * 100;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: import_GraphView3.default.timeline, role: "region", "aria-label": t("timeline.aria"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: import_GraphView3.default.tlHead, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: import_GraphView3.default.modes, role: "group", children: [["actual", "timeline.actual"], ["sequence", "timeline.sequence"]].map(
      ([id, key]) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          type: "button",
          className: import_GraphView3.default.mode,
          "aria-pressed": mode === id,
          onClick: () => {
            setMode(id);
            setViewport(null);
          },
          children: t(key)
        },
        id
      )
    ) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: import_GraphView3.default.tlPlot, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: import_GraphView3.default.tlLabels, "aria-hidden": "true", children: [0, 1, 2].map((lane) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t(laneKey(lane)) }, lane)) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          ref: trackRef,
          className: import_GraphView3.default.tlBody,
          "data-timeline-track": "",
          tabIndex: 0,
          onKeyDown,
          onPointerDown,
          onPointerMove,
          onPointerUp: onPointerEnd,
          onPointerCancel,
          onPointerLeave: () => {
            if (dragRef.current === null && panRef.current === null) setHover(null);
          },
          onDoubleClick: (event) => {
            event.preventDefault();
            resetViewport();
          },
          onContextMenu: (event) => {
            event.preventDefault();
          },
          onClickCapture: (event) => {
            if (!brushedRef.current) return;
            brushedRef.current = false;
            event.stopPropagation();
          },
          children: [
            hasEarlier && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_dsh_client_ui_primitives.Tooltip,
              {
                label: loadingEarlier ? t("history.loadingEarlier") : t("history.loadEarlier"),
                side: "right",
                delayMs: TIMELINE_TOOLTIP_DELAY_MS,
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "button",
                  {
                    type: "button",
                    className: import_GraphView3.default.tlEarlier,
                    "aria-label": loadingEarlier ? t("history.loadingEarlier") : t("history.loadEarlier"),
                    "aria-disabled": loadingEarlier || onLoadEarlier === void 0,
                    onClick: onLoadEarlier,
                    onPointerDown: (event) => {
                      event.stopPropagation();
                    },
                    children: "\u2026"
                  }
                )
              }
            ),
            hover !== null && !hover.overSpan && draft === null && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: import_GraphView3.default.tlHover,
                "aria-hidden": "true",
                style: { left: `${hover.fraction * 100}%` }
              }
            ),
            selection !== null && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: draft === null ? import_GraphView3.default.tlBand : import_GraphView3.default.tlBrush,
                  "aria-hidden": "true",
                  style: {
                    left: `${percent(selection.start)}%`,
                    width: `${(selection.end - selection.start) / domainDuration * 100}%`
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: import_GraphView3.default.tlEdge,
                  "aria-hidden": "true",
                  style: { left: `${percent(selection.start)}%` }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: import_GraphView3.default.tlEdge,
                  "aria-hidden": "true",
                  style: { left: `${percent(selection.end)}%` }
                }
              )
            ] }),
            model?.turnTicks.map((tick) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "span",
              {
                className: import_GraphView3.default.tlTick,
                "data-turn": tick.turn,
                "aria-hidden": "true",
                style: { left: `${percent(tick.at)}%` }
              },
              tick.turn
            )),
            (model?.spans ?? []).filter((item) => item.end >= domainStart && item.start <= domainStart + domainDuration).map((item, index) => {
              const selected = spanInScope(item.span, scope);
              return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                import_dsh_client_ui_primitives.Tooltip,
                {
                  label: () => spanTooltip(item.span, t),
                  side: "bottom",
                  delayMs: TIMELINE_TOOLTIP_DELAY_MS,
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "button",
                    {
                      type: "button",
                      className: selected ? `${import_GraphView3.default.tlSpan} ${import_GraphView3.default.tlSpanSel}` : import_GraphView3.default.tlSpan,
                      "data-lane": item.span.lane,
                      "data-span": item.span.id,
                      "data-error": item.span.isError,
                      "aria-pressed": selected,
                      "aria-label": t("timeline.spanAria", {
                        lane: t(laneKey(item.span.lane)),
                        index: index + 1
                      }),
                      style: {
                        left: `${percent(item.start)}%`,
                        width: `${Math.max(0.6, (item.end - item.start) / domainDuration * 100)}%`,
                        top: `${4 + item.span.lane * 14}px`
                      },
                      onClick: () => {
                        onScope(spanScope(item.span));
                      }
                    }
                  )
                },
                item.span.id
              );
            })
          ]
        }
      )
    ] })
  ] });
}

// src/client/inspect.ts
var PREVIEW_CHARACTERS = 48;
var SOURCE_MECHANISMS = {
  system: "ctx.systemPrompt.section()",
  tools: "ctx.tools",
  context: "agent.inject()",
  history: "deriveMessages()",
  results: "tool/result"
};
var SEGMENT_KEYS = {
  system: "seg.system",
  tools: "seg.tools",
  context: "seg.context",
  history: "seg.history",
  results: "seg.results"
};
var CHANGE_KEYS2 = {
  "initial": "change.initial",
  "system": "change.system",
  "tools": "change.tools",
  "system-and-tools": "change.systemAndTools"
};
var STATUS_KEYS2 = {
  running: "status.pending",
  complete: "status.completed",
  error: "status.failed"
};
function preview(text) {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.length > PREVIEW_CHARACTERS ? `${compact.slice(0, PREVIEW_CHARACTERS).trimEnd()}\u2026` : compact;
}
function nodeText(node) {
  const blocks = node.content;
  return blocks.map((block) => block.text ?? "").join(" ");
}
function toolNameOf(event) {
  return event.call?.name ?? event.callId;
}
function blockBody(block) {
  if (block.kind === "text" || block.kind === "reasoning") return preview(block.text);
  if (block.kind === "tool-call") return block.name;
  return block.kind;
}
function compactionInScope(request, scope) {
  if (scope.kind === "session") return true;
  if (scope.kind === "step") return false;
  return request.turn === scope.turn;
}
function turnsInScope(snapshot, scope) {
  if (scope.kind === "session") return snapshot.turns;
  return snapshot.turns.filter((turn) => turn.turn === scope.turn);
}
function group(id, title, rows, open, total) {
  if (rows.length === 0) return [];
  return [{ id, title, rows, open, ...total === void 0 ? {} : { total } }];
}
function assembleGroups(snapshot, trajectory, scope, t) {
  const segments = assembleSegments(snapshot, scope);
  const sources = segments.map((segment) => ({
    id: `seg-${segment.id}`,
    lead: t(SEGMENT_KEYS[segment.id]),
    body: SOURCE_MECHANISMS[segment.id],
    trailing: compactTokens(segment.tokens, t),
    segment: segment.id,
    ...segment.active ? {} : { muted: true }
  }));
  const changes = stepsInScope(snapshot, scope).flatMap((step) => {
    const kind = step.promptKind;
    if (kind === void 0) return [];
    return [{
      id: `change-${step.turn}-${step.step}`,
      lead: t("group.step", { step: step.step }),
      body: t(CHANGE_KEYS2[kind])
    }];
  });
  const compactions = [...trajectory.requests].sort((left, right) => left.startSeq - right.startSeq).flatMap((request, index) => {
    if (request.purpose !== "compaction" || !compactionInScope(request, scope)) return [];
    return [{
      id: `compaction-${request.startSeq}`,
      lead: t("request.label", { request: index + 1 }),
      body: request.turn === null ? t("request.compaction", { section: t("section.betweenTurns") }) : t("group.compaction")
    }];
  });
  const totals = scopeTotals(snapshot, scope);
  return [
    ...group(
      "sources",
      t("group.assembleSources"),
      sources,
      true,
      compactTokens(totals.inputTokens, t)
    ),
    ...group("changes", t("group.promptChanges"), changes, false),
    ...group("compactions", t("group.compaction"), compactions, false)
  ];
}
function requestGroups(snapshot, scope, t) {
  const totals = scopeTotals(snapshot, scope);
  const steps = stepsInScope(snapshot, scope);
  const status = steps[steps.length - 1]?.status;
  const overview = [
    ...status === void 0 ? [] : [{ id: "status", lead: t("details.status"), body: t(STATUS_KEYS2[status]) }],
    ...snapshot.provider === void 0 ? [] : [{ id: "provider", lead: t("details.provider"), body: snapshot.provider }],
    ...snapshot.model === void 0 ? [] : [{ id: "model", lead: t("details.model"), body: snapshot.model }],
    { id: "calls", lead: t("details.toolCalls"), body: String(totals.calls) }
  ];
  const usage = totals.inputTokens + totals.outputTokens === 0 ? [] : [
    { id: "input", lead: t("usage.input"), body: exactTokens(totals.inputTokens, t) },
    { id: "cached", lead: t("usage.cached"), body: exactTokens(totals.cacheReadTokens, t) },
    { id: "output", lead: t("usage.output"), body: exactTokens(totals.outputTokens, t) }
  ];
  const timing = totals.timedSteps === 0 ? [] : [
    {
      id: "total",
      lead: t("timing.totalDuration"),
      body: durationMillis(totals.ttftMs + totals.generationMs, t)
    },
    { id: "ttft", lead: t("timing.ttft"), body: durationMillis(totals.ttftMs, t) },
    { id: "generation", lead: t("timing.generation"), body: durationMillis(totals.generationMs, t) }
  ];
  const retries = steps.flatMap((step) => step.retry === void 0 ? [] : [{
    id: `retry-${step.turn}-${step.step}`,
    lead: t("group.step", { step: step.step }),
    body: t("card.retry", { retry: step.retry, maximum: step.maxRetries ?? totals.maxRetries }),
    ok: false
  }]);
  return [
    ...group("overview", t("group.overview"), overview, true),
    ...group("usage", t("group.usage"), usage, true),
    ...group("timing", t("group.timing"), timing, true),
    ...group("retries", t("group.retries"), retries, true)
  ];
}
function inputGroups(snapshot, trajectory, scope, t) {
  const users = scope.kind === "session" ? snapshot.users : snapshot.userTurns.filter((turn) => turn === scope.turn).length;
  const resumed = stepsInScope(snapshot, scope).reduce((sum, step) => sum + step.incomingResults, 0);
  const sources = [
    { id: "user", lead: t("source.user"), body: "user/message", trailing: String(users) },
    { id: "results", lead: t("source.results"), body: "tool/result", trailing: String(resumed) }
  ];
  const messages = trajectory.eventNodes.flatMap((event) => {
    if (event.kind !== "user" && event.kind !== "steering") return [];
    if (!locationInScope(trajectory.eventLocations.get(event.seq), scope)) return [];
    return [{
      id: `msg-${event.seq}`,
      lead: event.kind,
      body: preview(nodeText(event))
    }];
  });
  return [
    ...group("sources", t("group.sources"), sources, true),
    ...group("messages", t("group.messages"), messages, true)
  ];
}
function assistantGroups(trajectory, scope, t) {
  const messages = trajectory.eventNodes.filter((event) => {
    if (event.kind !== "assistant") return false;
    if (scope.kind === "session") return true;
    if (event.turn !== scope.turn) return false;
    return scope.kind === "turn" || event.step === scope.step;
  });
  return messages.flatMap((message, index) => group(
    `msg-${message.seq}`,
    t("group.step", { step: message.step }),
    message.blocks.map((block, blockIndex) => ({
      id: `block-${message.seq}-${blockIndex}`,
      lead: t("block.label", { index: blockIndex + 1 }),
      body: `${block.kind} \xB7 ${blockBody(block)}`,
      ...block.kind === "tool-call" ? { callId: block.callId } : {}
    })),
    index === 0
  ));
}
function toolGroups(snapshot, trajectory, scope, t) {
  const results = trajectory.eventNodes.filter((event) => event.kind === "tool-result" && locationInScope(trajectory.eventLocations.get(event.seq), scope));
  const running = trajectory.runningCalls.filter((call) => {
    if (scope.kind === "session") return true;
    if (call.turn !== scope.turn) return false;
    return scope.kind === "turn" || call.step === scope.step;
  });
  const names = [];
  for (const name of [
    ...results.map(toolNameOf),
    ...running.map((call) => call.name)
  ]) {
    if (!names.includes(name)) names.push(name);
  }
  if (names.length === 0) {
    const steps = stepsInScope(snapshot, scope);
    const only = scope.kind === "step" ? steps[0] : void 0;
    if (only?.isLast !== true) return [];
    return group("none", t("node.tool"), [
      { id: "none", lead: t("card.toolsNone"), body: t("drawer.noCalls") }
    ], true);
  }
  return names.flatMap((name, index) => {
    const rows = [
      ...results.filter((event) => toolNameOf(event) === name).map((event) => ({
        id: `tool-${event.seq}`,
        lead: `#${event.seq}`,
        body: preview(event.call?.argsRaw ?? ""),
        ...event.callTime === null ? {} : { trailing: durationMillis(event.time - event.callTime, t) },
        ok: !event.isError,
        callId: event.callId
      })),
      ...running.filter((call) => call.name === name).map((call) => ({
        id: `run-${call.callId}`,
        lead: t("status.pending"),
        body: preview(call.argsRaw),
        callId: call.callId
      }))
    ];
    const elapsed = results.reduce((sum, event) => {
      if (toolNameOf(event) !== name || event.callTime === null) return sum;
      return sum + (event.time - event.callTime);
    }, 0);
    return group(
      `tool-${name}`,
      name,
      rows,
      index === 0,
      elapsed === 0 ? void 0 : durationMillis(elapsed, t)
    );
  });
}
function logGroups(trajectory, scope, t) {
  const counts = /* @__PURE__ */ new Map();
  for (const event of trajectory.eventNodes) {
    if (!locationInScope(trajectory.eventLocations.get(event.seq), scope)) continue;
    counts.set(event.kind, (counts.get(event.kind) ?? 0) + 1);
  }
  const rows = [...counts].map(([kind, count]) => ({
    id: `log-${kind}`,
    lead: String(count),
    body: kind
  }));
  return group("events", t("group.events"), rows, true);
}
function turnendGroups(snapshot, scope, t) {
  const rows = turnsInScope(snapshot, scope).map((turn) => {
    const calls = turn.steps.reduce((sum, step) => sum + step.calls, 0);
    return {
      id: `turn-${turn.turn}`,
      lead: t("turn.label", { turn: turn.turn }),
      body: t("rail.summary", {
        steps: t(
          turn.steps.length === 1 ? "turn.stepCount.one" : "turn.stepCount.other",
          { count: turn.steps.length }
        ),
        toolCalls: t(
          calls === 1 ? "summary.toolCalls.one" : "summary.toolCalls.other",
          { count: calls }
        )
      }),
      // The end status lives in its own column; it is not a tool-call count.
      trailing: turn.ended ? t("card.turnendFired") : t("card.turnendRunning"),
      ...turn.ended ? { ok: turn.halt === void 0 } : {}
    };
  });
  return group("turns", t("group.turns"), rows, true);
}
function llmGroups(snapshot, t) {
  const config = snapshot.requestConfig;
  if (config === void 0) return [];
  const rows = [];
  const push = (field, value) => {
    rows.push({ id: `opt-${field}`, lead: field, body: value });
  };
  push("provider", config.provider);
  push("model", config.model);
  if (config.purpose !== void 0) push("purpose", config.purpose);
  if (config.thinking !== void 0) push("thinking", config.thinking);
  if (config.reasoningEffort !== void 0) push("reasoningEffort", config.reasoningEffort);
  if (config.temperature !== void 0) push("temperature", String(config.temperature));
  if (config.maxTokens !== void 0) push("maxTokens", String(config.maxTokens));
  if (config.stop !== void 0 && config.stop.length > 0) push("stop", config.stop.join(", "));
  return group("options", t("group.options"), rows, true);
}
function workspaceGroups(snapshot, scope, t) {
  const totals = scopeTotals(snapshot, scope);
  const rows = Object.entries(totals.toolCounts).map(([name, count]) => ({
    id: `op-${name}`,
    lead: name,
    body: "ctx.fs \xB7 ctx.shell",
    trailing: String(count)
  }));
  return group("operations", t("group.operations"), rows, true);
}
function drawerGroups(node, snapshot, trajectory, scope, t) {
  switch (node) {
    case "input":
      return inputGroups(snapshot, trajectory, scope, t);
    case "assemble":
      return assembleGroups(snapshot, trajectory, scope, t);
    case "request":
      return requestGroups(snapshot, scope, t);
    case "assistant":
      return assistantGroups(trajectory, scope, t);
    case "tool":
      return toolGroups(snapshot, trajectory, scope, t);
    case "log":
      return logGroups(trajectory, scope, t);
    case "turnend":
      return turnendGroups(snapshot, scope, t);
    case "llm":
      return llmGroups(snapshot, t);
    case "workspace":
      return workspaceGroups(snapshot, scope, t);
    // The sandbox node is reserved: no backend mounts behind it yet.
    case "sandbox":
      return [];
  }
}

// src/client/layout.ts
function snapToGrid(value) {
  return Math.round(value / GRAPH_SNAP_GRID) * GRAPH_SNAP_GRID;
}
function snapPoint(point) {
  return { x: snapToGrid(point.x), y: snapToGrid(point.y) };
}
function cloneDefaultPositions() {
  return Object.fromEntries(
    GRAPH_NODES.map((node) => [node.id, { x: node.x, y: node.y }])
  );
}
function nodeRect(id, position) {
  const spec = GRAPH_NODE_BY_ID[id];
  return { x: position.x, y: position.y, w: spec.w, h: spec.h };
}
function hasCustomLayout(positions) {
  return GRAPH_NODES.some((node) => {
    const placed = positions[node.id];
    const origin = GRAPH_DEFAULT_POSITIONS[node.id];
    return placed.x !== origin.x || placed.y !== origin.y;
  });
}
function computeCanvasFit(clientWidth, clientHeight) {
  const scale = clientWidth <= 0 ? 1 : Math.max(0.5, Math.min(1, (clientWidth - 32) / GRAPH_CANVAS_WIDTH));
  const pad = clientHeight <= 0 ? 12 : Math.max(12, (clientHeight - GRAPH_CANVAS_HEIGHT * scale) / 2);
  return {
    scale,
    offsetX: 16 / scale,
    offsetY: pad / scale
  };
}
function fitFromElement(element) {
  if (element === null) return computeCanvasFit(0, 0);
  return computeCanvasFit(element.clientWidth, element.clientHeight);
}

// src/client/route.ts
var SIDES = ["t", "r", "b", "l"];
var NORM = {
  t: [0, -1],
  r: [1, 0],
  b: [0, 1],
  l: [-1, 0]
};
var DIRECTION_PENALTY = 130;
var OCCUPANCY_PENALTY = 46;
var COLLINEAR_CROSS = 0.5;
var MIN_LABEL_LENGTH = 22;
var SHORT_LABEL_LENGTH = 70;
function hypot(dx, dy) {
  return Math.hypot(dx, dy);
}
function anchorAt(rect, side, fraction) {
  if (side === "t") return { x: rect.x + rect.w * fraction, y: rect.y };
  if (side === "b") return { x: rect.x + rect.w * fraction, y: rect.y + rect.h };
  if (side === "l") return { x: rect.x, y: rect.y + rect.h * fraction };
  return { x: rect.x + rect.w, y: rect.y + rect.h * fraction };
}
function centre(rect) {
  return { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 };
}
function extend(point, side, distance) {
  const normal = NORM[side];
  return { x: point.x + normal[0] * distance, y: point.y + normal[1] * distance };
}
function isVertical(side) {
  return side === "t" || side === "b";
}
function mergeCollinear(raw) {
  const merged = [];
  for (const [index, current] of raw.entries()) {
    const next = raw[index + 1];
    const previous = merged[merged.length - 1];
    if (next === void 0 || previous === void 0) {
      merged.push(current);
      continue;
    }
    const cross = (current.x - previous.x) * (next.y - previous.y) - (current.y - previous.y) * (next.x - previous.x);
    if (Math.abs(cross) > COLLINEAR_CROSS) merged.push(current);
  }
  return merged;
}
function orthogonalPath(start, fromSide, end, toSide) {
  const gap = hypot(end.x - start.x, end.y - start.y);
  const out = Math.max(9, Math.min(26, gap / 3));
  const first = extend(start, fromSide, out);
  const last = extend(end, toSide, out);
  const fromVertical = isVertical(fromSide);
  const toVertical = isVertical(toSide);
  let mid;
  if (fromVertical && toVertical) {
    const y = (first.y + last.y) / 2;
    mid = [{ x: first.x, y }, { x: last.x, y }];
  } else if (!fromVertical && !toVertical) {
    const x = (first.x + last.x) / 2;
    mid = [{ x, y: first.y }, { x, y: last.y }];
  } else if (fromVertical) {
    mid = [{ x: first.x, y: last.y }];
  } else {
    mid = [{ x: last.x, y: first.y }];
  }
  const raw = [start, first, ...mid, last, end].filter((point, index, points) => {
    if (index === 0) return true;
    const prev = points[index - 1];
    return hypot(point.x - prev.x, point.y - prev.y) > 1;
  });
  return mergeCollinear(raw);
}
function longestSegment(points) {
  let best;
  let prev;
  for (const end of points) {
    if (prev !== void 0) {
      const length = hypot(end.x - prev.x, end.y - prev.y);
      if (best === void 0 || length > best.length) best = { length, start: prev, end };
    }
    prev = end;
  }
  return best;
}
function rectsOf(positions) {
  const rects = {};
  for (const spec of GRAPH_NODES) {
    rects[spec.id] = nodeRect(spec.id, positions[spec.id]);
  }
  return rects;
}
function routeGraph(positions) {
  const rects = rectsOf(positions);
  const occupancy = {};
  const chosen = /* @__PURE__ */ new Map();
  for (const edge of GRAPH_EDGES) {
    const fromRect = rects[edge.from];
    const toRect = rects[edge.to];
    let best = { cost: Number.POSITIVE_INFINITY, fromSide: "t", toSide: "t" };
    for (const fromSide of SIDES) {
      for (const toSide of SIDES) {
        const start = anchorAt(fromRect, fromSide, 0.5);
        const end = anchorAt(toRect, toSide, 0.5);
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const distance = hypot(dx, dy) || 1;
        const ux = dx / distance;
        const uy = dy / distance;
        const fromNormal = NORM[fromSide];
        const toNormal = NORM[toSide];
        const fromPenalty = (1 - (fromNormal[0] * ux + fromNormal[1] * uy)) * DIRECTION_PENALTY;
        const toPenalty = (1 - (toNormal[0] * -ux + toNormal[1] * -uy)) * DIRECTION_PENALTY;
        const occupied = ((occupancy[`${edge.from}${fromSide}`] ?? 0) + (occupancy[`${edge.to}${toSide}`] ?? 0)) * OCCUPANCY_PENALTY;
        const cost = distance + fromPenalty + toPenalty + occupied;
        if (cost < best.cost) best = { cost, fromSide, toSide };
      }
    }
    chosen.set(edge.id, { fromSide: best.fromSide, toSide: best.toSide });
    occupancy[`${edge.from}${best.fromSide}`] = (occupancy[`${edge.from}${best.fromSide}`] ?? 0) + 1;
    occupancy[`${edge.to}${best.toSide}`] = (occupancy[`${edge.to}${best.toSide}`] ?? 0) + 1;
  }
  const assigned = Object.fromEntries(chosen);
  const buckets = {};
  for (const edge of GRAPH_EDGES) {
    const sides = assigned[edge.id];
    const fromKey = `${edge.from}|${sides.fromSide}`;
    const toKey = `${edge.to}|${sides.toSide}`;
    (buckets[fromKey] ?? (buckets[fromKey] = [])).push({ edge, end: "from" });
    (buckets[toKey] ?? (buckets[toKey] = [])).push({ edge, end: "to" });
  }
  const fraction = {};
  for (const [key, list] of Object.entries(buckets)) {
    const side = key.split("|")[1];
    const axis = isVertical(side) ? "x" : "y";
    list.sort((left, right) => {
      const leftPeer = centre(rects[left.end === "from" ? left.edge.to : left.edge.from]);
      const rightPeer = centre(rects[right.end === "from" ? right.edge.to : right.edge.from]);
      return leftPeer[axis] - rightPeer[axis];
    });
    list.forEach((item, index) => {
      fraction[`${item.edge.id}${item.end}`] = (index + 1) / (list.length + 1);
    });
  }
  return GRAPH_EDGES.map((edge) => {
    const sides = assigned[edge.id];
    const start = anchorAt(rects[edge.from], sides.fromSide, fraction[`${edge.id}from`]);
    const end = anchorAt(rects[edge.to], sides.toSide, fraction[`${edge.id}to`]);
    const points = orthogonalPath(start, sides.fromSide, end, sides.toSide);
    const longest = longestSegment(points);
    const vertical = Math.abs(longest.end.x - longest.start.x) < 2;
    const mid = {
      x: (longest.start.x + longest.end.x) / 2,
      y: (longest.start.y + longest.end.y) / 2
    };
    const shortLift = longest.length < SHORT_LABEL_LENGTH ? 14 : 0;
    return {
      spec: edge,
      points,
      labelAt: (edge.label ?? edge.labelKey) !== void 0 && longest.length > MIN_LABEL_LENGTH ? {
        x: vertical ? mid.x + 12 : mid.x,
        y: vertical ? mid.y + 4 + shortLift : mid.y - 9
      } : null,
      labelVertical: vertical,
      stepAt: edge.step !== void 0 ? mid : null
    };
  });
}

// src/client/GraphView.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var SEG_KEYS = {
  system: "seg.system",
  tools: "seg.tools",
  context: "seg.context",
  history: "seg.history",
  results: "seg.results"
};
function segmentParts(segments, t) {
  return segments.map((segment) => t("seg.item", {
    name: t(SEG_KEYS[segment.id]),
    tokens: compactTokens(segment.tokens, t)
  }));
}
function AssembleBar({
  segments,
  t
}) {
  const parts = segmentParts(segments, t);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.segs, "aria-hidden": "true", children: segments.map((segment, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "span",
      {
        className: segment.active ? import_GraphView4.default.segOn : import_GraphView4.default.segOff,
        "data-seg": segment.id,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", { className: import_GraphView4.default.segSwatch }),
          parts[index]
        ]
      },
      segment.id
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.segBar, "aria-hidden": "true", children: segments.map((segment) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "i",
      {
        className: segment.active ? import_GraphView4.default.segFillOn : import_GraphView4.default.segFill,
        "data-seg": segment.id,
        style: { flex: segment.weight }
      },
      segment.id
    )) })
  ] });
}
function pathD(points) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"}${Math.round(point.x)},${Math.round(point.y)}`).join(" ");
}
function edgeLabel(spec, t, calls, results) {
  const base = spec.labelKey === void 0 ? spec.label : t(spec.labelKey);
  if (spec.id === "e_call" && calls > 0) return `${base} \xD7${calls}`;
  if (spec.id === "e_logT" && results > 0) return `${base} \xD7${results}`;
  return base;
}
function GraphWires({
  routed,
  arrowId,
  arrowEmphId,
  dimmed,
  labels,
  widths
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "svg",
    {
      className: import_GraphView4.default.wires,
      "aria-hidden": "true",
      viewBox: `0 0 ${GRAPH_CANVAS_WIDTH} ${GRAPH_CANVAS_HEIGHT}`,
      width: GRAPH_CANVAS_WIDTH,
      height: GRAPH_CANVAS_HEIGHT,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("defs", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "marker",
            {
              id: arrowId,
              viewBox: "0 0 10 10",
              refX: 8.5,
              refY: 5,
              markerUnits: "userSpaceOnUse",
              markerWidth: 12,
              markerHeight: 12,
              orient: "auto-start-reverse",
              children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M0,0.6 L9.4,5 L0,9.4 z", className: import_GraphView4.default.head })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "marker",
            {
              id: arrowEmphId,
              viewBox: "0 0 10 10",
              refX: 8.5,
              refY: 5,
              markerUnits: "userSpaceOnUse",
              markerWidth: 12,
              markerHeight: 12,
              orient: "auto-start-reverse",
              children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M0,0.6 L9.4,5 L0,9.4 z", className: import_GraphView4.default.headEmph })
            }
          )
        ] }),
        routed.map((edge) => {
          const marker = edge.spec.emph ? arrowEmphId : arrowId;
          const wireClass = [
            import_GraphView4.default.wire,
            edge.spec.emph === true ? import_GraphView4.default.wireEmph : "",
            edge.spec.dash === true ? import_GraphView4.default.wireDash : "",
            dimmed.has(edge.spec.id) ? import_GraphView4.default.wireDim : ""
          ].filter((part) => part !== "").join(" ");
          return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("g", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "path",
              {
                d: pathD(edge.points),
                className: wireClass,
                strokeWidth: widths[edge.spec.id],
                markerEnd: `url(#${marker})`,
                markerStart: edge.spec.both === true ? `url(#${marker})` : void 0
              }
            ),
            !dimmed.has(edge.spec.id) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "path",
              {
                d: pathD(edge.points),
                className: edge.spec.emph === true ? import_GraphView4.default.flowEmph : import_GraphView4.default.flow,
                strokeWidth: widths[edge.spec.id]
              }
            ),
            edge.labelAt !== null && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "text",
              {
                className: edge.spec.emph === true ? `${import_GraphView4.default.tip} ${import_GraphView4.default.tipEmph}` : import_GraphView4.default.tip,
                x: Math.round(edge.labelAt.x),
                y: Math.round(edge.labelAt.y),
                textAnchor: edge.labelVertical ? "start" : "middle",
                children: labels[edge.spec.id]
              }
            ),
            edge.stepAt !== null && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("g", { className: import_GraphView4.default.step, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: Math.round(edge.stepAt.x), cy: Math.round(edge.stepAt.y), r: 9 }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("text", { x: Math.round(edge.stepAt.x), y: Math.round(edge.stepAt.y) + 3.4, children: edge.spec.step })
            ] })
          ] }, edge.spec.id);
        })
      ]
    }
  );
}
function isSet(value) {
  return value !== void 0 && value !== "";
}
function nodeAriaLabel(spec, reading, segments, t) {
  const parts = [t("node.aria", { title: t(spec.titleKey), source: spec.source })];
  for (const value of [reading.badge, reading.flag, reading.flagBad]) {
    if (isSet(value)) parts.push(value);
  }
  if (spec.id === "assemble") {
    parts.push(t("seg.aria", { parts: segmentParts(segments, t).join(" \xB7 ") }));
  }
  for (const value of [reading.meta, reading.last]) {
    if (isSet(value)) parts.push(value);
  }
  return parts.join(" \xB7 ");
}
function mergePositions(stored) {
  const merged = cloneDefaultPositions();
  for (const spec of GRAPH_NODES) {
    const point = stored[spec.id];
    if (point !== void 0) merged[spec.id] = point;
  }
  return merged;
}
function prefersReducedMotion() {
  return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function GraphView({
  t,
  useGraph,
  useLayout,
  useSession,
  useTrajectory,
  openView,
  setLayout,
  resetLayout,
  loadOlder
}) {
  const snapshot = useGraph((value) => value);
  const stored = useLayout((value) => value);
  const trajectory = useTrajectory((value) => value);
  const hasEarlier = useSession((value) => value.hasMore);
  const loadingEarlier = useSession((value) => value.loadingOlder);
  const positions = (0, import_react3.useMemo)(() => mergePositions(stored), [stored]);
  const [scopeChoice, setScopeChoice] = (0, import_react3.useState)(null);
  const scope = scopeChoice ?? defaultScope(snapshot);
  const selectScope = (0, import_react3.useCallback)((next) => {
    setReplaying(false);
    setScopeChoice(next);
  }, []);
  const [selected, setSelected] = (0, import_react3.useState)(null);
  const [mode, setMode] = (0, import_react3.useState)("panorama");
  const [weight, setWeight] = (0, import_react3.useState)("calls");
  const [expanded, setExpanded] = (0, import_react3.useState)(false);
  const [replaying, setReplaying] = (0, import_react3.useState)(false);
  const [fit, setFit] = (0, import_react3.useState)(() => fitFromElement(null));
  const [draggingId, setDraggingId] = (0, import_react3.useState)(null);
  const canvasRef = (0, import_react3.useRef)(null);
  const scaleRef = (0, import_react3.useRef)(fit.scale);
  scaleRef.current = fit.scale;
  const dragRef = (0, import_react3.useRef)(null);
  const snapshotRef = (0, import_react3.useRef)(snapshot);
  snapshotRef.current = snapshot;
  const scopeRef = (0, import_react3.useRef)(scope);
  scopeRef.current = scope;
  const replayIndex = (0, import_react3.useRef)(0);
  const uid = (0, import_react3.useId)().replace(/:/g, "");
  const arrowId = `graph-arrow-${uid}`;
  const arrowEmphId = `graph-arrow-emph-${uid}`;
  const readings = (0, import_react3.useMemo)(() => cardReadings(snapshot, scope, t), [snapshot, scope, t]);
  const dimmed = (0, import_react3.useMemo)(() => inactiveEdges(snapshot, scope), [snapshot, scope]);
  const focus = (0, import_react3.useMemo)(() => focusedNodes(mode), [mode]);
  const segments = (0, import_react3.useMemo)(() => assembleSegments(snapshot, scope), [snapshot, scope]);
  const scopedSteps = (0, import_react3.useMemo)(() => stepsInScope(snapshot, scope), [snapshot, scope]);
  const calls = scopedSteps.reduce((sum, step) => sum + step.calls, 0);
  const results = scopedSteps.reduce((sum, step) => sum + step.results, 0);
  const routed = (0, import_react3.useMemo)(() => routeGraph(positions), [positions]);
  const widths = (0, import_react3.useMemo)(() => edgeWidths(snapshot, scope, weight), [snapshot, scope, weight]);
  const labels = (0, import_react3.useMemo)(() => {
    const next = {};
    for (const spec of GRAPH_EDGES) {
      const label = edgeLabel(spec, t, calls, results);
      if (label !== void 0) next[spec.id] = label;
    }
    return next;
  }, [calls, results, t]);
  const custom = hasCustomLayout(positions);
  const groups = selected === null ? [] : drawerGroups(selected, snapshot, trajectory, scope, t);
  const applyFit = (0, import_react3.useCallback)(() => {
    setFit(fitFromElement(canvasRef.current));
  }, []);
  (0, import_react3.useEffect)(() => {
    applyFit();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(applyFit);
    observer.observe(canvasRef.current);
    return () => {
      observer.disconnect();
    };
  }, [applyFit]);
  (0, import_react3.useEffect)(() => {
    if (!replaying) return;
    const current = snapshotRef.current;
    const currentScope = scopeRef.current;
    const turnNo = currentScope.kind === "session" ? current.latestTurn : currentScope.turn;
    const steps = current.turns.find((turn) => turn.turn === turnNo)?.steps ?? [];
    if (steps.length === 0) {
      setReplaying(false);
      return;
    }
    const reduced = prefersReducedMotion();
    const applyIndex = (index) => {
      const step = steps[index];
      if (step === void 0) return false;
      setScopeChoice({ kind: "step", turn: step.turn, step: step.step });
      replayIndex.current = index;
      return true;
    };
    applyIndex(0);
    if (reduced) {
      setReplaying(false);
      return;
    }
    const timer = window.setInterval(() => {
      const next = replayIndex.current + 1;
      if (!applyIndex(next)) {
        window.clearInterval(timer);
        setReplaying(false);
      }
    }, 800);
    return () => {
      window.clearInterval(timer);
    };
  }, [replaying]);
  const onNodePointerDown = (id, event) => {
    if (event.button !== 0) return;
    if (typeof event.currentTarget.setPointerCapture === "function") {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    dragRef.current = {
      id,
      origin: positions[id],
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
      moved: false
    };
    setDraggingId(id);
  };
  const onNodePointerMove = (event) => {
    const drag = dragRef.current;
    if (drag === null || drag.pointerId !== event.pointerId) return;
    const dx = (event.clientX - drag.pointerX) / scaleRef.current;
    const dy = (event.clientY - drag.pointerY) / scaleRef.current;
    if (!drag.moved && Math.hypot(dx, dy) < 4) return;
    drag.moved = true;
    setLayout({
      ...positions,
      [drag.id]: snapPoint({ x: drag.origin.x + dx, y: drag.origin.y + dy })
    });
  };
  const onNodePointerUp = (event) => {
    const drag = dragRef.current;
    if (drag === null || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDraggingId(null);
    if (drag.moved) return;
    setSelected((current) => current === drag.id ? null : drag.id);
  };
  const openTrajectory = (callId) => {
    openView("trajectory", callId);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: import_GraphView4.default.root, role: "region", "aria-label": t("view.graph"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: import_GraphView4.default.toolbar, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: import_GraphView4.default.modes, role: "group", children: [
        ["panorama", "mode.panorama"],
        ["request", "mode.request"],
        ["context", "mode.context"]
      ].map(([id, key]) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          type: "button",
          className: import_GraphView4.default.mode,
          "aria-pressed": mode === id,
          onClick: () => {
            setMode(id);
          },
          children: t(key)
        },
        id
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          type: "button",
          className: import_GraphView4.default.mode,
          "aria-pressed": replaying,
          onClick: () => {
            setReplaying((value) => !value);
          },
          children: t("replay.label")
        }
      ),
      custom && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: import_GraphView4.default.reset, onClick: () => {
        resetLayout();
      }, children: t("layout.reset") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.spacer }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.note, children: t("toolbar.weight") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: import_GraphView4.default.modes, role: "group", children: [["calls", "weight.calls"], ["tokens", "weight.tokens"]].map(([id, key]) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          type: "button",
          className: import_GraphView4.default.mode,
          "aria-pressed": weight === id,
          onClick: () => {
            setWeight(id);
          },
          children: t(key)
        },
        id
      )) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      GraphTimeline,
      {
        spans: snapshot.spans,
        scope,
        onScope: selectScope,
        hasEarlier,
        onLoadEarlier: () => {
          void loadOlder();
        },
        loadingEarlier,
        t
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: import_GraphView4.default.body, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        GraphRail,
        {
          snapshot,
          scope,
          expanded,
          onScope: selectScope,
          onExpand: () => {
            setExpanded(true);
          },
          t
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ref: canvasRef, className: import_GraphView4.default.canvas, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "div",
        {
          className: import_GraphView4.default.scaler,
          style: {
            transform: `scale(${fit.scale}) translate(${fit.offsetX}px, ${fit.offsetY}px)`,
            width: GRAPH_CANVAS_WIDTH * fit.scale,
            height: GRAPH_CANVAS_HEIGHT * fit.scale + fit.offsetY * fit.scale * 2
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            "div",
            {
              className: import_GraphView4.default.stage,
              style: { width: GRAPH_CANVAS_WIDTH, height: GRAPH_CANVAS_HEIGHT },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  GraphWires,
                  {
                    routed,
                    arrowId,
                    arrowEmphId,
                    dimmed,
                    labels,
                    widths
                  }
                ),
                GRAPH_NODES.map((spec) => {
                  const position = positions[spec.id];
                  const faded = focus.size > 0 && !focus.has(spec.id);
                  const nodeClass = [
                    import_GraphView4.default.node,
                    spec.reserved === true ? import_GraphView4.default.reserved : "",
                    draggingId === spec.id ? import_GraphView4.default.nodeDragging : "",
                    faded ? import_GraphView4.default.nodeFaded : ""
                  ].filter((part) => part !== "").join(" ");
                  const reading = readings[spec.id] ?? {};
                  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
                    "button",
                    {
                      type: "button",
                      className: nodeClass,
                      "data-kind": spec.kind,
                      "data-node": spec.id,
                      "aria-pressed": selected === spec.id,
                      "aria-label": nodeAriaLabel(spec, reading, segments, t),
                      style: {
                        left: position.x,
                        top: position.y,
                        width: spec.w,
                        height: spec.h
                      },
                      onPointerDown: (event) => {
                        onNodePointerDown(spec.id, event);
                      },
                      onPointerMove: onNodePointerMove,
                      onPointerUp: onNodePointerUp,
                      onPointerCancel: onNodePointerUp,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: import_GraphView4.default.headRow, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.dot, "aria-hidden": "true" }),
                          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.title, children: t(spec.titleKey) }),
                          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.kind, "aria-hidden": "true", children: t(spec.kindKey) }),
                          isSet(reading.flag) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.flag, children: reading.flag }),
                          isSet(reading.flagBad) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.flagBad, children: reading.flagBad }),
                          isSet(reading.badge) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.badge, children: reading.badge })
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.source, children: spec.source }),
                        spec.id === "assemble" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(AssembleBar, { segments, t }),
                        isSet(reading.meta) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.meta, children: reading.meta }),
                        isSet(reading.last) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_GraphView4.default.last, children: reading.last })
                      ]
                    },
                    spec.id
                  );
                })
              ]
            }
          )
        }
      ) }),
      selected !== null && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        GraphDrawer,
        {
          title: t(GRAPH_NODE_BY_ID[selected].titleKey),
          groups,
          onClose: () => {
            setSelected(null);
          },
          onOpen: openTrajectory,
          t
        }
      )
    ] })
  ] });
}

// src/client/layout-store.ts
var import_dsh_client_store = require("@deepseek-ai/dsh-client-store");
var GRAPH_LAYOUT_PERSIST = "dsh.graph.layout";
function createGraphLayoutStore() {
  return (0, import_dsh_client_store.createSnapshotStore)(cloneDefaultPositions(), {
    persist: { name: GRAPH_LAYOUT_PERSIST }
  });
}

// src/client/locales.ts
var NS = "graph";
var zh = {
  "view.graph": "\u67B6\u6784\u56FE",
  "layout.reset": "\u6062\u590D\u9ED8\u8BA4\u5E03\u5C40",
  "node.aria": "{title}\uFF0C{source}",
  "node.input": "\u8F93\u5165",
  "node.assemble": "\u63D0\u793A\u8BCD\u88C5\u914D",
  "node.request": "\u6A21\u578B\u8BF7\u6C42",
  "node.assistant": "\u52A9\u624B\u6D88\u606F",
  "node.tool": "\u5DE5\u5177\u8C03\u7528",
  "node.log": "\u4F1A\u8BDD\u65E5\u5FD7",
  "node.turnend": "\u8F6E\u6B21\u7ED3\u675F",
  "node.llm": "DeepSeek API",
  "node.sandbox": "\u6C99\u7BB1",
  "node.workspace": "\u5DE5\u4F5C\u533A",
  "edge.derive": "deriveMessages() \xB7 \u4E0B\u4E00\u6B65",
  "edge.end": "\u81EA\u7136\u505C\u6B62 \xB7 inbox \u4E3A\u7A7A",
  "kind.session": "session",
  "kind.core": "core",
  "kind.llm": "llm",
  "kind.tools": "tools",
  "kind.storage": "storage",
  "kind.external": "external",
  "kind.security": "security",
  "scope.session": "\u5168\u4F1A\u8BDD",
  "rail.aria": "\u8F6E\u6B21",
  "rail.expand": "\u5C55\u5F00\u5168\u90E8",
  "rail.summary": "{steps} \xB7 {toolCalls}",
  "summary.steps.one": "{count} \u4E2A\u6B65\u9AA4",
  "summary.steps.other": "{count} \u4E2A\u6B65\u9AA4",
  "summary.toolCalls.one": "{count} \u4E2A\u5DE5\u5177\u8C03\u7528",
  "summary.toolCalls.other": "{count} \u4E2A\u5DE5\u5177\u8C03\u7528",
  "section.betweenTurns": "\u8F6E\u6B21\u4E4B\u95F4",
  "request.compaction": "\u538B\u7F29 \xB7 {section}",
  "toolbar.weight": "\u94FE\u8DEF\u6743\u91CD",
  "weight.calls": "\u8C03\u7528\u6570",
  "weight.tokens": "Token",
  "timeline.aria": "\u65F6\u95F4\u7EBF",
  "timeline.actual": "\u5B9E\u9645\u65F6\u957F",
  "timeline.sequence": "\u7B49\u5BBD",
  "timeline.spanAria": "{lane} {index}",
  "timeline.total": "\u603B\u8BA1 {duration}",
  "timeline.ttftDecoding": "\u9996 token {ttft} \xB7 \u89E3\u7801 {decoding}",
  "timeline.range": "{from} \u2192 {to}",
  "history.loadEarlier": "\u52A0\u8F7D\u66F4\u65E9\u7684\u5386\u53F2",
  "history.loadingEarlier": "\u6B63\u5728\u52A0\u8F7D\u66F4\u65E9\u7684\u5386\u53F2\u2026",
  "group.assembleSources": "\u672C\u6B65\u6784\u6210",
  "group.promptChanges": "\u63D0\u793A\u8BCD\u53D8\u66F4",
  "group.compaction": "\u538B\u7F29",
  "group.overview": "\u6982\u8FF0",
  "group.usage": "\u7528\u91CF",
  "group.timing": "\u8BA1\u65F6",
  "group.retries": "\u91CD\u8BD5",
  "group.blocks": "\u5757",
  "group.messages": "\u6D88\u606F",
  "group.sources": "\u6765\u6E90",
  "group.events": "SessionEvent",
  "group.turns": "\u8F6E\u6B21",
  "group.options": "\u8BF7\u6C42\u9009\u9879",
  "group.operations": "\u64CD\u4F5C",
  "drawer.noCalls": "\u52A9\u624B\u6D88\u606F\u672A\u4EA7\u751F tool-call \u5757 \u2192 \u8F6E\u6B21\u53EF\u7ED3\u675F",
  "block.label": "\u5757 #{index}",
  "details.status": "\u72B6\u6001",
  "details.toolCalls": "\u5DE5\u5177\u8C03\u7528",
  "usage.input": "\u8F93\u5165",
  "usage.cached": "\u7F13\u5B58\u8BFB\u53D6",
  "usage.output": "\u8F93\u51FA",
  "timing.totalDuration": "\u603B\u65F6\u957F",
  "timing.ttft": "\u9996 token \u5EF6\u8FDF",
  "timing.generation": "\u751F\u6210",
  "source.user": "\u7528\u6237",
  "source.results": "\u5DE5\u5177\u7ED3\u679C",
  "turn.stepCount.one": "{count} \u6B65",
  "turn.stepCount.other": "{count} \u6B65",
  "drawer.aria": "\u8BE6\u60C5",
  "drawer.close": "\u5173\u95ED\u8BE6\u60C5",
  "drawer.empty": "\u65E0\u5185\u5BB9",
  "mode.panorama": "\u5168\u666F",
  "mode.request": "\u4E00\u6B21\u8C03\u7528\u600E\u4E48\u8D70",
  "mode.context": "\u4E0A\u4E0B\u6587\u600E\u4E48\u53D8\u7684",
  "replay.label": "\u6309\u6B65\u9AA4\u56DE\u653E",
  "turn.label": "\u7B2C {turn} \u8F6E",
  "group.step": "\u6B65\u9AA4 {step}",
  "request.label": "\u8BF7\u6C42 #{request}",
  "request.labelCompaction": "\u8BF7\u6C42 #{request} \xB7 \u538B\u7F29",
  "request.range": "\u8BF7\u6C42 #{from}\u2013#{to}",
  "request.count": "{count} \u6B21\u8BF7\u6C42",
  "status.failed": "\u5931\u8D25",
  "status.pending": "\u7B49\u5F85\u4E2D",
  "status.completed": "\u5DF2\u5B8C\u6210",
  "halt.stopped": "\u5DF2\u505C\u6B62",
  "halt.maxTokens": "max_tokens",
  "column.input": "\u8F93\u5165",
  "column.model": "\u6A21\u578B",
  "column.tools": "\u5DE5\u5177",
  "unit.tokens": "{value} tok",
  "unit.tokensCompact": "{value}k",
  "unit.seconds": "{value} \u79D2",
  "unit.milliseconds": "{value} \u6BEB\u79D2",
  "seg.system": "\u7CFB\u7EDF",
  "seg.tools": "\u5DE5\u5177",
  "seg.context": "\u4E0A\u4E0B\u6587",
  "seg.history": "\u5386\u53F2",
  "seg.results": "\u5DE5\u5177\u7ED3\u679C",
  "seg.aria": "\u63D0\u793A\u8BCD\u88C5\u914D\u6784\u6210\uFF1A{parts}",
  "seg.item": "{name} {tokens}",
  "card.inputSource": "user/message \xB7 \u6765\u6E90\uFF1A\u7528\u6237",
  "card.inputSourceCount": "user/message {count} \u6761 \xB7 \u6765\u6E90\uFF1A\u7528\u6237",
  "card.inputResumed": "\u65E0\u65B0\u8F93\u5165 \xB7 \u7531\u5DE5\u5177\u7ED3\u679C\u7EED\u8DD1",
  "card.userQuote": "\u201C{text}\u201D",
  "card.wokenBy": "\u4E0A\u4E00\u6B65 {count} \u4E2A tool/result \u5524\u9192\u672C\u6B65",
  "card.restResumed": "\u5176\u4F59 {count} \u6B65\u7531\u5DE5\u5177\u7ED3\u679C\u7EED\u8DD1",
  "card.promptChange": "\u672C\u6B65\u53D8\u66F4\uFF1A{change}",
  "card.promptResults": "\u672C\u6B65\u65B0\u589E\uFF1A\u5DE5\u5177\u7ED3\u679C",
  "card.promptUnchanged": "\u672C\u6B65\u65E0\u63D0\u793A\u8BCD\u53D8\u66F4",
  "card.assembleTurn": "\u672C\u8F6E\u88C5\u914D {count} \u6B21 \xB7 \u6BCF\u6B65\u91CD\u65B0\u88C5\u914D",
  "card.assembleSession": "\u6BCF\u6B65\u5E73\u5747 \xB7 \u538B\u7F29 {compactions} \u6B21 \xB7 \u63D0\u793A\u8BCD\u53D8\u66F4 {changes} \u6B21",
  "change.initial": "\u521D\u59CB\u7CFB\u7EDF\u63D0\u793A\u8BCD",
  "change.system": "\u7CFB\u7EDF\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0",
  "change.tools": "\u5DE5\u5177\u5DF2\u66F4\u65B0",
  "change.systemAndTools": "\u7CFB\u7EDF\u63D0\u793A\u8BCD\u548C\u5DE5\u5177\u5DF2\u66F4\u65B0",
  "card.timing": "\u9996 token {ttft} \xB7 \u751F\u6210 {generation} \xB7 \u5171 {total}",
  "card.timingAverage": "\u6BCF\u6B65\u5E73\u5747 \xB7 \u9996 token {ttft} \xB7 \u751F\u6210 {generation}",
  "card.usage": "\u8F93\u5165 {input}\uFF08\u7F13\u5B58\u8BFB\u53D6 {cached}\uFF09\xB7 \u8F93\u51FA {output}",
  "card.retry": "\u91CD\u8BD5 {retry}/{maximum}",
  "card.retryCount": "\u91CD\u8BD5 {count}",
  "card.blocks": "\u5757\uFF1A\u601D\u8003 {think} \xB7 \u6587\u672C {text} \xB7 \u5DE5\u5177\u8C03\u7528 {call}",
  "card.messages": "assistant/message {count} \u6761",
  "card.toolsStep": "\u672C\u6B65 {count} \u6B21 \xB7 \u7528\u65F6 {duration}",
  "card.toolsNone": "\u672C\u6B65\u65E0\u5DE5\u5177\u8C03\u7528",
  "card.toolsIdle": "\u65E0\u5DE5\u5177\u8C03\u7528",
  "card.toolsTotal": "\u7D2F\u8BA1 {duration}",
  "card.toolsLastStep": "\u672B\u6B65\u65E0\u8C03\u7528 \u2192 \u8F6E\u6B21\u53EF\u7ED3\u675F",
  "card.toolsFailed": "\u5931\u8D25 {count}",
  "card.logStep": "\u672C\u6B65 {count} \u6761 SessionEvent",
  "card.logTurn": "\u672C\u8F6E {count} \u6761 SessionEvent",
  "card.logSession": "{count} \u6761 SessionEvent",
  "card.turnendPending": "\u4E0D\u6EE1\u8DB3 \xB7 \u672C\u6B65\u6B20\u5DE5\u5177\u7ED3\u679C",
  "card.turnendReady": "\u6761\u4EF6\u5DF2\u6EE1\u8DB3\uFF0C\u7B49\u5F85 turn-stopping",
  "card.turnendFired": "\u5DF2\u89E6\u53D1 \xB7 turn/end",
  "card.turnendRunning": "\u672A\u89E6\u53D1 \xB7 \u672C\u8F6E\u8FD0\u884C\u4E2D",
  "card.turnendSession": "{ended} \u8F6E\u5DF2\u7ED3\u675F \xB7 {running} \u8F6E\u8FD0\u884C\u4E2D",
  "card.workspaceIdle": "\u672C\u6B65\u672A\u89E6\u8FBE",
  "details.provider": "\u63D0\u4F9B\u65B9",
  "details.model": "\u6A21\u578B"
};
var en = {
  "view.graph": "Architecture",
  "layout.reset": "Restore default layout",
  "node.aria": "{title}, {source}",
  "node.input": "Input",
  "node.assemble": "Prompt assembly",
  "node.request": "Model request",
  "node.assistant": "Assistant Message",
  "node.tool": "Tool Call",
  "node.log": "Session log",
  "node.turnend": "Turn end",
  "node.llm": "DeepSeek API",
  "node.sandbox": "Sandbox",
  "node.workspace": "Workspace",
  "edge.derive": "deriveMessages() \xB7 next step",
  "edge.end": "Natural stop \xB7 inbox empty",
  "kind.session": "session",
  "kind.core": "core",
  "kind.llm": "llm",
  "kind.tools": "tools",
  "kind.storage": "storage",
  "kind.external": "external",
  "kind.security": "security",
  "scope.session": "Full session",
  "rail.aria": "Turns",
  "rail.expand": "Expand all",
  "rail.summary": "{steps} \xB7 {toolCalls}",
  "summary.steps.one": "{count} step",
  "summary.steps.other": "{count} steps",
  "summary.toolCalls.one": "{count} tool call",
  "summary.toolCalls.other": "{count} tool calls",
  "section.betweenTurns": "Between turns",
  "request.compaction": "Compaction \xB7 {section}",
  "toolbar.weight": "Link weight",
  "weight.calls": "Calls",
  "weight.tokens": "Tokens",
  "timeline.aria": "Timeline",
  "timeline.actual": "Actual duration",
  "timeline.sequence": "Equal width",
  "timeline.spanAria": "{lane} {index}",
  "timeline.total": "Total {duration}",
  "timeline.ttftDecoding": "TTFT {ttft} \xB7 decoding {decoding}",
  "timeline.range": "{from} \u2192 {to}",
  "history.loadEarlier": "Load earlier history",
  "history.loadingEarlier": "Loading earlier history\u2026",
  "group.assembleSources": "Sources this step",
  "group.promptChanges": "Prompt changes",
  "group.compaction": "Compaction",
  "group.overview": "Overview",
  "group.usage": "Usage",
  "group.timing": "Timing",
  "group.retries": "Retries",
  "group.blocks": "Blocks",
  "group.messages": "Messages",
  "group.sources": "Sources",
  "group.events": "SessionEvent",
  "group.turns": "Turns",
  "group.options": "Request options",
  "group.operations": "Operations",
  "drawer.noCalls": "The assistant message produced no tool-call block \u2192 the turn can end",
  "block.label": "Block #{index}",
  "details.status": "Status",
  "details.toolCalls": "Tool calls",
  "usage.input": "Input",
  "usage.cached": "Cached",
  "usage.output": "Output",
  "timing.totalDuration": "Total duration",
  "timing.ttft": "TTFT",
  "timing.generation": "Generation",
  "source.user": "User",
  "source.results": "Tool results",
  "turn.stepCount.one": "{count} step",
  "turn.stepCount.other": "{count} steps",
  "drawer.aria": "Details",
  "drawer.close": "Close details",
  "drawer.empty": "No content",
  "mode.panorama": "Panorama",
  "mode.request": "How one request runs",
  "mode.context": "How context changes",
  "replay.label": "Replay steps",
  "turn.label": "Turn {turn}",
  "group.step": "Step {step}",
  "request.label": "Request #{request}",
  "request.labelCompaction": "Request #{request} \xB7 compaction",
  "request.range": "Requests #{from}\u2013#{to}",
  "request.count": "{count} requests",
  "status.failed": "Failed",
  "status.pending": "Pending",
  "status.completed": "Completed",
  "halt.stopped": "Stopped",
  "halt.maxTokens": "max_tokens",
  "column.input": "Input",
  "column.model": "Model",
  "column.tools": "Tools",
  "unit.tokens": "{value} tok",
  "unit.tokensCompact": "{value}k",
  "unit.seconds": "{value} s",
  "unit.milliseconds": "{value} ms",
  "seg.system": "System",
  "seg.tools": "Tools",
  "seg.context": "Context",
  "seg.history": "History",
  "seg.results": "Tool results",
  "seg.aria": "Prompt assembly sources: {parts}",
  "seg.item": "{name} {tokens}",
  "card.inputSource": "user/message \xB7 Source: User",
  "card.inputSourceCount": "user/message \xD7{count} \xB7 Source: User",
  "card.inputResumed": "No new input \xB7 resumed by tool results",
  "card.userQuote": "\u201C{text}\u201D",
  "card.wokenBy": "{count} tool/result from the previous step woke this one",
  "card.restResumed": "The other {count} steps resumed on tool results",
  "card.promptChange": "Changed this step: {change}",
  "card.promptResults": "Added this step: tool results",
  "card.promptUnchanged": "No prompt change this step",
  "card.assembleTurn": "Assembled {count}\xD7 this turn \xB7 reassembled every step",
  "card.assembleSession": "Per-step average \xB7 {compactions} compactions \xB7 {changes} prompt changes",
  "change.initial": "Initial System Prompt",
  "change.system": "System Prompt Updated",
  "change.tools": "Tools Updated",
  "change.systemAndTools": "System Prompt and Tools Updated",
  "card.timing": "TTFT {ttft} \xB7 Generation {generation} \xB7 total {total}",
  "card.timingAverage": "Per-step average \xB7 TTFT {ttft} \xB7 Generation {generation}",
  "card.usage": "Input {input} (cached {cached}) \xB7 output {output}",
  "card.retry": "Retry {retry}/{maximum}",
  "card.retryCount": "Retry \xD7{count}",
  "card.blocks": "Blocks: Think {think} \xB7 Text {text} \xB7 Tool calls {call}",
  "card.messages": "assistant/message \xD7{count}",
  "card.toolsStep": "{count} this step \xB7 {duration}",
  "card.toolsNone": "No tool call this step",
  "card.toolsIdle": "No tool call",
  "card.toolsTotal": "{duration} total",
  "card.toolsLastStep": "No call in the last step \u2192 the turn can end",
  "card.toolsFailed": "Failed {count}",
  "card.logStep": "{count} SessionEvent this step",
  "card.logTurn": "{count} SessionEvent this turn",
  "card.logSession": "{count} SessionEvent",
  "card.turnendPending": "Not met \xB7 tool results outstanding this step",
  "card.turnendReady": "Met, waiting for turn-stopping",
  "card.turnendFired": "Fired \xB7 turn/end",
  "card.turnendRunning": "Not fired \xB7 turn running",
  "card.turnendSession": "{ended} turns ended \xB7 {running} running",
  "card.workspaceIdle": "Not touched this step",
  "details.provider": "Provider",
  "details.model": "Model"
};

// src/client/index.ts
var inject = ["slots", "locale", "uiConversation", "sessions"];
function apply(ctx) {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "ui-trajectory-graph: dictionaries");
  const t = ctx.locale.bind(NS);
  const layout = createGraphLayoutStore();
  const graphSources = /* @__PURE__ */ new Map();
  const graphSource = (sessionId) => {
    const existing = graphSources.get(sessionId);
    if (existing !== void 0) return existing;
    const source = createGraphSource(ctx.uiConversation.binding(sessionId).target("trajectory"));
    graphSources.set(sessionId, source);
    return source;
  };
  ctx.slots.inject("conversation.view", () => ctx.slots.register({
    name: "conversation.view",
    id: "graph",
    order: 20,
    locale: NS,
    label: () => t("view.graph"),
    inject: (sessionId) => {
      const session = ctx.sessions.binding(sessionId)?.session;
      if (session === void 0) {
        throw new Error(`ui-trajectory-graph: session "${sessionId}" is unavailable`);
      }
      const trajectory = ctx.uiConversation.binding(sessionId).target("trajectory");
      return {
        hooks: { graph: graphSource(sessionId), layout },
        setLayout: (positions) => {
          layout.set({ ...positions });
        },
        resetLayout: () => {
          layout.set(cloneDefaultPositions());
        },
        loadOlder: async () => {
          const before = trajectory.getSnapshot();
          await session.loadOlder();
          return trajectory.getSnapshot() !== before;
        }
      };
    }
  }, GraphView));
}

		return module.exports;
	}
});
