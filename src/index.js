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
    <h1>navbar!!</h1>test
    `
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