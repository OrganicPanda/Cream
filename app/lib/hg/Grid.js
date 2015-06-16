import { el, $, Component } from '../react-utils';

export class Grid extends Component {
  render() {
    var nodes = this.props.children.map((child, index) => {
      return el('div', {
        className: 'grid-cell grid-lg-33',
        key: index
      }, child);
    });

    return el('div', { className: 'grid' }, nodes);
  }
};