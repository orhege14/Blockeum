// Legacy entry kept intentionally small. The application now starts from /core/app.js.
import { BlockToAST } from "./core/ast/BlockToAST.js";


function generateAST(){

    const converter =
        new BlockToAST(
            workspace
        );


    const ast =
        converter.convert();


    console.log(
        ast.toJSON()
    );
}