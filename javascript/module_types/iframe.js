addModuleType(new ModuleType({
	name: 'iFrame',
	func: function(ui, url) {
		$(ui).html(
			$('<iframe />', {
				src: url,
				style: 'width:100%;height:100%;'
			})
		); // update view
	},
	argsdescription: ['url'],
	usesOutputVariable: false,
	usesUiView: true
}));
