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
import { Token, TokenType } from "../../types/tokens";

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
  let cases = declaration.cases;
  let bodies = declaration.bodies;
  let result;
  for (let i = 0; i < cases.length; i++) {
    if (result) {
      break;
    }

    let left =
      cases[i].left.type === TokenType.Identifier
        ? (env.lookupVar(cases[i].left.value) as NullVal)
        : cases[i].left;

    let right =
      cases[i].right.type === TokenType.Identifier
        ? (env.lookupVar(cases[i].right.value) as NullVal)
        : cases[i].right;
    switch (cases[i].condition.value) {
      case "===":
        if (left.value == right.value) {
          for (const stmt of bodies[i]) {
            result = evaluate(stmt, env);
          }
        }
        break;
      case ">":
        if (left.value! > right.value!) {
          for (const stmt of bodies[i]) {
            result = evaluate(stmt, env);
          }
        }
        break;

      case "<":
        if (left.value! < right.value!) {
          for (const stmt of bodies[i]) {
            result = evaluate(stmt, env);
          }
        }
        break;

      default:
        break;
    }
  }
  return result ?? eval_else(declaration, env);
}

function eval_else(declaration: IfCondition, env: Environment): RuntimeVal {
  console.log(declaration.bodies, declaration.cases);
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
