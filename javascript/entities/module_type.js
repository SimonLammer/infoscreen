function ModuleType(name, func, argsdescription, usesOutputVariable, usesUi) {
	this.name = name;
	this.func = func;
	this.argsdescription = argsdescription;
	this.argslength = this.argsdescription.length;
	this.usesOutputVariable = usesOutputVariable;
	this.usesUi = usesUi;
}

window.moduleTypes = [];
function addModuleType(moduleType) {
	moduleTypes.push(moduleType);
}
