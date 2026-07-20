export class ASTGenerator {

    constructor() {
        this.output = "";
        this.indent = 0;
    }


    generate(ast) {

        this.output = "";

        this.visit(ast);

        return this.output;
    }



    visit(node) {

        if(!node)
            return;


        switch(node.type) {


            case "Program":

                for(const child of node.children) {

                    this.visit(child);

                }

                break;



            case "FunctionCall":

                this.functionCall(node);

                break;



            case "Assignment":

                this.assignment(node);

                break;



            case "IfStatement":

                this.ifStatement(node);

                break;



            default:

                console.warn(
                    "Bilinmeyen AST:",
                    node.type
                );

        }

    }



    write(text) {

        this.output +=
            "    ".repeat(this.indent)
            + text
            + "\n";

    }



    functionCall(node) {

        this.write(
            `${node.data.name}("${node.data.value}")`
        );

    }



    assignment(node) {

        this.write(
            `${node.data.name} = ${node.data.value}`
        );

    }



    ifStatement(node) {

        this.write(
            "if(condition){"
        );


        this.indent++;


        for(const child of node.children) {

            this.visit(child);

        }


        this.indent--;


        this.write(
            "}"
        );

    }

}