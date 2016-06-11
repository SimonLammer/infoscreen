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
				views.splice(getViewIndexById(viewid), 1);
			})
			.removeClass('new');
		});
		refreshPreview();
	});
	$('#viewslist').sortable();
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
			'background-color': views[i].color === undefined ? (views[i].color = getRandomColor()) : views[i].color,
			'z-index': views[i].zindex
		}).draggable({
			containment: 'parent',
			cursor: 'crosshair',
			stop: function(e, ui) {
				//alert($(this).attr('viewid'));
				var viewid = $(ui.helper).attr('viewid');
				var viewIndex = getViewIndexById(viewid);
				console.log('id:', viewid, ' - index:', viewIndex, ' - p.top:', ui.position.top);
				window.asdf = ui;
				//if (true)return;
				
				var previewWidth = $('#preview').width();
				var previewHeight = $('#preview').height();
				var viewWidth = $(ui.helper).width();
				var viewHeight = $(ui.helper).height();
				var distanceEqualsZeroPattern = /^(0+(\.0*)?|0*\.0+)[^\d]*/;
				if (views[viewIndex].verticalAlign.orientation === 'top') {
					if (views[viewIndex].verticalAlign.distance.match(distanceEqualsZeroPattern)) {
						views[viewIndex].verticalAlign.distance = ui.position.top + 'px';
					} else {
						views[viewIndex].verticalAlign.distance = multiplyDistance(views[viewIndex].verticalAlign.distance, ui.position.top / ui.originalPosition.top);
					}
				} else { // verticalAlign.orientation == 'bottom'
					if (views[viewIndex].verticalAlign.distance.match(distanceEqualsZeroPattern)) {
						views[viewIndex].verticalAlign.distance = (previewHeight - ui.position.top - viewHeight) + 'px';
					} else {
						views[viewIndex].verticalAlign.distance = multiplyDistance(views[viewIndex].verticalAlign.distance, (previewHeight - ui.position.top - viewHeight) / (previewHeight - ui.originalPosition.top - viewHeight));
					}
				}
				if (views[viewIndex].horizontalAlign.orientation === 'left') {
					if (views[viewIndex].horizontalAlign.distance.match(distanceEqualsZeroPattern)) {
						views[viewIndex].horizontalAlign.distance = ui.position.left + 'px';
					} else {
						views[viewIndex].horizontalAlign.distance = multiplyDistance(views[viewIndex].horizontalAlign.distance, ui.position.left / ui.originalPosition.left);
					}
				} else { // horizontalAlign.orientation == 'right'
					if (views[viewIndex].horizontalAlign.distance.match(distanceEqualsZeroPattern)) {
						views[viewIndex].horizontalAlign.distance = (previewHeight - ui.position.left - viewHeight) + 'px';
					} else {
						views[viewIndex].horizontalAlign.distance = multiplyDistance(views[viewIndex].horizontalAlign.distance, (previewHeight - ui.position.left - viewHeight) / (previewHeight - ui.originalPosition.left - viewHeight));
					}
				}
			}
		});
	}
}

function getViewIndexById(viewid) {
	for (var i = 0; i < views.length; i++) {
		if (views[i].id == viewid) {
			return i;
		}
	}
}

function getRandomColor() {
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);	
}

function multiplyDistance(distance, factor) {
	var matches = distance.match(/^(\d*(\.\d*)?)(.*)$/);
	var number = parseFloat(matches[1]);
	number *= factor;
	return number + matches[3];
}
