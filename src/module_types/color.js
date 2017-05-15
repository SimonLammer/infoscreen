addModuleType(new ModuleType({
	name: 'Color',
	inputs: {
		color: 'Color'
	},
	outputs: {},
	isView: true,
	func: function(inputs) {
		$(this.ui).css('background-color', inputs.color);
	}
}));
