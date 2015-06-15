import { Transaction } from './Transaction';
import { Panel } from '../hg/Panel';
import { el, $, Component } from '../react-utils';

export class TransactionList extends Component {
  render() {
    var nodes = this.props.transactions.map(transaction => {
      return el(Transaction, {
        key: transaction.id,
        date: transaction.date,
        description: transaction.description,
        amount: transaction.amount,
        balance: transaction.balance
      });
    });

    return Panel.create({
      header: 'Transactions'
    }, [
      el('div', { className: 'transaction-list' }, nodes)
    ]);
  }
}