import { permutation } from '../../../../__test__/helpers'

import { Value } from '../../../../operand/value'
import { Reference } from '../../../../operand/reference'
import { Equal } from '../../eq'

describe('Condition Engine - Expression - Comparison - Equal', () => {
  describe('evaluate', () => {

    // Test value types against value types
    test('value type', () => {
      let validTypes = [1, '1', true, false]
      let validTypePermutations = permutation(validTypes)

      let tests = []

      // Explicit truthy cases
      // type A == type A
      for (const type of validTypes) {
        tests.push(
          {
            left: new Value(type),
            right: new Value(type),
            expected: true
          }
        )
      }
      // Implicit Falsy
      // Different types - across all permutations
      for (const permutation of validTypePermutations) {
        tests.push(
          {
            left: new Value(permutation[0]),
            right: new Value(permutation[1]),
            expected: false
          }
        )
      }

      tests = [...tests,
      // Falsy
      { left: new Value(1), right: new Value(10), expected: false },
      { left: new Value('1'), right: new Value('10'), expected: false },
      { left: new Value(true), right: new Value(false), expected: false },
      // Array types, falsy in any case
      { left: new Value([1]), right: new Value([1]), expected: false },
      { left: new Value(['1']), right: new Value(['1']), expected: false },
      { left: new Value(1), right: new Value([1]), expected: false },
      { left: new Value('1'), right: new Value(['1']), expected: false },
      ]

      for (const test of tests) {
        // @ts-ignore
        expect(new Equal(test.left, test.right).evaluate({}))
          .toBe(test.expected)
      }
    })

    // Test reference types against reference types
    test('reference type', () => {
      let tests = [
        // Truthy
        { left: new Reference('RefA'), right: new Reference('RefA'), expected: true },
        { left: new Reference('RefB'), right: new Reference('RefB'), expected: true },
        { left: new Reference('RefC'), right: new Reference('RefC'), expected: true },
        { left: new Reference('RefD'), right: new Reference('RefD'), expected: true },
        // Falsy
        { left: new Reference('RefA'), right: new Reference('RefB'), expected: false },
        { left: new Reference('RefA'), right: new Reference('RefC'), expected: false },
        { left: new Reference('RefC'), right: new Reference('RefD'), expected: false },
        { left: new Reference('RefD'), right: new Reference('RefE'), expected: false },
        // Array types, falsy in any case
        { left: new Reference('RefF'), right: new Reference('RefA'), expected: false },
        { left: new Reference('RefG'), right: new Reference('RefB'), expected: false },
      ]

      for (const test of tests) {
        // @ts-ignore
        expect(new Equal(test.left, test.right).evaluate({
          RefA: 1,
          RefB: '1',
          RefC: true,
          RefD: false,
          // RefE = undefined
          RefF: [1],
          RefG: ['1'],
        }))
          .toBe(test.expected)
      }
    })

    // Test reference types against value types
    test('reference/value type', () => {
      let tests = [
        // Truthy
        { left: new Reference('RefA'), right: new Value(1), expected: true },
        { left: new Reference('RefB'), right: new Value('1'), expected: true },
        { left: new Reference('RefC'), right: new Value(true), expected: true },
        { left: new Reference('RefD'), right: new Value(false), expected: true },
        // Falsy
        { left: new Reference('RefA'), right: new Value('10'), expected: false },
        { left: new Reference('RefB'), right: new Value(10), expected: false },
        { left: new Reference('RefC'), right: new Value(false), expected: false },
        { left: new Reference('RefE'), right: new Value(false), expected: false },
        // Array types, falsy in any case
        { left: new Reference('RefF'), right: new Value(1), expected: false },
        { left: new Reference('RefG'), right: new Value('1'), expected: false },
      ]

      for (const test of tests) {
        // @ts-ignore
        expect(new Equal(test.left, test.right).evaluate({
          RefA: 1,
          RefB: '1',
          RefC: true,
          RefD: false,
          // RefE = undefined
          RefF: [1],
          RefG: ['1'],
        }))
          .toBe(test.expected)
      }
    })
  })
})