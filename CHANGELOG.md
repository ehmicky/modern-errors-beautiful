# 2.0.1

## Validation

- Improve typing and validation of options

# 2.0.0

## Breaking changes

- Previously, if the [`props`](README.md#-props) option was `false`,
  [aggregate errors](https://github.com/ehmicky/modern-errors#aggregate-errors)
  were not printed. To achieve the same behavior, the
  [`cause`](README.md#-cause) option must now be set to `false`.

## Features

- Aggregate errors are now printed on their own, which result in a prettier
  output.

# 1.0.1

## Bug fixes

- Fix issues printing errors that include `]` in their message, when the
  [`stack`](README.md#-stack) option is `false`.

# 1.0.0

Initial release.
