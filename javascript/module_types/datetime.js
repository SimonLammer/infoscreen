addModuleType(new ModuleType({
	name: 'Date and Time',
	func: function(format) {
		return new Date().toISOString();
	},
	argsdescription: ['Format [string]'],
	usesOutputVariable: true,
	usesUiView: false,
	enabledCallback: function() {
		var self = this;
		this.interval = setInterval(function() {
			if(self.update) {
				self.update();
			}
		}, 1000);
	},
	disabledCallback: function() {
		clearInterval(this.interval);
	}
}));
