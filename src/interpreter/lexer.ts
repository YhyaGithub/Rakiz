import { TokenType, Token } from "../types/tokens";
import { isint, isalpha, isskippable } from "../utils/valdations";

function token(value = "", type: TokenType): Token {
  return { value, type } as Token;
}

export function tokenize(sourceCode: string): Token[] {
  const tokens = new Array<Token>();
  const src = sourceCode.split("");
  const KEYWORDS: Record<string, TokenType> = {
    let: TokenType.Let,
    const: TokenType.Const,
    fn: TokenType.Fn,
    if: TokenType.If,
    else: TokenType.Else,
    elif: TokenType.Elif,
    is: TokenType.Condition,
    not: TokenType.Condition
  };

  while (src.length > 0) {
    switch (src[0]) {
      case "(":
        tokens.push(token(src.shift(), TokenType.OpenParen));
        break;
      case ")":
        tokens.push(token(src.shift(), TokenType.CloseParen));
        break;
      case "{":
        tokens.push(token(src.shift(), TokenType.OpenBrace));
        break;
      case "}":
        tokens.push(token(src.shift(), TokenType.CloseBrace));
        break;
      case "[":
        tokens.push(token(src.shift(), TokenType.OpenBracket));
        break;
      case "]":
        tokens.push(token(src.shift(), TokenType.CloseBracket));
        break;
      case "'":
      case '"':
        src.shift();
        let str = "";
        while (src[0] !== '"' && src[0] !== "'") {
          str += src.shift();
        }
        src.shift();
        tokens.push(token(str, TokenType.String));
        break;
      case "#":
        src.shift();
        while (src[1] !== "\n") {
          src.shift();
        }
        src.shift();
        break;
      case ":":
        tokens.push(token(src.shift(), TokenType.Colon));
        break;
      case ";":
        tokens.push(token(src.shift(), TokenType.Semicolon));
        break;
      case ",":
        tokens.push(token(src.shift(), TokenType.Comma));
        break;
      case ".":
        tokens.push(token(src.shift(), TokenType.Dot));
        break;
      case "+":
      case "-":
      case "/":
      case "*":
      case "%":
        tokens.push(token(src.shift(), TokenType.BinaryOperator));
        break;
      case "=":
        tokens.push(token(src.shift(), TokenType.Equals));
        break;
      case ">":
      case "<":
        tokens.push(token(src.shift(), TokenType.Condition));
      default:
        if (isalpha(src[0])) {
          let str = "";
          while ((src.length > 0 && isalpha(src[0])) || isint(src[0])) {
            str += src.shift();
          }
          let reserved = KEYWORDS[str];

          if (typeof reserved !== "undefined") {
            tokens.push(token(str, reserved));
          } else {
            tokens.push(token(str, TokenType.Identifier));
          }
        } else if (isint(src[0])) {
          let num = "";
          while (src.length > 0 && isint(src[0])) {
            num += src.shift();
          }
          tokens.push(token(num, TokenType.Number));
        } else if (isskippable(src[0])) {
          src.shift();
        } else {
          console.error(
            "Unreconized character found in source: ",
            src[0].charCodeAt(0),
            src[0]
          );
          process.exit(1);
        }
        break;
    }
  }

  tokens.push({ value: "EndOfFile", type: TokenType.EOF });
  return tokens;
}
