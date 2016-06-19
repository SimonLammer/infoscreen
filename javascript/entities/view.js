window.views = [];
function View() {
	this.name = "View";
	this.verticalAlign = new Align('top', '0px');
	this.horizontalAlign = new Align('left', '0px');
	this.height = '100px';
	this.width = '100px';
	this.zindex = 0;
}

function getViewIndexById(viewid) {
	for (var i = 0; i < views.length; i++) {
		if (views[i].id == viewid) {
			return i;
		}
	}
}
function getViewById(viewid) {
	return views[getViewIndexById(viewid)];
}
