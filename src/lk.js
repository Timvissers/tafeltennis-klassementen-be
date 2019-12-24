// based on http://tabt.frenoy.net/index.php?l=NL&display=MethodeLimburgKempen_NL

// there is a flaw in this algorithm in case of no confrontations against a given higher rating are considered!
//   - this one is fixed by not giving a higher rating, possibly introducing a new flaw in this algorithm. But this is one of the reasons why aggregated algorithms are used!
// there is an obvious flaw in this algorithm, that you cannot get a higher ranking if you did not play higher rankings

const {RATINGS} = require('./common.js'); // do not include in google app script, does not work

WEIGHT_EQUAL = 1;
WEIGHT_HIGH_01 = 1.5;
WEIGHT_LOW_01 = WEIGHT_HIGH_01;
WEIGHT_HIGH_02 = 2;
WEIGHT_LOW_02 = WEIGHT_HIGH_02;
WEIGHT_HIGH_03 = 3;
WEIGHT_LOW_03 = WEIGHT_HIGH_03;
WEIGHT_HIGH_04 = 4;
WEIGHT_LOW_04 = WEIGHT_HIGH_04;
WEIGHT_HIGH_05 = 4;
WEIGHT_LOW_05 = WEIGHT_HIGH_05;
WEIGHT_HIGH_06 = 4;
WEIGHT_LOW_06 = WEIGHT_HIGH_06;
WEIGHT_HIGH_07 = 4;
WEIGHT_LOW_07 = WEIGHT_HIGH_07;
WEIGHT_HIGH_08 = 4;
WEIGHT_LOW_08 = WEIGHT_HIGH_08;
WEIGHT_HIGH_09 = 4;
WEIGHT_LOW_09 = WEIGHT_HIGH_09;
WEIGHT_HIGH_10 = 4;
WEIGHT_LOW_10 = WEIGHT_HIGH_10;
WEIGHT_HIGH_11 = 4;
WEIGHT_LOW_11 = WEIGHT_HIGH_11;
WEIGHT_HIGH_12 = 4;
WEIGHT_LOW_12 = WEIGHT_HIGH_12;
WEIGHT_HIGH_13 = 4;
WEIGHT_LOW_13 = WEIGHT_HIGH_13;
WEIGHT_HIGH_14 = 4;
WEIGHT_LOW_14 = WEIGHT_HIGH_14;
WEIGHT_HIGH_15 = 4;
WEIGHT_LOW_15 = WEIGHT_HIGH_15;
WEIGHT_HIGH_16 = 4;
WEIGHT_LOW_16 = WEIGHT_HIGH_16;

WEIGHT_OF_WIN_X_HIGHER = [WEIGHT_EQUAL, WEIGHT_HIGH_01, WEIGHT_HIGH_02, WEIGHT_HIGH_03, WEIGHT_HIGH_04,
	WEIGHT_HIGH_05, WEIGHT_HIGH_06, WEIGHT_HIGH_07, WEIGHT_HIGH_08, WEIGHT_HIGH_09,
	WEIGHT_HIGH_10, WEIGHT_HIGH_11, WEIGHT_HIGH_12, WEIGHT_HIGH_13, WEIGHT_HIGH_14,
	WEIGHT_HIGH_15, WEIGHT_HIGH_16];
WEIGHT_OF_LOSS_X_LOWER = [WEIGHT_EQUAL, WEIGHT_LOW_01, WEIGHT_LOW_02, WEIGHT_LOW_03, WEIGHT_LOW_04,
	WEIGHT_LOW_05, WEIGHT_LOW_06, WEIGHT_LOW_07, WEIGHT_LOW_08, WEIGHT_LOW_09,
	WEIGHT_LOW_10, WEIGHT_LOW_11, WEIGHT_LOW_12, WEIGHT_LOW_13, WEIGHT_LOW_14,
	WEIGHT_LOW_15, WEIGHT_LOW_16];

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

function RATING_LK(input) {
	// TODO check input size

	var currentRating = input[0][0];
	indexOfCurrentRating = getIndexOfCurrentRating(currentRating);
	var originalWins = getWinsFromInput(input);
	wins = getWeightedWins(originalWins.slice(), indexOfCurrentRating);
	var originalLosses = getLossesFromInput(input);
	losses = getWeightedLosses(originalLosses.slice(), indexOfCurrentRating);

	//first it until own rating
	indexOfRatingMet = iterateUntilCurrentRating(wins, losses, indexOfCurrentRating);
	if (indexOfRatingMet == indexOfCurrentRating) {
		indexOfRatingMet = iterateForHigherRating(originalWins, originalLosses, indexOfCurrentRating);
	}
	return RATINGS[indexOfRatingMet];
}

function getIndexOfCurrentRating(currentRating) {
	result = RATINGS.indexOf(currentRating);
	if (result == -1) {
		throw "Current rating is not a supported rating";
	}
	return result;
}

