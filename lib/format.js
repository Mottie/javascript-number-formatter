/**
 * format.js
 * Lightweight & Fast JavaScript Number Formatter
 *
 * @preserve IntegraXor Web SCADA - JavaScript Number Formatter (http://www.integraxor.com/)
 * @author KPL
 * @maintainer Rob Garrison
 * @copyright 2014 ecava
 * @license MIT <http://www.opensource.org/licenses/mit-license.php>
 * @link http://mottie.github.com/javascript-number-formatter/
 * @version 1.1.0
 */
/*jshint browser:true */
window.format = function( m, v ){
	if ( !m || isNaN(+v) ) {
		return v; // return as it is.
	}

	var isNegative, result, decimal, group, posLeadZero, posTrailZero, posSeparator, part, szSep,
		integer, str, offset, i, l, len, start, prefix, end, suffix, inv

	// find prefix/suffix
	len = m.length;
	start = m.search(/[0-9\-\+#]/);
	prefix = start > 0 ? m.substring(0, start) : '';
	// reverse string: not an ideal method if there are surrogate pairs
	inv = m.split('').reverse().join('');
	end = inv.search(/[0-9\-\+#]/);
	i = len - end;
	i += (m.substring( i, i + 1 ) === '.') ? 1 : 0;
	suffix = end > 0 ? m.substring( i, len) : '';
	m = m.substring(start, i);

	// convert any string to number according to formation sign.
	v = m.charAt(0) === '-' ? -v : +v;
	isNegative = v < 0? v = -v: 0; // process only abs(), and turn on flag.

	// search for separator for grp & decimal, anything not digit, not +/- sign, not #.
	result = m.match(/[^\d\-\+#]/g);
	decimal = (result && result[result.length-1]) || '.'; // treat the right most symbol as decimal
	group = (result && result[1] && result[0]) || ',';  // treat the left most symbol as group separator

	// split the decimal for the format string if any.
	m = m.split( decimal );
	// Fix the decimal first, toFixed will auto fill trailing zero.
	v = v.toFixed( m[1] && m[1].length );
	v = +(v) + ''; // convert number to string to trim off *all* trailing decimal zero(es)

	// fill back any trailing zero according to format
	posTrailZero = m[1] && m[1].lastIndexOf('0'); // look for last zero in format
	part = v.split('.');
	// integer will get !part[1]
	if ( !part[1] || part[1] && part[1].length <= posTrailZero ) {
		v = (+v).toFixed( posTrailZero + 1 );
	}
	szSep = m[0].split( group ); // look for separator
	m[0] = szSep.join(''); // join back without separator for counting the pos of any leading 0.

	posLeadZero = m[0] && m[0].indexOf('0');
	if ( posLeadZero > -1 ) {
		while ( part[0].length < (m[0].length - posLeadZero) ) {
			part[0] = '0' + part[0];
		}
	} else if (+part[0] === 0){
		part[0] = '';
	}

	v = v.split('.');
	v[0] = part[0];

	// process the first group separator from decimal (.) only, the rest ignore.
	// get the length of the last slice of split result.
	posSeparator = ( szSep[1] && szSep[ szSep.length - 1 ].length );
	if ( posSeparator ) {
		integer = v[0];
		str = '';
		offset = integer.length % posSeparator;
		l = integer.length;
		for (i = 0; i < l; i++) {
			str += integer.charAt(i); // ie6 only support charAt for sz.
			// -posSeparator so that won't trail separator on full length
			/*jshint -W018 */
			if ( !( (i - offset + 1) % posSeparator ) && i < l - posSeparator ) {
				str += group;
			}
		}
		v[0] = str;
	}

	v[1] = ( m[1] && v[1] ) ? decimal + v[1] : '';
	// put back any negation, combine integer and fraction, and add back prefix & suffix
	return prefix + ( ( isNegative ? '-' : '' ) + v[0] + v[1] ) + suffix;
};
