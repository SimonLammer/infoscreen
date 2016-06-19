function ModuleType(name, func, argsdescription, usesOutputVariable, usesUiView) {
	this.name = name;
	this.func = func;
	this.argsdescription = argsdescription;
	this.argslength = this.argsdescription.length;
	this.usesOutputVariable = usesOutputVariable;
	this.usesUiView = usesUiView;
}

window.moduleTypes = [];
function addModuleType(moduleType) {
	moduleTypes.push(moduleType);
}
