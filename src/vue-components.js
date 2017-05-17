/* All custom vue components (sorted alphabetically)
 *
 * (function()) {
 *     Vue.component(...);
 * })();
 */

(function () {
	Vue.component('argumentEditor', {
		template: `
            <div>
                <label>{{argumentName}}</label>
				<input v-model="argumentValue" />
				<button v-on:click="removeArgument">X</button>
            </div>`,
		props: ['argumentName', 'initialValue'],
		data: function () {
			return {
				argumentValue: ''
			};
		},
		created: function(){
			this.argumentValue = this.initialValue;
		},
		watch: {
			argumentValue: function (val) {
				this.setArgument(val);
			}
		},
		methods: {
			removeArgument: function () {
				delete currentContainer.view.arguments[this.getArgumentKey()];
				this.$emit('remove');
			},
			setArgument: function (value) {
				currentContainer.view.arguments[this.getArgumentKey()] = value;
			},
			getArgumentKey: function () {
				var _this = this;
				var moduleType = getModuleTypeByName(currentContainer.view.type);
				return Object.keys(moduleType.inputs).find(function (key) {
					return moduleType.inputs[key] == _this.argumentName;
				});
			}
		}
	})
})();

(function () {
	Vue.component('containerNavigation', {
		template: `
            <div class="containerNavigation">
                <div class="buttonBar" >
	                <button v-on:click="addContainer">Add Container</button>
                </div>
				NAVIGATION
            </div>`,
		methods: {
			addContainer: function (event) {
				infoscreen.container.push(createDefaultContainer());
			}
		}
	})
})();

(function () {
	Vue.component('containerPropertyEditor', {
		template: `
            <div class="containerPropertyEditor">
                CONTAINER PROPERTIES
            </div>`
	})
})();

(function () {
	Vue.component('editor', {
		template: `
            <div class="editor maximize">
            	<div class="leftColumn">
					<my-viewer class="preview"/>
					<propertyEditor />
				</div>
                <div class="rightColumn">
                    <containerNavigation />
                    <containerPropertyEditor />
                </div>
            </div>`
	})
})();

(function () {
	Vue.component('my-menu', {
		template: `
		<div id="menu-content" v-on:click="$event.stopPropagation()">
			<h1>Pages:</h1>
			<ul>
				<li v-for="page in pages">
					<a 
						v-bind:href="'?page=' + page.name"
						v-on:click="gotoPage($event, page.name)">
							{{ page.name }}
					</a>
				</li>
			</ul>
		</div>`,
		methods: {
			gotoPage: function (e, pageName) {
				e.preventDefault();
				gotoPage(pageName);
				$('#menu-wrapper').removeClass('show');
			}
		},
		data: function () {
			return {
				pages: pages
			};
		}
	});
})();

(function () {
	var data = {
		infoscreen: infoscreen
	};
	var updateDomElements = function () {
		var viewerDomElement = $(this.$el);
		data.domElements = {};
		for (view in infoscreenRuntime.views) {
			var containerDom = viewerDomElement.find('.container[container-name="' + view + '"]')[0];
			if (infoscreenRuntime.views[view].args.ui.indexOf(containerDom) < 0) {
				infoscreenRuntime.views[view].args.ui.push(containerDom);
			}
		}
		console.log('updateDomElements()', data.domElements);
	};
	Vue.component('my-viewer', {
		template: `
		<div class="my-viewer" v-bind:infoscreen-name="infoscreen.name">
			<div v-for="container in infoscreen.container" class="container" v-bind:container-name="container.name" v-bind:view-type="container.view.type"
			v-bind:style="{
				top: container.position.y + '%',
				left: container.position.x + '%',
				width: container.size.width + '%',
				height: container.size.height + '%',
				'z-index': container.zindex
			}">
			
			</div>
		</div>`,
		data: function () {
			return data;
		},
		mounted: function () {
			updateDomElements.call(this);
		},
		watch: {
			'infoscreen.container': {
				handler: function () {
					updateDomElements.call(this);
				},
				deep: true
			}
		}
	});
})();

(function () {
	var navbarItemsWrapper = {
		navbarItems: []
	};
	Vue.component('navbar', {
		template: `
		<div>
			<ul id="navbar">
				<li>
					<span class="glyphicon glyphicon-menu-hamburger" v-on:click="toggleMenu"></span>
				</li>
				<li v-for="item in navbarItems">
					<span v-bind:class="item.class" v-on:click="item.click"></span>
				</li>
			</ul>
			<div id="menu-wrapper" class="maximize">
				<div id="menu" v-on:click="toggleMenu" class="maximize">
					<my-menu />
				</div>
			</div>
		</div>
		`,
		methods: {
			toggleMenu: function () {
				$('#menu-wrapper').toggleClass('show');
			}
		},
		data: function () {
			return navbarItemsWrapper;
		},
		mounted: function () {
			this.$bus.$on('pageChanged', function () {
				var currentPageNavbarItems = getCurrentPage().navbarItems;
				if (!currentPageNavbarItems) {
					currentPageNavbarItems = [];
				}
				navbarItemsWrapper.navbarItems = currentPageNavbarItems;
			});
		}
	});
})();

