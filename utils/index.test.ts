import { normalizeRating, toRomanNumerals } from './index';

describe('toRomanNumerals', () => {
	it('should return correct roman numerals', () => {
		expect(toRomanNumerals(1)).toBe('I');
		expect(toRomanNumerals(3)).toBe('III');
		expect(toRomanNumerals(4)).toBe('IV');
		expect(toRomanNumerals(5)).toBe('V');
		expect(toRomanNumerals(8)).toBe('VIII');
		expect(toRomanNumerals(9)).toBe('IX');
		expect(toRomanNumerals(10)).toBe('X');
		expect(toRomanNumerals(18)).toBe('XVIII');
		expect(toRomanNumerals(19)).toBe('XIX');
		expect(toRomanNumerals(20)).toBe('XX');
		expect(toRomanNumerals(55)).toBe('LV');
		expect(toRomanNumerals(88)).toBe('LXXXVIII');
		expect(toRomanNumerals(99)).toBe('XCIX');
	});
});

describe('normalizeRating', () => {
	it('should return correct numbers', () => {
		expect(normalizeRating('22%')).toBe(22);
		expect(normalizeRating('3.3/10')).toBe(33);
		expect(normalizeRating('44/100')).toBe(44);
		expect(normalizeRating('5.5/100')).toBe(6);
		expect(normalizeRating('')).toBe(0);
		expect(normalizeRating('0')).toBe(0);
		expect(normalizeRating('hi mom')).toBe(0);
	});
});
