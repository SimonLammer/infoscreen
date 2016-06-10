window.previewSize = {
	'width': '800px',
	'height': '300px'
}
window.views = [];

$(document).ready(function() {
	sightglass.adapters = rivets.adapters;
	sightglass.root = '.';
	initPreview();
	initPreviewcontrol();
	initViewcontrol();

	// debug
	views.push(new View());
});

function initPreview() {
	window.previewview = rivets.bind($('#previewviews'), {'viewslist': views});
}

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
	rivets.bind($('#viewcontrol'), {
		'viewslist': views,
		'verticalalignorientations': alignOrientations.vertical,
		'horizontalalignorientations': alignOrientations.horizontal,
		'updatePreview': refreshPreview
	});
	$('#button-add_view').click(function() {
		views.push(new View());
	});
	sightglass({data: views}, 'data', function() {
		$('#viewslist button.new').each(function(e) {
			$(this).click(function() {
				var viewid = $(this).parent().find('.viewid').val();
				for (var i = 0; i < views.length; i++) {
					if (views[i].id == viewid) {
						views.splice(i, 1);
						break;
					}
				}
			})
			.removeClass('new');
		});
		refreshPreview();
	});
}

function refreshPreview() {
		for (var i = 0; i < views.length; i++) {
			$('#previewviews div[viewid="' + views[i].id + '"]').css({
				top: views[i].verticalAlign.orientation == 'top' ? views[i].verticalAlign.distance : 'auto',
				right: views[i].horizontalAlign.orientation == 'right' ? views[i].horizontalAlign.distance : 'auto',
				bottom: views[i].verticalAlign.orientation == 'top' ? 'auto' : views[i].verticalAlign.distance,
				left: views[i].horizontalAlign.orientation == 'right' ? 'auto' : views[i].horizontalAlign.distance,
				width: views[i].width,
				height: views[i].height,
				'background-color': views[i].color === undefined ? (views[i].color = getRandomColor()) : views[i].color
			});
			
		}
}

function getRandomColor() {
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);	
}
