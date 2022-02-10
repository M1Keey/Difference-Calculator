#Makefile
install: #installing dependencies
	npm ci
publish: #project publication
	npm publish --dry-run
make lint: #running linter
	npx eslint .
make test: #running tests
	NODE_OPTIONS=--experimental-vm-modules npx jest
make test-coverage: #running tests with coverage display
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage