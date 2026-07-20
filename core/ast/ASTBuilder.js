import { ASTNode } from "./ASTNode.js";
import { ASTTypes } from "./ASTTypes.js";


export class ASTBuilder {

    constructor() {
        this.root = new ASTNode(
            ASTTypes.PROGRAM
        );
    }


    create(type, data = {}) {
        return new ASTNode(
            type,
            data
        );
    }


    add(node) {
        this.root.addChild(node);
    }


    getAST() {
        return this.root;
    }


    exportJSON() {
        return JSON.stringify(
            this.root.toJSON(),
            null,
            4
        );
    }
}