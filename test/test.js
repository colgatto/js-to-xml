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
});