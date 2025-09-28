import test from 'ava'
import figures from 'figures'
import ModernError from 'modern-errors'
import { each } from 'test-each'

import modernErrorsBeautiful from 'modern-errors-beautiful'

const BaseError = ModernError.subclass('BaseError', {
  plugins: [modernErrorsBeautiful],
})
const ExitCodeError = BaseError.subclass('ExitCodeError', {
  beautiful: { icon: 'warning' },
})
const DatabaseError = BaseError.subclass('DatabaseError', {
  beautiful: { icon: 'info' },
})
const error = new BaseError('test')

each(
  [true, { stack: 'true' }, { unknown: true }, { classes: {} }],
  ({ title }, options) => {
    test(`Options are validated | ${title}`, (t) => {
      // @ts-expect-error Type checking should fail due to invalid options
      t.throws(BaseError.beautiful.bind(undefined, error, options))
    })
  },
)

test('Returns beautified errors, static', (t) => {
  const message = BaseError.beautiful(error)
  t.true(message.includes(`${figures.cross} BaseError: test`))
})

test('Returns beautified errors, instance', (t) => {
  const message = error.beautiful()
  t.true(message.includes(`${figures.cross} BaseError: test`))
})

test('Can pass "icon" as instance option', (t) => {
  const message = error.beautiful({ icon: 'warning' })
  t.true(message.includes(`${figures.warning} BaseError: test`))
})

test('Can pass "icon" as static option', (t) => {
  const message = BaseError.beautiful(error, { icon: 'warning' })
  t.true(message.includes(`${figures.warning} BaseError: test`))
})

test('Can pass "icon" as class option', (t) => {
  const message = BaseError.beautiful(new ExitCodeError('test'))
  t.true(message.includes(`${figures.warning} ExitCodeError: test`))
})

test('Can use aggregate errors', (t) => {
  const inner = new DatabaseError('inner')
  const outer = new ExitCodeError('test', { errors: [inner] })
  const message = BaseError.beautiful(outer)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  t.is(message, outer.beautiful())
  t.true(message.includes(`${figures.warning} ExitCodeError: test`))
  t.true(message.includes(`${figures.info} DatabaseError: inner`))
})

test('Can pass "cause"', (t) => {
  const inner = new DatabaseError('inner')
  const outer = new ExitCodeError('test', { errors: [inner] })
  const message = BaseError.beautiful(outer, { cause: false })
  t.true(message.includes(`${figures.warning} ExitCodeError: test`))
  t.false(message.includes('DatabaseError'))
})
