import { el, $, Component } from '../react-utils';

export class Card extends Component {
  render() {
    return el('div', { className: 'card card-primary' }, [
      el('div', { className: 'card-details' },
        el('h2', {}, this.props.amount),
        el('h4', { className: 'strong' }, this.props.description)
      )
    ]);
  }
};