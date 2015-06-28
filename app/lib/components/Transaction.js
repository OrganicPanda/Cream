import { el, $, Component } from '../react-utils';

export class Transaction extends Component {
  render() {
    var transaction = this.props.transaction;

    return el('p', { className: 'transaction' },
      el('span', {
        className: 'label label-success transaction-date'
      }, transaction.date.toString()),
      el('span', {
        className: 'transaction-description'
      }, transaction.description),
      el('span', {
        className: 'label label-success transaction-amount'
      }, transaction.amount.toString()),
      el('span', {
        className: 'label label-success transaction-balance'
      }, transaction.balance.toString())
    );
  }
}