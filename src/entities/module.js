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
	var self = this;
	this.update = function() {
		var inputs = {};
		for (var arg in self.args) {
			inputs[arg] = self.args[arg];
		}
		for (var variable in self.vars) {
			inputs[variable] = self.vars[variable].value;
		}
		if (self.moduleType.isView) {
			var container = inputs.ui;
			container.forEach(function(container) {
				inputs.ui = container;
				self.moduleType.func.call(self, inputs);
			});
		} else {
			var outputs = self.moduleType.func.call(self, inputs);
			for (var output in outputs) {
				self.outputs[output].setValue(outputs[output]);
			}
			return outputs;
		}
	};
	var callback = function() {
		self.update.call(self);
	};
	this.enabled = false;
	this.enable = function() {
		if (self.enabled) {
			return;
		}
		for (var i = 0; i < vars.length; i++) {
			vars[i].addObserver(callback);
		}
		self.enabled = true;
		if (self.enabledCallback) {
			self.prepare();
		}
		self.update();
	};
	this.disable = function() {
		if (!self.enabled) {
			return;
		}
		if (self.disabledCallback) {
			self.disabledCallback();
		}
		for (var i = 0; i < args.length; i++) {
			args[i].removeObserver(callback);
		}
		self.enabled = false;
	};
	this.enable();
}
