import React, { Component } from 'react';
import './App.css';
import Customers from './customers/Customers';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="container">
          <Customers />
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
