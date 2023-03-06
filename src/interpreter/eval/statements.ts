import {
  FunctionDeclaration,
  IfCondition,
  Program,
  VarDeclaration,
} from "../ast";
import Environment from "../environment";
import { evaluate } from "../interpreter";
import {
  FunctionValue,
  MK_NULL,
  NullVal,
  RuntimeVal,
} from "../../types/values";
import { TokenType } from "../../types/tokens";

export function eval_program(program: Program, env: Environment): RuntimeVal {
  let lastEvaluated: RuntimeVal = MK_NULL();
  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env);
  }
  return lastEvaluated;
}

export function eval_var_declaration(
  declaration: VarDeclaration,
  env: Environment
): RuntimeVal {
  const value = declaration.value
    ? evaluate(declaration.value, env)
    : MK_NULL();

  return env.declareVar(declaration.identifier, value, declaration.constant);
}

export function eval_function_declaration(
  declaration: FunctionDeclaration,
  env: Environment
): RuntimeVal {
  // Create new function scope
  const fn = {
    type: "function",
    name: declaration.name,
    parameters: declaration.parameters,
    declarationEnv: env,
    body: declaration.body,
  } as FunctionValue;

  return env.declareVar(declaration.name, fn, true);
}

export function eval_if_condition(
  declaration: IfCondition,
  env: Environment
): RuntimeVal {
  let left =
    declaration.condition[0].type == TokenType.Identifier
      ? (env.lookupVar(declaration.condition[0].value) as NullVal)
      : declaration.condition[0];

  let right =
    declaration.condition[2].type == TokenType.Identifier
      ? (env.lookupVar(declaration.condition[2].value) as NullVal)
      : declaration.condition[2];

  let result;

  switch (declaration.condition[1].value) {
    case "===":
      if (left.value == right.value) {
        for (const stmt of declaration.body) {
          result = evaluate(stmt, env);
        }
      }
      break;

    case ">":
      if (left.value! > right.value!) {
        for (const stmt of declaration.body) {
          result = evaluate(stmt, env);
        }
      }
      break;

    case "<":
      if (left.value! < right.value!) {
        for (const stmt of declaration.body) {
          result = evaluate(stmt, env);
        }
      }
      break;
  }

  return result ?? eval_else(declaration, env);
}

function eval_else(
  declaration: IfCondition,
  env: Environment
): RuntimeVal {
  if (declaration.else !== null) {
    let result;
    for (const stmt of declaration.else.body) {
      result = evaluate(stmt, env);
    }
    return result ?? MK_NULL();
  } else {
    return MK_NULL();
  }
}
