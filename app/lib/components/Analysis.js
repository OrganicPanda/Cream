import analyse from '../analysis';
import categories from '../categories';
import { el, $, Component } from '../react-utils';

export class Analysis extends Component {
  render() {
    var results = analyse(categories(this.props.transactions));

    var nodes = results.map(result => el('li', {}, result));

    return el('ul', { className: 'analysis' }, nodes);
  }
}