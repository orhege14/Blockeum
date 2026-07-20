import { Tokenizer } from "./Tokenizer.js";

import { ASTBuilder } from "../ast/ASTBuilder.js";

import { ASTTypes } from "../ast/ASTTypes.js";



export class JavaScriptParser {


    parse(code) {


        const builder =
            new ASTBuilder();



        const lines =
            code
            .split("\n")
            .map(
                x => x.trim()
            )
            .filter(
                x => x.length
            );




        for(const line of lines){


            this.parseLine(
                line,
                builder
            );


        }



        return builder.getAST();


    }






    parseLine(line,builder){



        // console.log("Hello")

        if(
            line.startsWith(
                "console.log"
            )
        ){


            const value =
                line
                .match(
                    /"(.*?)"/
                );



            builder.add(

                builder.create(
                    ASTTypes.FUNCTION_CALL,
                    {

                        name:"print",

                        value:
                            value
                            ?
                            value[1]
                            :
                            ""

                    }
                )

            );


            return;

        }







        // let x = 10

        if(
            line.startsWith(
                "let "
            )
        ){


            const parts =
                line
                .replace(
                    "let ",
                    ""
                )
                .replace(
                    ";",
                    ""
                )
                .split("=");



            builder.add(

                builder.create(
                    ASTTypes.ASSIGNMENT,
                    {

                        name:
                            parts[0]
                            .trim(),


                        value:
                            parts[1]
                            ?
                            parts[1].trim()
                            :
                            "null"

                    }
                )

            );


            return;

        }








        // x = 20

        if(
            line.includes("=")
        ){


            const parts =
                line
                .replace(
                    ";",
                    ""
                )
                .split("=");



            builder.add(

                builder.create(
                    ASTTypes.ASSIGNMENT,
                    {

                        name:
                            parts[0].trim(),


                        value:
                            parts[1].trim()

                    }
                )

            );


        }



    }


}