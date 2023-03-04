import Environment from "../interpreter/environment";
import readline from "readline-sync";
import {
  MK_BOOL,
  MK_NATIVE_FN,
  MK_NULL,
  MK_NUMBER,
  MK_STRING,
  NullVal,
  StringVal,
} from "../types/values";

export default function builtins(env: Environment) {
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
    "isNull",
    MK_NATIVE_FN((args) => {
      let variable = (args as NullVal[]).map((item) => item.type);
      return MK_BOOL(variable.toString() === "null" ? true : false);
    }),
    true
  );

  env.declareVar(
    "min",
    MK_NATIVE_FN((args) => {
      let value1 = (args[0] as NullVal).value!;
      let value2 = (args[1] as NullVal).value!;
      return MK_NUMBER(Math.min(value1, value2));
    }),
    false
  );

  env.declareVar(
    "max",
    MK_NATIVE_FN((args) => {
      let value1 = (args[0] as NullVal).value!;
      let value2 = (args[1] as NullVal).value!;
      return MK_NUMBER(Math.max(value1, value2));
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
