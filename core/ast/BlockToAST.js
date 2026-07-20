import { ASTBuilder } from "./ASTBuilder.js";
import { ASTTypes } from "./ASTTypes.js";


export class BlockToAST {

    constructor(workspace) {
        this.workspace = workspace;
        this.builder = new ASTBuilder();
    }


    convert() {

        const blocks = this.workspace.getTopBlocks(true);

        for (const block of blocks) {

            const node = this.parseBlock(block);

            if(node) {
                this.builder.add(node);
            }
        }


        return this.builder.getAST();
    }



    parseBlock(block) {

        switch(block.type) {


            case "print_block":

                return this.builder.create(
                    ASTTypes.FUNCTION_CALL,
                    {
                        name: "print",
                        value:
                            block.getFieldValue("TEXT")
                    }
                );



            case "number_block":

                return this.builder.create(
                    ASTTypes.NUMBER,
                    {
                        value:
                            Number(
                                block.getFieldValue("NUM")
                            )
                    }
                );



            case "variable_set":

                return this.builder.create(
                    ASTTypes.ASSIGNMENT,
                    {
                        name:
                            block.getFieldValue("VAR")
                    }
                );



            case "if_block":

                const ifNode =
                    this.builder.create(
                        ASTTypes.IF
                    );


                const body =
                    block.getInputTargetBlock(
                        "DO"
                    );


                if(body) {

                    ifNode.addChild(
                        this.parseBlock(body)
                    );

                }


                return ifNode;



            default:

                console.warn(
                    "Desteklenmeyen block:",
                    block.type
                );

                return null;
        }

    }

}