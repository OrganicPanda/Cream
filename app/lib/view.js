import { el, $, Component } from './react-utils';

import Transactions from './model/Transactions';

import { Analysis } from './components/Analysis';
import { TransactionList } from './components/TransactionList';
import { StatementUploadForm } from './components/StatementUploadForm';

export class Statements extends Component {
  constructor(props) {
    super(props);

    this.state = { transactions: new Transactions() };
  }

  componentDidMount() {
    this.loadTransactions();
  }

  loadTransactions() {
    return Transactions
      .get()
      .then(transactions => {
        this.setState({ transactions: transactions });
      })
  }

  render() {
    return el('div', { className: 'container statements' },
      StatementUploadForm.create({
        onStatementsSubmit: this.loadTransactions.bind(this)
      }),
      TransactionList.create({
        transactions: this.state.transactions
      }),
      Analysis.create({
        transactions: this.state.transactions
      })
    );
  }
}