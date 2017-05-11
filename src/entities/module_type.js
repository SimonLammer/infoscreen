// see module_types/addition.js for a config example
function ModuleType(config) {
	this.name = config.name;
	this.inputs = config.inputs;
	this.outputs = config.outputs;
	this.isView = config.isView;
	this.prepare = config.prepare;
	this.func = config.func;
}

var moduleTypes = [];
function addModuleType(moduleType) {
	moduleTypes.push(moduleType);
}
function getModuleTypeByName(moduleTypeName) {
	for (var i = 0; i < moduleTypes.length; i++) {
		if (moduleTypes[i].name == moduleTypeName) {
			return moduleTypes[i];
		}
	}
}