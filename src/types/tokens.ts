export enum TokenType {
  // Literals
  Identifier,
  String,
  Number,

  // Operators
  Equals,
  BinaryOperator,
  Condition,
  Comma,
  Dot,
  Colon,
  Semicolon,
  OpenParen, // (
  CloseParen, // )
  OpenBrace, // {
  CloseBrace, // }
  OpenBracket, // [
  CloseBracket, //]

  // Keywords
  Let,
  Const,
  Fn,
  If,
  Else,
  Elif,
  // Special
  EOF,
}

export interface Token {
  value: string;
  type: TokenType;
}
