import { el, $, Component } from './react-utils';

import Transactions from './model/Transactions';

import { Analysis } from './components/Analysis';
import { TransactionList } from './components/TransactionList';
import { StatementUploadForm } from './components/StatementUploadForm';

export class Statements extends Component {
  constructor(props) {
    super(props);

    this.state = { transactions: [] };
  }

  componentDidMount() {
    this.loadTransactions();
  }

  loadTransactions() {
    return Transactions
      .get()
      .then(() => {
        this.setState({ transactions: Transactions.models });
      })
  }

  render() {
    return el('div', { className: 'statements' },
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