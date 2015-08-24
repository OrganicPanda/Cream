// import Charts from 'react-chartjs';
import d3 from 'd3';
import plottable from 'plottable';
import moment from 'moment';
import numeral from 'numeral';

import GBP from '../model/GBP';

import { Panel } from '../hg/Panel';
import { el, $, Component } from '../react-utils';

console.log('plottable', plottable);

class FooChart extends Component {
  render() {
    return el('div', {
      ref: 'fooChart',
      style: { height: '250px' }
    });
  }

  componentDidMount() {
    this.drawCharts();
  }

  componentDidUpdate() {
    this.drawCharts();
  }

  drawCharts() {
    var el = this.refs.fooChart;

    console.log('fooChart', el);
    // var data = google.visualization.arrayToDataTable(this.props.data);
    // var options = {
    //   title: 'ABC',
    // };

    // var chart = new google.visualization.LineChart(
    //   document.getElementById(this.props.graphName)
    // );
    // chart.draw(data, options);
  }
}

export class Chart extends Component {
  render() {
    var transactions = this.props.transactions.models
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
        .reduce((x, y) => x.add(y), new GBP())
        .pence / 100;
    });

    var monthIn = groupedTransactions.map(group => {
      return group
        .map(x => x.amount)
        .reduce((x, y) => {
          return x.add(y.pence >= 0 ? y : new GBP())
        }, new GBP())
        .pence / 100;
    });

    var monthOut = groupedTransactions.map(group => {
      return group
        .map(x => x.amount)
        .reduce((x, y) => {
          return x.add(y.pence < 0 ? y : new GBP())
        }, new GBP())
        .pence / 100;
    });

    var monthAverages = monthSums
      .slice()
      .reverse()
      .map((monthSum, index) => {
        var soFar = monthSums.slice(0, index + 1);

        return soFar.reduce((x, y) => x + y) / soFar.length;
      });

    var monthLabels = months.map(month => month.format('MMM YYYY'));

    return Panel.create(
      { header: 'Chart' },
      'Yo',
      FooChart.create()
    );

    // return Panel.create(
    //   { header: 'Chart' },
    //   el(Charts.Line, {
    //     data: {
    //       labels: monthLabels,
    //       datasets: [{
    //         label: 'Total',
    //         strokeColor: 'hsl(174, 67%, 55%)',
    //         pointColor: 'hsl(174, 67%, 55%)',
    //         data: monthSums
    //       }, {
    //         label: 'Chart Average',
    //         strokeColor: 'hsl(252, 33%, 62%)',
    //         pointColor: 'hsl(252, 33%, 62%)',
    //         data: monthAverages
    //       }, {
    //         label: 'In',
    //         strokeColor: 'hsl(146, 60%, 56%)',
    //         pointColor: 'hsl(146, 60%, 56%)',
    //         data: monthIn
    //       }, {
    //         label: 'Out',
    //         strokeColor: 'hsl(204, 92%, 70%)',
    //         pointColor: 'hsl(204, 92%, 70%)',
    //         data: monthOut
    //       }]
    //     },
    //     options: {
    //       responsive: true,
    //       datasetFill: false,
    //       bezierCurveTension: 0.4,
    //       pointDotRadius: 2,
    //       pointDotStrokeWidth: 0,
    //       scaleLabel: '<%= "£" + value %>',
    //       multiTooltipTemplate: function(chartEl) {
    //         var value = new GBP(chartEl.value.toString()).toString();

    //         return `${chartEl.datasetLabel}: ${value}`;
    //       }
    //     }
    //   })
    // );
  }
}
