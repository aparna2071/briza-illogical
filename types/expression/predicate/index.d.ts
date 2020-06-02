/**
 * Predicate expression module.
 * @module illogical/expression/predicate
 */
import { Context, Result, Evaluable } from '../../common/evaluable';
import { Operand } from '../../operand';
/**
 * Abstract predicate expression
 */
export declare abstract class Predicate implements Evaluable {
    protected operator: string;
    protected operand: Operand;
    /**
     * @constructor
     * @param {string} operator String representation of the operator.
     * @param {Operand} operand
     */
    constructor(operator: string, operand: Operand);
    /**
     * Evaluate in the given context.
     * @param {Context} ctx
     */
    evaluate(ctx: Context): Result;
    /**
     * Get the strict representation of the expression.
     * @return {string}
     */
    toString(): string;
}
