import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home from '../pages/Home/Home';
import Catalog from '../pages/Catalog/Catalog';
import GraphicDisplay from '../components/GraphicDisplay/GraphicDisplay';
import { StateProvider } from '../state/state';

class App extends Component {
  render() {
    return (
      <StateProvider>
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
            <Route path="/graphic/:graphicLogo" component={GraphicDisplay} />
          </div>
        </Router>
      </StateProvider>
    );
  }
}

export default App;
