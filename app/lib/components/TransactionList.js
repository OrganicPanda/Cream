import { Transaction } from './Transaction';
import { Panel } from '../hg/Panel';
import { el, $, Component } from '../react-utils';

export class TransactionList extends Component {
  render() {
    var nodes = this.props.transactions.map(transaction => {
      return Transaction.create({
        key: transaction.id,
        transaction: transaction
      });
    });

    return Panel.create({
      header: `Transactions (${ this.props.transactions.length })`
    }, el('div', { className: 'transaction-list' }, nodes));
  }
}