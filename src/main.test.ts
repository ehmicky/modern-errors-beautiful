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
  t.true(BaseError.beautiful(error).includes(figures.cross))
})

test('Returns beautified errors, instance', (t) => {
  t.true(error.beautiful().includes(figures.cross))
})

test('Can pass "icon" as instance option', (t) => {
  t.true(error.beautiful({ icon: 'warning' }).includes(figures.warning))
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

test('Can use aggregate errors', (t) => {
  const inner = new DatabaseError('inner')
  const outer = new ExitCodeError('test', { errors: [inner] })
  const message = BaseError.beautiful(inner)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  t.is(message, outer.beautiful())
  t.true(message.includes(figures.warning))
})
