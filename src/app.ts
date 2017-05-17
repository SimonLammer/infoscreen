const style = require('./style.scss');
var bootstrap = require('bootstrap-sass/assets/javascripts/bootstrap');

//require('./scripts/jquery-dependency.ts');

import Vue from 'vue';
import App from './vue/App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});