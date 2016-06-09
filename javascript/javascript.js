window.previewSize = {
	'width': '800px',
	'height': '300px'
}

$(document).ready(function() {
	sightglass.adapters = rivets.adapters;
	sightglass.root = '.';
	initPreviewcontrol();
});

function initPreviewcontrol() {
	window.previewcontrolbind = rivets.bind($('#previewcontrol'), window.previewSize);
	sightglass(previewSize, 'height', function() {
		$('#preview').css('height', previewSize.height);
	});
	sightglass(previewSize, 'width', function() {
		$('#preview').css('width', previewSize.width);
	});
}
