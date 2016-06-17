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
