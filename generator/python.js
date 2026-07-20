import { RUNTIME_BLOCKS } from "../blocks/definitions.js";
import { bind, esc, jsVal } from "./common.js";

export function setupPythonGenerator() {
  const G = Blockly.Python;
  const val = (b, n, d) => jsVal(G, b, n, d);
  G.typed_value = b => {
    const type = b.getFieldValue("TYPE");
    const raw = b.getFieldValue("VALUE");
    if (type === "number") return [Number(raw) || 0, G.ORDER_ATOMIC];
    if (type === "boolean") return [raw === "true" ? "True" : "False", G.ORDER_ATOMIC];
    return [`"${esc(raw)}"`, G.ORDER_ATOMIC];
  };
  G.var_declare = b => `${b.getFieldValue("NAME")} = ${val(b, "VALUE", "None")}\n`;
  G.var_set = G.var_declare;
  G.var_delete = b => `del ${b.getFieldValue("NAME")}\n`;
  G.var_get = b => [b.getFieldValue("NAME"), G.ORDER_ATOMIC];
  G.object_create = b => [`{"${b.getFieldValue("KEY1")}": ${val(b, "K1", "None")}, "${b.getFieldValue("KEY2")}": ${val(b, "K2", "None")}}`, G.ORDER_ATOMIC];
  G.object_get = b => [`${val(b, "OBJECT", "{}")}.get("${b.getFieldValue("KEY")}")`, G.ORDER_ATOMIC];
  G.object_set = b => `${val(b, "OBJECT", "{}")}["${b.getFieldValue("KEY")}"] = ${val(b, "VALUE", "None")}\n`;
  G.array_create = b => [`[${val(b, "A", "None")}, ${val(b, "B", "None")}, ${val(b, "C", "None")}]`, G.ORDER_ATOMIC];
  G.array_get = b => [`${val(b, "ARRAY", "[]")}[${val(b, "INDEX", "0")}]`, G.ORDER_ATOMIC];
  G.array_push = b => `${val(b, "ARRAY", "[]")}.append(${val(b, "VALUE", "None")})\n`;
  G.array_length = b => [`len(${val(b, "ARRAY", "[]")})`, G.ORDER_ATOMIC];
  G.fn_define = b => `def ${b.getFieldValue("NAME")}(${b.getFieldValue("PARAMS")}):\n${G.statementToCode(b, "BODY") || "    pass\n"}`;
  G.fn_return = b => `return ${val(b, "VALUE", "None")}\n`;
  G.fn_call = b => [`${b.getFieldValue("NAME")}(${[val(b, "A", ""), val(b, "B", "")].filter(Boolean).join(", ")})`, G.ORDER_ATOMIC];
  G.if_else = b => `if ${val(b, "IF", "False")}:\n${G.statementToCode(b, "THEN") || "    pass\n"}else:\n${G.statementToCode(b, "ELSE") || "    pass\n"}`;
  G.elseif = b => `elif ${val(b, "IF", "False")}:\n${G.statementToCode(b, "THEN") || "    pass\n"}`;
  G.while_loop = b => `while ${val(b, "IF", "False")}:\n${G.statementToCode(b, "DO") || "    pass\n"}`;
  G.for_loop = b => `for ${b.getFieldValue("VAR")} in range(${b.getFieldValue("START")}, ${b.getFieldValue("END")}, ${b.getFieldValue("STEP") || 1}):\n${G.statementToCode(b, "DO") || "    pass\n"}`;
  G.foreach_loop = b => `for ${b.getFieldValue("ITEM")} in ${val(b, "ARRAY", "[]")}:\n${G.statementToCode(b, "DO") || "    pass\n"}`;
  G.try_catch = b => `try:\n${G.statementToCode(b, "TRY") || "    pass\n"}except Exception as ${b.getFieldValue("ERR")}:\n${G.statementToCode(b, "CATCH") || "    pass\n"}`;
  G.switch_case = b => `match ${val(b, "VALUE", "None")}:\n    case ${val(b, "CASE1", "None")}:\n${G.statementToCode(b, "DO1") || "        pass\n"}    case ${val(b, "CASE2", "None")}:\n${G.statementToCode(b, "DO2") || "        pass\n"}    case _:\n${G.statementToCode(b, "DEFAULT") || "        pass\n"}`;
  G.math_op = b => [`(${val(b, "A", "0")} ${b.getFieldValue("OP")} ${val(b, "B", "0")})`, G.ORDER_ATOMIC];
  G.math_power = b => [`(${val(b, "A", "0")} ** ${val(b, "B", "0")})`, G.ORDER_ATOMIC];
  G.math_round = b => [`${b.getFieldValue("MODE") === "round" ? "round" : "__import__('math')." + b.getFieldValue("MODE")}(${val(b, "VALUE", "0")})`, G.ORDER_ATOMIC];
  G.math_minmax = b => [`${b.getFieldValue("MODE")}(${val(b, "A", "0")}, ${val(b, "B", "0")})`, G.ORDER_ATOMIC];
  G.random_number = b => [`__import__("random").randint(${b.getFieldValue("MIN")}, ${b.getFieldValue("MAX")})`, G.ORDER_ATOMIC];
  G.compare_op = b => [`(${val(b, "A", "0")} ${b.getFieldValue("OP")} ${val(b, "B", "0")})`, G.ORDER_ATOMIC];
  G.logic_op = b => [`(${val(b, "A", "False")} ${b.getFieldValue("OP") === "AND" ? "and" : "or"} ${val(b, "B", "False")})`, G.ORDER_ATOMIC];
  G.logic_not = b => [`not (${val(b, "VALUE", "False")})`, G.ORDER_ATOMIC];
  G.text_join = b => [`str(${val(b, "A", '""')}) + str(${val(b, "B", '""')})`, G.ORDER_ATOMIC];
  G.text_length = b => [`len(str(${val(b, "VALUE", '""')}))`, G.ORDER_ATOMIC];
  G.text_case = b => [`str(${val(b, "VALUE", '""')}).${b.getFieldValue("MODE")}()`, G.ORDER_ATOMIC];
  G.print_stmt = b => `print(${val(b, "VALUE", '""')})\n`;
  G.comment_stmt = b => `# ${b.getFieldValue("TEXT")}\n`;
  bind(G, RUNTIME_BLOCKS);
}
