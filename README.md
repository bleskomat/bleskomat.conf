# bleskomat.conf

![Build Status](https://github.com/bleskomat/bleskomat.conf/actions/workflows/tests.yml/badge.svg)

Node.js module to read/write bleskomat.conf files and parse/stringify bleskomat key-value objects/strings. Also includes recommended fiat currency configurations.

* [Installation](#installation)
* [Usage](#usage)
* [Tests](#tests)
* [Changelog](#changelog)
* [License](#license)


## Installation

Add to your application via `npm`:
```bash
npm install bleskomat.conf
```


## Usage

Parse bleskomat.conf string:
```js
const { parse } = require('bleskomat.conf');
console.log(parse('apiKey.id=b26c166655\napiKey.key=07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781\napiKey.encoding=hex\nshorten=1'));
```
Result:
```js
{
	'apiKey.id': 'b26c166655',
	'apiKey.key': '07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781',
	'apiKey.encoding': 'hex',
	'shorten': true,
}
```

Stringify object as bleskomat.conf string:
```js
const { stringify } = require('bleskomat.conf');
console.log(stringify({
	'apiKey.id': 'b26c166655',
	'apiKey.key': '07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781',
	'apiKey.encoding': 'hex',
	'shorten': true,
}));
```
Result:
```
apiKey.id=b26c166655
apiKey.key=07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781
apiKey.encoding=hex
shorten=1
```

Read bleskomat.conf file:
```js
const { readFile } = require('bleskomat.conf');
readFile('./bleskomat.conf').then(result => {
	// `result` will be an object same as the `parse()` method.
	console.log(result);
}).catch(error => {
	console.error(error);
});
```

Write object to bleskomat.conf file:
```js
const { writeFile } = require('bleskomat.conf');
writeFile('./bleskomat.conf', {
	'apiKey.id': 'b26c166655',
	'apiKey.key': '07d263ffbd33598a433ada729c883e1a54d566e8776dd4cdeaeadc5679781781',
	'apiKey.encoding': 'hex',
	'shorten': true,
}).then(result => {
	// `result` will be TRUE if file was written.
	console.log(result);
}).catch(error => {
	console.error(error);
});
```

Get array of fiat currency configurations:
```js
const { fiatCurrencies } = require('bleskomat.conf');
console.log(fiatCurrencies);
```
Result:
```js
[
	// ..
	{
		"symbol": "CZK",
		"coinValues": [1, 2, 5, 10, 20, 50],
		"coinValueIncrement": 1,
		"billValues": [100, 200, 500, 1000, 2000],
		"fiatPrecision": 0,
		"defaults": {
			"buyLimit": 20000
		}
	},
	{
		"symbol": "EUR",
		"coinValues": [0.05, 0.10, 0.20, 0.50, 1.00, 2.00],
		"coinValueIncrement": 0.05,
		"billValues": [5, 10, 20, 50, 100, 200],
		"fiatPrecision": 2,
		"defaults": {
			"buyLimit": 1000
		}
	}
	// ..
]
```


## Tests

Run automated tests as follows:
```bash
npm test
```


## Changelog

See [CHANGELOG.md](https://github.com/bleskomat/bleskomat.conf/blob/master/CHANGELOG.md)


## License

This software is [MIT licensed](https://tldrlegal.com/license/mit-license):
> A short, permissive software license. Basically, you can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source.  There are many variations of this license in use.
