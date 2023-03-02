import Parser from "./interpeter/parser";
import { createGlobalEnv } from "./interpeter/environment";
import { evaluate } from "./interpeter/interpreter";
import fs from "fs";

run('./src/examples/builtins.rkz')

function run(filename: string) {
  const parser = new Parser();
  const env = createGlobalEnv();

  const input = fs.readFileSync(filename, 'utf8').toString();
  const program = parser.produceAST(input);

  evaluate(program, env);
}
