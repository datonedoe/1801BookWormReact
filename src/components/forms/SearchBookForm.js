import React from 'react';
import axios from 'axios';
import {Form, Dropdown} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SearchBookForm extends React.Component {
  state = {
    query: '',
    loading: false,
    options: [],
    books: {}
  }

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    console.log("React | components/forms/SearchBookForm | onSearchChange data:", data);
    this.setState({
      query: data.searchQuery
    });
    this.timer = setTimeout(this.fetchOptions, 1000)
  }

  fetchOptions = () => {
    console.log("React | components/forms/SearchBookForm | fetchOptions this.state.query", this.state.query);
    if (!this.state.query) return;
    this.setState({ loading: true })
    axios
      .get(`/api/books/search?q=${this.state.query}`)
      .then(res =>res.data.books)
      .then(books => {
        const options = [];
        const booksHash = {};
        books.forEach(book => {
          booksHash[book.goodreadsId] = book;
          options.push({
            key: book.goodreadsId,
            value: book.goodreadsId,
            text: book.title
          })
        })
        this.setState({loading: false, options, books: booksHash})
      });

  }

  onChange = (e, data) => {
      this.setState({query: data.value});
      this.props.onBookSelect(this.state.books[data.value])
  }

  // value={this.state.query}
  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a book by title"
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
          />
      </Form>
    );
  }
}

SearchBookForm.proptypes = {
  onBookSelect: PropTypes.func.isRequired
};

export default SearchBookForm;
