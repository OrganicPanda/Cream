import Charts from 'react-chartjs';
import moment from 'moment';
import { Panel } from '../hg/Panel';
import { el, $, Component } from '../react-utils';

export class Chart extends Component {
  render() {
    var transactions = this.props.transactions
      , start = moment().startOf('month')
      , months = [0, 1, 2, 3, 4, 5].map(x => {
          return start.clone().subtract(x, 'months')
        });

    console.log(months);

    var groupedTransactions = months.map(month => {
      // return moment('2010-10-20').isSame('2009-12-31', 'year');
    });

    return Panel.create(
      { header: 'Chart' },
      el(Charts.Line, {
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First dataset',
              fillColor: 'rgba(220,220,220,0.2)',
              data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
              label: 'My Second dataset',
              fillColor: 'rgba(151,187,205,0.2)',
              data: [28, 48, 40, 19, 86, 27, 90]
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