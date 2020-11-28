#include "interpreter.hpp"

// this is the "main" file
// runCode is exposed to Javascript and can be later called from there
// __attribute__((used)) needed so the compiler doesn't optimize out the function

extern "C" {
  void __attribute__((used)) runCode(const char *code) {
    Interpreter().process_string(code);
  }
}