$(document).ready(function() {
	initPreviewControl();
});

function initPreviewControl() {
	$('#previewcontrol').submit(function(e) {
		e.preventDefault();
		var width = $('#previewwidth').val();
		var height = $('#previewheight').val();
		$('#preview').css({
			'width': width,
			'height': height
		});
	});
}
