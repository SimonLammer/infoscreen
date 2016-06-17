function View() {
	this.id = View._lastid === undefined
		? (View._lastid = 0)
		: ++View._lastid;
	this.name = "View" + this.id;
	this.verticalAlign = new Align('top', '0px');
	this.horizontalAlign = new Align('left', '0px');
	this.height = '100px';
	this.width = '100px';
	this.zindex = 0;
}
