'use strict';

const blockAttrType = ['object','function'];

let default_config = {
	end_of_line: '\r\n',
	tab_character: '\t',
	header: '<?xml version="1.0" encoding="UTF-8"?>'
};
let config = {};

const isSingle = (node) => typeof node.single != "undefined" && node.single;

const spacer = (tab=0) => {
	let space = '';
	for(let i=0;i<tab;i++) space += config.tab_character;
	return space;
}

const stringifyAttr = (attr) => {
	let res = [];
	for(let k in attr){
		if(!blockAttrType.includes(typeof attr[k]))
			res.push(k + '="' + attr[k] + '"');
	}
	return res.join(' ');
};

const stringifyTag = (node) => '<' + node.name + (typeof node.attr == 'object' ? (' ' + stringifyAttr(node.attr)) : '' ) + ( isSingle(node) ? '/>' : '>' );

const recNodes = (nodes, tab = 0) => {
	let result = '';
	for(let i=0, l=nodes.length; i<l; i++){
		result += spacer(tab) + stringifyTag(nodes[i]);
		if(isSingle(nodes[i])){
			result += config.end_of_line;
			continue;
		}
		if(typeof nodes[i].node == "string"){
			result += nodes[i].node + '</' + nodes[i].name + '>' + config.end_of_line;
			continue;
		}
		if(typeof nodes[i].node == "object")
			result += config.end_of_line + recNodes(nodes[i].node, tab+1) + spacer(tab);
		result += '</' + nodes[i].name + '>' + config.end_of_line;
	}
	return result;
};

/**
 * convert Object to xml
 * @param {object} obj
 * @return {string}
 */
module.exports = function(obj, options={}){
	config = Object.assign({}, default_config, options);
	let result = config.header != '' ? config.header + config.end_of_line : '';
	if(typeof obj == "object" && Object.keys(obj).length>0)
		result += recNodes([obj]);
	return result.slice(0,result.length-config.end_of_line.length);
};