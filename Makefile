
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components

test: build
	# Open test/dynamic-rows.html in your browser

.PHONY: clean test
