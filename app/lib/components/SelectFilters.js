import Filter from '../model/Filter';
import { SelectFilter } from './SelectFilter';
import { Panel } from '../hg/Panel';
import { el, $, Component } from '../react-utils';

const defaultFilters = [
  new Filter({ text: 'Last 10', value: 10 }),
  new Filter({ text: 'Last 20', value: 20 }),
  new Filter({ text: 'Last 30', value: 30 })
];

export class SelectFilters extends Component {
  render() {
    var buttons = defaultFilters.map(defaultFilter => {
      return SelectFilter.create({
        filter: defaultFilter,
        key: defaultFilter.text,
        onFilter: this.props.onFilter
      });
    });

    return Panel.create({
      header: 'Filters'
    }, el('div', { className: 'filters' },
      buttons
    ));
  }
}