function getWinsFromInput(input) {
	NGWON = input[0][1] ? input[0][1] : 0;
	E6WON = input[0][4] ? input[0][4] : 0;
	E4WON = input[0][7] ? input[0][7] : 0;
	E2WON = input[0][10] ? input[0][10] : 0;
	E0WON = input[0][13] ? input[0][13] : 0;
	D6WON = input[0][16] ? input[0][16] : 0;
	D4WON = input[0][19] ? input[0][19] : 0;
	D2WON = input[0][22] ? input[0][22] : 0;
	D0WON = input[0][25] ? input[0][25] : 0;
	C6WON = input[0][28] ? input[0][28] : 0;
	C4WON = input[0][31] ? input[0][31] : 0;
	C2WON = input[0][34] ? input[0][34] : 0;
	C0WON = input[0][37] ? input[0][37] : 0;
	B6WON = input[0][40] ? input[0][40] : 0;
	B4WON = input[0][43] ? input[0][43] : 0;
	B2WON = input[0][46] ? input[0][46] : 0;
	B0WON = input[0][49] ? input[0][49] : 0;
	return [NGWON, E6WON, E4WON, E2WON, E0WON, D6WON, D4WON, D2WON, D0WON, C6WON, C4WON, C2WON, C0WON, B6WON, B4WON, B2WON, B0WON];
}

function getLossesFromInput(input) {
	NGLOST = input[0][2] ? input[0][2] : 0;
	E6LOST = input[0][5] ? input[0][5] : 0;
	E4LOST = input[0][8] ? input[0][8] : 0;
	E2LOST = input[0][11] ? input[0][11] : 0;
	E0LOST = input[0][14] ? input[0][14] : 0;
	D6LOST = input[0][17] ? input[0][17] : 0;
	D4LOST = input[0][20] ? input[0][20] : 0;
	D2LOST = input[0][23] ? input[0][23] : 0;
	D0LOST = input[0][26] ? input[0][26] : 0;
	C6LOST = input[0][29] ? input[0][29] : 0;
	C4LOST = input[0][32] ? input[0][32] : 0;
	C2LOST = input[0][35] ? input[0][35] : 0;
	C0LOST = input[0][38] ? input[0][38] : 0;
	B6LOST = input[0][41] ? input[0][41] : 0;
	B4LOST = input[0][44] ? input[0][44] : 0;
	B2LOST = input[0][47] ? input[0][47] : 0;
	B0LOST = input[0][50] ? input[0][50] : 0;
	return [NGLOST, E6LOST, E4LOST, E2LOST, E0LOST, D6LOST, D4LOST, D2LOST, D0LOST, C6LOST, C4LOST, C2LOST, C0LOST, B6LOST, B4LOST, B2LOST, B0LOST];
}

function getWeightedWins(wins, indexOfCurrentRating) {
	result = [];
	for (var i = 0; i < wins.length; i++) {
		if (i <= indexOfCurrentRating) {
			result.push(wins[i]);
		} else {
			diff = i - indexOfCurrentRating;
			result.push(wins[i] * WEIGHT_OF_WIN_X_HIGHER[diff]);
		}
	}
	return result;
}

function getWeightedLosses(losses, indexOfCurrentRating) {
	result = [];
	for (var i = 0; i < losses.length; i++) {
		if (i >= indexOfCurrentRating) {
			result.push(losses[i]);
		} else {
			diff = indexOfCurrentRating - i;
			result.push(losses[i] * WEIGHT_OF_LOSS_X_LOWER[diff]);
		}
	}
	return result;
}

function iterateUntilCurrentRating(wins, losses, indexOfCurrentRating) {
	var i = 0;
	for (; i <= indexOfCurrentRating; i++) {
		if (losses[i] > wins[i]) {
			ratingMet = adaptWinsToMeetIndex(i, wins, losses);
			if (!ratingMet) {
				break;
			}
		}
		if (i == indexOfCurrentRating) {
			return indexOfCurrentRating;
		}
	}
	return i;
}

function adaptWinsToMeetIndex(index, wins, losses) {
	pointsNeeded = losses[index] - wins[index];
	for (var i = index + 1; i < wins.length && wins[index] < losses[index]; i++) {
		if (wins[i] > 0) {
			if (wins[i] >= pointsNeeded) {
				wins[i] = wins[i] - pointsNeeded;
				wins[index] = wins[index] + pointsNeeded;
			} else {
				wins[i] = 0;
				wins[index] = wins[index] + wins[i];
			}
		}
	}
	if (wins[index] < losses[index]) {
		return false;
	}
	return true;
}

function iterateForHigherRating(originalWins, originalLosses, indexOfCurrentRating) {
	if (indexOfCurrentRating >= RATINGS.length) {
		return indexOfCurrentRating;
	}
	firstHigherRating = indexOfCurrentRating + 1;
	wins = getWeightedWins(originalWins, firstHigherRating);
	losses = getWeightedLosses(originalLosses, firstHigherRating);
	var i = firstHigherRating;
	for (; i < wins.length; i++) {
		if (losses[i] == 0 && wins[i] == 0)
			return i - 1; // fix for algorithm flaw with no-confrontations-case, introducing a new flaw !
		if (losses[i] > wins[i]) {
			ratingMet = adaptWinsToMeetIndex(i, wins, losses);
			if (!ratingMet) {
				return i - 1;
			}
		}
	}
	return i - 1;
}

module.exports = RATING_LK; // do not include in google app script, does not work
