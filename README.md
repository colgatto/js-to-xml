# js-to-xml
Module for parse custom javascript object into xml, without dependencies

## Install
```sh
npm install --save git+https://github.com/colgatto/js-to-xml.git
```
## Usage
```javascript
let jsToXml = require('js-to-xml');
let data = {
	header: '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>',
	node: [{
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
	}]
}
console.log(data);
```
### result
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<root creator="author" typename="Article" version="2" >
	<child1 comment="comment" number="3" >
		<child11 name="child name" />
	</child1>
	<child2>text</child2>
</root>
```