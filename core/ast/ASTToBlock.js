import { ASTTypes } from "./ASTTypes.js";


export class ASTToBlock {


    constructor(workspace) {

        this.workspace = workspace;

        this.handlers = {

            [ASTTypes.FUNCTION_CALL]:
                this.createFunctionCall.bind(this),

            [ASTTypes.ASSIGNMENT]:
                this.createAssignment.bind(this),

            [ASTTypes.VARIABLE]:
                this.createVariable.bind(this),

            [ASTTypes.IF]:
                this.createIf.bind(this),

            [ASTTypes.LOOP]:
                this.createLoop.bind(this)

        };

    }






    convert(ast) {


        let previous = null;


        for(const node of ast.children) {


            const block =
                this.create(node);



            if(!block)
                continue;



            if(
                previous &&
                previous.nextConnection &&
                block.previousConnection
            ){

                previous.nextConnection.connect(
                    block.previousConnection
                );

            }


            previous = block;


        }


    }







    create(node) {


        const handler =
            this.handlers[node.type];



        if(!handler){

            console.warn(
                "No block handler:",
                node.type
            );

            return null;

        }



        return handler(node);


    }









    createFunctionCall(node) {


        if(
            node.data.name !== "print"
        )
            return null;



        const block =
            this.workspace.newBlock(
                "print_stmt"
            );



        this.attachValue(
            block,
            "VALUE",
            this.createValue(
                node.data.value
            )
        );



        this.finish(block);


        return block;


    }









    createAssignment(node) {


        const block =
            this.workspace.newBlock(
                "var_declare"
            );



        block.setFieldValue(
            this.detectType(
                node.data.value
            ),
            "TYPE"
        );



        block.setFieldValue(
            node.data.name,
            "NAME"
        );



        this.attachValue(
            block,
            "VALUE",
            this.createValue(
                node.data.value
            )
        );



        this.finish(block);


        return block;


    }









    createVariable(node) {


        const block =
            this.workspace.newBlock(
                "var_get"
            );



        block.setFieldValue(
            node.data.name,
            "NAME"
        );



        this.finish(block);



        return block;


    }









    createIf(node) {


        const block =
            this.workspace.newBlock(
                "if_else"
            );



        this.attachValue(
            block,
            "IF",
            this.createValue(
                node.data.condition
            )
        );



        this.attachStatement(
            block,
            "THEN",
            node.children
        );



        this.finish(block);



        return block;


    }









    createLoop(node) {


        const block =
            this.workspace.newBlock(
                "while_loop"
            );



        this.attachValue(
            block,
            "IF",
            this.createValue(
                node.data.condition
            )
        );



        this.attachStatement(
            block,
            "DO",
            node.children
        );



        this.finish(block);



        return block;


    }









    createValue(value) {


        const block =
            this.workspace.newBlock(
                "typed_value"
            );



        const type =
            this.detectType(
                value
            );



        block.setFieldValue(
            type,
            "TYPE"
        );



        block.setFieldValue(
            String(value ?? ""),
            "VALUE"
        );



        this.finish(block);



        return block;


    }









    attachValue(parent,input,child){


        const connection =
            parent.getInput(
                input
            );



        if(
            connection &&
            child &&
            child.outputConnection
        ){

            connection.connection.connect(
                child.outputConnection
            );

        }


    }









    attachStatement(parent,input,nodes){


        const target =
            parent.getInput(
                input
            );



        if(
            !target ||
            !nodes
        )
            return;



        let previous = null;



        for(const node of nodes){


            const block =
                this.create(node);



            if(!block)
                continue;



            if(previous){

                previous.nextConnection.connect(
                    block.previousConnection
                );

            }
            else{

                target.connection.connect(
                    block.previousConnection
                );

            }



            previous = block;


        }


    }









    detectType(value){


        if(
            typeof value === "number" ||
            !isNaN(value)
        )
            return "number";



        if(
            value === true ||
            value === false
        )
            return "boolean";



        return "string";


    }









    finish(block){


        block.initSvg?.();

        block.render?.();



    }


}