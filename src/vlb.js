// based on http://tabt.frenoy.net/index.php?l=NL&display=MethodeVlb_NL

const { RATINGS } = require('./common.js');

VICTORY_BASE = 1;
DEFEAT_BASE = 1;
VICTORY_BONUS = 5;
DEFEAT_BONUS = 5;

PIVOT_DARK_RED = 1;
PIVOT_GREEN = 2;
PIVOT_RED = 3;
PIVOT_BLUE = 4;

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
function RATING_VLB(input) {
	// TODO check input size
	var currentRating = input[0][0];
	indexOfCurrentRating = getIndexOfCurrentRating(currentRating);
	var wins = getWinsFromInput(input);
	var losses = getLossesFromInput(input);

	iterations = [];
	iterationResults = [];
	return RATINGS[iterateUntilDone(indexOfCurrentRating, wins, losses)];
}

function getIndexOfCurrentRating(currentRating) {
	result = RATINGS.indexOf(currentRating);
	if (result == -1) {
		throw "Current rating is not a supported rating";
	}
	return result;
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

function getLossesFromInput(input) {
	const NGLOSSES = (input[0][2] ? input[0][2] : 0);
	const E6LOSSES = (input[0][5] ? input[0][5] : 0);
	const E4LOSSES = (input[0][8] ? input[0][8] : 0);
	const E2LOSSES = (input[0][11] ? input[0][11] : 0);
	const E0LOSSES = (input[0][14] ? input[0][14] : 0);
	const D6LOSSES = (input[0][17] ? input[0][17] : 0);
	const D4LOSSES = (input[0][20] ? input[0][20] : 0);
	const D2LOSSES = (input[0][23] ? input[0][23] : 0);
	const D0LOSSES = (input[0][26] ? input[0][26] : 0);
	const C6LOSSES = (input[0][29] ? input[0][29] : 0);
	const C4LOSSES = (input[0][32] ? input[0][32] : 0);
	const C2LOSSES = (input[0][35] ? input[0][35] : 0);
	const C0LOSSES = (input[0][38] ? input[0][38] : 0);
	const B6LOSSES = (input[0][41] ? input[0][41] : 0);
	const B4LOSSES = (input[0][44] ? input[0][44] : 0);
	const B2LOSSES = (input[0][47] ? input[0][47] : 0);
	const B0LOSSES = (input[0][50] ? input[0][50] : 0);
	return [NGLOSSES, E6LOSSES, E4LOSSES, E2LOSSES, E0LOSSES, D6LOSSES, D4LOSSES, D2LOSSES, D0LOSSES, C6LOSSES, C4LOSSES, C2LOSSES, C0LOSSES, B6LOSSES, B4LOSSES, B2LOSSES, B0LOSSES];
}

function calculatePointsForWins(indexOfCurrentRating, wins) {
	result = 0;
	for (var i = 0; i < wins.length; i++) {
		diff = i - indexOfCurrentRating;
		if(i <= indexOfCurrentRating){
			result = result + wins[i] * VICTORY_BASE * (1/(Math.pow(2,-diff)));
		}else{
			result = result + wins[i] * VICTORY_BASE * (1 + (diff * VICTORY_BONUS));
		}
	}
	return result;
}


function calculatePointsForLosses(indexOfCurrentRating, losses) {
	result = 0;
	for (var i = 0; i < losses.length; i++) {
		diff = i - indexOfCurrentRating;
		if(i >= indexOfCurrentRating){
			result = result - losses[i] * DEFEAT_BASE * (1/(Math.pow(2,diff)));
		}else{
			result = result - losses[i] * DEFEAT_BASE * (1 - (diff * DEFEAT_BONUS));
		}
	}
	return result;
}

function calculatePivot(points, totalMatches){
	if (totalMatches < 20){
		return PIVOT_DARK_RED;
	}
	if (totalMatches >= 80){
		if (points >= 15){
			return PIVOT_GREEN;
		}else if (points <= -15){
			return PIVOT_RED;
		}else{
			return PIVOT_BLUE;
		}
	}

	var pivotPointsBorder = (-5/12)*totalMatches + (145/3);
	if (points >= pivotPointsBorder){
		return PIVOT_GREEN;
	}else if (points <= -pivotPointsBorder){
		return PIVOT_RED;
	}else{
		return PIVOT_BLUE;
	}
}

function sum(array){
	result = 0;
	for (var i = 0; i < array.length; i++) {
		result += array[i];
	}
	return result;
}

function iterateUntilDone(ratingToCalculate, wins, losses) {
	var totalPoints = calculatePointsForWins(ratingToCalculate, wins) + calculatePointsForLosses(ratingToCalculate, losses);
	var pivotValue = calculatePivot(totalPoints, sum(losses) + sum(wins));
	iterations.push(ratingToCalculate);
	iterationResults.push(pivotValue);
	if(pivotValue == PIVOT_DARK_RED){
		return Math.max(ratingToCalculate - 1, 0);
	}else if(pivotValue == PIVOT_BLUE){
		return ratingToCalculate;
	}else if(pivotValue == PIVOT_RED){
		if(iterations.length > 1 && iterationResults[iterationResults.length-2] != PIVOT_RED){
			if(iterationResults[iterationResults.length-2] > 0){
				if((iterationResults[iterationResults.length-2] + iterationResults[iterationResults.length-1]) < 0){
					return iterations[iterations.length-1];
				}
			}
			return iterations[iterations.length-2];
		}
		if(ratingToCalculate > 0){
			return iterateUntilDone(ratingToCalculate-1, wins, losses);
		}else{
			return 0;
		}
	}else if(pivotValue == PIVOT_GREEN){
		if(iterations.length > 1 && iterationResults[iterationResults.length-2] != PIVOT_GREEN){
			if(iterationResults[iterationResults.length-2] > 0){
				if((iterationResults[iterationResults.length-2] + iterationResults[iterationResults.length-1]) > 0){
					return iterations[iterations.length-1];
				}
			}
			return iterations[iterations.length-2];
		}
		if(ratingToCalculate >= (RATINGS.length - 1)){
			return ratingToCalculate;
		}else{
			return iterateUntilDone(ratingToCalculate+1, wins, losses);
		}
	}
}

module.exports = RATING_VLB;
