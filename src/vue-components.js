/* All custom vue components (sorted alphabetically)
 *
 * (function()) {
 *     Vue.component(...);
 * })();
 */

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
	Vue.component('my-viewer', {
		template: `
		<div class="my-viewer">

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