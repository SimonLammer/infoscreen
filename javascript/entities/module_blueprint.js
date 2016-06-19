function ModuleBlueprint(description, moduleTypeName) {
	this.description = description;
	this.moduleTypeName = moduleTypeName;
	this.argsVariables = [];
	this.outputVariableId = null;
	this.outputVariable = null;
	this.usesOutputVariable = false;
	this.uiViewId = null;
	this.uiView = null;
	this.usesUiView = false;
	this.updateModuleType();
	this.module = null;
}
ModuleBlueprint.prototype.updateModuleType = function() {
	if (!this.moduleType || this.moduleType.name != this.moduleTypeName) {
		this.moduleType = getModuleTypeByName(this.moduleTypeName);
		if (this.moduleType) {
			this.argsVariables = [];
			for (var i = 0; i < this.moduleType.argslength; i++) {
				this.argsVariables.push({
					description: this.moduleType.argsdescription[i],
					id: null
				});
			}
			this.usesOutputVariable = this.moduleType.usesOutputVariable;
			this.usesUiView = this.moduleType.usesUiView;
		}
	} else {
		this.argsVariables = [];
	}
};
ModuleBlueprint.prototype.updateOutputVariable = function() {
	if (!this.outputVariable || this.outputVariable.id != this.outputVariableId) {
		this.outputVariable = getVariableById(this.outputVariableId);
	}
};
ModuleBlueprint.prototype.updateUiView = function() {
	if (!this.uiView || this.uiView.id != this.uiViewId) {
		this.uiView = getViewById(this.uiViewId);
	}
};
ModuleBlueprint.prototype.getModule = function() {
	var moduleType = getModuleTypeByName(this.moduleTypeName);
	var args = [];
	for (var i = 0; i < this.argsVariables.length; i++) {
		args.push(getVariableById(this.argsVariables[i].variableid));
	}
	var output = getVariableById(this.outputVariableId);
	var ui = getViewById(this.uiViewId);
	return new Module(moduleType.func, args, output, ui);
};

function getModuleTypeByName(moduleTypeName) {
	var moduleType;
	for (var i = 0; i < moduleTypes.length; i++) {
		if (moduleTypes[i].name == moduleTypeName) {
			return moduleTypes[i];
		}
	}
}
