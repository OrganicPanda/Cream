import Charts from 'react-chartjs';
import moment from 'moment';
import numeral from 'numeral';

import GBP from '../model/GBP';

import { Panel } from '../hg/Panel';
import { el, $, Component } from '../react-utils';

console.log('foo');

export class SimpleChart extends Component {
  render() {
    var transactions = this.props.transactions
      , start = moment().startOf('month')
      , months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          .reverse()
          .map(x => {
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
        .map(x => new GBP(x.pence *= -1)) // Invert
        .reduce((x, y) => x.add(y), new GBP())
        .pence / 100;
    });

    var monthLabels = months.map(month => month.format('MMM YYYY'));

    return el(Charts.Line, {
      className: 'sparkline',
      data: {
        labels: monthLabels,
        datasets: [{
          label: 'Total',
          strokeColor: 'rgba(255, 255, 255, 0.5)',
          // pointColor: 'hsl(174, 67%, 55%)',
          data: monthSums
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scaleLineColor: "rgba(0,0,0,0)",
        scaleShowLabels: false,
        scaleShowGridLines: false,
        pointDot: false,
        datasetFill: false,
        scaleFontSize: 1,
        scaleFontColor: "rgba(0,0,0,0)"
      }
    });
  }
}
