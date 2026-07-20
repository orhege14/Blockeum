import { UI_BLOCKS } from "../blocks/definitions.js";
import { bind, csv, esc, htmlEsc, jsVal, stripQuotes } from "./common.js";

export function setupHtmlGenerator() {
  const G = new Blockly.Generator("HTML");
  Blockly.HTML = G;
  G.ORDER_ATOMIC = 0;
  G.init = function () {};
  G.finish = code => code;
  G.scrub_ = (block, code) => {
    const next = block.nextConnection && block.nextConnection.targetBlock();
    return next ? code + G.blockToCode(next) : code;
  };
  const val = (b, n, d = "") => stripQuotes(jsVal(G, b, n, d));
  G.typed_value = b => [`"${esc(b.getFieldValue("VALUE"))}"`, G.ORDER_ATOMIC];
  G.text_join = b => [`"${esc(val(b, "A") + val(b, "B"))}"`, G.ORDER_ATOMIC];
  G.ui_page = b => `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${htmlEsc(b.getFieldValue("TITLE"))}</title>
</head>
<body>
${G.statementToCode(b, "BODY")}</body>
</html>
`;
  G.ui_div = b => `<div class="${htmlEsc(b.getFieldValue("CLASS"))}">
${G.statementToCode(b, "BODY")}</div>
`;
  G.ui_text = b => `<${b.getFieldValue("TAG")}>${htmlEsc(val(b, "TEXT", "Text"))}</${b.getFieldValue("TAG")}>\n`;
  G.ui_button = b => `<button id="${htmlEsc(b.getFieldValue("ID"))}">${htmlEsc(val(b, "TEXT", "Button"))}</button>\n`;
  G.ui_input = b => `<input type="${b.getFieldValue("TYPE")}" placeholder="${htmlEsc(b.getFieldValue("PLACEHOLDER"))}">\n`;
  G.ui_image = b => `<img src="${htmlEsc(b.getFieldValue("SRC"))}" alt="${htmlEsc(val(b, "ALT", "Image"))}">\n`;
  G.ui_navbar = b => `<nav class="navbar"><strong>${htmlEsc(b.getFieldValue("BRAND"))}</strong><a href="#">Home</a><a href="#">Projects</a><a href="#">Contact</a></nav>\n`;
  G.ui_card = b => `<article class="card"><h3>${htmlEsc(b.getFieldValue("TITLE"))}</h3>
${G.statementToCode(b, "BODY")}</article>
`;
  G.ui_form = b => `<form id="${htmlEsc(b.getFieldValue("ID"))}">
${G.statementToCode(b, "BODY")}</form>
`;
  G.ui_table = b => {
    const headers = csv(b.getFieldValue("HEADERS"));
    const row = csv(b.getFieldValue("ROW"));
    return `<table><thead><tr>${headers.map(h => `<th>${htmlEsc(h)}</th>`).join("")}</tr></thead><tbody><tr>${row.map(c => `<td>${htmlEsc(c)}</td>`).join("")}</tr></tbody></table>\n`;
  };
  G.ui_list = b => `<ul>${csv(b.getFieldValue("ITEMS")).map(i => `<li>${htmlEsc(i)}</li>`).join("")}</ul>\n`;
  G.css_rule = b => `<style>${b.getFieldValue("SELECTOR")}{${b.getFieldValue("RULES")}}</style>\n`;
  G.css_box = b => `<style>${b.getFieldValue("SELECTOR")}{color:${b.getFieldValue("COLOR")};font-size:${b.getFieldValue("SIZE")}px;margin:${b.getFieldValue("MARGIN")};padding:${b.getFieldValue("PADDING")};}</style>\n`;
  G.css_flex = b => `<style>${b.getFieldValue("SELECTOR")}{display:flex;align-items:center;gap:${b.getFieldValue("GAP")};}</style>\n`;
  G.css_grid = b => `<style>${b.getFieldValue("SELECTOR")}{display:grid;grid-template-columns:${b.getFieldValue("COLS")};gap:16px;}</style>\n`;
  G.css_hover = b => `<style>${b.getFieldValue("SELECTOR")}:hover{${b.getFieldValue("RULES")}}</style>\n`;
  G.css_animation = b => `<style>@keyframes ${b.getFieldValue("NAME")}{${b.getFieldValue("FRAMES")}}</style>\n`;
  G.js_event = b => `<script>document.getElementById("${esc(b.getFieldValue("ID"))}")?.addEventListener("click",()=>{${b.getFieldValue("CODE")}});<\/script>\n`;
  bind(G, UI_BLOCKS);
}
