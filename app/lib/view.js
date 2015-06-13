import 'fetch';
import React from 'react';
import { el, $, Component } from './react-utils';

import extract from './extract';
import santander from './santander';
import Transactions from './model/Transactions';

import { Analysis } from './components/Analysis';

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
      el('h1', null, 'C.R.E.A.M'),
      el('h2', null, 'Transactions'),
      StatementUploadForm.create({
        onStatementsSubmit: this.loadTransactions.bind(this)
      }),
      TransactionList.create({
        transactions: this.state.transactions
      }),
      el('h2', null, 'Analysis'),
      Analysis.create({
        transactions: this.state.transactions
      })
    );
  }
}

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

    return el('div', { className: 'transaction-list' }, nodes);
  }
}

export class StatementUploadForm extends Component {
  handleChange(e) {
    var files = Array.prototype.slice.call(e.target.files);

    Promise
      .all(files.map(extract))
      .then(extracted => santander(extracted.join('\r\n')))
      .then(items => items.map(item => Transactions.create(item)))
      .then(transactions => {
        console.log('yo', transactions);
        Transactions.set(transactions);

        this.props.onStatementsSubmit();
      });
  }

  componentDidMount() {
    this._handleChange = this.handleChange.bind(this);

    $(this.refs.statements).addEventListener('change', this._handleChange);
  }

  componentWillUnmount() {
    $(this.refs.statements).removeEventListener('change', this._handleChange);
  }

  render() {
    return el('form', { className: 'statement-upload' },
      el('input', { type: 'file', ref: 'statements', multiple: '' })
    )
  }
}

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