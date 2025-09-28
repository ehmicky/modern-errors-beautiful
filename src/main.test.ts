import test from 'ava'
import figures from 'figures'
import ModernError from 'modern-errors'
import { each } from 'test-each'

import modernErrorsBeautiful from 'modern-errors-beautiful'

const message = 'test'

const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsBeautiful],
})
const ExitCodeError = BaseError.subclass('ExitCodeError', {
  beautiful: { icon: 'warning' },
})
const InputError = BaseError.subclass('InputError', {
  beautiful: { icon: 'info' },
})
const error = new BaseError(message)

each(
  [true, { stack: 'true' }, { unknown: true }, { classes: { stack: 'true' } }],
  ({ title }, options) => {
    test(`Options are validated | ${title}`, (t) => {
      // @ts-expect-error Type checking should fail due to invalid options
      t.throws(BaseError.beautiful.bind(undefined, error, options))
    })
  },
)

test('Returns beautified errors, static', (t) => {
  t.true(BaseError.beautiful(error).includes(figures.cross))
})

test('No instance method', (t) => {
  t.false('beautiful' in error)
})

test('Can pass "icon" as static option', (t) => {
  t.true(
    BaseError.beautiful(error, { icon: 'warning' }).includes(figures.warning),
  )
})

test('Can pass "icon" as class option', (t) => {
  t.true(
    BaseError.beautiful(new ExitCodeError('test')).includes(figures.warning),
  )
})

test('Can pass class-specific options', (t) => {
  const testError = new ExitCodeError('test', {
    errors: [new InputError('nested')],
  })
  const testMessage = BaseError.beautiful(testError)
  t.true(testMessage.includes(`${figures.warning} ExitCodeError: test`))
  t.true(testMessage.includes(`${figures.info} InputError: nested`))
})
