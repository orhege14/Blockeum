const C = {
  data: 285,
  text: 160,
  math: 220,
  logic: 210,
  flow: 120,
  list: 260,
  fn: 330,
  ui: 25,
  css: 45,
  system: 65
};

function statement(type, init) {
  Blockly.Blocks[type] = { init };
}

export const RUNTIME_BLOCKS = [
  "var_declare", "var_set", "var_delete", "var_get",
  "typed_value", "object_create", "object_get", "object_set",
  "array_create", "array_get", "array_push", "array_length",
  "fn_define", "fn_return", "fn_call",
  "if_else", "elseif", "while_loop", "for_loop", "foreach_loop", "try_catch", "switch_case",
  "math_op", "math_power", "math_round", "math_minmax", "random_number", "compare_op",
  "logic_op", "logic_not",
  "text_join", "text_length", "text_case",
  "print_stmt", "comment_stmt"
];

export const UI_BLOCKS = [
  "typed_value", "text_join",
  "ui_page", "ui_div", "ui_text", "ui_button", "ui_input", "ui_image",
  "ui_navbar", "ui_card", "ui_form", "ui_table", "ui_list",
  "css_rule", "css_box", "css_flex", "css_grid", "css_hover", "css_animation", "js_event"
];

export function defineBlocks() {
  statement("var_declare", function () {
    this.appendDummyInput()
      .appendField("create")
      .appendField(new Blockly.FieldDropdown([["string", "string"], ["number", "number"], ["boolean", "boolean"], ["array", "array"], ["object", "object"]]), "TYPE")
      .appendField(new Blockly.FieldTextInput("name"), "NAME");
    this.appendValueInput("VALUE").appendField("=");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.data);
  });
  statement("var_set", function () {
    this.appendDummyInput().appendField("set").appendField(new Blockly.FieldTextInput("name"), "NAME");
    this.appendValueInput("VALUE").appendField("to");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.data);
  });
  statement("var_delete", function () {
    this.appendDummyInput().appendField("delete variable").appendField(new Blockly.FieldTextInput("name"), "NAME");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.data);
  });
  statement("var_get", function () {
    this.appendDummyInput().appendField("variable").appendField(new Blockly.FieldTextInput("name"), "NAME");
    this.setOutput(true); this.setColour(C.data);
  });
  statement("typed_value", function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["string", "string"], ["number", "number"], ["boolean", "boolean"]]), "TYPE")
      .appendField(new Blockly.FieldTextInput("value"), "VALUE");
    this.setOutput(true); this.setColour(C.text);
  });
  statement("object_create", function () {
    this.appendDummyInput().appendField("object");
    this.appendValueInput("K1").appendField("key").appendField(new Blockly.FieldTextInput("title"), "KEY1");
    this.appendValueInput("K2").appendField("key").appendField(new Blockly.FieldTextInput("count"), "KEY2");
    this.setOutput(true); this.setColour(C.data);
  });
  statement("object_get", function () {
    this.appendValueInput("OBJECT").appendField("object");
    this.appendDummyInput().appendField(".").appendField(new Blockly.FieldTextInput("key"), "KEY");
    this.setOutput(true); this.setColour(C.data);
  });
  statement("object_set", function () {
    this.appendValueInput("OBJECT").appendField("set object");
    this.appendDummyInput().appendField(".").appendField(new Blockly.FieldTextInput("key"), "KEY");
    this.appendValueInput("VALUE").appendField("=");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.data);
  });
  statement("array_create", function () {
    this.appendValueInput("A").appendField("array");
    this.appendValueInput("B").appendField(",");
    this.appendValueInput("C").appendField(",");
    this.setOutput(true); this.setColour(C.list);
  });
  statement("array_get", function () {
    this.appendValueInput("ARRAY").appendField("array get");
    this.appendValueInput("INDEX").appendField("index");
    this.setOutput(true); this.setColour(C.list);
  });
  statement("array_push", function () {
    this.appendValueInput("ARRAY").appendField("array push");
    this.appendValueInput("VALUE").appendField("value");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.list);
  });
  statement("array_length", function () {
    this.appendValueInput("ARRAY").appendField("array length");
    this.setOutput(true); this.setColour(C.list);
  });

  statement("fn_define", function () {
    this.appendDummyInput().appendField("function").appendField(new Blockly.FieldTextInput("myFunction"), "NAME").appendField("params").appendField(new Blockly.FieldTextInput("a,b"), "PARAMS");
    this.appendStatementInput("BODY").appendField("body");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.fn);
  });
  statement("fn_return", function () {
    this.appendValueInput("VALUE").appendField("return");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.fn);
  });
  statement("fn_call", function () {
    this.appendDummyInput().appendField("call").appendField(new Blockly.FieldTextInput("myFunction"), "NAME");
    this.appendValueInput("A").appendField("arg");
    this.appendValueInput("B").appendField("arg");
    this.setOutput(true); this.setColour(C.fn);
  });

  statement("if_else", function () {
    this.appendValueInput("IF").appendField("if");
    this.appendStatementInput("THEN").appendField("then");
    this.appendStatementInput("ELSE").appendField("else");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.flow);
  });
  statement("elseif", function () {
    this.appendValueInput("IF").appendField("else if");
    this.appendStatementInput("THEN").appendField("then");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.flow);
  });
  statement("while_loop", function () {
    this.appendValueInput("IF").appendField("while");
    this.appendStatementInput("DO").appendField("do");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.flow);
  });
  statement("for_loop", function () {
    this.appendDummyInput().appendField("for").appendField(new Blockly.FieldTextInput("i"), "VAR").appendField("from").appendField(new Blockly.FieldNumber(0), "START").appendField("to").appendField(new Blockly.FieldNumber(10), "END").appendField("step").appendField(new Blockly.FieldNumber(1), "STEP");
    this.appendStatementInput("DO");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.flow);
  });
  statement("foreach_loop", function () {
    this.appendDummyInput().appendField("foreach").appendField(new Blockly.FieldTextInput("item"), "ITEM");
    this.appendValueInput("ARRAY").appendField("in");
    this.appendStatementInput("DO");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.flow);
  });
  statement("try_catch", function () {
    this.appendStatementInput("TRY").appendField("try");
    this.appendDummyInput().appendField("catch").appendField(new Blockly.FieldTextInput("err"), "ERR");
    this.appendStatementInput("CATCH");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.flow);
  });
  statement("switch_case", function () {
    this.appendValueInput("VALUE").appendField("switch");
    this.appendValueInput("CASE1").appendField("case");
    this.appendStatementInput("DO1").appendField("do");
    this.appendValueInput("CASE2").appendField("case");
    this.appendStatementInput("DO2").appendField("do");
    this.appendStatementInput("DEFAULT").appendField("default");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.flow);
  });

  statement("math_op", function () {
    this.appendValueInput("A");
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["+", "+"], ["-", "-"], ["*", "*"], ["/", "/"], ["mod", "%"]]), "OP");
    this.appendValueInput("B");
    this.setOutput(true); this.setColour(C.math);
  });
  statement("math_power", function () {
    this.appendValueInput("A").appendField("power");
    this.appendValueInput("B").appendField("^");
    this.setOutput(true); this.setColour(C.math);
  });
  statement("math_round", function () {
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["round", "round"], ["floor", "floor"], ["ceil", "ceil"]]), "MODE");
    this.appendValueInput("VALUE");
    this.setOutput(true); this.setColour(C.math);
  });
  statement("math_minmax", function () {
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["min", "min"], ["max", "max"]]), "MODE");
    this.appendValueInput("A"); this.appendValueInput("B");
    this.setOutput(true); this.setColour(C.math);
  });
  statement("random_number", function () {
    this.appendDummyInput().appendField("random").appendField(new Blockly.FieldNumber(1), "MIN").appendField("to").appendField(new Blockly.FieldNumber(100), "MAX");
    this.setOutput(true); this.setColour(C.math);
  });
  statement("compare_op", function () {
    this.appendValueInput("A");
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["==", "=="], ["!=", "!="], [">", ">"], ["<", "<"], [">=", ">="], ["<=", "<="]]), "OP");
    this.appendValueInput("B");
    this.setOutput(true); this.setColour(C.logic);
  });
  statement("logic_op", function () {
    this.appendValueInput("A");
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["AND", "AND"], ["OR", "OR"]]), "OP");
    this.appendValueInput("B");
    this.setOutput(true); this.setColour(C.logic);
  });
  statement("logic_not", function () {
    this.appendValueInput("VALUE").appendField("NOT");
    this.setOutput(true); this.setColour(C.logic);
  });
  statement("text_join", function () {
    this.appendValueInput("A").appendField("join");
    this.appendValueInput("B").appendField("+");
    this.setOutput(true); this.setColour(C.text);
  });
  statement("text_length", function () {
    this.appendValueInput("VALUE").appendField("text length");
    this.setOutput(true); this.setColour(C.text);
  });
  statement("text_case", function () {
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["upper", "upper"], ["lower", "lower"]]), "MODE");
    this.appendValueInput("VALUE");
    this.setOutput(true); this.setColour(C.text);
  });
  statement("print_stmt", function () {
    this.appendValueInput("VALUE").appendField("console print");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.system);
  });
  statement("comment_stmt", function () {
    this.appendDummyInput().appendField("comment").appendField(new Blockly.FieldTextInput("note"), "TEXT");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.system);
  });

  defineUiBlocks();
}

