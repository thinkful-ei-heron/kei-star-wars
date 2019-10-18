import React, {Component} from 'react';
import Display from './Display';
import ValidationError from './ValidationError'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchTerm: {name: ''},
      filterValue: {name: ''},
      filters: ['films', 'people', 'planets', 'species', 'starships', 'vehicles'],
      results: [],
      loading: false,
      error: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({loading: true})
    const searchTerm = this.state.searchTerm.name
    const filterValue = this.state.filterValue.name
    fetch(`https://swapi.co/api/${filterValue}/?search=${searchTerm}`)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            Promise.reject(error)
          })
        }
        return response.json()
      })
      .then(async data => {
        for (let i = 0; i < data.results.length; i++) {
          const result = data.results[i]
          for (let j = 0; j < Object.keys(result).length; j++){
            const tag = Object.keys(result)[j]
            if (Array.isArray(result[tag])) {
              for (let k = 0; k < result[tag].length; k++){
                const tempFetch = await fetch(result[tag][k])
                const tempResult = await tempFetch.json()
                data.results[i][tag][k] = tempResult
              }
            }
          }
        }
        return data
      })
      .then(data => {
        this.setState({results: data.results, loading: false})
      })
      .catch(error => {
        this.setState({error})
      })
  }

  updateSearch = (event) => {
    this.setState({searchTerm:{name:event.target.value}})
  }
  
  updateFilter = (event) => {
    this.setState({filterValue:{name:event.target.value}})
  }

  validateInput = () => {
    const input = this.state.searchTerm.name.trim();
    if (input.length === 0){
      return 'Search query is required'
    }
  }

  validateFilter = () => {
    const filter = this.state.filterValue.name;
    if (filter === ""){
      return 'Filter selection is required'
    }
  }
  
  render() {
    const error = this.state.error
    const inputError = this.validateInput();
    const displayResults = this.state.results;
    return (
      <main className="main">
        <section className="search">
          <header>
            <h1 className="header">Star Wars Search</h1>
          </header>
            <form className="search-form" onSubmit = {this.handleSubmit}>
              <div className="search-error" role="alert">
                {error && <p>{error.message}</p>}
              </div>
              <div className="filter-div">
                <label htmlFor="filter" className="filter-label">
                  Select a filter:
                </label>
                <select name="filter" id="filter" onChange={this.updateFilter}>
                  <option value="">
                    ---
                  </option>
                  {this.state.filters.map( (filter, index) => {
                    return (
                      <option key={index} value={filter}>{filter}</option> 
                    )
                  })}
                </select>
              </div>
              <div className="search-div">
                <label htmlFor="search" className="search-label">
                  Search
                </label>
                <input type="text" name="search" id="search" className="search-input" onChange={this.updateSearch} required></input>
                {this.state.searchTerm.touched && <ValidationError message={inputError} />}
                <button className="search-button" disabled={this.validateInput() || this.validateFilter()}>
                  Get results!
                </button>
              </div>
            </form>
        </section>

        <section className="results">
          <div className="results-div">
            {this.state.loading ? <h3>Loading! This might take a few seconds!</h3> : this.state.results.length === 0 ? <p>No results available for that search query.</p> : <Display results={displayResults}/>}
          </div>
        </section>
      </main>
    )
  }
}

export default App;