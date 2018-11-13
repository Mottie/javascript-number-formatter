/**
 * Javascript-number-formatter
 * Lightweight & Fast JavaScript Number Formatter
 *
 * @preserve IntegraXor Web SCADA - JavaScript Number Formatter (http://www.integraxor.com/)
 * @author KPL
 * @maintainer Rob Garrison
 * @copyright 2018 ecava
 * @license MIT
 * @link http://mottie.github.com/javascript-number-formatter/
 * @version 2.0.7
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.format = factory());
}(this, (function () { 'use strict';

	const maskRegex = /[0-9\-+#]/;
	const notMaskRegex = /[^\d\-+#]/g;

	function getIndex(mask) {
		return mask.search(maskRegex);
	}

	function processMask(mask = "#.##") {
		const maskObj = {};
		const len = mask.length;
		const start = getIndex(mask);
		maskObj.prefix = start > 0 ? mask.substring(0, start) : "";

		// Reverse string: not an ideal method if there are surrogate pairs
		const end = getIndex(mask.split("").reverse().join(""));
		const offset = len - end;
		const substr = mask.substring(offset, offset + 1);
		// Add 1 to offset if mask has a trailing decimal/comma
		const indx = offset + ((substr === "." || (substr === ",")) ? 1 : 0);
		maskObj.suffix = end > 0 ? mask.substring(indx, len) : "";

		maskObj.mask = mask.substring(start, indx);
		maskObj.maskHasNegativeSign = maskObj.mask.charAt(0) === "-";
		maskObj.maskHasPositiveSign = maskObj.mask.charAt(0) === "+";

		// Search for group separator & decimal; anything not digit,
		// not +/- sign, and not #
		let result = maskObj.mask.match(notMaskRegex);
		// Treat the right most symbol as decimal
		maskObj.decimal = (result && result[result.length - 1]) || ".";
		// Treat the left most symbol as group separator
		maskObj.separator = (result && result[1] && result[0]) || ",";

		// Split the decimal for the format string if any
		result = maskObj.mask.split(maskObj.decimal);
		maskObj.integer = result[0];
		maskObj.fraction = result[1];
		return maskObj;
	}

	function processValue(value, maskObj, options) {
		let isNegative = false;
		const valObj = {
			value
		};
		if (value < 0) {
			isNegative = true;
			// Process only abs(), and turn on flag.
			valObj.value = -valObj.value;
		}
		valObj.sign = isNegative ? "-" : "";

		// Fix the decimal first, toFixed will auto fill trailing zero.
		valObj.value = Number(valObj.value).toFixed(maskObj.fraction && maskObj.fraction.length);
		// Convert number to string to trim off *all* trailing decimal zero(es)
		valObj.value = Number(valObj.value).toString();

		// Fill back any trailing zero according to format
		// look for last zero in format
		const posTrailZero = maskObj.fraction && maskObj.fraction.lastIndexOf("0");
		let [valInteger = "0", valFraction = ""] = valObj.value.split(".");
		if (!valFraction || (valFraction && valFraction.length <= posTrailZero)) {
			valFraction = posTrailZero < 0
				? ""
				: (Number("0." + valFraction).toFixed(posTrailZero + 1)).replace("0.", "");
		}
		valObj.integer = valInteger;
		valObj.fraction = valFraction;
		addSeparators(valObj, maskObj);

		// Remove negative sign if result is zero
		if (valObj.result === "0" || valObj.result === "") {
			// Remove negative sign if result is zero
			isNegative = false;
			valObj.sign = "";
		}

		if (!isNegative && maskObj.maskHasPositiveSign) {
			valObj.sign = "+";
		} else if (isNegative && maskObj.maskHasPositiveSign) {
			valObj.sign = "-";
		} else if (isNegative) {
			valObj.sign = options && options.enforceMaskSign && !maskObj.maskHasNegativeSign
				? ""
				: "-";
		}
		return valObj;
	}

	function addSeparators(valObj, maskObj) {
		valObj.result = "";
		// Look for separator
		const szSep = maskObj.integer.split(maskObj.separator);
		// Join back without separator for counting the pos of any leading 0
		const maskInteger = szSep.join("");

		const posLeadZero = maskInteger && maskInteger.indexOf("0");
		if (posLeadZero > -1) {
			while (valObj.integer.length < (maskInteger.length - posLeadZero)) {
				valObj.integer = "0" + valObj.integer;
			}
		} else if (Number(valObj.integer) === 0) {
			valObj.integer = "";
		}

		// Process the first group separator from decimal (.) only, the rest ignore.
		// get the length of the last slice of split result.
		const posSeparator = (szSep[1] && szSep[szSep.length - 1].length);
		if (posSeparator) {
			const len = valObj.integer.length;
			const offset = len % posSeparator;
			for (let indx = 0; indx < len; indx++) {
				valObj.result += valObj.integer.charAt(indx);
				// -posSeparator so that won't trail separator on full length
				if (!((indx - offset + 1) % posSeparator) && indx < len - posSeparator) {
					valObj.result += maskObj.separator;
				}
			}
		} else {
			valObj.result = valObj.integer;
		}
		valObj.result += (maskObj.fraction && valObj.fraction)
			? maskObj.decimal + valObj.fraction
			: "";
		return valObj;
	}

	var format = (mask, value, options = {}) => {
		if (!mask || isNaN(Number(value))) {
			// Invalid inputs
			return value;
		}
		const maskObj = processMask(mask);
		const valObj = processValue(value, maskObj, options);
		return maskObj.prefix + valObj.sign + valObj.result + maskObj.suffix;
	};

	return format;

})));
