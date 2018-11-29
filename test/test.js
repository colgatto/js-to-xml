'use strict';

var expect = require('chai').expect;
var jsToXml = require('../index');

describe('#jsToXml', function() {
    it('parse empty object', function() {
        var result = jsToXml({});
        expect(result).to.equal('');
    });
    it('parse only header', function() {
        var result = jsToXml({header:'<?xml ?>'});
        expect(result).to.equal('<?xml ?>\n');
    });
    it('parse single tag', function() {
        var result = jsToXml({header:'<?xml ?>',
        	node:[{
        		name:'tag',
        		node: 'text',
        		single: true
        	}]
        });
        expect(result).to.equal('<?xml ?>\n<tag/>\n');
    });
    it('parse regular tag', function() {
        var result = jsToXml({header:'<?xml ?>',
        	node:[{
        		name:'tag',
        		node: 'text'
        	}]
        });
        expect(result).to.equal('<?xml ?>\n<tag>text</tag>\n');
    });
    it('parse parent and child tag', function() {
        var result = jsToXml({header:'<?xml ?>',
        	node:[{
        		name:'parent',
        		node:[{
		    		name:'child',
		    		node: 'text'
		    	}]
        	}]
        });
        expect(result).to.equal('<?xml ?>\n<parent>\n\t<child>text</child>\n</parent>\n');
    });
    it('parse parent and child tag with attribute', function() {
        var result = jsToXml({header:'<?xml ?>',
        	node:[{
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
        	}]
        });
        expect(result).to.equal('<?xml ?>\n<parent attribute1="one" attribute2="two" >\n\t<child attribute3="3" attribute4="4" >text</child>\n</parent>\n');
    });
});