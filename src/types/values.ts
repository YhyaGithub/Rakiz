import Environment from "../interpeter/environment";
import { Stmt } from "../interpeter/ast";
export type ValueType =
  | "null"
  | "number"
  | "string"
  | "boolean"
  | "object"
  | "native-fn"
  | "function";

export interface RuntimeVal {
  type: ValueType;
}

/**
 * Defines a value of undefined meaning
 */
export interface NullVal extends RuntimeVal {
  type: "null";
  value: null;
}

export function MK_NULL() {
  return { value: null, type: "null" } as NullVal;
}

export interface BooleanVal extends RuntimeVal {
  type: "boolean";
  value: boolean;
}

export function MK_BOOL(b = true) {
  return { value: b, type: "boolean" } as BooleanVal;
}

/**
 * Runtime value that has access to the raw native javascript number.
 */
export interface NumberVal extends RuntimeVal {
  type: "number";
  value: number;
}

export interface StringVal extends RuntimeVal {
  type: "string";
  value: string;
}

export function MK_STRING(s = "") {
  return { value: s, type: "string" } as StringVal;
}

export function MK_NUMBER(n = 0) {
  return { value: n, type: "number" } as NumberVal;
}

/**
 * Runtime value that has access to the raw native javascript number.
 */
export interface ObjectVal extends RuntimeVal {
  type: "object";
  properties: Map<string, RuntimeVal>;
}

export type FunctionCall = (args: RuntimeVal[], env: Environment) => RuntimeVal;

export interface NativeFnValue extends RuntimeVal {
  type: "native-fn";
  call: FunctionCall;
}
export function MK_NATIVE_FN(call: FunctionCall) {
  return { type: "native-fn", call } as NativeFnValue;
}

export interface FunctionValue extends RuntimeVal {
  type: "function";
  name: string;
  parameters: string[];
  declarationEnv: Environment;
  body: Stmt[];
}
