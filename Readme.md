
# dynamic-rows

  **Under heavy development**

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

### DynamicRows#append([index] : Number)

  Append a new sub-widget.  If `index` is given append after the
  element at `index`.  Returns the newly created `DOMElement`.

### DynamicRows#appendAfter(index : Number)

  Alias for `.append(index)`.  `index` is not optional.  Returns the
  newly created `DOMElement`.

### DynamicRows#remove(index : Number)

  Remove the element at `index`.

## License

  MIT
