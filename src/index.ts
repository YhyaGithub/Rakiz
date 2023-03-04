import Parser from "./interpreter/parser";
import { createGlobalEnv } from "./interpreter/environment";
import { evaluate } from "./interpreter//interpreter";
import readline from "readline-sync";
import fs from "fs";

export function run(filename: string) {
  const parser = new Parser();
  const env = createGlobalEnv();

  const input = fs.readFileSync(filename, "utf8").toString();
  const program = parser.produceAST(input);

  evaluate(program, env);
}

export function repl() {
  const parser = new Parser();
  const env = createGlobalEnv();
  console.log("Rakiz Repl v1.0");
  while (true) {
    let input = readline.question("> ");
    let program = parser.produceAST(input);

    if (!input || input.includes("exit")){
      process.exit(1);
    }
    evaluate(program, env);
  }
}
