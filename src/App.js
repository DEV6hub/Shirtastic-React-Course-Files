import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" render={() => (<Home />)}></Route>
          <Route exact path="/catalog" render={() => (<Catalog />)}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
