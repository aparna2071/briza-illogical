/**
 * Logical expression module.
 * @module illogical/expression/logical
 */

import {
  Context,
  Result,
  Evaluable
} from '../../common/evaluable'

import { Logical } from '../logical'

// Operator key
export const OPERATOR = Symbol('AND')

/**
 * And logical expression
 */
export class And extends Logical {
  /**
   * @constructor
   * @param {Evaluable[]} operands Collection of operands.
   */
  constructor (operands: Evaluable[]) {
    if (operands.length === 0) {
      throw new Error('logical expression must have at least one operand')
    }
    super('AND', operands)
  }

  /**
   * Evaluate in the given context.
   * @param {Context} ctx
   * @return {Result}
   */
  evaluate (ctx: Context): Result {
    for (const operand of this.operands) {
      if (operand.evaluate(ctx) === false) {
        return false
      }
    }
    return true
  }
}
