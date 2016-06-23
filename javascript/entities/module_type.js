/*
configExample = {
	name: 'ModuleType Example',
	func: function(ui, value) {
		$(ui).html('Current value: ' + value + ' @ ' + (new Date().toISOString())); // update view
		return parseInt(value) + 4; // update output variable
	},
	argsdescription: ['integer value'],
	usesOutputVariable: true,
	usesUiView: true,
	enabledCallback: function(ui) { // set up
		var self = this; // store a this reference
		this.interval = setInterval(function() {
			// update module
			if(self.update) { // use stored this reference instead of current context, because it won't work otherwise
				self.update(); // this function will be injected once a module with this type is instantiated
			}
		}, 500);
	},
	disabledCallback: function(ui) { // tear down
		clearInterval(this.interval);
		$(ui).html(''); // if you had bound event handlers (e.g. onClick for a button), you would remove them here
	}
}
*/
function ModuleType(config) {
	this.name = config.name;
	this.func = config.func;
	this.argsdescription = config.argsdescription;
	this.argslength = this.argsdescription.length;
	this.usesOutputVariable = config.usesOutputVariable;
	this.usesUiView = config.usesUiView;
	this.enabledCallback = config.enabledCallback;
	this.disabledCallback = config.disabledCallback;
}

window.moduleTypes = [];
function addModuleType(moduleType) {
	moduleTypes.push(moduleType);
}
