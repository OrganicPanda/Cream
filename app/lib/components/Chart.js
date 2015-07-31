import Charts from 'react-chartjs';
import moment from 'moment';

import GBP from '../model/GBP';

import { Panel } from '../hg/Panel';
import { el, $, Component } from '../react-utils';

export class Chart extends Component {
  render() {
    var transactions = this.props.transactions.models
      , start = moment().startOf('month')
      , months = [0, 1, 2, 3, 4, 5].map(x => {
          return start.clone().subtract(x, 'months')
        });

    // TODO: This is no good
    // Dave's approach is to use a key for each transaction like 'jan-2015'
    // and grouping on that instead of running the isSame all the time
    var groupedTransactions = months.map(month => {
      return transactions.filter(transaction => {
        return moment(transaction.date).isSame(month, 'month');
      });
    });

    var monthSums = groupedTransactions.map(group => {
      return group
        .map(x => x.amount)
        .reduce((x, y) => x.add(y), new GBP())
        .pence;
    });

    var monthLabels = months.map(month => month.format('MMM'));

    return Panel.create(
      { header: 'Chart' },
      el(Charts.Line, {
        data: {
          labels: monthLabels,
          datasets: [
            {
              label: 'Spend',
              fillColor: 'rgba(220,220,220,0.2)',
              data: monthSums
            }
          ]
        },
        options: {
          responsive: true,
        }
      })
    );
  }
}
