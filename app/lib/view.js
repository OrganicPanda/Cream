import { el, $, Component } from './react-utils';

import Transactions from './model/Transactions';

import { Analysis } from './components/Analysis';
import { SelectFilters } from './components/SelectFilters';
import { TransactionList } from './components/TransactionList';
import { StatementUploadForm } from './components/StatementUploadForm';

export class Statements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: new Transactions(),
      filteredTransactions: new Transactions()
    };
  }

  componentDidMount() {
    this.loadTransactions();
  }

  loadTransactions() {
    return Transactions
      .get()
      .then(transactions => {
        this.setState({
          transactions: transactions,
          filteredTransactions: transactions // TODO
        });
      })
  }

  applyFilter(filter) {
    this.setState({
      filteredTransactions: this.state.transactions.filter(filter)
    });
  }

  render() {
    return el('div', { className: 'container statements' },
      StatementUploadForm.create({
        onStatementsSubmit: this.loadTransactions.bind(this)
      }),
      SelectFilters.create({
        onFilter: this.applyFilter.bind(this)
      }),
      TransactionList.create({
        transactions: this.state.filteredTransactions
      }),
      Analysis.create({
        transactions: this.state.filteredTransactions
      })
    );
  }
}