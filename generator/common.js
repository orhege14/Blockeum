import { esc, htmlEsc, stripQuotes } from "../core/utils.js";

export { esc, htmlEsc, stripQuotes };

export function bind(generator, types) {
  if (!generator.forBlock) return;
  types.forEach(type => {
    if (typeof generator[type] === "function") generator.forBlock[type] = generator[type];
  });
}

export function csv(value) {
  return String(value || "")
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
}

export function jsVal(G, b, name, fallback = "null") {
  return G.valueToCode(b, name, G.ORDER_ATOMIC) || fallback;
}
