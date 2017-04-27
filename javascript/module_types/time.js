addModuleType(new ModuleType(
	'time',
	function() {
		var date = new Date();
		return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	},[],
	true,
	false
));
