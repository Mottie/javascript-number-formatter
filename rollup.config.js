import cjs from "rollup-plugin-cjs-es";
import resolve from "rollup-plugin-node-resolve";
import {terser} from "rollup-plugin-terser";

import pkg from "./package.json";

const banner = `/**
 * Javascript-number-formatter
 * Lightweight & Fast JavaScript Number Formatter
 *
 * @preserve IntegraXor Web SCADA - JavaScript Number Formatter (http://www.integraxor.com/)
 * @author KPL
 * @maintainer Rob Garrison
 * @copyright ${new Date().getFullYear()} ecava
 * @license MIT
 * @link http://mottie.github.com/javascript-number-formatter/
 * @version ${pkg.version}
 */`;

export default [{
	input: "src/format.js",
	output: [{
		file: "lib/format.js",
		name: "format",
		format: "umd",
		sourceMap: false,
		banner,
	},{
		file: "lib/format.esm.js",
		name: "format",
		format: "esm",
		sourceMap: false,
		banner,
	}],
	plugins: [
		resolve(),
		cjs({nested: true})
	]
}, {
	input: "src/format.js",
	output: {
		file: "lib/format.min.js",
		name: "format",
		format: "umd",
		sourceMap: false,
		banner: `/*! Javascript-number-formatter v${pkg.version} */`,
	},
	plugins: [
		resolve(),
		cjs({nested: true}),
		terser({
			compress: {
				passes: 3
			},
			output: {
				comments: /^!/
			}
		})
	]
}];
