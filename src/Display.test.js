import React from 'react';
import ReactDOM from 'react-dom';
import Display from './App';
import renderer from 'react-test-renderer';


describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Display />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<Display results={
        {
          "name": "Millennium Falcon", 
          "model": "YT-1300 light freighter", 
          "manufacturer": "Corellian Engineering Corporation", 
          "cost_in_credits": "100000", 
          "length": "34.37", 
          "max_atmosphering_speed": "1050", 
          "crew": "4", 
          "passengers": "6", 
          "cargo_capacity": "100000", 
          "consumables": "2 months", 
          "hyperdrive_rating": "0.5", 
          "MGLT": "75", 
          "starship_class": "Light freighter", 
          "pilots": [
              "https://swapi.co/api/people/13/", 
              "https://swapi.co/api/people/14/", 
              "https://swapi.co/api/people/25/", 
              "https://swapi.co/api/people/31/"
          ], 
          "films": [
              "https://swapi.co/api/films/2/", 
              "https://swapi.co/api/films/7/", 
              "https://swapi.co/api/films/3/", 
              "https://swapi.co/api/films/1/"
          ], 
          "created": "2014-12-10T16:59:45.094000Z", 
          "edited": "2014-12-22T17:35:44.464156Z", 
          "url": "https://swapi.co/api/starships/10/"
      }
      }/>)
      .toJSON();
    expect(tree).toMatchSnapshot();  
    });
})

