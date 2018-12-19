'use strict';

const blockAttrType = ['object','function'];

let end_of_line = '\r\n';

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
			result += end_of_line;
			continue;
		}
		if(typeof nodes[i].node == "string"){
			result += nodes[i].node + '</' + nodes[i].name + '>' + end_of_line;
			continue;
		}
		if(typeof nodes[i].node == "object")
			result += end_of_line + recNodes(nodes[i].node, tab+1) + spacer(tab);
		result += '</' + nodes[i].name + '>' + end_of_line;
	}
	return result;
};

/**
 * convert Object to xml
 * @param {object} obj
 * @return {string}
 */
module.exports = function(obj, endOfLine = '\r\n'){
	end_of_line = endOfLine;
	let result = typeof obj.header == "string" ? ( obj.header + end_of_line ) : '';
	if(typeof obj.node == "object")
		result += recNodes(obj.node);
	return result;
};