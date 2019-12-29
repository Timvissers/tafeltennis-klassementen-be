const gof = require('../src/gof');

test('example NG remains NG', () => {
	expect(gof([['NG', 1,7,0]])).toBe('NG');
});

test('example E0 become D6', () => {
	expect(gof([['E0', 1,0,100, 6,0,100, 6,1,86, 9,7,56, 6,1,86, 1,1,50, 0,1,0]])).toBe('D6');
});

test('example B4 become B0', () => {
	expect(gof([['B4', 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 6,2,0, 2,0,0]])).toBe('B0');
});

test('example B4 with no results becomes NG flaw', () => {
	expect(gof([['B4', 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0]])).toBe('NG');
});
