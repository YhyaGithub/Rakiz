import Environment from "../interpreter/environment";
import { MK_NATIVE_FN, MK_NUMBER, NullVal } from "../types/values";

export function createMathBuiltins(env: Environment) {
  env.declareVar(
    "random",
    MK_NATIVE_FN((args) => {
      let min = (args[0] as NullVal).value!;
      let max = (args[1] as NullVal).value!;
      return MK_NUMBER(Math.floor(Math.random() * (max - min + 1)) + min);
    }),
    false
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
}
