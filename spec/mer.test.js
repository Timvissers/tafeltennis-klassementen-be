const mer = require('../src/mer');

test('0 rating differences in proposals return the proposed rating', () => {
	expect(mer([['E0','E0','E0']])).toBe('E0');
});

test('1 rating difference in proposals return the most occuring rating', () => {
	expect(mer([['E2','E0','E2']])).toBe('E2');
});

test('2 rating differences in proposals return the middle rating', () => {
	expect(mer([['D4','E0','E0']])).toBe('D6');
});

test('3 or more rating differences in proposals return the unknown', () => {
	expect(mer([['D0','E0','E0']])).toBe('??');
});
