#include "interpreter.hpp"
#include "lexer.hpp"
#include "parser.hpp"
#include "CVM.hpp"
#include "token.hpp"
#include "evaluator.hpp"
#include "utils.hpp"

#include <string>
#include <iostream>
#include <cstdlib>

void Interpreter::process_string(const std::string &code) {
  Lexer lexer;
  Utils utils;
  TokenList tokens = lexer.tokenize(code);
  Parser parser(tokens, Token::TokenType::NONE, "", utils);
  Node AST = parser.parse(NULL);
  CVM VM;
  Evaluator evaluator(AST, VM, utils);
  evaluator.stack.reserve(100);
  evaluator.start();
}