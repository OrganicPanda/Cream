import analyse from '../analysis';
import categories from '../categories';
import { Panel } from '../hg/Panel';
import { Card } from '../hg/Card';
import { Grid } from '../hg/Grid';
import { SimpleChart } from './SimpleChart';
import { el, $, Component } from '../react-utils';

export class Analysis extends Component {
  render() {
    var transactions = this.props.transactions
      , results = analyse(categories(transactions.models));

    var nodes = results.map(result => {
      var chart = SimpleChart.create({
        transactions: result.transactions
      });

      return Card.create({
        amount: result.amount.toString(),
        description: result.description,
        key: result.amount.toString() + result.description
      }, chart);
    });

    return Panel.create({
      header: 'Analysis'
    }, el('div', { className: 'analysis' }, Grid.create({}, nodes)));
  }
}