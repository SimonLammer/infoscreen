addModuleType(new ModuleType({
	name: 'Addition',
	inputs: {
		summand1: 'Summand 1 [decimal]',
		summand2: 'Summand 2 [decimal]'
	},
	outputs: {
		sum: 'Sum [decimal]'
	},
	isView: false,
	prepare: function(inputs) {},
	func: function(inputs) {
		return {
			sum: parseFloat(inputs.summand1) + parseFloat(inputs.summand2)
		};
	}
}));
