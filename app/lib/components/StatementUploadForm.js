import extract from '../extract';
import santander from '../santander';
import Transactions from '../model/Transactions';

import { Transaction } from './Transaction';
import { Panel } from '../hg/Panel';
import { el, $, Component } from '../react-utils';

export class StatementUploadForm extends Component {
  handleChange(e) {
    var files = Array.prototype.slice.call(e.target.files);

    Promise
      .all(files.map(extract))
      .then(extracted => santander(extracted.join('\r\n')))
      .then(items => items.map(item => Transactions.create(item)))
      .then(transactions => {
        console.log('yo', transactions);
        return Transactions.set(transactions);
      })
      .then(transactions => {
        return this.props.onStatementsSubmit(transactions);
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
    return Panel.create({
      header: 'Upload'
    }, el('form', { className: 'statement-upload' },
      el('input', { type: 'file', ref: 'statements', multiple: '' })
    ));
  }
}