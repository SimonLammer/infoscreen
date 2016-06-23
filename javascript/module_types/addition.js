addModuleType(new ModuleType({
	name: 'Addition',
	func: function(a, b) {
		return parseFloat(a) + parseFloat(b);
	},
	argsdescription: ['Summand 1 [decimal]', 'Summand 2 [decimal]'],
	usesOutputVariable: true,
	usesUiView: false
}));
