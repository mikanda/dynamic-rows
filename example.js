
/**
 * Module dependencies.
 */

var query = require('query')
  , dom = require('dom')
  , domify = require('domify')
  , dynamicRows = require('dynamic-rows');

var template = domify([
  '<tr data-index="{index}">',
  '  <td>',
  '    <span>At {index}</span>',
  '    <input type="text">',
  '    <input class="add" type="button" value="+">',
  '    <input class="remove" type="button" value="-">',
  '  </td>',
  '</tr>'
].join('\n'));
var rows = dynamicRows(query('#rows'), template);

/**
 * Register click events for buttons
 */

// add new entry

query('#add').onclick = function(){
  var index = parseInt(query('#indexValue').value)
    , el;
  el = rows.append(index);
  initWidget(el);
};

// remove entry

query('#remove').onclick = function(){
  var index = parseInt(query('#indexValue').value);
  if (Number.isNaN(index)) return;
  rows.remove(index);
};

/**
 * Bind the 'remove' and 'add' events of a widget.
 */

function initWidget(el) {

  // add button

  query('.add', el).onclick = function(){

    // the index needs to be recalculated since it could have been changed

    var index = parseInt(dom(el).attr('data-index'));

    // append after the current element

    initWidget(rows.append(index));
  };

  // remove button

  query('.remove', el).onclick = function(){

    // the index needs to be recalculated since it could have been changed

    var index = parseInt(dom(el).attr('data-index'));

    // remove the current element

    rows.remove(index);
  };
}
