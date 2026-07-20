export function createToolboxXml() {
  return `
  <xml id="toolbox" style="display:none">
    <category name="Files" colour="#64748b">
      <label text="Use the file explorer and project bar"></label>
    </category>
    <category name="Variables" colour="#7C3AED">
      <block type="var_declare"></block><block type="var_set"></block><block type="var_delete"></block><block type="var_get"></block>
      <block type="typed_value"></block><block type="object_create"></block><block type="object_get"></block><block type="object_set"></block>
    </category>
    <category name="Functions" colour="#DB2777">
      <block type="fn_define"></block><block type="fn_return"></block><block type="fn_call"></block>
    </category>
    <category name="Control" colour="#16A34A">
      <block type="if_else"></block><block type="elseif"></block><block type="while_loop"></block><block type="for_loop"></block><block type="foreach_loop"></block><block type="try_catch"></block><block type="switch_case"></block>
    </category>
    <category name="Math" colour="#0EA5E9">
      <block type="math_op"></block><block type="math_power"></block><block type="math_round"></block><block type="math_minmax"></block><block type="random_number"></block><block type="compare_op"></block>
    </category>
    <category name="Logic" colour="#14B8A6">
      <block type="logic_op"></block><block type="logic_not"></block>
    </category>
    <category name="Text" colour="#F59E0B">
      <block type="text_join"></block><block type="text_length"></block><block type="text_case"></block>
    </category>
    <category name="Arrays" colour="#8B5CF6">
      <block type="array_create"></block><block type="array_get"></block><block type="array_push"></block><block type="array_length"></block>
    </category>
    <category name="Console" colour="#64748b">
      <block type="print_stmt"></block><block type="comment_stmt"></block>
    </category>
    <sep></sep>
    <category name="UI Elements" colour="#EF4444">
      <block type="ui_page"></block><block type="ui_div"></block><block type="ui_text"></block><block type="ui_button"></block><block type="ui_input"></block><block type="ui_image"></block><block type="ui_navbar"></block><block type="ui_card"></block><block type="ui_form"></block><block type="ui_table"></block><block type="ui_list"></block>
    </category>
    <category name="CSS" colour="#A855F7">
      <block type="css_rule"></block><block type="css_box"></block><block type="css_flex"></block><block type="css_grid"></block><block type="css_hover"></block><block type="css_animation"></block>
    </category>
    <category name="Browser JS" colour="#F97316">
      <block type="js_event"></block>
    </category>
  </xml>`;
}
