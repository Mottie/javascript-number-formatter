/**
 * format.js
 * Lightweight & Fast JavaScript Number Formatter
 *
 * @preserve IntegraXor Web SCADA - JavaScript Number Formatter (http://www.integraxor.com/)
 * @author KPL
 * @maintainer Rob Garrison
 * @copyright 2015 ecava
 * @license MIT <http://www.opensource.org/licenses/mit-license.php>
 * @link http://mottie.github.com/javascript-number-formatter/
 * @version 1.1.3
 */
/*jshint browser:true */
/* global define, module */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.format = factory();
  }
}(this, function () {
  return function (fmt, value) {
    'use strict';
    if (!fmt || isNaN(+value)) {
      return value; // return as it is.
    }

    var isNegative, result, decimal, group, posLeadZero, posTrailZero, posSeparator, part, szSep,
        integer, str, offset, i, l, len, start, prefix, end, suffix, inv;

    // find prefix/suffix
    len = fmt.length;
    start = fmt.search(/[0-9\-\+#]/);
    prefix = start > 0 ? fmt.substring(0, start) : '';
    // reverse string: not an ideal method if there are surrogate pairs
    inv = fmt.split('').reverse().join('');
    end = inv.search(/[0-9\-\+#]/);
    i = len - end;
    i += (fmt.substring(i, i + 1) === '.') ? 1 : 0;
    suffix = end > 0 ? fmt.substring(i, len) : '';

    // mask with prefix & suffix removed
    fmt = fmt.substring(start, i);

    // convert any string to number according to formation sign.
    value = fmt.charAt(0) === '-' ? -value : +value;
    isNegative = value < 0 ? value = -value : 0; // process only abs(), and turn on flag.

    // search for separator for grp & decimal, anything not digit, not +/- sign, not #.
    result = fmt.match(/[^\d\-\+#]/g);
    decimal = (result && result[result.length - 1]) || '.'; // treat the right most symbol as decimal
    group = (result && result[1] && result[0]) || ',';  // treat the left most symbol as group separator

    // split the decimal for the format string if any.
    fmt = fmt.split(decimal);
    // Fix the decimal first, toFixed will auto fill trailing zero.
    value = value.toFixed(fmt[1] && fmt[1].length);
    value = +(value) + ''; // convert number to string to trim off *all* trailing decimal zero(es)

    // fill back any trailing zero according to format
    posTrailZero = fmt[1] && fmt[1].lastIndexOf('0'); // look for last zero in format
    part = value.split('.');
    // integer will get !part[1]
    if (!part[1] || ( part[1] && part[1].length <= posTrailZero )) {
      value = (+value).toFixed(posTrailZero + 1);
    }
    szSep = fmt[0].split(group); // look for separator
    fmt[0] = szSep.join(''); // join back without separator for counting the pos of any leading 0.

    posLeadZero = fmt[0] && fmt[0].indexOf('0');
    if (posLeadZero > -1) {
      while (part[0].length < (fmt[0].length - posLeadZero)) {
        part[0] = '0' + part[0];
      }
    } else if (+part[0] === 0) {
      part[0] = '';
    }

    value = value.split('.');
    value[0] = part[0];

    // process the first group separator from decimal (.) only, the rest ignore.
    // get the length of the last slice of split result.
    posSeparator = ( szSep[1] && szSep[szSep.length - 1].length );
    if (posSeparator) {
      integer = value[0];
      str = '';
      offset = integer.length % posSeparator;
      l = integer.length;
      for (i = 0; i < l; i++) {
        str += integer.charAt(i); // ie6 only support charAt for sz.
        // -posSeparator so that won't trail separator on full length
        /*jshint -W018 */
        if (!( (i - offset + 1) % posSeparator ) && i < l - posSeparator) {
          str += group;
        }
      }
      value[0] = str;
    }
    value[1] = ( fmt[1] && value[1] ) ? decimal + value[1] : '';

    // remove negative sign if result is zero
    result = value.join('');
    if (result === '0' || result === '') {
      // remove negative sign if result is zero
      isNegative = false;
    }

    // put back any negation, combine integer and fraction, and add back prefix & suffix
    return prefix + ( ( isNegative ? '-' : '' ) + result ) + suffix;
  };
}));