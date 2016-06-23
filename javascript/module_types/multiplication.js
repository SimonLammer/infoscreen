addModuleType(new ModuleType({
	name: 'Multiplication',
	func: function(a, b) {
		return parseFloat(a) * parseFloat(b);
	},
	argsdescription: ['Factor 1 [decimal]', 'Factor 2 [decimal]'],
	usesOutputVariable: true,
	usesUiView: false
}));
