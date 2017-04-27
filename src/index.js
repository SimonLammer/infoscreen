var home = {
    template: '<h1>home</h1>'    
};

var editor = {
    template: `
    <div>
        <div id="preview" />
        <div id="viewProperties" />
        <div id="right">
            <div id="controls" />
            <div id="navigation" />
            <div id="containerProperties" />
        </div>
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

// define global event bus
Object.defineProperty(Vue.prototype, '$bus', {
    get() {
        return this.$root.bus;
    }
});
// create event bus
var bus = new Vue({});

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