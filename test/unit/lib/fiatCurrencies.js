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
				const values = item[key];
				describe(key, function() {
					it('is an array of numbers', function() {
						assert.ok(values instanceof Array);
						values.forEach(value => {
							assert.ok(!Number.isNaN(parseFloat(value)));
						});
					});
					it('is in ascending order', function() {
						values.forEach((value, index) => {
							assert.ok(index === 0 || value > values[index - 1]);
						});
					});
					it('sufficient "fiatPrecision" for each value', function() {
						const { fiatPrecision } = item;
						const multiplier = Math.pow(10, fiatPrecision);
						values.forEach((value, index) => {
							const multipliedValue = value * multiplier;
							assert.ok(parseInt(multipliedValue) === multipliedValue);
						});
					});
				});
			});

			describe('fiatPrecision', function() {
				const { fiatPrecision } = item;
				it('is an integer', function() {
					assert.ok(Number.isInteger(fiatPrecision));
				});
			});

			describe('coinValueIncrement', function() {
				const { coinValueIncrement, fiatPrecision, coinValues } = item;
				it('is a number', function() {
					assert.ok(!Number.isNaN(parseFloat(coinValueIncrement)));
				});
				it('all numbers in "coinValues" are divisible by "coinValueIncrement"', function() {
					const multiplier = Math.pow(10, fiatPrecision);
					const increment = coinValueIncrement * multiplier;
					coinValues.forEach((value, index) => {
						assert.ok((value * multiplier) % increment === 0);
					});
				});
			});

			describe('buyLimit', function() {
				const { buyLimit } = item;
				it('is a number', function() {
					assert.ok(!Number.isNaN(parseFloat(buyLimit)));
				});
			});
		});
	});
});
