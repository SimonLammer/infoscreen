window.previewSize = {
	'width': '800px',
	'height': '300px'
}
window.views = [];
views.push(new View());
views.push(new View());
views.push(new View());

$(document).ready(function() {
	sightglass.adapters = rivets.adapters;
	sightglass.root = '.';
	initPreviewcontrol();
	initViewcontrol();
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

function initViewcontrol() {
	rivets.bind($('#viewcontrol'), {'viewslist': views});
	$('#button-add_view').click(function() {
		views.push(new View());
	});
	/* */
	sightglass({data: views}, 'data', function() {
		$('#viewslist button.new').each(function(e) {
			var viewid = $(this).parent().find('.viewid').val();
			$(this).click(function() {
				alert(viewid);
			})
			.removeClass('new');
		});
	});
	/* */
}
