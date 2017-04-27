var home = {
    template: '<h1>home</h1>'    
};

var editor = {
    template: `
    <div>
        <h2>hi</h2>
        <h1>ediddr</h1>
    </div>`
};

Vue.component('navbar', {
    template: `
    <h1>navbar!!</h1>
    `,
    mounted() {
        this.$bus.$on('contentChanged', event => {
            alert(event.newContent);
        });
    }
});
Vue.component('main_content', {});

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
      currentView: 'editor'
  },
  components:{
      home: home,
      editor: editor
  },
  watch:{
      currentView: function(newValue){
          this.$bus.$emit('contentChanged', {
            newContent: newValue
          });
      }
  }
});