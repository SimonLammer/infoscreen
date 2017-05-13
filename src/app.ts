const style = require('./style.scss');
var bootstrap = require('bootstrap-sass/assets/javascripts/bootstrap');

var mls = `
this is a
multiline
text`;
console.log('Better Hello World!', mls);

require('./scripts/jquery-dependency.ts');

export class MyClass {
  val : number;
  constructor(defaultVal : number) {
    this.val = defaultVal;
  }
  setNumber(num : number) : void {
    this.val = num;
  }
  getNumber() : number {
    return this.val;
  }
}

import Vue from 'vue';
import App from './vue/App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});