import test from "ava";
import format from "../src/format";

/* Simple mask */
test("basic masks", t => {
	t.is(format("#,##0.00", 123456789.123), "123,456,789.12", "Mask: \"#,##0.00\"");
	t.is(format("#,##0.00", "123456.789"), "123,456.79");
	t.is(format("#,##0.00", 123456.789), "123,456.79");
	t.is(format("#,##0.00", 123456.7), "123,456.70");
	t.is(format("#,##0.00", 123456), "123,456.00");
	t.is(format("#,##0.00", 0), "0.00");
	t.is(format("#", -0.1), "");
	t.is(format("0", -0.1), "0");
	t.is(format("0.#", -0.13), "-0.1");
	t.is(format("#,##0.00", -123), "-123.00");
	t.is(format("#,##0.00", -123456.789), "-123,456.79");

	t.is(format("#,##0.0", 123456789.123), "123,456,789.1", "Mask: \"#,##0.0\"");
	t.is(format("#,##0.0", 123456.789), "123,456.8");
	t.is(format("#,##0.0", 123456.7), "123,456.7");
	t.is(format("#,##0.0", 123456), "123,456.0");
	t.is(format("#,##0.0", 0), "0.0");
	t.is(format("#,##0.0", -123), "-123.0");
	t.is(format("#,##0.0", -123456.789), "-123,456.8");

	t.is(format("#,##0.", 123456789.123), "123,456,789", "Mask: \"#,##0.\"");
	t.is(format("#,##0.", 123456.789), "123,457");
	t.is(format("#,##0.", 123456.7), "123,457");
	t.is(format("#,##0.", 123456), "123,456");
	t.is(format("#,##0.", 0), "0");
	t.is(format("#,##0.", -123), "-123");
	t.is(format("#,##0.", -123456.789), "-123,457");

	t.is(format("#.##0,", 123456789.123), "123.456.789", "Mask: \"#.##0,\"");
	t.is(format("#.##0,", 123456.789), "123.457");
	t.is(format("#.##0,", 123456.7), "123.457");
	t.is(format("#.##0,", 123456), "123.456");
	t.is(format("#.##0,", 0), "0");
	t.is(format("#.##0,", -123), "-123");
	t.is(format("#.##0,", -123456.789), "-123.457");

	t.is(format("#,##0.###0", 12345678.98765432), "12,345,678.9877", "Mask: \"#,##0.###0\"");
});

/* Localizations */
test("Localizations", t => {
	t.is(format("### ###,##", 123456789.987654321), "123 456 789,99", "Estonia, France: ### ###,##");
	t.is(format("##.000,00", 123456789.987654321), "123.456.789,99", "Germany, Italy: ##.000,00");
	t.is(format("###,####.00", 123456789.987654321), "1,2345,6789.99", "Japan: ###,####.00");
	t.is(format("#'###'#00.00", 123456789.987654321), "123'456'789.99", "Switzerland: #'###'#00.00");
});

/* Made-up-izations */
test("Any format", t => {
	t.is(format("#,##0 00", 123456789.987654321), "123,456,789 99");
	t.is(format("#x##0 00", 123456789.987654321), "123x456x789 99");
	t.is(format("##^000*00", 123456789.987654321), "123^456^789*99");
	t.is(format("##¿000$00", 123456789.987654321), "123¿456¿789$99");
	t.is(format("00!00@00", 123456789.987654321), "1!23!45!67!89@99");
});

/* Any non-zero digit in mask behaves like # */
test("Non-zero digits", t => {
	t.is(format("999.999", 123.0), "123");
	t.is(format("123,456789", 123.0), "123");
});

/* Precision */
test("Precision", t => {
	t.is(format("### ###,", 123456789.987654321), "123 456 790");
	t.is(format("###.###,", 123456789.987654321), "123.456.790");
	t.is(format("##,000.", 123456789.987654321), "123,456,790");
	t.is(format("###,####.", 123456789.187654321), "1,2345,6789");
	t.is(format("#'###'#00,", 123456789.087654321), "123'456'789");
	t.is(format("#,##0.####", 1234567.890), "1,234,567.89");
	t.is(format("#,##0.###0", 1234567.890), "1,234,567.8900");
	t.is(format("#,##0.##0#", 1234567.890), "1,234,567.890");
	t.is(format("#,##0.#0##", 1234567.890), "1,234,567.89");
	t.is(format("#,##0.#", 1234567.890), "1,234,567.9");
	t.is(format("#,###.", 1234567.890), "1,234,568");

	t.is(format("#,###.", 1234567), "1,234,567");
	t.is(format("#,###.#", 1234567), "1,234,567");
	t.is(format("#,###.##", 1234567), "1,234,567");
	t.is(format("#,###.0", 1234567), "1,234,567.0");
	t.is(format("#,###.00", 1234567), "1,234,567.00");

	t.is(format("#.00", 0.78), ".78");
	t.is(format("#.000", 0.78), ".780");
	t.is(format("#.0000", 0.78), ".7800");
	t.is(format("0.00", 0.78), "0.78");
	t.is(format("0.000", 0.78), "0.780");
	t.is(format("0.0000", 0.78), "0.7800");
	t.is(format("00.00", 0.78), "00.78");

	t.is(format("#.##", 0), "");
	t.is(format("0.00", 0), "0.00");
	t.is(format("0", 0), "0");
});

