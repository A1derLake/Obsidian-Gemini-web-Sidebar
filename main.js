var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => GeminiSidebarPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var VIEW_TYPE_GEMINI = "gemini-web-view";
var GeminiView = class extends import_obsidian.ItemView {
  constructor(leaf) {
    super(leaf);
  }
  getViewType() {
    return VIEW_TYPE_GEMINI;
  }
  getDisplayText() {
    return "Gemini";
  }
  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    const webview = container.createEl("webview");
    webview.setAttribute("src", "https://gemini.google.com");
    webview.setAttribute("style", "width: 100%; height: 100%; border: none;");
    webview.setAttribute("useragent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0");
  }
  async onClose() {
  }
};
var GeminiSidebarPlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.registerView(
      VIEW_TYPE_GEMINI,
      (leaf) => new GeminiView(leaf)
    );
    this.addRibbonIcon("sparkles", "Open Gemini", () => {
      this.activateView();
    });
  }
  async activateView() {
    const { workspace } = this.app;
    let leaf = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_GEMINI);
    if (leaves.length > 0) {
      leaf = leaves[0];
    } else {
      leaf = workspace.getRightLeaf(false);
      if (leaf) {
        await leaf.setViewState({ type: VIEW_TYPE_GEMINI, active: true });
      }
    }
    if (leaf) {
      workspace.revealLeaf(leaf);
    }
  }
};
