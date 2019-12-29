const lk = require('../src/lk');

test('example NG remains NG', () => {
	expect(lk([['NG', 1,7,0]])).toBe('NG');
});

test('example NG remains NG even if he wins 100 NGs', () => {
	expect(lk([['NG', 100,0,0]])).toBe('NG');
});

test('example E0 becomes D6', () => {
	expect(lk([['E0', 1,0,100, 6,0,100, 6,1,86, 14,7,66, 6,1,86, 1,1,50, 0,0,0, 11,0,0]])).toBe('D6');
});

test('example B4 becomes B0', () => {
	expect(lk([['B4', 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 1,0,0, 6,2,0, 2,0,0]])).toBe('B0');
});

test('example D6 remains D6', () => {
	expect(lk([['D6', 0,0,0, 0,3,0, 3,0,0, 6,1,0, 12,4,0, 17,10,0, 7,12,0, 0,0,0, 1,0,0]])).toBe('D6');
});

test('example E2 becomes D6', () => {
	expect(lk([['E2', 2,0,100, 2,0,100, 3,1,75, 10,7,59, 11,9,55, 16,19,46, 4,9,31]])).toBe('D6');
});

test('example B4 with no results becomes B4 thanks to virtual matches', () => {
	expect(lk([['B4', 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0]])).toBe('B4');
});
