/*global window, test, expect, strictEqual */
var format = window.format;
/* Simple mask */
test('basic masks', function() {

  expect(22);
  strictEqual( format('#,##0.00', 123456789.123), '123,456,789.12', 'Mask: "#,##0.00"');
  strictEqual( format('#,##0.00', 123456.789),    '123,456.79');
  strictEqual( format('#,##0.00', 123456.7),      '123,456.70');
  strictEqual( format('#,##0.00', 123456),        '123,456.00');
  strictEqual( format('#,##0.00', 0),             '0.00');
  strictEqual( format('#,##0.00', -123),          '-123.00');
  strictEqual( format('#,##0.00', -123456.789),   '-123,456.79');

  strictEqual( format('#,##0.0',  123456789.123), '123,456,789.1', 'Mask: "#,##0.0"');
  strictEqual( format('#,##0.0',  123456.789),    '123,456.8');
  strictEqual( format('#,##0.0',  123456.7),      '123,456.7');
  strictEqual( format('#,##0.0',  123456),        '123,456.0');
  strictEqual( format('#,##0.0',  0),             '0.0');
  strictEqual( format('#,##0.0',  -123),          '-123.0');
  strictEqual( format('#,##0.0',  -123456.789),   '-123,456.8');

  strictEqual( format('#,##0.',  123456789.123), '123,456,789', 'Mask: "#,##0."');
  strictEqual( format('#,##0.',  123456.789),    '123,457');
  strictEqual( format('#,##0.',  123456.7),      '123,457');
  strictEqual( format('#,##0.',  123456),        '123,456');
  strictEqual( format('#,##0.',  0),             '0');
  strictEqual( format('#,##0.',  -123),          '-123');
  strictEqual( format('#,##0.',  -123456.789),   '-123,457');

  strictEqual( format('#,##0.###0', 12345678.98765432), '12,345,678.9877', 'Mask: "#,##0.###0"');

});

/* Localizations */
test('Localizations', function() {
  expect(4);
  strictEqual( format('### ###,##',   123456789.987654321), '123 456 789,99', 'Estonia, France: ### ###,##');
  strictEqual( format('##.000,00',    123456789.987654321), '123.456.789,99', 'Germany, Italy: ##.000,00');
  strictEqual( format('###,####.00',  123456789.987654321), '1,2345,6789.99', 'Japan: ###,####.00');
  strictEqual( format('#\'###\'#00.00', 123456789.987654321), '123\'456\'789.99', 'Switzerland: #\'###\'#00.00');

});
