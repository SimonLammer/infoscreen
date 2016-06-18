/*
args has to be an array of Variable instances!
output has to be a Variable instance!
*/
function Module(description, func, args, output, ui) {
	this.description = description;
	this.func = func;
	this.args = args;
	this.output = output;
	this.ui = ui;
	this.uiEnabled = false;
	this.enableUi = function() {
		this.ui = true;
	};
	this.disableUi = function() {
		this.ui = false;
	};
	this.update = function() {
		var argsValues = [];
		if (ui && uiEnabled) {
			argsValues.push(ui);
		}
		for (var i = 0; i < args.length; i++) {
			argsValues.push(this.args[i].value);
		}
		var result = func.apply(this, argsValues);
		if (this.output) {
			this.output.setValue(result);
		}
		return result;
	};
	this.update();

	var self = this; // keep a reference to this, because the context of the callback function will be the variable - not the module!
	var callback = function() {
		self.update();
	};
	this.enabled = false;
	this.enable = function() {
		if (this.enabled) {
			return;
		}
		for (var i = 0; i < args.length; i++) {
			args[i].addObserver(callback);
		}
		this.enabled = true;
		this.update();
	};
	this.disable = function() {
		if (!this.enabled) {
			return;
		}
		for (var i = 0; i < args.length; i++) {
			args[i].removeObserver(callback);
		}
		this.enabled = false;
	};
	this.enable();
}
