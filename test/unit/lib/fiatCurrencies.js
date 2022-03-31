const assert = require('assert');
const { fiatCurrencies } = require('../../../');

describe('fiatCurrencies', function() {

	it('sanity check', function() {
		assert.ok(fiatCurrencies instanceof Array);
		assert.ok(fiatCurrencies.length > 0);
		fiatCurrencies.forEach((item, index) => {
			assert.strictEqual(typeof item, 'object');
			const { fiatCurrency } = item;
			assert.ok(fiatCurrency, `Missing currency symbol ("fiatCurrency"): index = ${index}`);
			assert.strictEqual(fiatCurrency.length, 3, `Fiat currency symbol must be exactly 3 characters: fiatCurrency = "${fiatCurrency}"`);
			assert.strictEqual(fiatCurrency, fiatCurrency.replace(/[^A-Z]/g, ''), `Fiat currency symbol must contain only uppercase alphabetic characters: fiatCurrency = "${fiatCurrency}"`);
			assert.ok(item.coinValues, `Missing "coinValues" for fiat currency where fiatCurrency = ${fiatCurrency}`);
			assert.ok(item.coinValueIncrement, `Missing "coinValueIncrement" for fiat currency where fiatCurrency = ${fiatCurrency}`);
			assert.ok(item.billValues, `Missing "billValues" for fiat currency where fiatCurrency = ${fiatCurrency}`);
			assert.notStrictEqual(typeof item.fiatPrecision, 'undefined', `Missing "fiatPrecision" for fiat currency where fiatCurrency = ${fiatCurrency}`);
			assert.ok(item.buyLimit, `Missing "buyLimit" for fiat currency where fiatCurrency = ${fiatCurrency}`);
		});
	});
});
