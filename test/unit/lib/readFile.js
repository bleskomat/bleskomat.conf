const assert = require('assert');
const fs = require('fs').promises;
const path = require('path');
const { readFile } = require('../../../');

describe('readFile(filePath)', function() {

	it('returns parsed key-value object from file contents', function() {
		const filePath = path.join(this.tmpDir, 'bleskomat-read.conf');
		return fs.writeFile(filePath, 'apiKey.id=b26c166655\napiKey.key=07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781\napiKey.encoding=hex\nshorten=1').then(() => {
			return readFile(filePath).then(result => {
				assert.deepStrictEqual(result, {
					'apiKey.id': 'b26c166655',
					'apiKey.key': '07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781',
					'apiKey.encoding': 'hex',
					'shorten': true,
				});
			});
		});
	});
});
