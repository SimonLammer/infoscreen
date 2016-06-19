addModuleType(new ModuleType(
	'html',
	function(ui, html) {
		$(ui).html(html);
	},
	['HTML'],
	false,
	true
));
