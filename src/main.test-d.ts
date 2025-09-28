import ModernError from 'modern-errors'
import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

import modernErrorsBeautiful, { type Options } from 'modern-errors-beautiful'

const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsBeautiful],
})
const error = new BaseError('')
expectType<string>(BaseError.beautiful(error))

ModernError.subclass('TestError', {
  plugins: [modernErrorsBeautiful],
  beautiful: {},
})
BaseError.beautiful(error, {})
expectAssignable<Options>({})
BaseError.beautiful(error, undefined)
expectNotAssignable<Options>(undefined)
ModernError.subclass('TestError', {
  plugins: [modernErrorsBeautiful],
  // @ts-expect-error
  beautiful: true,
})
// @ts-expect-error
BaseError.beautiful(error, true)
expectNotAssignable<Options>(true)

ModernError.subclass('TestError', {
  plugins: [modernErrorsBeautiful],
  // @ts-expect-error
  beautiful: { unknown: true },
})
// @ts-expect-error
BaseError.beautiful(error, { unknown: true })
expectNotAssignable<Options>({ unknown: true })

ModernError.subclass('TestError', {
  plugins: [modernErrorsBeautiful],
  // @ts-expect-error
  beautiful: { classes: {} },
})
// @ts-expect-error
BaseError.beautiful(error, { classes: {} })
expectNotAssignable<Options>({ classes: {} })

ModernError.subclass('TestError', {
  plugins: [modernErrorsBeautiful],
  // @ts-expect-error
  beautiful: { custom: 'pretty' },
})
// @ts-expect-error
BaseError.beautiful(error, { custom: 'pretty' })
expectNotAssignable<Options>({ custom: 'pretty' })

ModernError.subclass('TestError', {
  plugins: [modernErrorsBeautiful],
  beautiful: { stack: true },
})
BaseError.beautiful(error, { stack: true })
expectAssignable<Options>({ stack: true })
ModernError.subclass('TestError', {
  plugins: [modernErrorsBeautiful],
  // @ts-expect-error
  beautiful: { stack: 'true' },
})
// @ts-expect-error
BaseError.beautiful(error, { stack: 'true' })
expectNotAssignable<Options>({ stack: 'true' })
