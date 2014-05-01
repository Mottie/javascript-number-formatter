# Javascript Number Formatter

Lightweight & Fast JavaScript Number Formatter

## Introduction

This standalone number formatter is intended to be short and fast. As they are the main factors for a high performance JavaScript app. Development release is as short as 75 lines including license info, blank lines and comments. And production release is as small as 849 bytes.

```js
alert( format( "#,##0.####", 1234567.890)); //output: 1,234,567.89
```

## Features

* Short, fast, flexible yet standalone. Only 75 lines including MIT license info, blank lines & comments.
* Accept standard number formatting like `#,##0.00` or with negation `-000.####`.
* Accept any country format like `# ##0,00`, `#,###.##`, `#'###.##` or any type of non-numbering symbol.
* Accept any numbers of digit grouping. `#,##,#0.000` or `#,###0.##` are all valid.
* Accept any redundant/fool-proof formatting. `##,###,##.#` or `0#,#00#.###0#` are all OK.
* Auto number rounding.
* Simple interface, just supply mask & value like this: `format( "0.0000", 3.141592)`

## Limitations

* No prefix or suffix is allowed except leading negation symbol. So `$#,##0.00` or `#,###.##USD` will not yield expected outcome. Use `'$'+format('#,##0.00', 123.45)` or `format('#,##0.00', 456.789) + 'USD'`
* No scientific/engineering formatting.
* Not for date or phone formation.
* No color control.

## Note

When there's only one symbol is supplied, system will always treat the single symbol as Decimal. For instance, `format( '#,###', 1234567.890)` will output `1234567,890`. To force a single symbol as Separator, add a trailing dot to the end like this: `format( '#,###.', 1234567.890)` which will then output `1,234,567`.

A demo/sample page with few examples is provided ([DEMO]()). The code is safe to be minimized using Google Compiler in Advanced mode.
