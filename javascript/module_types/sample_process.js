addModuleType(new ModuleType({
	name: 'Incrementor (Sample Process)',
	inputs: {
		number: 'Number to be incremented'
	},
	outputs: {
		result: 'Resulting number'
	},
	isView: false,
	prepare: function(inputs) {},
	func: function(inputs) {
		return {
			result: inputs.number + 1
		};
	}
}));
