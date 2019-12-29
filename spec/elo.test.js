const elo = require('../src/elo');

test('elo for NG', () => {
	expect(elo(36)).toBe('NG');
});

test('elo for D4', () => {
	expect(elo(1066)).toBe('D4');
});

test('elo for B0', () => {
	expect(elo(2050)).toBe('B0');
});

test('elo for B2', () => {
	expect(elo(2049)).toBe('B2');
});
