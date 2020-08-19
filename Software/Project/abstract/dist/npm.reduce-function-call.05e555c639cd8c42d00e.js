(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.reduce-function-call"],{

/***/ "+71K":
/*!****************************************************!*\
  !*** ./node_modules/reduce-function-call/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n * Module dependencies\n */\nvar balanced = __webpack_require__(/*! balanced-match */ \"kbA8\")\n\n/**\n * Expose `reduceFunctionCall`\n *\n * @type {Function}\n */\nmodule.exports = reduceFunctionCall\n\n/**\n * Walkthrough all expressions, evaluate them and insert them into the declaration\n *\n * @param {Array} expressions\n * @param {Object} declaration\n */\n\nfunction reduceFunctionCall(string, functionRE, callback) {\n  var call = string\n  return getFunctionCalls(string, functionRE).reduce(function(string, obj) {\n    return string.replace(obj.functionIdentifier + \"(\" + obj.matches.body + \")\", evalFunctionCall(obj.matches.body, obj.functionIdentifier, callback, call, functionRE))\n  }, string)\n}\n\n/**\n * Parses expressions in a value\n *\n * @param {String} value\n * @returns {Array}\n * @api private\n */\n\nfunction getFunctionCalls(call, functionRE) {\n  var expressions = []\n\n  var fnRE = typeof functionRE === \"string\" ? new RegExp(\"\\\\b(\" + functionRE + \")\\\\(\") : functionRE\n  do {\n    var searchMatch = fnRE.exec(call)\n    if (!searchMatch) {\n      return expressions\n    }\n    if (searchMatch[1] === undefined) {\n      throw new Error(\"Missing the first couple of parenthesis to get the function identifier in \" + functionRE)\n    }\n    var fn = searchMatch[1]\n    var startIndex = searchMatch.index\n    var matches = balanced(\"(\", \")\", call.substring(startIndex))\n\n    if (!matches || matches.start !== searchMatch[0].length - 1) {\n      throw new SyntaxError(fn + \"(): missing closing ')' in the value '\" + call + \"'\")\n    }\n\n    expressions.push({matches: matches, functionIdentifier: fn})\n    call = matches.post\n  }\n  while (fnRE.test(call))\n\n  return expressions\n}\n\n/**\n * Evaluates an expression\n *\n * @param {String} expression\n * @returns {String}\n * @api private\n */\n\nfunction evalFunctionCall (string, functionIdentifier, callback, call, functionRE) {\n  // allow recursivity\n  return callback(reduceFunctionCall(string, functionRE, callback), functionIdentifier, call)\n}\n\n\n//# sourceURL=webpack:///./node_modules/reduce-function-call/index.js?");

/***/ })

}]);