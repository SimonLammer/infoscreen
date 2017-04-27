addModuleType(new ModuleType({
	name: 'Headline (Sample View)',
	inputs: {
		text: 'Text'
	},
	outputs: {},
	isView: true,
	prepare: function(inputs) {
		$(inputs.ui).html(
			$('<h1 />', {
				class: 'header'
			})
		);
	},
	func: function(inputs) {
		$(inputs).find('.header').html(inputs.text);
	}
}));
