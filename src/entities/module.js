/*
	moduleType = getModuleTypeByName('Addition')
	args = {summand1: 1}
	vars = {summand2: 2} // variable with id 2
	outputs = {sum: 3} // variable with id 3
*/
function Module(moduleType, args, vars, outputs) {
	this.id = getNextId();
	this.moduleType = moduleType;
	this.args = args;
	this.vars = vars;
	this.outputs = outputs;
	this.update = function() {
		var inputs = {};
		for (var arg in args) {
			inputs[arg] = args[arg];
		}
		for (var variable in vars) {
			inputs[variable] = vars[variable];
		}
		var outputs = this.moduleType.func.call(this, inputs);
		for (var output in outputs) {
			this.outputs[output].setValue(outputs[output]);
		}
		return outputs;
	};

	var self = this;
	var callback = function() {
		self.update.call(self);
	};
	this.enabled = false;
	this.enable = function() {
		if (this.enabled) {
			return;
		}
		for (var i = 0; i < vars.length; i++) {
			vars[i].addObserver(callback);
		}
		this.enabled = true;
		if (this.enabledCallback) {
			this.prepare();
		}
		this.update();
	};
	this.disable = function() {
		if (!this.enabled) {
			return;
		}
		if (this.disabledCallback) {
			this.disabledCallback();
		}
		for (var i = 0; i < args.length; i++) {
			args[i].removeObserver(callback);
		}
		this.enabled = false;
	};
	this.enable();
}
