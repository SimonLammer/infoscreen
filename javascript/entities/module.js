/*
args has to be an array of Variable instances!
output has to be a Variable instance!
ui has to be a View instance!
*/
function Module(func, args, output, ui) {
	this.func = func;
	this.args = args;
	this.output = output;
	this.ui = ui;
	this.update = function() {
		console.log('module-update', this);
		var argsValues = [];
		if (ui) {
			argsValues.push($('div[viewid="' + ui.id + '"]'));
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
	callback();
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
