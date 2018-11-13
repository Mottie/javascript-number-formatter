# Javascript Number Formatter

Lightweight & Fast JavaScript Number Formatter

[![Build Status][build-image]][build-url] [![NPM Version][npm-image]][npm-url] [![devDependency Status][david-dev-image]][david-dev-url] [![MIT][license-image]][license-url]

## Introduction

This standalone number formatter<sup>&dagger;</sup> is intended to be short and fast. As they are the main factors for a high performance JavaScript app. Development release is around 150 lines including license info, blank lines and comments. And production release is less than 2,000 bytes.

```js
format( "#,##0.####", 1234567.890 );  // output: "1,234,567.89"
format( "$ #,###.00", -1234567.890 ); // output: "$ -1,234,567.89"

// Added in v2.0.0
format( "$ #,###.00", -1234567.890, {enforceMaskSign: true});  // output: "$ 1,234,567.89"
format( "$ -#,###.00", -1234567.890, {enforceMaskSign: true}); // output: "$ -1,234,567.89"
format( "$ +#,###.00", -1234567.890, {enforceMaskSign: true}); // output: "$ -1,234,567.89"
format( "$ +#,###.00", 1234567.890, {enforceMaskSign: true});  // output: "$ +1,234,567.89"
```

&dagger; Initial development release of this code was written by KPL and hosted at [Google Code](https://code.google.com/p/javascript-number-formatter/).

## Features

* Short, fast, flexible yet standalone.
* Accept standard number formatting like `#,##0.00` or with negation `-000.####`.
* Accept any country format like `# ##0,00`, `#,###.##`, `#'###.##` or any type of non-numbering symbol.
* Accept any numbers of digit grouping. `#,##,#0.000` or `#,###0.##` are all valid.
* Accept any redundant/fool-proof formatting. `##,###,##.#` or `0#,#00#.###0#` are all OK.
* Auto number rounding.
* Simple interface, just supply mask & value like this: `format( "0.0000", 3.141592)`.
* Include a prefix &amp; suffix with the mask.

## Limitations

* No scientific/engineering formatting.
* Not for date or phone formation.
* No color control.
* <del>No prefix or suffix is allowed except leading negation symbol. So `$#,##0.00` or `#,###.##USD` will not yield expected outcome. Use `'$'+format('#,##0.00', 123.45)` or `format('#,##0.00', 456.789) + 'USD'`</del>
* The prefix or suffix *can not* include any numbers (`0-9`), dashes (`-`), or plus signs (`+`).

## Format Symbols

| Description   | Symbol | Summary |
|---------------|--------|---------|
| Mask symbols  | #0123456789+- | Mask symbols used for formatting the value. |
| Placeholders  | #123456789    | Un-forced digit*; this optional digit will only show if it is required as a placeholder. |
| Zero          | 0             | Forced digit; the digit will be shown whether or not the digit is relevant to the value. |
| Signs         | +-            | Indicates a positive or negative value; visible depending on the value sign and the `enforceMaskSign` setting. |
| Leftmost      |               | _Any_ non-mask symbol&dagger; inside the mask will be set to represent a thousands separator. |
| Rightmost     |               | _Any_ non-mask symbol&dagger; inside the mask&Dagger; will be set to represent the decimal separator. |
| Prefix/Suffix |               | _Any_ non-mask symbol&dagger; outside the mask. |

\* Non-zero mask digits (`1` through `9`) behave the same as the `#`.<br>
&dagger; Anything not a digit, and not a `+`, `-` or `#`.<br>
&Dagger; In the case where there is a trailing decimal or comma, it will be included in the mask, e.g. `#.` or `0,`.

## Note

When only one symbol is supplied, the library will always treat that symbol as a decimal. For example, `format( '#,###', 1234567.890)` will output `1234567,890`.

To force a single symbol to be used as a separator, add a trailing symbol. In this example, a period is added to the end of the mask - `format( '#,###.', 1234567.890)` - resulting in it being used as a decimal and forcing the first symbol to be the separator and return this output: `1,234,567`.

## Installation

### npm package

    npm install --save number-format.js

## Demos

A demo/sample page with few examples is provided ([demo](http://mottie.github.io/javascript-number-formatter/)).

And a jsFiddle was created to aid in testing: https://jsfiddle.net/Mottie/t2etyodx/

[build-url]: https://travis-ci.org/Mottie/javascript-number-formatter
[build-image]: https://travis-ci.org/Mottie/javascript-number-formatter.png?branch=master
[npm-url]: https://www.npmjs.com/package/number-format.js
[npm-image]: https://img.shields.io/npm/v/number-format.js.svg
[david-dev-url]: https://david-dm.org/Mottie/javascript-number-formatter?type=dev
[david-dev-image]: https://david-dm.org/Mottie/javascript-number-formatter/dev-status.svg
[license-url]: https://github.com/Mottie/javascript-number-formatter/blob/master/LICENSE
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg

## Recent Changes

View the [complete change log here](https://github.com/Mottie/javascript-number-formatter/wiki).

### v2.0.7 (2018-11-13)

* Update typescript binding. See [issue #20](https://github.com/Mottie/javascript-number-formatter/issues/20).
* Fix improper placeholder behavior. Updated Readme with format symbols table. Closes [issue #19](https://github.com/Mottie/javascript-number-formatter/issues/19).
* Add more tests.
* Meta:
  * Update dependencies.
  * Improve code readability.
  * Include version in min.js.

### v2.0.6 (2018-11-06)

* Trim trailing zeros in mask. Fixes [issue #18](https://github.com/Mottie/javascript-number-formatter/issues/18).

### v2.0.0 &ndash; 2.0.5 (2018-10-26)

* Add `ignoreSign` option (modified to `enforeceMaskSign`!).
* Switch to XO, AVA & rollup.
* Meta: Update dot files & remove bower support.
* Code cleanup & convert to ES2015.
  * Rename `ignoreSign` to `enforceMaskSign` (default `false`).
  * Reduce code complexity.
  * Export as node module.
  * Update TS with options.
  * Switch demo to use lib file & highlight valid results.
* Switch from Grunt to rollup.
* Switch from IIFE to UMD output.