function defineUiBlocks() {
  statement("ui_page", function () {
    this.appendDummyInput().appendField("HTML app").appendField(new Blockly.FieldTextInput("My App"), "TITLE");
    this.appendStatementInput("BODY");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.ui);
  });
  statement("ui_div", function () {
    this.appendDummyInput().appendField("div class").appendField(new Blockly.FieldTextInput("section"), "CLASS");
    this.appendStatementInput("BODY");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.ui);
  });
  statement("ui_text", function () {
    this.appendDummyInput().appendField(new Blockly.FieldDropdown([["p", "p"], ["span", "span"], ["h1", "h1"], ["h2", "h2"], ["h3", "h3"]]), "TAG");
    this.appendValueInput("TEXT");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.ui);
  });
  statement("ui_button", function () {
    this.appendValueInput("TEXT").appendField("button");
    this.appendDummyInput().appendField("id").appendField(new Blockly.FieldTextInput("actionBtn"), "ID");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.ui);
  });
  statement("ui_input", function () {
    this.appendDummyInput().appendField("input").appendField(new Blockly.FieldDropdown([["text", "text"], ["email", "email"], ["number", "number"], ["password", "password"]]), "TYPE").appendField(new Blockly.FieldTextInput("placeholder"), "PLACEHOLDER");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.ui);
  });
  statement("ui_image", function () {
    this.appendDummyInput().appendField("image").appendField(new Blockly.FieldTextInput("https://picsum.photos/800/400"), "SRC");
    this.appendValueInput("ALT").appendField("alt");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.ui);
  });
  statement("ui_navbar", function () {
    this.appendDummyInput().appendField("navbar").appendField(new Blockly.FieldTextInput("Brand"), "BRAND");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.ui);
  });
  statement("ui_card", function () {
    this.appendDummyInput().appendField("card").appendField(new Blockly.FieldTextInput("Title"), "TITLE");
    this.appendStatementInput("BODY");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.ui);
  });
  statement("ui_form", function () {
    this.appendDummyInput().appendField("form").appendField(new Blockly.FieldTextInput("contactForm"), "ID");
    this.appendStatementInput("BODY");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.ui);
  });
  statement("ui_table", function () {
    this.appendDummyInput().appendField("table headers").appendField(new Blockly.FieldTextInput("Name,Value"), "HEADERS");
    this.appendDummyInput().appendField("row").appendField(new Blockly.FieldTextInput("A,10"), "ROW");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.ui);
  });
  statement("ui_list", function () {
    this.appendDummyInput().appendField("list").appendField(new Blockly.FieldTextInput("One,Two,Three"), "ITEMS");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.ui);
  });
  statement("css_rule", function () {
    this.appendDummyInput().appendField("css").appendField(new Blockly.FieldTextInput(".card"), "SELECTOR").appendField(new Blockly.FieldTextInput("padding:16px;"), "RULES");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.css);
  });
  statement("css_box", function () {
    this.appendDummyInput().appendField("box css").appendField(new Blockly.FieldTextInput(".box"), "SELECTOR").appendField("color").appendField(new Blockly.FieldColour("#22d3ee"), "COLOR").appendField("size").appendField(new Blockly.FieldNumber(16), "SIZE");
    this.appendDummyInput().appendField("margin").appendField(new Blockly.FieldTextInput("8px"), "MARGIN").appendField("padding").appendField(new Blockly.FieldTextInput("12px"), "PADDING");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.css);
  });
  statement("css_flex", function () {
    this.appendDummyInput().appendField("flex").appendField(new Blockly.FieldTextInput(".layout"), "SELECTOR").appendField("gap").appendField(new Blockly.FieldTextInput("12px"), "GAP");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.css);
  });
  statement("css_grid", function () {
    this.appendDummyInput().appendField("grid").appendField(new Blockly.FieldTextInput(".grid"), "SELECTOR").appendField("columns").appendField(new Blockly.FieldTextInput("repeat(3, 1fr)"), "COLS");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.css);
  });
  statement("css_hover", function () {
    this.appendDummyInput().appendField("hover").appendField(new Blockly.FieldTextInput("button"), "SELECTOR").appendField(new Blockly.FieldTextInput("transform:scale(1.04);"), "RULES");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.css);
  });
  statement("css_animation", function () {
    this.appendDummyInput().appendField("animation").appendField(new Blockly.FieldTextInput("fadeIn"), "NAME").appendField(new Blockly.FieldTextInput("from{opacity:0}to{opacity:1}"), "FRAMES");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.css);
  });
  statement("js_event", function () {
    this.appendDummyInput().appendField("on click").appendField(new Blockly.FieldTextInput("actionBtn"), "ID").appendField(new Blockly.FieldTextInput("alert('Hello')"), "CODE");
    this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(C.system);
  });
}
