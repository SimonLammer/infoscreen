addModuleType(new ModuleType(
window.sth = {
	name: 'ConfigExample',
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
));
