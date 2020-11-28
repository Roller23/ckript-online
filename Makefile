output=ckript
mem_flags=-s ALLOW_MEMORY_GROWTH -s MAXIMUM_MEMORY=4GB
exports=-s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall']"

all:
	emcc -o $(output).html src/*.cpp -O3 -s WASM=1 $(mem_flags) $(exports)
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