addModuleType(new ModuleType({
	name: 'HTML',
	func: function(ui, value) {
		$(ui).html(value); // update view
	},
	argsdescription: ['HTML code'],
	usesOutputVariable: false,
	usesUiView: true
}));
