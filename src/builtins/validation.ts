import Environment from "../interpreter/environment";
import { MK_BOOL, MK_NATIVE_FN, NullVal } from "../types/values";

export function createValidationBuiltins(env: Environment) {
  env.declareVar(
    "isNull",
    MK_NATIVE_FN((args) => {
      let type = (args as NullVal[]).map((item) => item.type);
      return MK_BOOL(type.toString() === "null" ? true : false);
    }),
    true
  );

  env.declareVar("isNumber", MK_NATIVE_FN((args) => {
    let type = (args as NullVal[]).map((item) => item.type);
    return MK_BOOL(type.toString() === "number" ? true : false)
  }),  true)
}
