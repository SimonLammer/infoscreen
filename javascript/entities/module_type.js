/*
configExample = {
	name: 'ConfigExample',
	func: function(ui, value) {
		$(ui).html('Current value: ' + value + ' @ ' + (new Date().toISOString())); // update view
		return parseInt(value) + 4; // update output variable
	},
	argsdescription: ['integer value'],
	usesOutputVariable: true,
	usesUiView: true,
	enabledCallback: function(ui) {
		this.interval = setInterval(function() { // set up
			// update module
			if (this.update) {
				this.update(); // this function will be injected once a module with this type is instantiated
			}
		}, 500);
	},
	disabledCallback: function(ui) { // tear down
		clearInterval(this.interval);
		$(ui).html(''); // if you had bound event handlers (e.g. onClick for a button), you would remove them here
	}
}

Call function that will be defined later:
x = { func: function() {   if(this.foo) {     this.foo();   } else {     console.log('foo not defined');   } }}; x.func(); x.foo = function() { console.log('hello'); }; x.func();
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
