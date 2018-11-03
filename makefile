start:
	npm run nodemon -- --exec babel-node bin/server.js

install:
	npm install

lint:
	npm run eslint .

test:
	npm test -s

testw:
	npm run test-jest-watch
