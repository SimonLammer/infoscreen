function ModuleBlueprint(description, moduleTypeName, argsVariables, outputVariable, uiView) {
	this.description = description;
	for (var i = 0; i < moduleTypes.length; i++) {
		if (moduleTypes[i].name === moduleTypeName) {
			this.moduleType = moduleTypes[i];
			break;
		}
	}
	this.argsVariables = argsVariables;
	this.outputVariable = outputVariable;
	this.uiView = uiView;
}
ModuleBlueprint.prototype.getModule = function() {
	return new Module(this.moduleType.func, this.argsVariables, this.outputVariable, this.uiView);
}
