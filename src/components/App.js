import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Home from '../containers/Home';
import Catalog from '../containers/Catalog';
import GraphicDisplay from '../components/GraphicDisplay/GraphicDisplay';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route 
            exact 
            path="/" 
            render={() => (<Home />)}
          >
          </Route>
          <Route 
            exact 
            path="/catalog" 
            render={() => (<Catalog />)}
          >
          </Route>
          <Route path="/graphic/:graphicLogo" component={GraphicDisplay}/>
        </div>
      </Router>
    );
  }
}

export default App;
