
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
  var object
    , rowEl;

  // if we have an index behave like .appendAfter()

  if (Number.isFinite(index)) return this.appendAfter(index);

  // build the context to feed reactive

  rowEl = this.template.cloneNode(true);
  object = new Index(rowEl, this.indices.length);
  this.indices.push(object);
  this.el.appendChild(rowEl);
  return this;
};

/**
 * Append a new node after the node at `index`.
 *
 * @param {Number} index the index to append after
 */

View.prototype.appendAfter = function(index){
  var object
    , refEl  // the referencing node after which we want to insert
    , rowEl; // the newly created element

  // create context

  refEl = this.indices[index].el;
  rowEl = this.template.cloneNode(true);
  object = new Index(rowEl, index);

  // insert the new object in the indices

  this.indices.splice(index + 1, 0, object);

  // update the indexes after the element

  for (var i = (index + 1); i < this.indices.length; ++i) {
    this.indices[i].inc();
  }
  dom(rowEl).insertAfter(refEl);
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
