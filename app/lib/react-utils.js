import React from 'react';

let el = React.createElement;
let $ = React.findDOMNode;

class Component extends React.Component {
  static create(...args) {
    return el(this, ...args)
  }
}

export { el, $, Component };