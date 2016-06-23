addModuleType(new ModuleType({
	name: 'Substraction',
	func: function(a, b) {
		return parseFloat(a) - parseFloat(b);
	},
	argsdescription: ['Minuend [decimal]', 'Subtrahend [decimal]'],
	usesOutputVariable: true,
	usesUiView: false
}));
