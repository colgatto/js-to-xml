'use strict';

var expect = require('chai').expect;
var jsToXml = require('../index');

describe('#jsToXml', function() {
    it('parse empty object', function() {
        var result = jsToXml({});
        expect(result).to.equal('<?xml version="1.0" encoding="UTF-8"?>');
    });
    it('parse only header', function() {
        var result = jsToXml({},{header:'<?xml ?>'});
        expect(result).to.equal('<?xml ?>');
	});
	it('parse empy header I', function() {
        var result = jsToXml({},{header:''});
        expect(result).to.equal('');
	});
	it('parse empy header II', function() {
        var result = jsToXml({
        	name:'tag',
        	node: 'text'
        },{header:''});
        expect(result).to.equal('<tag>text</tag>');
    });
    it('parse single tag', function() {
        var result = jsToXml({
        	name:'tag',
        	node: 'text',
        	single: true
        },{
			header:'<?xml ?>'
		});
        expect(result).to.equal('<?xml ?>\r\n<tag/>');
	});
	it('parse with different endOfLine (\\n)', function() {
        var result = jsToXml({
			name:'tag',
			node: 'text',
			single: true
        },{
			end_of_line:'\n',
			header:'<?xml ?>'
		});
        expect(result).to.equal('<?xml ?>\n<tag/>');
	});
	it('parse with different endOfLine (\\r\\n\\r\\n)', function() {
        var result = jsToXml({
			name:'tag',
			node: 'text',
			single: true
        },{
			end_of_line:'\r\n\r\n'
		});
        expect(result).to.equal('<?xml version="1.0" encoding="UTF-8"?>\r\n\r\n<tag/>');
    });
    it('parse regular tag', function() {
        var result = jsToXml({
			name:'tag',
			node: 'text'
        },{
			header:'<?xml ?>'
		});
        expect(result).to.equal('<?xml ?>\r\n<tag>text</tag>');
    });
    it('parse parent and child tag', function() {
        var result = jsToXml({
			name:'parent',
			node:[{
				name:'child',
				node: 'text'
			}]
        },{
			header:'<?xml ?>'
		});
        expect(result).to.equal('<?xml ?>\r\n<parent>\r\n\t<child>text</child>\r\n</parent>');
    });
    it('parse parent and child tag with attribute', function() {
        var result = jsToXml({
			name:'parent',
			attr:{
				attribute1: 'one',
				attribute2: 'two'
			},
			node:[{
				name:'child',
				attr:{
					attribute3: 3,
					attribute4: 4
				},
				node: 'text'
			}]
        },{
			header:'<?xml ?>'
		});
        expect(result).to.equal('<?xml ?>\r\n<parent attribute1="one" attribute2="two">\r\n\t<child attribute3="3" attribute4="4">text</child>\r\n</parent>');
	});
	it('parse tag with wrong attribute', function() {
        var result = jsToXml({
			name:'parent',
			attr:{
				attribute1: 'one',
				attribute2: () => 4
			},
			node:[{
				name:'child',
				attr:{
					attribute3: 3,
					attribute4: {a:1,b:2}
				},
				node: 'text'
			}]
        },{header:'<?xml ?>'});
        expect(result).to.equal('<?xml ?>\r\n<parent attribute1="one">\r\n\t<child attribute3="3">text</child>\r\n</parent>');
	});
	it('parse tag with wrong node', function() {
        var result = jsToXml({
        		name:'parent',
        		node:[{
		    		name:'child1',
		    		node: 'text'
		    	},{
		    		name:'child2',
		    		node: () => 2
		    	}]
        },{header:'<?xml ?>'});
        expect(result).to.equal('<?xml ?>\r\n<parent>\r\n\t<child1>text</child1>\r\n\t<child2></child2>\r\n</parent>');
    });
});