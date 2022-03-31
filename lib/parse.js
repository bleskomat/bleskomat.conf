const assert = require('assert');
const types = require('./types');

module.exports = function(keyValueString) {
	assert.strictEqual(typeof keyValueString, 'string', 'Invalid argument ("keyValueString"): String expected');
	if (keyValueString == '') {
		return {};
	}
	let data = {};
	keyValueString.split('\n').forEach(line => {
		const pos = line.indexOf('=');
		let key, value;
		if (pos !== -1) {
			key = line.substr(0, pos);
			value = line.substr(pos + 1);
		} else {
			key = line;
			value = null;
		}
		if (key) {
			const type = types[key] || 'string';
			switch (type) {
				case 'array-number':
					value = value.split(',').map(number => {
						return parseFloat(number);
					});
					break;
				case 'boolean':
					value = value === '1' || value === 'true';
					break;
				case 'integer':
					value = parseInt(value);
					break;
				case 'string':
				default:
					value = value || '';
					break;
				case 'number':
					value = parseFloat(value);
					break;
			}
			data[key] = value;
		}
	});
	return data;
};