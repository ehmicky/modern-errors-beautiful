import beautifulError, { validateOptions, type Options } from 'beautiful-error'
import type { Info, Plugin } from 'modern-errors'

/**
 * Options of `modern-errors-beautiful`
 */
export type { Options }

// `error.beautiful()` is called with `errorString` as argument by
// `beautiful-error`. We ignore that argument and prevent it from being
// considered an invalid options object.
const isOptions = (options: unknown) => typeof options !== 'string'

const getOptions = (options: Options = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  validateOptions(options)

  if (options.classes !== undefined) {
    throw new TypeError('"classes" must not be defined.')
  }

  return options
}

/**
 * Logs `error` on the console (`stderr`) then exits the process.
 *
 * This never throws. Invalid errors are silently
 * [normalized](https://github.com/ehmicky/normalize-exception).
 *
 * @example
 * ```js
 * try {
 *   // ...
 * } catch (error) {
 *   const message = BaseError.beautiful(error)
 *   console.error(message)
 * }
 * ```
 */
// Temporarily unsets `error.beautiful()` to avoid recursion
const beautiful = ({ error, options }: Info<Options>['instanceMethods']) => {
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(error, 'beautiful', {
    value: undefined,
    enumerable: false,
    writable: true,
    configurable: true,
  })

  try {
    return beautifulError(error, options)
  } finally {
    // eslint-disable-next-line fp/no-delete
    delete (error as Error & { beautiful?: undefined }).beautiful
  }
}

/**
 * `modern-errors-beautiful` plugin
 */
const modernErrorsBeautiful = {
  name: 'beautiful' as const,
  isOptions,
  getOptions,
  instanceMethods: { beautiful },
} satisfies Plugin

export default modernErrorsBeautiful
