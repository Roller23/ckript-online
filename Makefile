output=ckript
mem=100MB
mem_flags=-s INITIAL_MEMORY=$(mem) -s MAXIMUM_MEMORY=$(mem) -s ALLOW_MEMORY_GROWTH=0
exports=-s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall']"
misc=-s ENVIRONMENT=web,worker -s PROXY_TO_PTHREAD -s USE_PTHREADS
files=src/*.cpp

all:
	emcc -o $(output).html $(files) -O3 -s WASM=1 $(mem_flags) $(exports) $(misc)
	rm $(output).html

clean:
	rm $(output).js $(output).wasm

update:
	git stash
	git pull
	git stash apply

push:
	git add .
	git commit -m "Automated Makefile commit"
	git push