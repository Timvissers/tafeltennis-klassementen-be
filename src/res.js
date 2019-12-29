// based on http://tabt.frenoy.net/index.php?l=NL&display=MethodeResidu_NL

const {RATINGS} = require('./common.js'); // do not include in google app script, does not work

CH_EQUAL = 0.5;
CH_HIGH_01 = 0.3;
CH_LOW_01 = 1 - CH_HIGH_01;
CH_HIGH_02 = 0.18;
CH_LOW_02 = 1 - CH_HIGH_02;
CH_HIGH_03 = 0.108;
CH_LOW_03 = 1 - CH_HIGH_03;
CH_HIGH_04 = 0.0648;
CH_LOW_04 = 1 - CH_HIGH_04;
CH_HIGH_05 = 0.03888;
CH_LOW_05 = 1 - CH_HIGH_05;
CH_HIGH_06 = 0.023328;
CH_LOW_06 = 1 - CH_HIGH_06;
CH_HIGH_07 = 0.018;
CH_LOW_07 = 1 - CH_HIGH_07;
CH_HIGH_08 = 0.013;
CH_LOW_08 = 1 - CH_HIGH_08;
CH_HIGH_09 = 0.00840;
CH_LOW_09 = 1 - CH_HIGH_09;
CH_HIGH_10 = 0.005;
CH_LOW_10 = 1 - CH_HIGH_10;
CH_HIGH_11 = 0.003;
CH_LOW_11 = 1 - CH_HIGH_11;
CH_HIGH_12 = 0.0018;
CH_LOW_12 = 1 - CH_HIGH_12;
CH_HIGH_13 = 0.00109;
CH_LOW_13 = 1 - CH_HIGH_13;
CH_HIGH_14 = 0.000653;
CH_LOW_14 = 1 - CH_HIGH_14;
CH_HIGH_15 = 0.00039;
CH_LOW_15 = 1 - CH_HIGH_15;
CH_HIGH_16 = 0.000235;
CH_LOW_16 = 1 - CH_HIGH_16;

CHANCE_OF_WIN_X_HIGHER = [CH_EQUAL, CH_HIGH_01, CH_HIGH_02, CH_HIGH_03, CH_HIGH_04,
	CH_HIGH_05, CH_HIGH_06, CH_HIGH_07, CH_HIGH_08, CH_HIGH_09,
	CH_HIGH_10, CH_HIGH_11, CH_HIGH_12, CH_HIGH_13, CH_HIGH_14,
	CH_HIGH_15, CH_HIGH_16];
CHANCE_OF_WIN_X_LOWER = [CH_EQUAL, CH_LOW_01, CH_LOW_02, CH_LOW_03, CH_LOW_04,
	CH_LOW_05, CH_LOW_06, CH_LOW_07, CH_LOW_08, CH_LOW_09,
	CH_LOW_10, CH_LOW_11, CH_LOW_12, CH_LOW_13, CH_LOW_14,
	CH_LOW_15, CH_LOW_16];

// INPUT: list in list, containing the following elements, optional as of when each number is 0
//  - current ranking (not used)
//	- number of wins against NG
//	- number of losses against NG
//  - percentage wins/total against NG (not used)
//	- number of wins against E6
//	- number of losses against E6
//  - percentage wins/total against E6 (not used)
//  - ...
//  - percentage wins/total against B0 (not used)
// eg input: [[E6, 0, 0, 0, 4, 6, 40]]
function RATING_RES(input) {
	// TODO check input size
	var wins = getWinsFromInput(input);
	var totals = getTotalsFromInput(input);
	var currentRating = input[0][0];
	indexOfCurrentRating = getIndexOfCurrentRating(currentRating);
	wins = addVirtualWins(indexOfCurrentRating, totals, wins);
	totals = addVirtualTotals(indexOfCurrentRating, totals, wins);
	var expectedWins = getExpectedResWins(totals);
	var diffs = getResDiffs(wins, expectedWins);
	return getLowestAbsoluteResDiff(diffs);
}

function getWinsFromInput(input) {
	const NGWON = input[0][1] ? input[0][1] : 0;
	const E6WON = input[0][4] ? input[0][4] : 0;
	const E4WON = input[0][7] ? input[0][7] : 0;
	const E2WON = input[0][10] ? input[0][10] : 0;
	const E0WON = input[0][13] ? input[0][13] : 0;
	const D6WON = input[0][16] ? input[0][16] : 0;
	const D4WON = input[0][19] ? input[0][19] : 0;
	const D2WON = input[0][22] ? input[0][22] : 0;
	const D0WON = input[0][25] ? input[0][25] : 0;
	const C6WON = input[0][28] ? input[0][28] : 0;
	const C4WON = input[0][31] ? input[0][31] : 0;
	const C2WON = input[0][34] ? input[0][34] : 0;
	const C0WON = input[0][37] ? input[0][37] : 0;
	const B6WON = input[0][40] ? input[0][40] : 0;
	const B4WON = input[0][43] ? input[0][43] : 0;
	const B2WON = input[0][46] ? input[0][46] : 0;
	const B0WON = input[0][49] ? input[0][49] : 0;
	return [NGWON, E6WON, E4WON, E2WON, E0WON, D6WON, D4WON, D2WON, D0WON, C6WON, C4WON, C2WON, C0WON, B6WON, B4WON, B2WON, B0WON];
}

