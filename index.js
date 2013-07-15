
/**
 * Module dependencies.
 */

var reactive = require('reactive')
  , dom = require('dom')
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
  if (Number.isFinite(index)) return this.insert(index + 1);
  else return this.insert(this.indices.length);
};

/**
 * Insert a new node at `index`.
 *
 * @param {Number} index
 */

View.prototype.insert = function(index){
  var object
    , refEl  // the referencing node after which we want to insert
    , rowEl; // the newly created element

  // correct NaN index

  if (!Number.isFinite(index)) index = 0;
  refEl = (this.indices[index] || {}).el;  // the element to insert before
  rowEl = this.template.cloneNode(true);   // the new element to insert
  object = new Index(rowEl, index);

  // insert the new object in the indices

  this.indices.splice(index, 0, object);

  // update the indexes after the element

  for (var i = (index + 1); i < this.indices.length; ++i) {
    this.indices[i].inc();
  }
  if (refEl) this.el.insertBefore(rowEl, refEl);
  else {

    // append to end if we have an invalid index

    object.set(this.indices.length - 1);
    dom(this.el).append(rowEl);
  }
  return rowEl;
};

/**
 * Remove the element at `index`.
 *
 * @param {Number} index
 */

View.prototype.remove = function(index){
  var object = this.indices[index];

  // first remove the element from the dom

  dom(object.el).remove();

  // and then remove it from the indices

  this.indices.splice(index, 1);

  // and decrement all following indices

  for (var i = index; i < this.indices.length; ++i) {
    this.indices[i].dec();
  }
  return this;
};

/**
 * Simplified model which fires change events.
 *
 * @param {DOMElement} el the which is referenced by this index
 * @param {Number} value
 */

function Index(el, value) {
  this.index = value;
  this.el = el;
  reactive(el, this);
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

Index.prototype.dec = function(value){
  this.index -= value || 1;
  this.emit('change index', this.index);
};
