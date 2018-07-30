import React, { Component } from 'react';
import Header from './Header';
import Routes from './Routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <div>
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
