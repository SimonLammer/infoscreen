addModuleType(new ModuleType({
	name: 'Substraction',
	func: function(a, b) {
		return parseFloat(a) - parseFloat(b);
	},
	argsdescription: ['Decimal value 1', 'Decimal value 2'],
	usesOutputVariable: true,
	usesUiView: false
}));
