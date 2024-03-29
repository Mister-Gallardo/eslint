import { AST_NODE_TYPES } from '@typescript-eslint/types';

import {
  expectToBeFunctionScope,
  getRealVariables,
  parseAndAnalyze,
} from '../test-utils';

describe('ES6 new.target', () => {
  it('should not make references of new.target', () => {
    const { scopeManager } = parseAndAnalyze(`
      class A {
        constructor() {
          new.target;
        }
      }
    `);

    expect(scopeManager.scopes).toHaveLength(3);

    const scope = scopeManager.scopes[2];
    const variables = getRealVariables(scope.variables);

    expectToBeFunctionScope(scope);
    expect(scope.block.type).toBe(AST_NODE_TYPES.FunctionExpression);
    expect(scope.isStrict).toBeTruthy();
    expect(variables).toHaveLength(1);
    expect(variables[0].name).toBe('arguments');
    expect(scope.references).toHaveLength(0);
  });
});
