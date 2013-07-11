
/**
 * Module dependencies.
 */

var query = require('component-query')
  , dynamicRows = require('dynamic-rows');

var template = query('span');

// remove template from dom

template.remove();
dynamicRows(query('#rows'), template)
  .append()
  .append()
  .append()
  .appendAfter(0);