(function () {
	Vue.component('propertyEditor', {
		template: `
            <div class="propertyEditor">
                <div id="argumentEditor" class="leftColumn">
					<argumentEditor v-for="(argumentName,i) in argumentNames" :argumentName="argumentName" :initialValue="initialArgumentValues[i]" :key="argumentName" v-on:remove="removeArgument(argumentName)"></argumentEditor>
					<button id="btnAddArgument"  v-on:click="addArgument" v-if="argsAvailable()">Add Argument</button>
				</div>
				<div id="variableArgumentEditor" class="rightColumn">
					<variableEditor v-for="(argumentName, i) in variableArgumentNames" :argumentName="argumentName" :initialValue="initialVariableArgumentValues[i]" :key="argumentName" v-on:remove="removeVariable(argumentName)"></variableEditor>
					<button id="btnAddVariable" v-on:click="addVariable" v-if="argsAvailable()">Add Variable as Argument</button>
				</div>
            </div>
			`,
		data: function () {
			return {
				argumentNames: [],
				initialArgumentValues: [],
				variableArgumentNames: [],
				initialVariableArgumentValues: [],
				argumentAddButton: $("#btnAddArgument"), 
				variableAddButton: $("#btnAddVariable")
			}
		},
		created: function(){
			var inputs = getModuleTypeByName(currentContainer.view.type).inputs;
			for(arg in currentContainer.view.arguments){
				this.argumentNames.push(inputs[arg]);
				this.initialArgumentValues.push(currentContainer.view.arguments[arg])
			}
			for(arg in currentContainer.view.variables){
				this.variableArgumentNames.push(inputs[arg]);
				this.initialVariableArgumentValues.push(currentContainer.view.variables[arg]);
			}
		},
		methods: {
			addArgument: function (event) {
				this.argumentAddButton = $("#btnAddArgument");
				this.argumentAddButton.remove();
				this.showSelectPopup($("#argumentEditor"), this.argumentAddButton, this.argumentNames);
			},
			addVariable: function (event) { 
				this.variableAddButton = $("#btnAddVariable");
				this.variableAddButton.remove();
				this.showSelectPopup($("#variableArgumentEditor"), this.variableAddButton, this.variableArgumentNames);
			},
			removeArgument: function (argumentName) {
				this.argumentNames.splice(this.argumentNames.indexOf(argumentName), 1);
				//this.argumentAddButton.appendTo($("#argumentEditor"));
			},
			removeVariable: function (argumentName) {
				this.variableArgumentNames.splice(this.variableArgumentNames.indexOf(argumentName), 1);
				//this.variableAddButton.appendTo($("#variableArgumentEditor"));
			},

			getAvailableArguments: function () {
				var args = [];
				var inputs = getModuleTypeByName(currentContainer.view.type).inputs;
				var keys = Object.keys(inputs);
				for (var i in keys) {
					if (Object.keys(currentContainer.view.arguments).indexOf(keys[i]) == -1 && Object.keys(currentContainer.view.variables).indexOf(keys[i]) == -1 ) {
						args.push(inputs[keys[i]]);
					}
				}
				return args;
			},
			showSelectPopup: function(container, button, selectionArray) {
				container.selectPopup({
					data: this.getAvailableArguments(),
					select: function (event, selectedVar) {
						selectionArray.push(selectedVar);
					},
					close: function () {
						container.selectPopup("destroy");
						button.appendTo(container);						
					}
				})
			},
			argsAvailable: function(){
				console.log("update " + this.argumentNames.length + " + " + this.variableArgumentNames.length + " < " + Object.keys(getModuleTypeByName(currentContainer.view.type).inputs).length);
				return this.argumentNames.length + this.variableArgumentNames.length < Object.keys(getModuleTypeByName(currentContainer.view.type).inputs).length;
			}
		}
	})
})();

(function () {
	Vue.component('variableEditor', {
		template: `
            <div>
                <label>{{argumentName}}</label>
				<select v-model="selectedVar">
					<option v-for="variable in variables" :value="variable.id">{{variable.name}}</option>
				</select>
				<button v-on:click="removeVariable">X</button>
            </div>`,
		props: ['argumentName', 'initialValue'],
		data: function () {
			return {
				variableName: '',
				selectedVar: ''
			};
		},
		created: function(){
			this.selectedVar = this.initialValue;
		},
		computed: {
			variables: function () {
				return infoscreen.variables;
			}
		},
		watch: {
			selectedVar: function (val) {
				this.setVariable(val);
			}
		},
		methods: {
			removeVariable: function () {
				delete currentContainer.view.variables[this.getArgumentKey()];
				this.$emit('remove');
			},
			setVariable: function (value) {
				currentContainer.view.variables[this.getArgumentKey()] = value;
			},
			getArgumentKey: function () {
				var _this = this;
				var moduleType = getModuleTypeByName(currentContainer.view.type);
				return Object.keys(moduleType.inputs).find(function (key) {
					return moduleType.inputs[key] == _this.argumentName;
				});
			}
		}
	})
})();