// based on http://tabt.frenoy.net/index.php?l=NL&display=MethodeMeerderheid_NL

const { RATINGS } = require('./common.js');

// INPUT: list in list, containing the following elements, all mandatory,
//  - proposed VLB rating
//	- proposed RES rating
//	- proposed LK rating
// eg input: [[E6, E4, E4]]

function RATING_MER(input) {
  // TODO check input size
	var proposed_ratings = [getIndexOfRating(input[0][0]), getIndexOfRating(input[0][1]), getIndexOfRating(input[0][2])];
	var diffInRating = getDiffInRating(proposed_ratings);
	switch(diffInRating) {
		case 0:
			return input[0][0];
		case 1:
			return getMostOccurringRating(proposed_ratings);
		case 2:
			return getMiddleRating(proposed_ratings);
		default: // 3 or more
			return "??"
	}
}

function getIndexOfRating(currentRating) {
	result = RATINGS.indexOf(currentRating);
	if (result == -1) {
		throw "Current rating is not a supported rating";
	}
	return result;
}

function getDiffInRating(proposed_ratings) {
	lowest = proposed_ratings[0];
	highest = proposed_ratings[0];
	for (var i = 1 ; i < proposed_ratings.length ; i++){
		if(proposed_ratings[i] < lowest){
			lowest = proposed_ratings[i];
		}
		if(proposed_ratings[i] > highest){
			highest = proposed_ratings[i];
		}
	}
	return highest - lowest;
}

function getMostOccurringRating(array) {
	if(array.length == 0)
		return null;
	var modeMap = {};
	var maxEl = array[0], maxCount = 1;
	for(var i = 0; i < array.length; i++)
	{
		var el = array[i];
		if(modeMap[el] == null)
			modeMap[el] = 1;
		else
			modeMap[el]++;
		if(modeMap[el] > maxCount)
		{
			maxEl = el;
			maxCount = modeMap[el];
		}
	}
	return RATINGS[maxEl];
}

function getMiddleRating(proposed_ratings) {
	lowest = proposed_ratings[0];
	highest = proposed_ratings[0];
	for (var i = 1 ; i < proposed_ratings.length ; i++){
		if(proposed_ratings[i] < lowest){
			lowest = proposed_ratings[i];
		}
		if(proposed_ratings[i] > highest){
			highest = proposed_ratings[i];
		}
	}
	return RATINGS[(highest + lowest) / 2];
}

module.exports = RATING_MER;
