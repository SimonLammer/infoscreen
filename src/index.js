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
        var match = window.location.search.match(/page=([^&]+)/);
        this.currentView = match ? match[1] : pages[0].name;
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