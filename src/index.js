var pages = [
    {
        name: 'Home',
        vueConfig: {
            template: `
            <div id="home">
                <h1>Home</h1>
                <ul>
                    <li v-for="page in pages">
                        {{ page.name }}
                    </li>
                </ul>
            </div>`,
            data: function() {
                return {
                    pages: pages
                };
            }  
        },
        navbarItems: [
            {
                class: "glyphicon glyphicon-alert",
                text: "View on GitHub",
                click: function() {
                    alert('1');
                }
            }
        ]
    },
    {
        name: 'Editor',
        vueConfig: {
            template: `
            <div id="editor">
                <div style="background-color: #567;">
                <div id="preview" />
                <div id="viewProperties" />
                <div id="right">
                    <div id="controls" />
                    <div id="navigation" />
                    <div id="containerProperties" />
                </div>
                asdf
                </div>
            </div>`
        },
        navbarItems: []
    }
];

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
        <div id="menu-wrapper">
            <div id="menu" v-on:click="toggleMenu">
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

// define global event bus
Object.defineProperty(Vue.prototype, '$bus', {
    get() {
        return this.$root.bus;
    }
});
// create event bus
var bus = new Vue({})

var app = new Vue({
    el: '#app',
    data: {
        bus: bus, // set event bus
        currentView: ''
    },
    components: (function() {
        var components = {};
        pages.forEach(function(page) {
            components[page.name] = page.vueConfig;
        });
        return components;
    })(),
    watch: {
        currentView: function(newValue){
            this.$bus.$emit('pageChanged', {
                newPage: newValue
            });
        }
    },
    mounted: function() {
        this.currentView = (function() {
            var match = window.location.search.match(/page=([^&]+)/);
            if (match) {
                return match[1];
            } else {
                return pages[0].name;
            }
        })();
    }
});

function gotoPage(pageName) {
    app.currentView = pageName;
    var match = window.location.toString().match(/(^[^?]*\?((?!page)[^=]+=[^&]+&?)*page=)([^&]*)(.*)/);
    var newUrl = match[1] + pageName + match[4];
    window.history.pushState(null, '', newUrl);
}

function getCurrentPage() {
    if (app) {
        var p = pages.filter(function(page) {
            return page.name == app.currentView;
        });
        if (p.length != 1) {
            console.log(app.currentView, pages.map(function(page) {
                return page.name;
            }));
            throw 'Invalid current page!';
        }
        return p[0];
    } else {
        console.log('No current page', app);
        return {};
    }
}