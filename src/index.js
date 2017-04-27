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
    <div>
        <ul>
            <li>
                <span class="glyphicon glyphicon-menu-hamburger"></span>
            </li>
            <li v-for="item in menuItems">
                <span v-bind:class="item.class"></span>
            </li>
        </ul>
    </div>
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
    }
});
Vue.component('main_content', {});

var app = new Vue({
  el: '#app',
  data: {
      currentView: 'editor'
  },
  components:{
      home: home,
      editor: editor
  }
});