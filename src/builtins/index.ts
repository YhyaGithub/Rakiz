import Environment from "../interpreter/environment";
import readline from "readline-sync";
import {
  MK_NATIVE_FN,
  MK_NULL,
  MK_NUMBER,
  MK_STRING,
  NullVal,
  StringVal,
} from "../types/values";
import { createMathBuiltins } from "./math";
import { createValidationBuiltins } from "./validation";

export default function builtins(env: Environment) {
  createMathBuiltins(env);
  createValidationBuiltins(env);

  env.declareVar(
    "print",
    MK_NATIVE_FN((args) => {
      let values = (args as NullVal[]).map((item) => item.value);
      console.log(values.join(" "));
      return MK_NULL();
    }),
    true
  );

  env.declareVar(
    "input",
    MK_NATIVE_FN((args) => {
      let text = (args as StringVal[]).map((item) => item.value);
      let input = readline.question(text);
      return MK_STRING(input);
    }),
    false
  );

  env.declareVar(
    "time",
    MK_NATIVE_FN(() => {
      return MK_NUMBER(Date.now());
    }),
    true
  );
}
