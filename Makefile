output=ckript

all:
	emcc -o $(output).html src/*.cpp -O3 -s WASM=1 -s NO_EXIT_RUNTIME=1 -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall']"
	rm $(output).html

clean:
	rm $(output).html $(output).js $(output).wasm