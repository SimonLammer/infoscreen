addModuleType(new ModuleType({
	name: 'Color',
	inputs: {
		color: 'Color'
	},
	outputs: {},
	isView: true,
	func: function(inputs) {
		$(inputs).css('background-color', inputs.color);
	}
}));
