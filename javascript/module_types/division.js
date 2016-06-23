addModuleType(new ModuleType({
	name: 'Division',
	func: function(a, b) {
		return parseFloat(a) / parseFloat(b);
	},
	argsdescription: ['Dividend [decimal]', 'Divisor [decimal]'],
	usesOutputVariable: true,
	usesUiView: false
}));