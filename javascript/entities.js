/*
orientation may be any of:
+ top
+ right
+ bottom
+ left

distance may be any css distance (e.g. 70px)

new Align('top', '70px); // 70px from the top border
*/
window.alignOrientations = {
	vertical: ['top', 'bottom'],
	horizontal: ['right', 'left']
};
function Align(orientation, distance) {
	this.orientation = orientation;
	this.distance = distance;
}

// View
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
