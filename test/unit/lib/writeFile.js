const assert = require('assert');
const fs = require('fs').promises;
const path = require('path');
const { writeFile } = require('../../../');

describe('writeFile(filePath, data)', function() {

	it('writes stringified key-value object to file', function() {
		const filePath = path.join(this.tmpDir, 'bleskomat-write.conf');
		return writeFile(filePath, {
			'apiKey.id': 'b26c166655',
			'apiKey.key': '07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781',
			'apiKey.encoding': 'hex',
			'shorten': true,
		}).then(result => {
			assert.strictEqual(result, true);
			return fs.readFile(filePath).then(contents => {
				assert.strictEqual(contents.toString(), 'apiKey.id=b26c166655\napiKey.key=07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781\napiKey.encoding=hex\nshorten=1');
			});
		});
	});
});
