import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Schema from './Schema';
import Fib from './Fib';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Inefficient Recursive Fib Calculator</h1>
          </header>
          <div className="App-links">
            <Link className="App-link" to="/">Home</Link>
            <Link className="App-link" to="/schema">Schema</Link>
          </div>
          <div>
            <Route exact path="/" component={Fib} />
            <Route path="/schema" component={Schema} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
