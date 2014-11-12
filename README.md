# Javascript Number Formatter

Lightweight & Fast JavaScript Number Formatter

[![Build Status](https://travis-ci.org/Mottie/javascript-number-formatter.png?branch=master)](https://travis-ci.org/Mottie/javascript-number-formatter)

## Introduction

This standalone number formatter is intended to be short and fast. As they are the main factors for a high performance JavaScript app. Development release is as short as 75 lines including license info, blank lines and comments. And production release is as small as 849 bytes.

```js
format( "#,##0.####", 1234567.890 );  // output: "1,234,567.89"
format( "$ #,###.00", -1234567.890 ); // output: "$ -1,234,567.89"
```

## Features

* Short, fast, flexible yet standalone. Only 75 lines including MIT license info, blank lines & comments.
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

## Note

When there's only one symbol is supplied, system will always treat the single symbol as Decimal. For instance, `format( '#,###', 1234567.890)` will output `1234567,890`. To force a single symbol as Separator, add a trailing dot to the end like this: `format( '#,###.', 1234567.890)` which will then output `1,234,567`.

A demo/sample page with few examples is provided ([DEMO](http://mottie.github.io/javascript-number-formatter/)). The code is safe to be minimized using Google Compiler in Advanced mode.

## Version

### v1.1.3 (11/12/2014)

* Fix bower link to point to the production version. Thanks [marcelboettcher](https://github.com/marcelboettcher)!
* Minor code & demo cleanup.

### v1.1.2 (6/22/2014)

* Remove negative sign from results with a value of zero.
* Added more examples to demo page.

### v1.1.1 (5/1/2014)

* Various fixes to get Travis builds to work.

### v1.1.0 (5/1/2014)

* Forked a copy of the script on GitHub
* Clean up
  * Cleaned up code for jshint.
  * Add grunt build with jshint, testing & compression.
  * Register script with bower.
* Add support for a prefix &amp; suffix within the mask.
  * Updated demo with prefix &amp; suffix examples; showing allowed and not-allowed formats.
  * Updated tests

### r2 (v1.0.0) (6/29/2011)

* Initial development release at https://code.google.com/p/javascript-number-formatter/