/* Mask with prefix and/or suffix */
test("Prefix & Suffix", t => {
	// Usage
	t.is(format("$#,##0.00USD", 123456789.123), "$123,456,789.12USD", "$#,##0.00USD");
	t.is(format("$ #,##0.00 USD", 123456789.123), "$ 123,456,789.12 USD", "$ #,##0.00 USD");
	t.is(format("##.000,00 €", 123456789.123), "123.456.789,12 €", "##.000,00 €");
	t.is(format("###,####.00 ¥", 123456789.123), "1,2345,6789.12 ¥", "###,####.00 ¥");

	t.is(format("### ###,### ¢ and stuff", 123456789.123), "123 456 789,123 ¢ and stuff", "### ###,### ¢ and stuff");
	t.is(format("  #,##0.00 a b c ", 123456789.123), "  123,456,789.12 a b c ", "leading & trailing spaces");

	t.is(format("$  (#,###.00)  Money", 123456789.123), "$  (123,456,789.12)  Money", "spaces & mask wrapped in parenthesis");
	t.is(format("prefix with a comma, includes everything? #.00 yep!", 123456789.123), "prefix with a comma, includes everything? 123456789.12 yep!", "prefix with a comma");
	t.is(format("$# ###,00 USD, or euros.", 123456789.123), "$123 456 789,12 USD, or euros.", "suffix with comma & period");
	t.is(format("prefix with a periods?... #.00 yep!", 123456789.123), "prefix with a periods?... 123456789.12 yep!", "prefix with a periods");
	t.is(format("It costs $# ###,00 euros.", 123456789.123), "It costs $123 456 789,12 euros.", "suffix with period");
	t.is(format("test:### ###. ing", 123456789.123), "test:123 456 789 ing", "Hanging decimals");
});

test("Masks that don't work", t => {
	// Not allowed
	t.is(format("No # outside of the mask $#,###.00", 123456789.123) !== "No # outside of the mask $123,456,789.12", true, "BROKEN: # outside of the mask");
	t.is(format("99 items = $#,###.00", 123456789.123) !== "99 items = $123,456,789.12", true, "BROKEN: numbers outside of mask");
	t.is(format("cost -- $#,###.00 -- value", 123456789.123) !== "cost -- $123,456,789.12 -- value", true, "BROKEN: dashes outside of mask");
	t.is(format("++ value! $#,###.00 ++ value!", 123456789.123) !== "++ value! $123,456,789.12 ++ value!", true, "BROKEN: plus signs outside of mask");
});

test("Numbers with negative sign", t => {
	t.is(format("-#,##0.######", -5000.123456789), "-5,000.123457");
	t.is(format("-#,##0.######", 5000.123456789), "5,000.123457");
	t.is(format("#,##0.######", -5000.123456789), "-5,000.123457");
	t.is(format("$ #,###.00", -1234567.890), "$ -1,234,567.89");
	t.is(format("$ -#,###.00", -1234567.890), "$ -1,234,567.89");

	t.is(format("-#,##0.######", -5000.123456789, {enforceMaskSign: true}), "-5,000.123457");
	t.is(format("-#,##0.######", 5000.123456789, {enforceMaskSign: true}), "5,000.123457");
	t.is(format("#,##0.######", -5000.123456789, {enforceMaskSign: true}), "5,000.123457");
	t.is(format("$ #,###.00", -1234567.890, {enforceMaskSign: true}), "$ 1,234,567.89");
	t.is(format("$ -#,###.00", -1234567.890, {enforceMaskSign: true}), "$ -1,234,567.89");
});

test("Numbers with positive sign", t => {
	t.is(format("+#,##0.######", +5000.123456789), "+5,000.123457");
	t.is(format("+#,##0.######", 5000.123456789), "+5,000.123457");
	t.is(format("#,##0.######", +5000.123456789), "5,000.123457");
	t.is(format("+#,##0.######", -5000.123456789), "-5,000.123457");

	t.is(format("+#,##0.######", +5000.123456789, {enforceMaskSign: true}), "+5,000.123457");
	t.is(format("+#,##0.######", 5000.123456789, {enforceMaskSign: true}), "+5,000.123457");
	t.is(format("#,##0.######", +5000.123456789, {enforceMaskSign: true}), "5,000.123457");
	t.is(format("+#,##0.######", -5000.123456789, {enforceMaskSign: true}), "-5,000.123457");
	t.is(format("$ +#,###.00", -1234567.890, {enforceMaskSign: true}), "$ -1,234,567.89");
	t.is(format("$ +#,###.00", 1234567.890, {enforceMaskSign: true}), "$ +1,234,567.89");
});
