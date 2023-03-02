export enum TokenType {
  // Literals
  Identifier,
  String,
  Number,

  // Type
  Type,

  // Operators
  Equals,
  BinaryOperator,
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

  // Special
  EOF,
}

export interface Token {
  value: string;
  type: TokenType;
}
