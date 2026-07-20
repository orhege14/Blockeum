import { DEFAULT_CODE } from "./constants.js";
import { defineBlocks } from "../blocks/definitions.js";
import { createToolboxXml } from "../blocks/toolbox.js";
import { setupGenerators } from "../generator/index.js";
import { createProject, loadProject, normalizeProject, saveProject } from "../storage/projectStore.js";
import { IdeUi } from "../ui/ide.js";

import { BlockToAST } from "./ast/BlockToAST.js";
import { ASTToBlock } from "./ast/ASTToBlock.js";
import { JavaScriptParser } from "./parser/JavaScriptParser.js";
import { JavaScriptASTGenerator } from "../generator/JavaScriptASTGenerator.js";


class CodeBlocksStudio {

  constructor() {

    this.project =
      normalizeProject(
        loadProject() ||
        createProject("codeblocks-project")
      );


    this.workspace = null;

    this.ui =
      new IdeUi(this);


    this.lastCode = "";

    this.updatingBlocks = false;

  }



  start() {

    defineBlocks();

    setupGenerators();


    document.getElementById(
      "toolboxMount"
    ).innerHTML =
      createToolboxXml();


    this.setupWorkspace();


    this.ui.init();


    this.updateCode();

  }





  setupWorkspace() {

    const toolbox =
      document.getElementById(
        "toolbox"
      );


    this.workspace =
      Blockly.inject(
        document.getElementById(
          "blocklyDiv"
        ),
        {
          toolbox,

          trashcan:true,

          comments:true,

          collapse:true,

          disable:true,

          grid:{
            spacing:20,
            length:3,
            colour:"#475569",
            snap:true
          },

          zoom:{
            controls:true,
            wheel:true,
            startScale:0.9,
            maxScale:2,
            minScale:0.35
          }

        }
      );



    if(
      this.project.files[
        this.project.activeFile
      ]
    ){

      this.loadWorkspaceXml(
        this.project.files[
          this.project.activeFile
        ]
      );

    }



    this.workspace.addChangeListener(
      event => {


        if(
          event.type === Blockly.Events.SELECTED
        ){

          this.ui.renderProperties();

        }



        if(
          !event.isUiEvent &&
          !this.updatingBlocks
        ){

          this.updateCode();

        }

      }
    );

  }






  generateAST() {


    const converter =
      new BlockToAST(
        this.workspace
      );


    return converter.convert();

  }







  generateCode() {


    try {


      const ast =
        this.generateAST();



      console.log(
        "AST:",
        ast.toJSON()
      );



      switch(
        this.project.lang
      ){



        case "JavaScript":


          const generator =
            new JavaScriptASTGenerator();


          return generator.generate(
            ast
          );




        case "Python":

          return Blockly.Python.workspaceToCode(
            this.workspace
          );





        case "C#":

          return Blockly.CSharp.workspaceToCode(
            this.workspace
          );





        case "HTML/CSS/JS":

          return Blockly.HTML.workspaceToCode(
            this.workspace
          );





        default:

          return Blockly.JavaScript.workspaceToCode(
            this.workspace
          );


      }



    }
    catch(error){


      console.error(
        error
      );


      return `// Generator error:\n${error.message}`;


    }

  }









  loadCodeAsBlocks(code) {


    if(
      !code ||
      this.updatingBlocks
    )
      return;



    try {



      const parser =
        new JavaScriptParser();



      const ast =
        parser.parse(
          code
        );



      this.updatingBlocks = true;



      this.workspace.clear();



      const converter =
        new ASTToBlock(
          this.workspace
        );



      converter.convert(
        ast
      );



      this.updatingBlocks = false;



    }
    catch(error){


      this.updatingBlocks = false;


      console.error(
        "Code -> Block error:",
        error
      );


    }

  }










  updateCode() {


    if(
      !this.workspace
    )
      return;



    try {


      this.lastCode =
        this.generateCode()
        ||
        DEFAULT_CODE[
          this.project.lang
        ];



    }
    catch(error){


      this.lastCode =
        `// Generator error:\n${error.message}`;


    }



    this.ui.setCode(
      this.lastCode
    );


    this.ui.updatePreview(
      this.project.lang === "HTML/CSS/JS"
      ?
      this.lastCode
      :
      ""
    );


    this.ui.updateStatus(
      this.lastCode
    );


    this.save();

  }








  updatePreview(code){

    this.ui.updatePreview(
      code
    );

  }







  save(){


    if(this.workspace){


      this.project.files[
        this.project.activeFile
      ] =
      Blockly.Xml.domToText(
        Blockly.Xml.workspaceToDom(
          this.workspace
        )
      );


    }


    saveProject(
      this.project
    );


  }







  serialize(){


    this.save();


    return {

      version:4,

      savedAt:
        new Date().toISOString(),

      project:
        this.project

    };

  }








  loadSerialized(data){


    this.project =
      normalizeProject(
        data.project || data
      );


    this.workspace.clear();


    this.loadWorkspaceXml(
      this.project.files[
        this.project.activeFile
      ] || ""
    );


    this.ui.renderFileTree();

    this.ui.renderFavorites();


    this.updateCode();


  }








  loadWorkspaceXml(xml){


    if(!xml)
      return;



    try{


      Blockly.Xml.domToWorkspace(
        Blockly.utils.xml.textToDom(xml),
        this.workspace
      );


    }
    catch(error){


      console.warn(
        "Workspace XML error",
        error
      );


    }

  }







  newProject(){


    this.project =
      createProject(
        "new-project"
      );


    this.workspace.clear();


    this.ui.renderFileTree();

    this.ui.renderFavorites();


    this.updateCode();


  }


}







const app =
  new CodeBlocksStudio();



if(
  document.readyState === "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    () => app.start()
  );


}
else{


  app.start();


}