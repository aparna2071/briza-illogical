/**
 * Parser module.
 * @module illogical/parser
 */
import { Options } from './options';
import { Evaluable } from '../common/evaluable';
export declare type ArrayInput = Array<string | number | boolean | null>;
export declare type Input = string | number | boolean | null | ArrayInput;
export declare type ExpressionInput = [string, ...Input[]];
/**
 * Parser of raw expressions into Evaluable expression
 */
export declare class Parser {
    private readonly opts;
    /**
     * @constructor
     * @param {Options?} options Parser options.
     */
    constructor(options?: Partial<Options>);
    /**
     * Parser options
     * @type {Options}
     */
    get options(): Options;
    /**
     * Parse raw expression into evaluable expression.
     * @param {ExpressionInput} raw Raw expression.
     * @return {Evaluable}
     */
    parse(raw: ExpressionInput): Evaluable;
    /**
     * Parse raw expression based on the expression type.
     * @param {Input} raw Raw expression.
     * @return {Evaluable}
     */
    private parseRawExp;
    /**
     * Get resolved operand
     * @param raw Raw data
     */
    private getOperand;
}
