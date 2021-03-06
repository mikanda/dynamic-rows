
# dynamic-rows

  Widget to add and remove sub-widgets dynamically.

## Installation

  Install with [component(1)](http://component.io):

    $ component install domachine/dynamic-rows

## API

### DynamicRows(el : DOMElement, template : DOMElement)

  Initialize the widget.

   * `el` is the container element to use
   * `template` is the
     [component/reactive](http://github.com/component/reactive) template
     used to generate the rows

### DynamicRows#insert([index] : Number, [model] : Object)

  Insert a new sub-widget.  If `index` is given replace the element at
  `index` otherwise insert at index 0.  Returns the newly created
  `DOMElement`.  `model` is an optional model to bind with reactive.

### DynamicRows#append([index] : Number, [model] : Object)

  Append a new sub-widget.  If `index` is given append after the
  element at `index`.  Returns the newly created `DOMElement`.
  `model` is the same as in `.insert()`.

### DynamicRows#remove(index : Number)

  Remove the element at `index`.  Returns the model stored at `index`.

## License

  MIT
