addModuleType(new ModuleType({
	name: 'Concatinate',
	func: function(a, concatinator, b) {
		return a + '' + concatinator + '' + b
	},
	argsdescription: ['String 1', 'Concatinator', 'String 2'],
	usesOutputVariable: true,
	usesUiView: false
}));
