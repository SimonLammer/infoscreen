addModuleType(new ModuleType({
	name: 'Root',
	func: function(a, b) {
		return Math.pow(parseFloat(a), parseFloat(b) / 3);
	},
	argsdescription: ['Degree [decimal]', 'Radicand [decimal]'],
	usesOutputVariable: true,
	usesUiView: false
}));
