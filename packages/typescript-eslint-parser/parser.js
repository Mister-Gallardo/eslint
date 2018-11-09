/**
 * @fileoverview Parser that converts TypeScript into ESTree format.
 * @author Nicholas C. Zakas
 * @author James Henry <https://github.com/JamesHenry>
 * @copyright jQuery Foundation and other contributors, https://jquery.org/
 * MIT License
 */

"use strict";

const parse = require("typescript-estree").parse;
const astNodeTypes = require("typescript-estree").AST_NODE_TYPES;
const traverser = require("eslint/lib/util/traverser");
const visitorKeys = require("./visitor-keys");

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

exports.version = require("./package.json").version;

exports.parseForESLint = function parseForESLint(code, options) {
    if (options && typeof options.filePath === "string") {
        const tsx = options.filePath.endsWith(".tsx");
        if (tsx || options.filePath.endsWith(".ts")) {
            options = Object.assign({}, options, { jsx: tsx });
        }
    }

    const ast = parse(code, options);
    traverser.traverse(ast, {
        enter: node => {
            if (node.type === "DeclareFunction" || node.type === "FunctionExpression" || node.type === "FunctionDeclaration") {
                if (!node.body) {
                    node.type = `TSEmptyBody${node.type}`;
                }
            }
        }
    });
    return { ast, visitorKeys };
};

exports.parse = function(code, options) {
    return this.parseForESLint(code, options).ast;
};

// Deep copy.
/* istanbul ignore next */
exports.Syntax = (function() {
    let name,
        types = {};

    if (typeof Object.create === "function") {
        types = Object.create(null);
    }

    for (name in astNodeTypes) {
        if (astNodeTypes.hasOwnProperty(name)) {
            types[name] = astNodeTypes[name];
        }
    }

    if (typeof Object.freeze === "function") {
        Object.freeze(types);
    }

    return types;
}());
