var home = {
    template: '<h1>home</h1>'    
};

var editor = {
    template: `
    <div>
        <div  style="background-color: #567;">
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
};

Vue.component('navbar', {
    template: `
    <ul>
        <li>
            <span class="glyphicon glyphicon-menu-hamburger"></span>
        </li>
        <li v-for="item in menuItems">
            <span v-bind:class="item.class"></span>
        </li>
    </ul>
    `,
    data: function() {
        return {
            menuItems: [
                {
                    class: "glyphicon glyphicon-sunglasses",
                    text: "Menu item 1 text"
                },{
                    class: "glyphicon glyphicon-scissors",
                    text: "Menu item 2 text"
                },
            ]
        };
    },
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
var bus = new Vue({})

var app = new Vue({
  el: '#app',
  data: {
      bus: bus, // set event bus
      currentView: 'home'
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