const _roman: { [key: string]: number } = { C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };

/** Converts number into roman numerals. Handles numbers up to 399.  */
export function toRomanNumerals(number: number): string {
	return Object.keys(_roman).reduce((acc, key) => {
		while (number >= _roman[key]) {
			acc += key;
			number -= _roman[key];
		}
		return acc;
	}, '');
}

/** Return a normalized number from values like 22%, 3.3/10, 44/100  */
export function normalizeRating(rating: string): number {
	if (rating.endsWith('%')) {
		return Math.round(parseFloat(rating));
	}
	if (rating.includes('/')) {
		const [numerator, denominator] = rating.split('/');
		return Math.round((parseFloat(numerator) / parseFloat(denominator)) * 100);
	}
	return 0;
}
