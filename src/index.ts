import Parser from "./interpreter/parser";
import { createGlobalEnv } from "./interpreter/environment";
import { evaluate } from "./interpreter//interpreter";
import fs from "fs";

run('./src/examples/conditions.rkz')

function run(filename: string) {
  const parser = new Parser();
  const env = createGlobalEnv();

  const input = fs.readFileSync(filename, 'utf8').toString();
  const program = parser.produceAST(input);

  evaluate(program, env);
}
