addModuleType(new ModuleType({
	name: 'Exponentiation',
	func: function(a, b) {
		return Math.pow(parseFloat(a), parseFloat(b));
	},
	argsdescription: ['Base [decimal]', 'Exponent [decimal]'],
	usesOutputVariable: true,
	usesUiView: false
}));
