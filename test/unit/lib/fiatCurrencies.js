const assert = require('assert');
const { fiatCurrencies } = require('../../../');

describe('fiatCurrencies', function() {

	it('sanity checks', function() {
		assert.ok(fiatCurrencies instanceof Array);
		assert.ok(fiatCurrencies.length > 0);
	});

	fiatCurrencies.forEach((item, index) => {

		const { fiatCurrency } = item || {};

		describe(`"${fiatCurrency}" (index = ${index})`, function() {

			describe('fiatCurrency symbol', function() {
				it('is exactly 3 characters', function() {
					assert.strictEqual(fiatCurrency.length, 3);
				});
				it('contains only uppercase alphabetic characters', function() {
					assert.strictEqual(fiatCurrency, fiatCurrency.replace(/[^A-Z]/g, ''));
				});
			});

			['fiatCurrency', 'coinValues', 'coinValueIncrement', 'billValues', 'fiatPrecision', 'buyLimit'].forEach(key => {
				it(`"${key}" is defined`, function() {
					assert.notStrictEqual(typeof item[key], 'undefined');
				});
			});

			['coinValues', 'billValues'].forEach(key => {
				describe(key, function() {
					it('is an array of numbers', function() {
						assert.ok(item[key] instanceof Array);
						item[key].forEach(value => {
							assert.ok(!Number.isNaN(parseFloat(value)));
						});
					});
					it('is in ascending order', function() {
						item[key].forEach((value, index) => {
							assert.ok(index === 0 || value > item[key][index - 1]);
						});
					});
				});
			});

			['coinValueIncrement', 'buyLimit'].forEach(key => {
				it(`"${key}" is a number`, function() {
					assert.ok(!Number.isNaN(parseFloat(item[key])));
				});
			});

			['fiatPrecision'].forEach(key => {
				it(`"${key}" is an integer`, function() {
					assert.ok(Number.isInteger(item[key]));
				});
			});

			it('all numbers in "coinValues" are divisible by "coinValueIncrement"', function() {
				const multiplier = Math.pow(10, item.fiatPrecision);
				const increment = item.coinValueIncrement * multiplier;
				item.coinValues.forEach((value, index) => {
					assert.ok((value * multiplier) % increment === 0);
				});
			});
		});
	});
});
