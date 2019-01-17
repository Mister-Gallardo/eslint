/**
 * @fileoverview Disallows the use of require statements except in import statements.
 * @author Macklin Underdown
 */
'use strict';

const util = require('../util');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallows the use of require statements except in import statements',
      extraDescription: [util.tslintRule('no-var-requires')],
      category: 'TypeScript',
      url: util.metaDocsUrl('no-var-requires'),
      recommended: 'error',
    },
    schema: [],
  },
  create(context) {
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        if (
          node.callee.name === 'require' &&
          node.parent.type === 'VariableDeclarator'
        ) {
          context.report({
            node,
            message: 'Require statement not part of import statement.',
          });
        }
      },
    };
  },
};
