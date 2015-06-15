import { el, $, Component } from '../react-utils';

export class Panel extends Component {
  render() {
    return el('div', { className: 'panel' }, [
      el('div', { className: 'panel-header' }, this.props.header),
      el('div', { className: 'panel-body' }, this.props.children)
    ]);
  }
};