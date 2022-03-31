const assert = require('assert');

module.exports = function(data) {
	assert.strictEqual(typeof data, 'object', 'Invalid argument ("data"): Object expected');
	if (!data || Object.keys(data).length === 0) {
		return '';
	}
	// key=value pairs separated by new line characters.
	return Object.entries(data).map(([key, value], index) => {
		if (typeof value === 'undefined' || value === null) {
			value = '';
		} else if (typeof value === 'boolean') {
			value = value === true ? '1' : '0';
		} else if (value instanceof Array) {
			value = value.join(',');
		} else if (typeof value === 'object') {
			value = JSON.stringify(value);
		} else if (typeof value !== 'string' && typeof value.toString === 'function') {
			value = value.toString();
		}
		return `${key}=${value}`;
	}).join('\n');
};
