import { el, $, Component } from '../react-utils';

export class Transaction extends Component {
  render() {
    return el('p', { className: 'transaction' },
      el('span', {
        className: 'label label-success transaction-date'
      }, this.props.date.toString()),
      ' ', // React LOL
      el('span', {
        className: 'transaction-description'
      }, this.props.description),
      ' ',
      el('span', {
        className: 'label label-success transaction-amount'
      }, this.props.amount.pence),
      ' ',
      el('span', {
        className: 'label label-success transaction-balance'
      }, this.props.balance.pence)
    );
  }
}