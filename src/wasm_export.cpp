#include "interpreter.hpp"

#include <pthread.h>

// this is the "main" file
// runCode is exposed to Javascript and can be later called from there
// __attribute__((used)) needed so the compiler doesn't optimize out the function

void *run(void *arg) {
  Interpreter().process_string((char *)arg);
  return NULL;
}

extern "C" {
  void __attribute__((used)) runCode(char *code) {
    pthread_t thread;
    pthread_create(&thread, NULL, run, code);
  }
}