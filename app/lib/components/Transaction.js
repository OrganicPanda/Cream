import moment from 'moment';
import { el, $, Component } from '../react-utils';

export class Transaction extends Component {
  render() {
    var transaction = this.props.transaction
      , referenceDate = moment.utc()
      , transactionDate = moment(transaction.date);

    return el('p', { className: 'transaction' },
      el('span', {
        className: 'label label-success transaction-date'
      }, referenceDate.to(transactionDate)),
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