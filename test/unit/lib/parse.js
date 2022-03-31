const assert = require('assert');
const { parse } = require('../../../');

describe('parse(keyValueString)', function() {

	it('returns parsed key-value object', function() {
		const keyValueString = 'apiKey.id=b26c166655\napiKey.key=07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781\napiKey.encoding=hex\nshorten=true\ncallbackUrl=https://ln.bleskomat.com/u\ncoinValues=0.05,0.1,0.2,0.5,1,2\ncoinValueIncrement=0.05\nbillValues=5,10,20,50,100,200\nuriSchemaPrefix=LIGHTNING:\nlocale=en\nfiatCurrency=EUR\nfiatPrecision=2\nwebUrl=https://www.bleskomat.com\nplatformSockUri=wss://www.bleskomat.com/device\npingSockUri=wss://ping.bleskomat.com/\nstrictTls=0';
		const result = parse(keyValueString);
		assert.strictEqual(typeof result, 'object');
		assert.strictEqual(result['apiKey.id'], 'b26c166655');
		assert.strictEqual(result['apiKey.key'], '07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781');
		assert.strictEqual(result['apiKey.encoding'], 'hex');
		assert.strictEqual(result.shorten, true);
		assert.strictEqual(result.callbackUrl, 'https://ln.bleskomat.com/u');
		assert.deepStrictEqual(result.coinValues, [0.05, 0.1, 0.2, 0.5, 1, 2]);
		assert.strictEqual(result.coinValueIncrement, 0.05);
		assert.deepStrictEqual(result.billValues, [5, 10, 20, 50, 100, 200]);
		assert.strictEqual(result.uriSchemaPrefix, 'LIGHTNING:');
		assert.strictEqual(result.locale, 'en');
		assert.strictEqual(result.fiatCurrency, 'EUR');
		assert.strictEqual(result.fiatPrecision, 2);
		assert.strictEqual(result.webUrl, 'https://www.bleskomat.com');
		assert.strictEqual(result.platformSockUri, 'wss://www.bleskomat.com/device');
		assert.strictEqual(result.pingSockUri, 'wss://ping.bleskomat.com/');
		assert.strictEqual(result.strictTls, false);
	});

	it('base64', function() {
		const keyValueString = 'apiKey.id=UiJdvfU=\napiKey.key=djgi52XNrO7ZycaEckd6g89infkDusfaWMLKmVielB8=\napiKey.encoding=base64\nshorten=false';
		const result = parse(keyValueString);
		assert.deepStrictEqual(result, {
			'apiKey.id': 'UiJdvfU=',
			'apiKey.key': 'djgi52XNrO7ZycaEckd6g89infkDusfaWMLKmVielB8=',
			'apiKey.encoding': 'base64',
			'shorten': false,
		});
	});

	it('duplicate keys', function() {
		const keyValueString = 'key=1\nkey=2';
		const result = parse(keyValueString);
		assert.deepStrictEqual(result, {
			'key': '2',
		});
	});

	it('empty string', function() {
		const keyValueString = '';
		const result = parse(keyValueString);
		assert.deepStrictEqual(result, {});
	});

	it('undefined', function() {
		assert.throws(() => parse(), {
			message: 'Invalid argument ("keyValueString"): String expected',
		});
	});
});
