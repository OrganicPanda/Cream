import analyse from '../analysis';
import categories from '../categories';
import { Panel } from '../hg/Panel';
import { Card } from '../hg/Card';
import { Grid } from '../hg/Grid';
import { el, $, Component } from '../react-utils';

export class Analysis extends Component {
  render() {
    var transactions = this.props.transactions
      , results = analyse(categories(transactions.models));

    var nodes = results.map(result => {
      return Card.create({
        amount: result.amount.toString(),
        description: result.description,
        key: result.amount.toString() + result.description
      }, result);
    });

    return Panel.create({
      header: 'Analysis'
    }, el('div', { className: 'analysis' }, Grid.create({}, nodes)));
  }
}