
/**
 * Module dependencies.
 */

var query = require('query')
  , domify = require('domify')
  , value = require('value')
  , dynamicRows = require('dynamic-rows');

var template = domify([
  '<tr>',
  '  <td>',
  '    <span>At {index}</span>',
  '    <input type="text">',
  '  </td>',
  '</tr>'
].join('\n'));
var rows = dynamicRows(query('#rows'), template);
rows.append();
query('#add').onclick = function(){
  var index = query('#indexValue').value;
  rows.appendAfter(parseInt(index));
};
query('#remove').onclick = function(){
};
