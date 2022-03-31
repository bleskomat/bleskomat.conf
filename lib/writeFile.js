const assert = require('assert');
const fs = require('fs').promises;
const path = require('path');
const stringify = require('./stringify');

module.exports = function(filePath, data) {
	return Promise.resolve().then(() => {
		assert.ok(filePath, 'Missing required argument: "filePath"');
		assert.ok(data, 'Missing required argument: "data"');
		assert.strictEqual(typeof filePath, 'string', 'Invalid argument ("filePath"): String expected');
		assert.strictEqual(typeof data, 'object', 'Invalid argument ("data"): Object expected');
		return fs.writeFile(path.resolve(filePath), stringify(data)).then(() => {
			return true;
		});
	});
};
