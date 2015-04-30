import 'fetch';
import React from 'react';
import { el, $, Component } from './react-utils';

import extract from './extract';
import santander from './santander';

export class Statements extends Component {
  constructor(props) {
    super(props);

    this.state = { transactions: [] };
  }

  componentDidMount() {
    this.loadTransactions();
  }

  loadTransactions() {
    return this.setState({ transactions: [] });
  }

  handleStatementsSubmit(transactions) {
    this.setState({ transactions });
  }

  render() {
    return el('div', { className: 'statements' },
      el('h1', null, 'Transactions'),
      TransactionList.create({
        transactions: this.state.transactions
      }),
      StatementUploadForm.create({
        onStatementsSubmit: this.handleStatementsSubmit.bind(this)
      })
    );
  }
}

export class TransactionList extends Component {
  render() {
    var nodes = this.props.transactions.map(transaction => {
      return el(Transaction, {
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
      .then(transactions => {
        this.props.onStatementsSubmit(transactions);
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