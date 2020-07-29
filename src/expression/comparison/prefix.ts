/**
 * Prefix expression module.
 * @module illogical/expression/prefix
 */

import { Context, Evaluable, Result } from '../../common/evaluable'
import { isString } from '../../common/type-check'
import { Comparison } from '../comparison'

// Operator key
export const OPERATOR = Symbol('PREFIX')

/**
 * Prefix comparison expression
 */
export class Prefix extends Comparison {
  /**
   * @constructor
   * @param {Evaluable} left Left operand.
   * @param {Evaluable} right Right operand.
   */
  constructor(...args: Evaluable[]);
  constructor (left: Evaluable, right: Evaluable) {
    if (arguments.length !== 2) {
      throw new Error('comparison expression expects left and right operands')
    }
    super('prefix', left, right)
  }

  /**
   * Evaluate in the given context.
   * @param {Context} ctx
   * @return {Result}
   */
  evaluate (ctx: Context): Result {
    const left = this.left.evaluate(ctx)
    const right = this.right.evaluate(ctx)
    if (isString(left) === false || isString(right) === false) {
      return false
    }
    return (right as string).startsWith(left as string)
  }

  /**
   * Get the strict representation of the expression.
   * @return {string}
   */
  toString (): string {
    const left = this.left.toString()
    const right = this.right.toString()
    return `(<${left}>${right})`
  }
}
