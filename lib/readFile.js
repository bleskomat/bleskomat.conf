const assert = require('assert');
const fs = require('fs').promises;
const path = require('path');
const parse = require('./parse');

module.exports = function(filePath) {
	return Promise.resolve().then(() => {
		assert.ok(filePath, 'Missing required argument: "filePath"');
		assert.strictEqual(typeof filePath, 'string', 'Invalid argument ("filePath"): String expected');
		return fs.readFile(path.resolve(filePath)).then(result => {
			return parse(result.toString());
		});
	});
};
