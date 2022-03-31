const assert = require('assert');
const { fiatCurrencies } = require('../../../');

describe('fiatCurrencies', function() {

	it('sanity check', function() {
		assert.ok(fiatCurrencies instanceof Array);
		assert.ok(fiatCurrencies.length > 0);
		fiatCurrencies.forEach((fiatCurrency, index) => {
			assert.strictEqual(typeof fiatCurrency, 'object');
			const { symbol } = fiatCurrency;
			assert.ok(symbol, `Missing "symbol" for fiat currency where index = ${index}`);
			assert.strictEqual(symbol.length, 3, `Fiat currency symbol must be exactly 3 characters: symbol = "${symbol}"`);
			assert.strictEqual(symbol, symbol.replace(/[^A-Z]/g, ''), `Fiat currency symbol must contain only uppercase alphabetic characters: symbol = "${symbol}"`);
			assert.ok(fiatCurrency.coinValues, `Missing "coinValues" for fiat currency where symbol = ${symbol}`);
			assert.ok(fiatCurrency.coinValueIncrement, `Missing "coinValueIncrement" for fiat currency where symbol = ${symbol}`);
			assert.ok(fiatCurrency.billValues, `Missing "billValues" for fiat currency where symbol = ${symbol}`);
			assert.notStrictEqual(typeof fiatCurrency.fiatPrecision, 'undefined', `Missing "fiatPrecision" for fiat currency where symbol = ${symbol}`);
			assert.ok(fiatCurrency.defaults, `Missing "defaults" for fiat currency where symbol = ${symbol}`);
			assert.strictEqual(typeof fiatCurrency.defaults, 'object');
			assert.ok(fiatCurrency.defaults.buyLimit, `Missing "defaults.buyLimit" for fiat currency where symbol = ${symbol}`);
		});
	});
});
