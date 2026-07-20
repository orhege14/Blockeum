import { APP_STATE_KEY, THEME_KEY } from "../core/constants.js";

export function saveProject(project) {
  localStorage.setItem(APP_STATE_KEY, JSON.stringify(project));
}

export function loadProject() {
  try {
    const saved = JSON.parse(localStorage.getItem(APP_STATE_KEY) || "null");
    if (!saved) return null;
    return normalizeProject(saved.project || saved);
  } catch {
    return null;
  }
}

export function clearProject() {
  localStorage.removeItem(APP_STATE_KEY);
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || "dark";
}

export function createProject(name = "untitled") {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name,
    activeFile: "main.blocks",
    files: {
      "main.blocks": "",
      "README.md": "# CodeBlocks Studio project\n"
    },
    lang: "JavaScript",
    favorites: ["var_declare", "fn_define", "if_else", "ui_page"]
  };
}

export function normalizeProject(project) {
  const fresh = createProject(project?.name || "codeblocks-project");
  const lang = project?.lang === "HTML/CSS" ? "HTML/CSS/JS" : project?.lang;
  return {
    ...fresh,
    ...project,
    lang: lang || fresh.lang,
    activeFile: project?.activeFile || fresh.activeFile,
    files: project?.files || fresh.files,
    favorites: project?.favorites || fresh.favorites
  };
}
