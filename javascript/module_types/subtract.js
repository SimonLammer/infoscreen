addModuleType(new ModuleType(
	'subtract',
	function(a,b) {
		return parseFloat(a) + parseFloat(b);
	},
	['Operand 1', 'Operand 2'],
	true,
	false
));
