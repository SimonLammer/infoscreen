/*
args is an array of Variable instances!

module demo:
var a = new Variable(1); var b = new Variable(3); var module = new Module('add', function(a,b){return a+b;}, [a,b]); console.log(module.output.value); module.output.addObserver(function(v){console.log(v);}); //copy-paste this line
a.setValue(5); // 5 + 3 = 8
b.setValue(4); // 5 + 4 = 9
*/
function Module(description, func, args) {
	this.description = description;
	this.func = func;
	this.args = args;
	this.output = new Variable();
	this.update = function() {
		var argsValues = [];
		for (var i = 0; i < args.length; i++) {
			argsValues.push(this.args[i].value);
		}
		var result = func.apply(this, argsValues);
		this.output.setValue(result);
	};
	this.update();
	var self = this; // keep a reference to this, because the context of the observe function will be the variable - not the module!
	for (var i = 0; i < args.length; i++) {
		args[i].addObserver(function(){self.update();});
	}
}
