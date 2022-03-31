const assert = require('assert');
const { stringify } = require('../../../');

describe('stringify(data)', function() {

	it('returns key-value string', function() {
		const data = {
			'apiKey.id': 'b26c166655',
			'apiKey.key': '07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781',
			'apiKey.encoding': 'hex',
			'shorten': true,
			'callbackUrl': 'https://ln.bleskomat.com/u',
			'coinValues': [0.05, 0.1, 0.2, 0.5, 1, 2],
			'coinValueIncrement': 0.05,
			'billValues': [5, 10, 20, 50, 100, 200],
			'uriSchemaPrefix': 'LIGHTNING:',
			'locale': 'en',
			'fiatCurrency': 'EUR',
			'fiatPrecision': 2,
			'webUrl': 'https://www.bleskomat.com',
			'platformSockUri': 'wss://www.bleskomat.com/device',
			'pingSockUri': 'wss://ping.bleskomat.com/',
			'strictTls': false,
		};
		const result = stringify(data);
		assert.strictEqual(result, 'apiKey.id=b26c166655\napiKey.key=07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781\napiKey.encoding=hex\nshorten=1\ncallbackUrl=https://ln.bleskomat.com/u\ncoinValues=0.05,0.1,0.2,0.5,1,2\ncoinValueIncrement=0.05\nbillValues=5,10,20,50,100,200\nuriSchemaPrefix=LIGHTNING:\nlocale=en\nfiatCurrency=EUR\nfiatPrecision=2\nwebUrl=https://www.bleskomat.com\nplatformSockUri=wss://www.bleskomat.com/device\npingSockUri=wss://ping.bleskomat.com/\nstrictTls=0');
	});

	it('duplicate keys', function() {
		const data = {
			'key': '1',
			'key': '2',
		};
		const result = stringify(data);
		assert.strictEqual(result, 'key=2');
	});

	it('JSON object', function() {
		const data = {
			'key': {
				id: '123',
				value: 0,
			},
		};
		const result = stringify(data);
		assert.strictEqual(result, 'key={"id":"123","value":0}');
	});

	it('Array', function() {
		const data = {
			'key': [1, 2, 3],
			'key2': ['one', 'two', 'three'],
		};
		const result = stringify(data);
		assert.strictEqual(result, 'key=1,2,3\nkey2=one,two,three');
	});

	it('empty object', function() {
		const data = {};
		const result = stringify(data);
		assert.strictEqual(result, '');
	});

	it('undefined', function() {
		assert.throws(() => stringify(), {
			message: 'Invalid argument ("data"): Object expected',
		});
	});
});
