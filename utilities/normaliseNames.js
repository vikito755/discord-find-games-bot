// Pattern matching all characters except "_" and all numbers and all Englsih letters.
const pattern = '[^a-z0-9_]';

//
const normaliseCommandName = (gameName) => {

	   gameName = gameName.toLowerCase().replace(' ', '_').replace(new RegExp(pattern, 'gui'), function(c) {
		return c === pattern ? c : '_';
	});

	if (gameName.length > 32) {
		gameName = gameName.slice(0, 29);
	}
	console.log(gameName);
	return (gameName);
};

export default {
	normaliseCommandName,
};
