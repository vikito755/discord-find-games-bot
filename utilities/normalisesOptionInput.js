const { maximumOptionCharacters } = require('../constants.json');

function normalisesOptionInput(input) {
	return input.toString().substring(0, maximumOptionCharacters);
}

module.exports.normalisesOptionInput = normalisesOptionInput;