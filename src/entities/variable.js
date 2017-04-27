function Variable(name, defaultValue) {
	this.observers = [];
	this.name = name;
	this.value = defaultValue;
	this.id = getNextId();
}
Variable.prototype.addObserver = function(callback) {
	this.observers.push(callback);
};
Variable.prototype.removeObserver = function(callback) {
	this.observers.splice(callback);
};
Variable.prototype.setValue = function(value) {
	var oldValue = this.value;
	this.value = value;
	for (var i = 0; i < this.observers.length; i++) {
		this.observers[i].call(this, value, oldValue);
	}
};
function getVariableIndexById(variableid) {
	for (var i = 0; i < variables.length; i++) {
		if (variables[i].id == variableid) {
			return i;
		}
	}
}
function getVariableById(variableid) {
	return variables[getVariableIndexById(variableid)];
}
