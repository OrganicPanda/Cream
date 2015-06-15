import { el, $, Component } from '../react-utils';

export class Grid extends Component {
  render() {
    var nodes = this.props.children.map(child => {
      return el('div', { className: 'grid-cell grid-lg-33' }, child);
    });

    return el('div', { className: 'grid' }, nodes);
  }
};