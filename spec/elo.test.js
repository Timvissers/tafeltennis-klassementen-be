const elo = require('../src/elo');

test('ELO: elo for NG', () => {
	expect(elo(36)).toBe('NG');
});

test('ELO: elo for D4', () => {
	expect(elo(1066)).toBe('D4');
});

test('ELO: elo for B0', () => {
	expect(elo(2100)).toBe('B0');
});
