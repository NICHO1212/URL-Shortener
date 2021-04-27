import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UrlTable from './components/UrlTable';
import Form from './components/Form';

export class App extends Component {
  render() {
    return(
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-5 offset-md-2">
              <UrlTable></UrlTable>
            </div>
            <div className="col-md-3">
              <Form></Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
