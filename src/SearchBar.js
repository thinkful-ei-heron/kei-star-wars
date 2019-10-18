import React, {Component} from 'react'

class SearchBar extends Component {
  render() {
    return (
      <section>
        <h1>Star Wars Search</h1>
        <form className="search-form" onSubmit = {this.handleSubmit}>
          <div className="search-error" role="alert">
            {this.props.error && <p>{this.props.error.message}</p>}
          </div>
          <label htmlFor='search'>
            Search
          </label>
          <input type='text' name='search' id='search' className='search-input' onChange={this.handleChange} required></input>
        </form>
      </section>
    )
  }
}

export default SearchBar