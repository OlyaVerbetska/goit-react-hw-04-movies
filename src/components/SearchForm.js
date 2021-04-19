import { Component } from 'react';

class SearchForm extends Component {
  state = {
    query: '',
  };

  changeInput = e => {
    this.setState({ query: e.currentTarget.value });
  };
  formSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <form>
        <input
          type="text"
          onChange={this.changeInput}
          value={this.state.query}
        ></input>
        <button type="submit" onClick={this.formSubmit}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm;
