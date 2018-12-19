import React, { Component } from 'react';
import './App.css';
import Customers from './Customers';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="header"></div>
        <div className="container">
          <Customers />
          <Main />
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default App;
