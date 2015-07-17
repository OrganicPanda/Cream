import { Transaction } from './Transaction';
import { Panel } from '../hg/Panel';
import { el, $, Component } from '../react-utils';

export class TransactionList extends Component {
  render() {
    var filtered = this.props.transactions.filter();
    var nodes = filtered.models.map(transaction => {
      return Transaction.create({
        key: transaction.id,
        transaction: transaction
      });
    });

    return Panel.create({
      header: `Transactions (${ filtered.models.length })`
    }, el('div', { className: 'transaction-list' }, nodes));
  }
}