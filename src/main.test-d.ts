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
  beautiful: { classes: { TypeError: { unknown: true } } },
})
// @ts-expect-error
BaseError.beautiful(error, { classes: { TypeError: { unknown: true } } })
expectNotAssignable<Options>({ classes: { TypeError: { unknown: true } } })

ModernError.subclass('TestError', {
  plugins: [modernErrorsBeautiful],
  beautiful: { stack: true },
})
BaseError.beautiful(error, { stack: true })
expectAssignable<Options>({ stack: true })

ModernError.subclass('TestError', {
  plugins: [modernErrorsBeautiful],
  beautiful: { classes: { TypeError: { stack: true } } },
})
BaseError.beautiful(error, { classes: { TypeError: { stack: true } } })
expectAssignable<Options>({ classes: { TypeError: { stack: true } } })

ModernError.subclass('TestError', {
  plugins: [modernErrorsBeautiful],
  // @ts-expect-error
  beautiful: { stack: 'true' },
})
// @ts-expect-error
BaseError.beautiful(error, { stack: 'true' })
expectNotAssignable<Options>({ stack: 'true' })

ModernError.subclass('TestError', {
  plugins: [modernErrorsBeautiful],
  // @ts-expect-error
  beautiful: { classes: { TypeError: { stack: 'true' } } },
})
// @ts-expect-error
BaseError.beautiful(error, { classes: { TypeError: { stack: 'true' } } })
expectNotAssignable<Options>({ classes: { TypeError: { stack: 'true' } } })
