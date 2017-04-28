function Container(name, position, size, zindex, view) {
	this.id = getNextId();
	this.name = name;
	this.position = position;
	this.size = size;
	this.zindex = zindex;
	this.view = view;
}

function createDefaultContainer(){
	var view = new Module(getModuleTypeByName('Color'), {color: 'green'}, {}, {});
	var c = new Container('', {x: 0, y: 0}, {width: 200, height: 100}, 0, view);
	c.name = 'Container ' + c.id;
	return c;
}