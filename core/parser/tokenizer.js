export class Tokenizer {


    constructor(code) {

        this.code = code;

        this.position = 0;

        this.tokens = [];

    }





    tokenize() {


        while(
            this.position < this.code.length
        ){


            const char =
                this.code[this.position];



            // boşluk

            if(
                /\s/.test(char)
            ){

                this.position++;

                continue;

            }




            // sayı

            if(
                /[0-9]/.test(char)
            ){

                this.tokens.push(
                    this.readNumber()
                );

                continue;

            }





            // string

            if(
                char === '"'
            ){

                this.tokens.push(
                    this.readString()
                );

                continue;

            }






            // isim / keyword

            if(
                /[a-zA-Z_]/.test(char)
            ){

                this.tokens.push(
                    this.readIdentifier()
                );

                continue;

            }







            // operatörler

            const operator =
                this.readOperator();



            if(operator){

                this.tokens.push(
                    operator
                );

                continue;

            }






            // bilinmeyen karakter

            this.position++;


        }



        return this.tokens;


    }









    readNumber(){


        let value = "";



        while(
            this.position < this.code.length &&
            /[0-9.]/.test(
                this.code[this.position]
            )
        ){

            value +=
                this.code[this.position];


            this.position++;

        }




        return {

            type:"NUMBER",

            value:
                Number(value)

        };


    }









    readString(){


        let value = "";



        this.position++;



        while(
            this.position < this.code.length &&
            this.code[this.position] !== '"'
        ){

            value +=
                this.code[this.position];


            this.position++;

        }




        this.position++;




        return {

            type:"STRING",

            value

        };


    }









    readIdentifier(){


        let value = "";



        while(
            this.position < this.code.length &&
            /[a-zA-Z0-9_]/.test(
                this.code[this.position]
            )
        ){

            value +=
                this.code[this.position];


            this.position++;

        }




        const keywords = [

            "let",
            "const",
            "var",
            "if",
            "else",
            "while",
            "for",
            "function",
            "return",
            "true",
            "false",
            "null"

        ];





        return {


            type:
                keywords.includes(value)
                ?
                "KEYWORD"
                :
                "IDENTIFIER",


            value


        };


    }









    readOperator(){


        const operators = [

            "===",
            "!==",
            "==",
            "!=",
            ">=",
            "<=",
            "&&",
            "||",
            "+",
            "-",
            "*",
            "/",
            "%",
            "=",
            ">",
            "<",
            "!",
            "(",
            ")",
            "{",
            "}",
            ";",
            ","

        ];




        for(
            const op of operators
        ){


            if(
                this.code.startsWith(
                    op,
                    this.position
                )
            ){


                this.position +=
                    op.length;



                return {


                    type:"OPERATOR",

                    value:op


                };


            }


        }



        return null;


    }


}