# Javascript Number Formatter

Lightweight & Fast JavaScript Number Formatter

[![Build Status][build-image]][build-url]

## Introduction

This standalone number formatter is intended to be short and fast. As they are the main factors for a high performance JavaScript app. Development release is as short as < 120 lines including license info, blank lines and comments. And production release is less than 1,200 bytes.

```js
format( "#,##0.####", 1234567.890 );  // output: "1,234,567.89"
format( "$ #,###.00", -1234567.890 ); // output: "$ -1,234,567.89"
```

## Features

* Short, fast, flexible yet standalone.
* Accept standard number formatting like `#,##0.00` or with negation `-000.####`.
* Accept any country format like `# ##0,00`, `#,###.##`, `#'###.##` or any type of non-numbering symbol.
* Accept any numbers of digit grouping. `#,##,#0.000` or `#,###0.##` are all valid.
* Accept any redundant/fool-proof formatting. `##,###,##.#` or `0#,#00#.###0#` are all OK.
* Auto number rounding.
* Simple interface, just supply mask & value like this: `format( "0.0000", 3.141592)`.
* Include a prefix &amp; suffix with the mask

## Limitations

* No scientific/engineering formatting.
* Not for date or phone formation.
* No color control.
* <del>No prefix or suffix is allowed except leading negation symbol. So `$#,##0.00` or `#,###.##USD` will not yield expected outcome. Use `'$'+format('#,##0.00', 123.45)` or `format('#,##0.00', 456.789) + 'USD'`</del>
* The prefix or suffix can not include any numbers (`0-9`), dashes (`-`), or plus signs (`+`).

## Installation

### npm package

    npm install --save number-format.js

### bower

    bower install number-format.js --save

## Note

When there's only one symbol is supplied, system will always treat the single symbol as Decimal. For instance, `format( '#,###', 1234567.890)` will output `1234567,890`. To force a single symbol as Separator, add a trailing dot to the end like this: `format( '#,###.', 1234567.890)` which will then output `1,234,567`.

A demo/sample page with few examples is provided ([DEMO](http://mottie.github.io/javascript-number-formatter/)). The code is safe to be minimized using Google Compiler in Advanced mode.

[build-url]: https://travis-ci.org/Mottie/javascript-number-formatter
[build-image]: https://travis-ci.org/Mottie/javascript-number-formatter.png?branch=master

## Version

### v1.1.7 (12/16/2015)

* bower.json: remove version number &amp; add ignore entry.
* Update `format.min.js`.
* Update dependencies.

### v1.1.6 (12/16/2015)

* Modify package.json files entry. Fixes [issue #3](https://github.com/Mottie/javascript-number-formatter/issues/3).

### v1.1.5 (1/26/2015)

* Change name in bower.json & package.json to "number-format.js".
* Update readme with installation instructions.
