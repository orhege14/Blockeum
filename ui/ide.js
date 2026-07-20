import { CODE_EXTENSION, LANG_BY_DATA, LANGS } from "../core/constants.js";
import { downloadFile, safeProjectName } from "../core/utils.js";
import { loadTheme, saveTheme } from "../storage/projectStore.js";
import { runJavaScript, showGeneratedOnly } from "../core/runtime.js";

export class IdeUi {
  constructor(app) {
    this.app = app;
    this.editor = null;
    this.updatingCode = false;
  }

  init() {
    this.bindToolbar();
    this.bindTabs();
    this.bindTheme();
    this.applyTheme(loadTheme());
    this.setupMonaco();
    this.renderFileTree();
    this.renderFavorites();
  }

  setupMonaco() {
    const target = document.getElementById("monacoEditor");
    if (!target || typeof require === "undefined") return;
    require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs" } });
    require(["vs/editor/editor.main"], () => {
      this.editor = monaco.editor.create(target, {
        value: "",
        language: LANGS[this.app.project.lang],
        theme: document.body.dataset.theme === "light" ? "vs" : "vs-dark",
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false }
      });
      this.app.updateCode();
      this.editor.onDidChangeModelContent(() => {

        if (this.updatingCode)
          return;


        const code =
          this.editor.getValue();


        if (code !== this.app.lastCode) {

          this.app.loadCodeAsBlocks(code);

        }

      });
    });
  }

  bindToolbar() {
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.app.project.lang = LANG_BY_DATA[btn.dataset.lang] || "JavaScript";
        this.syncLanguageButtons();
        this.app.updateCode();
      });
    });
    document.getElementById("newProjectBtn").addEventListener("click", () => this.app.newProject());
    document.getElementById("saveProjectBtn").addEventListener("click", () => this.app.save());
    document.getElementById("runBtn").addEventListener("click", () => this.run());
    document.getElementById("copyBtn").addEventListener("click", async () => navigator.clipboard.writeText(this.getCode()));
    document.getElementById("downloadBtn").addEventListener("click", () => downloadFile(`${safeProjectName(this.app.project.name)}.${CODE_EXTENSION[this.app.project.lang]}`, this.getCode()));
    document.getElementById("exportBtn").addEventListener("click", () => downloadFile(`${safeProjectName(this.app.project.name)}.codeblocks.json`, JSON.stringify(this.app.serialize(), null, 2), "application/json"));
    document.getElementById("importBtn").addEventListener("click", () => document.getElementById("importFile").click());
    document.getElementById("importFile").addEventListener("change", event => this.importProject(event));
    document.getElementById("projectName").addEventListener("input", event => {
      this.app.project.name = event.target.value;
      this.renderFileTree();
      this.app.save();
    });
    document.getElementById("blockSearch").addEventListener("input", event => this.filterToolbox(event.target.value));
    document.addEventListener("keydown", event => this.shortcuts(event));
  }

  bindTabs() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => this.openPanel(btn.dataset.tab));
    });
  }

  bindTheme() {
    document.getElementById("themeBtn").addEventListener("click", () => {
      this.applyTheme(document.body.dataset.theme === "light" ? "dark" : "light");
    });
  }

  applyTheme(theme) {
    document.body.dataset.theme = theme;
    saveTheme(theme);
    if (window.monaco && this.editor) monaco.editor.setTheme(theme === "light" ? "vs" : "vs-dark");
  }

  async importProject(event) {
    const file = event.target.files[0];
    if (!file) return;
    const text = await file.text();
    this.app.loadSerialized(JSON.parse(text));
    event.target.value = "";
  }

  shortcuts(event) {
    if (!event.ctrlKey && !event.metaKey) return;
    const key = event.key.toLowerCase();
    if (key === "s") {
      event.preventDefault();
      this.app.save();
    }
    if (key === "enter") {
      event.preventDefault();
      this.run();
    }
    if (key === "n") {
      event.preventDefault();
      this.app.newProject();
    }
  }

  run() {
    this.openPanel(this.app.project.lang === "HTML/CSS/JS" ? "preview" : "console");
    const consoleEl = document.querySelector(".console-output");
    if (this.app.project.lang === "JavaScript") runJavaScript(this.getCode(), consoleEl);
    else if (this.app.project.lang === "HTML/CSS/JS") this.app.updatePreview(this.getCode());
    else showGeneratedOnly(this.app.project.lang, consoleEl);
  }

  openPanel(name) {
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.tab === name));
    document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.toggle("active", pane.id === `${name}View`));
    if (this.editor) this.editor.layout();
  }

setCode(code) {

    if(this.editor) {


        this.updatingCode = true;


        this.editor.setValue(code);



        monaco.editor.setModelLanguage(
            this.editor.getModel(),
            LANGS[this.app.project.lang]
        );


        this.updatingCode = false;

    }

}

  getCode() {
    return this.editor ? this.editor.getValue() : this.app.lastCode;
  }

  updateStatus(code) {
    document.getElementById("blockCount").textContent = `${this.app.workspace.getAllBlocks(false).length} blok`;
    document.getElementById("lineCount").textContent = `${String(code || "").split("\n").length} satir`;
    document.getElementById("currentLang").textContent = this.app.project.lang;
    document.getElementById("projectName").value = this.app.project.name;
    this.syncLanguageButtons();
    this.renderProperties();
  }

  syncLanguageButtons() {
    const map = Object.entries(LANG_BY_DATA).find(([, value]) => value === this.app.project.lang);
    const active = map ? map[0] : "javascript";
    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === active));
  }

  updatePreview(code) {
    document.getElementById("previewFrame").srcdoc = code;
  }

  renderFileTree() {
    const tree = document.getElementById("fileTree");
    tree.innerHTML = "";
    Object.keys(this.app.project.files).forEach(file => {
      const item = document.createElement("button");
      item.className = file === this.app.project.activeFile ? "file-item active" : "file-item";
      item.innerHTML = `<i class="fas fa-file-code"></i><span>${file}</span>`;
      tree.appendChild(item);
    });
  }

  renderFavorites() {
    const target = document.getElementById("favoriteBlocks");
    target.innerHTML = this.app.project.favorites.map(type => `<button class="favorite-chip" data-block="${type}">${type}</button>`).join("");
  }

  renderProperties() {
    const selected = Blockly.getSelected && Blockly.getSelected();
    const panel = document.getElementById("propertyPanel");
    if (!selected) {
      panel.innerHTML = `<p class="muted">Bir blok secildiginde ozellikleri burada gorunur.</p>`;
      return;
    }
    panel.innerHTML = `<h3>${selected.type}</h3><p>ID: ${selected.id}</p><p>Inputs: ${selected.inputList.length}</p>`;
  }

  filterToolbox(query) {
    document.body.style.setProperty("--toolbox-filter", query);
    const labels = document.querySelectorAll(".blocklyTreeLabel");
    labels.forEach(label => {
      const row = label.closest(".blocklyTreeRow");
      if (!row) return;
      row.style.display = !query || label.textContent.toLowerCase().includes(query.toLowerCase()) ? "" : "none";
    });
  }
}
