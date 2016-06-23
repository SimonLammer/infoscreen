/*
args has to be an array of Variable instances!
output has to be a Variable instance!
ui has to be a View instance!
*/
function Module(func, args, output, ui, enabledCallback, disabledCallback) {
	this.func = func;
	this.args = args;
	this.output = output;
	this.ui = (ui ? $('div[viewid="' + ui.id + '"]') : null);
	this.enabledCallback = enabledCallback ?
		function() {
			enabledCallback.call(this, this.ui);
		}
		: null;
	this.disabledCallback = disabledCallback ? 
		function() {
			disabledCallback.call(this, this.ui);
		}
		: null;
	this.update = function() {
		var argsValues = [];
		if (this.ui) {
			argsValues.push(this.ui);
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

	var self = this; // keep a reference to this, because the context of the callback function will be the variable - not the module!
	var callback = function() {
		self.update.call(self);
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
		if (this.enabledCallback) {
			this.enabledCallback();
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
