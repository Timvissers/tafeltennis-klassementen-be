// based on http://tabt.frenoy.net/index.php?l=NL&display=MethodePointsELO_NL

const { RATINGS } = require('./common.js');

// INPUT: integer representing the number of elo points
// eg input: 390

function RATING_ELO(eloPoints) {
	if (eloPoints < 500){
		return RATINGS[0];
	}else if (eloPoints < 650){
		return RATINGS[1];
	}else if (eloPoints < 750){
		return RATINGS[2];
	}else if (eloPoints < 850){
		return RATINGS[3];
	}else if (eloPoints < 950){
		return RATINGS[4];
	}else if (eloPoints < 1050){
		return RATINGS[5];
	}else if (eloPoints < 1150){
		return RATINGS[6];
	}else if (eloPoints < 1250){
		return RATINGS[7];
	}else if (eloPoints < 1350){
		return RATINGS[8];
	}else if (eloPoints < 1450){
		return RATINGS[9];
	}else if (eloPoints < 1550){
		return RATINGS[10];
	}else if (eloPoints < 1650){
		return RATINGS[11];
	}else if (eloPoints < 1750){
		return RATINGS[12];
	}else if (eloPoints < 1850){
		return RATINGS[13];
	}else if (eloPoints < 1950){
		return RATINGS[14];
	}else if (eloPoints < 2050){
		return RATINGS[15];
	}else {
		return RATINGS[16];
	}
}

module.exports = RATING_ELO;
