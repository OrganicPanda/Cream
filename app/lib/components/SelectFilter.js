import { el, $, Component } from '../react-utils';

export class SelectFilter extends Component {
  handleClick() {
    return this.props.onFilter(this.props.filter);
  }

  componentDidMount() {
    this._handleClick = this.handleClick.bind(this);

    $(this.refs.button).addEventListener('click', this._handleClick);
  }

  componentWillUnmount() {
    $(this.refs.button).removeEventListener('click', this._handleClick);
  }

  render() {
    return el('button', {
      type: 'button', ref: 'button'
    }, this.props.filter.text);
  }
}