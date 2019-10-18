import React, {Component} from 'react'

class Display extends Component {
  render() {
    return (
      <>
        {this.props.results.map(result => {
          return (
            <ul className="results-ul" key={result.url}>
              {Object.keys(result).map(tag => {
                let tempResult = result[tag];
                if (Array.isArray(result[tag])){
                  tempResult = [];
                  for (let i = 0; i < result[tag].length; i++){
                    if (result[tag][i].title === undefined){
                      tempResult.push(result[tag][i].name)
                    } else {
                      tempResult.push(result[tag][i].title)
                    }
                  }
                  tempResult = tempResult.join(', ')
                }
                return (
                  <li className="results-info" key={result.url+tag}>
                    <b>{tag}</b>: {tempResult}
                  </li>       
                )
              })}
            </ul> 
          )
        })}
      </>
    )
  }
}

export default Display