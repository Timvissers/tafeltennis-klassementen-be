const vlb = require('../src/vlb');

test('less than 20 matches degrades 1 rating', () => {
	expect(vlb([['E2', 3,6,0, 0,4,0,0,4,0]])).toBe('E4');
});

test('bad NG remains NG', () => {
	expect(vlb([['NG', 3,20,0]])).toBe('NG');
});

test('great B0 remains B0', () => {
	expect(vlb([['B0', 0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,40,0,0]])).toBe('B0');
});

test('example NG becomes E6', () => {
	expect(vlb([['NG', 38,6,0, 0,0,0, 5,7,0]])).toBe('E6');
});

test('example E0 becomes E2', () => {
	expect(vlb([['E0', 1,0,100, 6,0,100, 6,1,86, 9,7,56, 6,1,86, 1,1,50, 0,1,0]])).toBe('E2');
});

test('D6 becomes E0', () => {
	expect(vlb([['D6', 0,0,0, 0,3,0, 3,0,0, 6,1,0, 12,4,0, 17,10,0, 7,12,0, 0,0,0, 1,0,0]])).toBe('E0');
});

test('C6 remains C6', () => {
	expect(vlb([['D6', 0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0, 0,2,0,1,0,0,5,1,0,12,4,0, 17,10,0,7,12,0,0,0,0,1,0,0]])).toBe('C6');
});
