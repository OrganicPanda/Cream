import { el, $, Component } from '../react-utils';

export class Transaction extends Component {
  render() {
    return el('div', { className: 'transaction' },
      el('span', { className: 'transaction-date' }, this.props.date.toString()),
      el('span', { className: 'transaction-description' }, this.props.description),
      el('span', { className: 'transaction-amount' }, this.props.amount.pence),
      el('span', { className: 'transaction-balance' }, this.props.balance.pence)
    );
  }
}