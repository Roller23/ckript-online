#if !defined(__INTERPRETER_)
#define __INTERPRETER_

#include <string>

class Interpreter {
  public:
    void process_string(const std::string &code);
};

#endif // __INTERPRETER_