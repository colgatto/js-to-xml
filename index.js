'use strict';

const blockAttrType = ['object','function'];

const isSingle = (node) => typeof node.single != "undefined" && node.single;

const spacer = (tab=0) => {
	let space = '';
	for(let i=0;i<tab;i++) space += '\t';
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
			result += '\n';
			continue;
		}
		if(typeof nodes[i].node == "string"){
			result += nodes[i].node + '</' + nodes[i].name + '>\n';
			continue;
		}
		if(typeof nodes[i].node == "object")
			result += '\n' + recNodes(nodes[i].node, tab+1) + spacer(tab);
		result += '</' + nodes[i].name + '>\n';
	}
	return result;
};

/**
 * convert Object to xml
 * @param {object} obj
 * @return {string}
 */
module.exports = function(obj){
	let result = typeof obj.header == "string" ? ( obj.header + '\n' ) : '';
	if(typeof obj.node == "object")
		result += recNodes(obj.node);
	return result;
};