import { htmlEsc } from "./utils.js";

function makeConsole(consoleEl) {
  return {
    clear() {
      consoleEl.innerHTML = "<pre></pre>";
    },
    log(message) {
      const pre = consoleEl.querySelector("pre") || consoleEl.appendChild(document.createElement("pre"));
      pre.textContent += `${message}\n`;
    }
  };
}

export async function runJavaScript(code, consoleEl) {
  const ideConsole = makeConsole(consoleEl);
  ideConsole.clear();
  try {
    const logs = [];
    const proxyConsole = { log: (...args) => logs.push(args.map(String).join(" ")) };
    const fn = new Function("console", `"use strict";\n${code}`);
    await fn(proxyConsole);
    logs.forEach(line => ideConsole.log(line));
    if (!logs.length) ideConsole.log("Program bitti. Cikti yok.");
  } catch (error) {
    ideConsole.log(`Runtime error: ${error.message}`);
  }
}

export function showGeneratedOnly(language, consoleEl) {
  consoleEl.innerHTML = `<pre>${htmlEsc(language)} icin kod uretildi. Direkt calistirma su an JavaScript ve HTML preview icin aktif.</pre>`;
}
