import React, { Component } from 'react';
// import logo from './logo.svg';
import Sidebar from './sidebar.js';
import Form from './Form_y';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Form />
      </div>
    );
  }
}

export default App;