function getTotalsFromInput(input) {
	const NGTOTAL = (input[0][1] ? input[0][1] : 0) + (input[0][2] ? input[0][2] : 0);
	const E6TOTAL = (input[0][4] ? input[0][4] : 0) + (input[0][5] ? input[0][5] : 0);
	const E4TOTAL = (input[0][7] ? input[0][7] : 0) + (input[0][8] ? input[0][8] : 0);
	const E2TOTAL = (input[0][10] ? input[0][10] : 0) + (input[0][11] ? input[0][11] : 0);
	const E0TOTAL = (input[0][13] ? input[0][13] : 0) + (input[0][14] ? input[0][14] : 0);
	const D6TOTAL = (input[0][16] ? input[0][16] : 0) + (input[0][17] ? input[0][17] : 0);
	const D4TOTAL = (input[0][19] ? input[0][19] : 0) + (input[0][20] ? input[0][20] : 0);
	const D2TOTAL = (input[0][22] ? input[0][22] : 0) + (input[0][23] ? input[0][23] : 0);
	const D0TOTAL = (input[0][25] ? input[0][25] : 0) + (input[0][26] ? input[0][26] : 0);
	const C6TOTAL = (input[0][28] ? input[0][28] : 0) + (input[0][29] ? input[0][29] : 0);
	const C4TOTAL = (input[0][31] ? input[0][31] : 0) + (input[0][32] ? input[0][32] : 0);
	const C2TOTAL = (input[0][34] ? input[0][34] : 0) + (input[0][35] ? input[0][35] : 0);
	const C0TOTAL = (input[0][37] ? input[0][37] : 0) + (input[0][38] ? input[0][38] : 0);
	const B6TOTAL = (input[0][40] ? input[0][40] : 0) + (input[0][41] ? input[0][41] : 0);
	const B4TOTAL = (input[0][43] ? input[0][43] : 0) + (input[0][44] ? input[0][44] : 0);
	const B2TOTAL = (input[0][46] ? input[0][46] : 0) + (input[0][47] ? input[0][47] : 0);
	const B0TOTAL = (input[0][49] ? input[0][49] : 0) + (input[0][50] ? input[0][50] : 0);
	return [NGTOTAL, E6TOTAL, E4TOTAL, E2TOTAL, E0TOTAL, D6TOTAL, D4TOTAL, D2TOTAL, D0TOTAL, C6TOTAL, C4TOTAL, C2TOTAL, C0TOTAL, B6TOTAL, B4TOTAL, B2TOTAL, B0TOTAL];
}

function getIndexOfCurrentRating(currentRating) {
	result = RATINGS.indexOf(currentRating);
	if (result == -1) {
		throw "Current rating is not a supported rating";
	}
	return result;
}

function addVirtualWins(currentRating, totals, wins) {
	if(moreThan40InTotal(totals) || !extremePercentage(totals, wins)){
		return wins;
	}
	result = [];
	for (var i = 0; i < wins.length; i++) {
		win = wins[i];
		if (i == currentRating-1){
			win += 3;
		}else if (i == currentRating){
			win += 2;
		}else if (i == currentRating+1){
			win += 1;
		}
		result.push(win);
	}
	return result;
}

function addVirtualTotals(currentRating, totals, wins) {
	if(moreThan40InTotal(totals) || extremePercentage(totals, wins)){
		return totals;
	}
	result = [];
	for (var i = 0; i < totals.length; i++) {
		total = totals[i];
		if (i == currentRating-1 || i == currentRating || i == currentRating+1){
			total += 4;
		}
		result.push(total);
	}
	return result;
}

function moreThan40InTotal(totals) {
	total = sum(totals);
	return (total > 40);
}

function extremePercentage(totals, wins){
	total = sum(totals);
	win = sum(wins);
	if (total == 0){
		return true;
	}
	return (win/total < 0.1) || (win/total > 0.9);
}

function sum(array){
	result = 0;
	for (var i = 0; i < array.length; i++) {
		result += array[i];
	}
	return result;
}

function individualResDiff(wins, expectedWins) {
	if (expectedWins == 0) {
		return 0;
	}
	return wins - expectedWins;
}

function getExpectedResWins(listOfTotals) {
	result = [];
	for (var i = 0; i < listOfTotals.length; i++) {
		listOfExpectedWinsForRatingI = [];
		for (var inner = 0; inner < listOfTotals.length; inner++) {
			listOfExpectedWinsForRatingI.push(listOfTotals[inner] * getResChanceOfWin(inner - i));
		}
		result.push(listOfExpectedWinsForRatingI);
	}
	return result;// a list of lists [[expectedWinsAgainstNG, expectedWinsAgainstE6, ...]]
}

function getResChanceOfWin(i) {
	if (i < 0) {
		return CHANCE_OF_WIN_X_LOWER[-i];
	} else {
		return CHANCE_OF_WIN_X_HIGHER[i];
	}
}

function getResDiffs(wins, expectedWins) {
	result = [];
	for (var i = 0; i < wins.length; i++) {
		diff = 0;
		for (var inner = 0; inner < expectedWins.length; inner++) {
			diff += individualResDiff(wins[inner], expectedWins[i][inner]);
		}
		result.push(diff);
	}
	return result;
}

function getLowestAbsoluteResDiff(diffs) {
	var index = 0;
	var value = diffs[0];
	for (var i = 1; i < diffs.length; i++) {
		if (Math.abs(diffs[i]) < value) {
			value = Math.abs(diffs[i]);
			index = i;
		}
	}
	return RATINGS[index];
}

module.exports = RATING_RES;
