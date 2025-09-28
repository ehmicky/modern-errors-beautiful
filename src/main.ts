import beautifulError, { validateOptions, type Options } from 'beautiful-error'
import isPlainObject from 'is-plain-obj'
import type { ErrorInstance, Info, Plugin } from 'modern-errors'

/**
 * Options of `modern-errors-beautiful`
 */
export type { Options }

const getOptions = (options: Options = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  validateOptions(options)

  if (options.classes !== undefined) {
    throw new TypeError('"classes" must not be defined.')
  }

  return options
}

type StaticOptions = Info['staticMethods']

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
const beautiful = ({ errorInfo }: StaticOptions, error: ErrorInstance) => {
  const options: Options = errorInfo(error).options
  const classes = getClassesOptions(error, errorInfo)
  return beautifulError(error, { ...options, classes })
}

const getClassesOptions = (
  { errors = [] }: ErrorInstance,
  errorInfo: StaticOptions['errorInfo'],
) =>
  Object.fromEntries(errors.map((error) => getClassOptions(error, errorInfo)))

const getClassOptions = (
  error: ErrorInstance,
  errorInfo: StaticOptions['errorInfo'],
) => {
  const { ErrorClass, options } = errorInfo(error)
  return [ErrorClass.name, options as Options] as const
}

/**
 * `modern-errors-beautiful` plugin
 */
const modernErrorsBeautiful = {
  name: 'beautiful' as const,
  isOptions: (options) => isPlainObject(options),
  getOptions,
  staticMethods: { beautiful },
} satisfies Plugin

export default modernErrorsBeautiful
