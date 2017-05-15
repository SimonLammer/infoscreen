/* All custom vue components (sorted alphabetically)
 *
 * (function()) {
 *     Vue.component(...);
 * })();
 */

(function(){
	Vue.component('containerNavigation', {
		template: `
            <div class="containerNavigation">
                <div class="buttonBar" >
	                <button v-on:click="addContainer">Add Container</button>
                </div>
				NAVIGATION
            </div>`,
		methods:{
			addContainer: function(event){
				infoscreen.container.push(createDefaultContainer());
			}
		}
	})
})();

(function(){
	Vue.component('containerPropertyEditor', {
		template: `
            <div class="containerPropertyEditor">
                CONTAINER PROPERTIES
            </div>`
	})
})();

(function(){
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

(function() {
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
			gotoPage: function(e, pageName) {
				e.preventDefault();
				gotoPage(pageName);
				$('#menu-wrapper').removeClass('show');
			}
		},
		data: function() {
			return {
				pages: pages
			};
		}
	});
})();

(function() {
	var data = {
		infoscreen: infoscreen
	};
	var updateDomElements = function() {
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
		data: function() {
			return data;
		},
		mounted: function() {
			updateDomElements.call(this);
		},
		watch: {
			'infoscreen.container': {
				handler: function() {
					updateDomElements.call(this);
				},
				deep: true
			}
		}
	});
})();

(function() {
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
			toggleMenu: function() {
				$('#menu-wrapper').toggleClass('show');
			}
		},
		data: function() {
			return navbarItemsWrapper;
		},
		mounted: function() {
			this.$bus.$on('pageChanged', function() {
				var currentPageNavbarItems = getCurrentPage().navbarItems;
				if (!currentPageNavbarItems) {
					currentPageNavbarItems = [];
				}
				navbarItemsWrapper.navbarItems = currentPageNavbarItems;
			});
		}
	});
})();

(function(){
	Vue.component('propertyEditor', {
		template: `
            <div class="propertyEditor">
                <div class="leftColumn">
					Arguments
				</div>
				<div class="rightColumn">
					Variables
				</div>
            </div>`
	})
})();