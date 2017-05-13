const style = require('./style.scss');
var $ = require('jquery');

var mls = `
this is a
multiline
text`;
console.log('Better Hello World!', mls);

$(document).ready(function() {
	alert('hi');
});

require('./scripts/jquery-dependency.ts');