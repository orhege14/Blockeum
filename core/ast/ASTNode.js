export class ASTNode {
    constructor(type, data = {}) {
        this.type = type;
        this.data = data;
        this.children = [];
    }


    addChild(node) {
        if(node instanceof ASTNode) {
            this.children.push(node);
        }
    }


    toJSON() {
        return {
            type: this.type,
            data: this.data,
            children: this.children.map(
                child => child.toJSON()
            )
        };
    }
}