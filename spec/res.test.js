const res = require('../src/res');

test('example NG becomes E4', () => {
	expect(res([['NG', 38,6,0, 0,0,0, 5,7,0]])).toBe('E4');
});

test('example E0 becomes E2', () => {
	expect(res([['E0', 1,0,100, 6,0,100, 6,1,86, 9,7,56, 6,1,86, 1,1,50, 0,1,0]])).toBe('E2');
});

test('example B4 remains B4 if less than 40 matches', () => {
	expect(res([['B4', 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 6,2,0, 2,0,0]])).toBe('B4');
});

test('example B4 remains B0 if more than 40 matches', () => {
	expect(res([['B4', 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 40,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 6,2,0, 2,0,0]])).toBe('B0');
});

test('example B4 with no results becomes NG Flaw', () => {
	expect(res([['B4', 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0]])).toBe('NG');
});

test('LK: D6 remains D6', () => {
	expect(res([['D6', 0,0,0, 0,3,0, 3,0,0, 6,1,0, 12,4,0, 17,10,0, 7,12,0, 0,0,0, 1,0,0]])).toBe('D6');
});
