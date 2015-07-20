import moment from 'moment';
import BaseModel from './BaseModel';

export class Filter extends BaseModel {
  get defaults() {
    return {
      text: 'All',
      value: Infinity
    };
  }

  apply(transactions) {
    return transactions.slice(0, this.value);
  }
}

export class DateFilter extends Filter {
  apply(transactions) {
    var start = moment(this.value);

    return transactions.filter(transaction => {
      var compareTo = moment(transaction.date);

      return start.diff(compareTo) <= 0;
    });
  }
}

export class MonthsFilter extends DateFilter {
  constructor(x) {
    super({
      text: `Last ${ x } Month(s)`,
      value: moment.utc().subtract(x, 'months').toDate()
    });
  }
}

export class DaysFilter extends DateFilter {
  constructor(x) {
    super({
      text: `Last ${ x } Day(s)`,
      value: moment.utc().subtract(x, 'days').toDate()
    });
  }
}