import { expectAssignable, expectType } from 'tsd'

import modernErrorsBeautiful, { type Options } from 'modern-errors-beautiful'

expectType<object>(modernErrorsBeautiful(true))

modernErrorsBeautiful(true, {})
expectAssignable<Options>({})
