import { RUNTIME_BLOCKS } from "../blocks/definitions.js";
import { bind, esc, jsVal } from "./common.js";

export function setupJavaScriptGenerator() {
  const G = Blockly.JavaScript;
  const val = (b, n, d) => jsVal(G, b, n, d);
  G.typed_value = b => {
    const type = b.getFieldValue("TYPE");
    const raw = b.getFieldValue("VALUE");
    if (type === "number") return [Number(raw) || 0, G.ORDER_ATOMIC];
    if (type === "boolean") return [raw === "true" ? "true" : "false", G.ORDER_ATOMIC];
    return [`"${esc(raw)}"`, G.ORDER_ATOMIC];
  };
  G.var_declare = b => `let ${b.getFieldValue("NAME")} = ${val(b, "VALUE", "null")};\n`;
  G.var_set = b => `${b.getFieldValue("NAME")} = ${val(b, "VALUE", "null")};\n`;
  G.var_delete = b => `delete ${b.getFieldValue("NAME")};\n`;
  G.var_get = b => [b.getFieldValue("NAME"), G.ORDER_ATOMIC];
  G.object_create = b => [`{ ${b.getFieldValue("KEY1")}: ${val(b, "K1", "null")}, ${b.getFieldValue("KEY2")}: ${val(b, "K2", "null")} }`, G.ORDER_ATOMIC];
  G.object_get = b => [`${val(b, "OBJECT", "{}")}.${b.getFieldValue("KEY")}`, G.ORDER_ATOMIC];
  G.object_set = b => `${val(b, "OBJECT", "{}")}.${b.getFieldValue("KEY")} = ${val(b, "VALUE", "null")};\n`;
  G.array_create = b => [`[${val(b, "A", "null")}, ${val(b, "B", "null")}, ${val(b, "C", "null")}]`, G.ORDER_ATOMIC];
  G.array_get = b => [`${val(b, "ARRAY", "[]")}[${val(b, "INDEX", "0")}]`, G.ORDER_ATOMIC];
  G.array_push = b => `${val(b, "ARRAY", "[]")}.push(${val(b, "VALUE", "null")});\n`;
  G.array_length = b => [`${val(b, "ARRAY", "[]")}.length`, G.ORDER_ATOMIC];
  G.fn_define = b => `function ${b.getFieldValue("NAME")}(${b.getFieldValue("PARAMS")}) {\n${G.statementToCode(b, "BODY")}}\n`;
  G.fn_return = b => `return ${val(b, "VALUE", "null")};\n`;
  G.fn_call = b => [`${b.getFieldValue("NAME")}(${[val(b, "A", ""), val(b, "B", "")].filter(Boolean).join(", ")})`, G.ORDER_ATOMIC];
  G.if_else = b => `if (${val(b, "IF", "false")}) {\n${G.statementToCode(b, "THEN")}} else {\n${G.statementToCode(b, "ELSE")}}\n`;
  G.elseif = b => `else if (${val(b, "IF", "false")}) {\n${G.statementToCode(b, "THEN")}}\n`;
  G.while_loop = b => `while (${val(b, "IF", "false")}) {\n${G.statementToCode(b, "DO")}}\n`;
  G.for_loop = b => `for (let ${b.getFieldValue("VAR")} = ${b.getFieldValue("START")}; ${b.getFieldValue("VAR")} < ${b.getFieldValue("END")}; ${b.getFieldValue("VAR")} += ${b.getFieldValue("STEP") || 1}) {\n${G.statementToCode(b, "DO")}}\n`;
  G.foreach_loop = b => `for (const ${b.getFieldValue("ITEM")} of ${val(b, "ARRAY", "[]")}) {\n${G.statementToCode(b, "DO")}}\n`;
  G.try_catch = b => `try {\n${G.statementToCode(b, "TRY")}} catch (${b.getFieldValue("ERR")}) {\n${G.statementToCode(b, "CATCH")}}\n`;
  G.switch_case = b => `switch (${val(b, "VALUE", "null")}) {\ncase ${val(b, "CASE1", "null")}:\n${G.statementToCode(b, "DO1")}break;\ncase ${val(b, "CASE2", "null")}:\n${G.statementToCode(b, "DO2")}break;\ndefault:\n${G.statementToCode(b, "DEFAULT")}}\n`;
  G.math_op = b => [`(${val(b, "A", "0")} ${b.getFieldValue("OP")} ${val(b, "B", "0")})`, G.ORDER_ATOMIC];
  G.math_power = b => [`Math.pow(${val(b, "A", "0")}, ${val(b, "B", "0")})`, G.ORDER_ATOMIC];
  G.math_round = b => [`Math.${b.getFieldValue("MODE")}(${val(b, "VALUE", "0")})`, G.ORDER_ATOMIC];
  G.math_minmax = b => [`Math.${b.getFieldValue("MODE")}(${val(b, "A", "0")}, ${val(b, "B", "0")})`, G.ORDER_ATOMIC];
  G.random_number = b => [`Math.floor(Math.random() * (${b.getFieldValue("MAX")} - ${b.getFieldValue("MIN")} + 1)) + ${b.getFieldValue("MIN")}`, G.ORDER_ATOMIC];
  G.compare_op = b => [`(${val(b, "A", "0")} ${b.getFieldValue("OP")} ${val(b, "B", "0")})`, G.ORDER_ATOMIC];
  G.logic_op = b => [`(${val(b, "A", "false")} ${b.getFieldValue("OP") === "AND" ? "&&" : "||"} ${val(b, "B", "false")})`, G.ORDER_ATOMIC];
  G.logic_not = b => [`!(${val(b, "VALUE", "false")})`, G.ORDER_ATOMIC];
  G.text_join = b => [`String(${val(b, "A", '""')}) + String(${val(b, "B", '""')})`, G.ORDER_ATOMIC];
  G.text_length = b => [`String(${val(b, "VALUE", '""')}).length`, G.ORDER_ATOMIC];
  G.text_case = b => [`String(${val(b, "VALUE", '""')}).${b.getFieldValue("MODE") === "upper" ? "toUpperCase" : "toLowerCase"}()`, G.ORDER_ATOMIC];
  G.print_stmt = b => `console.log(${val(b, "VALUE", '""')});\n`;
  G.comment_stmt = b => `// ${b.getFieldValue("TEXT")}\n`;
  bind(G, RUNTIME_BLOCKS);
}
