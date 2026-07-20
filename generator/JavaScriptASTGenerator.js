import { ASTGenerator } 
from "./ASTGenerator.js";


export class JavaScriptASTGenerator 
extends ASTGenerator {


    functionCall(node) {

        if(node.data.name === "print") {

            this.write(
                `console.log("${node.data.value}")`
            );

            return;
        }


        super.functionCall(node);

    }



    ifStatement(node) {

        this.write(
            "if(true){"
        );


        this.indent++;


        for(const child of node.children){

            this.visit(child);

        }


        this.indent--;


        this.write(
            "}"
        );

    }

}