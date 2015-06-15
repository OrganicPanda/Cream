import { el, $, Component } from '../react-utils';

export class Transaction extends Component {
  render() {
    return el('div', { className: 'transaction' },
      el('span', { className: 'transaction-date' }, this.props.date),
      el('span', { className: 'transaction-description' }, this.props.description),
      el('span', { className: 'transaction-amount' }, this.props.amount),
      el('span', { className: 'transaction-balance' }, this.props.balance)
    );
  }
}