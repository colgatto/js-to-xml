# js-to-xml [![Build Status](https://travis-ci.com/colgatto/js-to-xml.svg?branch=master)](https://travis-ci.com/colgatto/js-to-xml) [![Coverage Status](https://coveralls.io/repos/github/colgatto/js-to-xml/badge.svg?branch=master)](https://coveralls.io/github/colgatto/js-to-xml?branch=master)
Module for parse custom javascript object into xml, without dependencies

## Install
```sh
npm install --save git+https://github.com/colgatto/js-to-xml.git
```

## Sintax
    jsToXml(data [,config]);
| parameter | type |
|-|-|
| data | `Object` |
| config (Optional) | `Object` |

`config` parameter:

| parameter | type | default value |
| ---- | ---- | ---- |
| end_of_line | `String` | \r\n |
| tab_character | `String` | \t |
| header | `String` | <\?xml version="1.0" encoding="UTF-8"?> |


## Usage
```javascript
let jsToXml = require('js-to-xml');

let data = {
	name: 'root',
	attr: {
		creator: 'author',
		typename: 'Article',
		version: 2
	},
	node: [{
		name: 'child1',
		attr: {
			comment: 'comment',
			number: 3
		},
		node: [{
			name: 'child11',
			single: true,
			attr: {
				name: 'child name'
			}
		}]
	},{
		name: 'child2',
		node: 'text'
	}]
};

let xml_output = jsToXml(data);

console.log(xml_output);
```
## result
```xml
<?xml version="1.0" encoding="UTF-8"?>
<root creator="author" typename="Article" version="2">
	<child1 comment="comment" number="3">
		<child11 name="child name"/>
	</child1>
	<child2>text</child2>
</root>
```