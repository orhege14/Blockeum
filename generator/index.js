import { setupJavaScriptGenerator } from "./javascript.js";
import { setupPythonGenerator } from "./python.js";
import { setupCSharpGenerator } from "./csharp.js";
import { setupHtmlGenerator } from "./html.js";

export function setupGenerators() {
  setupJavaScriptGenerator();
  setupPythonGenerator();
  setupCSharpGenerator();
  setupHtmlGenerator();
}
