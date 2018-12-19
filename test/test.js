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
        expect(result).to.equal('<?xml ?>\r\n');
    });
    it('parse single tag', function() {
        var result = jsToXml({header:'<?xml ?>',
        	node:[{
        		name:'tag',
        		node: 'text',
        		single: true
        	}]
        });
        expect(result).to.equal('<?xml ?>\r\n<tag/>\r\n');
	});
	it('parse with different endOfLine (\\n)', function() {
        var result = jsToXml({header:'<?xml ?>',
        	node:[{
        		name:'tag',
        		node: 'text',
        		single: true
        	}]
        },'\n');
        expect(result).to.equal('<?xml ?>\n<tag/>\n');
	});
	it('parse with different endOfLine (\\r\\n\\r\\n)', function() {
        var result = jsToXml({header:'<?xml ?>',
        	node:[{
        		name:'tag',
        		node: 'text',
        		single: true
        	}]
        },'\r\n\r\n');
        expect(result).to.equal('<?xml ?>\r\n\r\n<tag/>\r\n\r\n');
    });
    it('parse regular tag', function() {
        var result = jsToXml({header:'<?xml ?>',
        	node:[{
        		name:'tag',
        		node: 'text'
        	}]
        });
        expect(result).to.equal('<?xml ?>\r\n<tag>text</tag>\r\n');
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
        expect(result).to.equal('<?xml ?>\r\n<parent>\r\n\t<child>text</child>\r\n</parent>\r\n');
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
        expect(result).to.equal('<?xml ?>\r\n<parent attribute1="one" attribute2="two">\r\n\t<child attribute3="3" attribute4="4">text</child>\r\n</parent>\r\n');
	});
	it('parse tag with wrong attribute', function() {
        var result = jsToXml({header:'<?xml ?>',
        	node:[{
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
        	}]
        });
        expect(result).to.equal('<?xml ?>\r\n<parent attribute1="one">\r\n\t<child attribute3="3">text</child>\r\n</parent>\r\n');
	});
	it('parse tag with wrong node', function() {
        var result = jsToXml({header:'<?xml ?>',
        	node:[{
        		name:'parent',
        		node:[{
		    		name:'child1',
		    		node: 'text'
		    	},{
		    		name:'child2',
		    		node: () => 2
		    	}]
        	}]
        });
        expect(result).to.equal('<?xml ?>\r\n<parent>\r\n\t<child1>text</child1>\r\n\t<child2></child2>\r\n</parent>\r\n');
    });
});