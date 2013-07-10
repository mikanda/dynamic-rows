
/**
 * Module dependencies.
 */

var reactive = require('reactive')
  , Emitter = require('emitter');

/**
 * Module exports.
 *
 * @param {DOMElement} el the root element
 * @param {DOMElement} template the row template
 */

module.exports = function(el, template){
  return new View(el, template);
};

/**
 * Initialize new view.
 */

function View(el, template) {
  this.el = el;
  this.template = template;
  this.indices = [];
}

/**
 * Append a new row after `index` or at last if `null`.
 *
 * @param {Number} [index]
 */

View.prototype.append = function(index){
  var object
    , rowEl;

  // build the context to feed reactive

  object = new Index(this.indices.length);
  this.indices.push(object);
  rowEl = this.template.cloneNode(true);
  reactive(rowEl, object);
  this.el.appendChild(rowEl);
  return this;
};

/**
 * Simplified model which fires change events.
 *
 * @param {Number} value
 */

function Index(value) {
  this.index = value;
}

// inherit from event emitter

Emitter(Index.prototype);

/**
 * Set the index.
 */

Index.prototype.set = function(value){
  this.index = value;
  this.emit('change index', this.index);
};

/**
 * Increment the index.
 */

Index.prototype.inc = function(value){
  this.index += value || 1;
  this.emit('change index', this.index);
};

/**
 * Decrement the index.
 */

Index.prototype.inc = function(value){
  this.index -= value || 1;
  this.emit('change index', this.index);
};
