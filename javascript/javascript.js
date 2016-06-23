window.previewSettings = {
	'width': '800px',
	'height': '300px',
	'show_modules': false
};
window.moduleBlueprints = [];

$(document).ready(function() {
	sightglass.adapters = rivets.adapters;
	sightglass.root = '.';
	initPreview();
	initPreviewcontrol();
	initViewcontrol();
	initVariablecontrol();
	initModuleEditor();
	
	// generate Hello World
	var view = new View()
	view.id = getNextId();
	views.push(view);
	var variable = new Variable('Hello World!');
	variable.id = getNextId();
	variable.description = 'Text';
	variables.push(variable);
	var moduleBlueprint = new ModuleBlueprint('ShowText', 'html');
	moduleBlueprint.id = getNextId();
	moduleBlueprints.push(moduleBlueprint);

	variable = new Variable(4);
	variable.id = getNextId();
	variable.description = 'input';
	variables.push(variable);
});

function initPreview() {
	window.previewview = rivets.bind($('#previewviews'), {'viewslist': views});
}

function initPreviewcontrol() {
	window.previewcontrolbind = rivets.bind($('#previewcontrol'), previewSettings);
	sightglass(previewSettings, 'height', function() {
		$('#preview').css('height', previewSettings.height);
	});
	sightglass(previewSettings, 'width', function() {
		$('#preview').css('width', previewSettings.width);
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
		var view = new View();
		view.id = getNextId();
		views.push(view);
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
function initVariablecontrol() {
	rivets.bind($('#variables-editor'), {
		'variableslist': variables
	});
	$('#button-add_variable').click(function() {
		var variable = new Variable('');
		variable.id = getNextId();
		variables.push(variable);
	});
	sightglass({data: variables}, 'data', function() {
		$('#variableslist button.new').each(function(e) {
			var variableValueInput = $(this).parent().parent().find('.variablevalue');
			$(this).parent().parent().find('.setvariable').click(function() {
				var variableid = $(this).parent().parent().find('.variableid').val();
				variables[getVariableIndexById(variableid)].setValue(
					variableValueInput.val()
				);
			});
			var setVariable = function(newValue) {
				variableValueInput.val(newValue);
			};
			var index = getVariableIndexById($(this).parent().find('.variableid').val());
			variables[index].addObserver(setVariable);
			$(this).click(function() {
				var variableid = $(this).parent().find('.variableid').val();
				var index = getVariableIndexById(variableid);
				var variableIsUsed = false;
				for (var i = 0; !variableIsUsed && i < moduleBlueprints.length; i++) {
					for (var j = 0; !variableIsUsed && j < moduleBlueprints[i].argsVariables.length; j++) {
						variableIsUsed = moduleBlueprints[i].argsVariables[j].variableid == variableid;
					}
					if (!variableIsUsed) {
						variableIsUsed = moduleBlueprints[i].outputVariableId == variableid;
					}
					if (variableIsUsed) {
						alert('The variable is still used by module "' + moduleBlueprints[i].description + '"');
					}
				}
				if (!variableIsUsed) {
					variables[index].removeObserver(setVariable);
					variables.splice(index, 1);
				}
			})
			.removeClass('new');
			setVariable(variables[index].value);
		});
	});
}

function initModuleEditor() {
	rivets.bind($('#modulecontrol'), {
		'moduleblueprintslist': moduleBlueprints,
		'moduletypeslist': moduleTypes,
		'variableslist': variables,
		'viewslist': views,
		'updatemoduletype': function() {
			var moduleBlueprintId = $(this).parent().parent().find('.moduleblueprintid').val();
			var index = getModuleBlueprintIndexById(moduleBlueprintId);
			moduleBlueprints[index].updateModuleType();
		},
		'updateoutputvariable': function() {
			var moduleBlueprintId = $(this).parent().parent().find('.moduleblueprintid').val();
			var index = getModuleBlueprintIndexById(moduleBlueprintId);
			moduleBlueprints[index].updateOutputVariable();
		},
		'updateuiview': function() {
			var moduleBlueprintId = $(this).parent().parent().find('.moduleblueprintid').val();
			var index = getModuleBlueprintIndexById(moduleBlueprintId);
			moduleBlueprints[index].updateUiView();
		}
	});
	sightglass({data: moduleBlueprints}, 'data', function() {
		$('#moduleblueprintslist button.new').each(function(e) {
			$(this).click(function() {
				var moduleBlueprintId = $(this).parent().parent().find('.moduleblueprintid').val();
				var index = getModuleBlueprintIndexById(moduleBlueprintId);
				if (moduleBlueprints[index].module) {
					moduleBlueprints[index].module.disabledCallback();
				}
				moduleBlueprints.splice(index, 1);
			})
			.removeClass('new');
			$(this).parent().parent().find('button.updatemodule').click(function() {
				var moduleBlueprintId = $(this).parent().parent().find('.moduleblueprintid').val();
				var moduleBlueprint = moduleBlueprints[getModuleBlueprintIndexById(moduleBlueprintId)];
				if (moduleBlueprint.module) {
					moduleBlueprint.module.disable();
				}
				moduleBlueprint.module = moduleBlueprint.getModule();
			});
		});
	});
	$('#button-add_module').click(function() {
		var moduleBlueprint = new ModuleBlueprint('', '');
		moduleBlueprint.id = getNextId();
		moduleBlueprints.push(moduleBlueprint);
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
			'background-color': views[i].color === undefined ? (views[i].color = getRandomColor()) : views[i].color,
			'z-index': views[i].zindex
		}).draggable({
			containment: 'parent',
			cursor: 'crosshair',
			stop: function(e, ui) {
				var viewid = $(ui.helper).attr('viewid');
				var viewIndex = getViewIndexById(viewid);
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

function getModuleBlueprintIndexById(moduleBlueprintId) {
	return getItemIndexById(moduleBlueprintId, moduleBlueprints);
}
function getItemIndexById(itemid, list) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].id == itemid) {
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

window.lastid = 0;
function getNextId() {
	return ++window.lastid;
}
