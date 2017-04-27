function Container(name, position, size, zindex) {
	this.id = getNextId();
	this.name = name;
	this.position = position;
	this.size = size;
	this.zindex = zindex;
}
