import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      url: ''
    };
  }

  getUrlsHandler = () => {
    axios.get("http://localhost:3001/")
      .then(response => {
        //ORDER BY SHORT URL ASC
        response.data.sort(function (a, b) {
          if (a.short_url > b.short_url) return 1;
          if (a.short_url < b.short_url) return -1;
          return 0;
        });
        this.setState({urls: response.data});
      });
  }

  getUrlHandler = (short_url) => {
    axios.get("http://localhost:3001/" + short_url)
      .then(response => {
        this.getUrlsHandler();
      });
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  submitHandler = e => {
    e.preventDefault();
    axios.post("http://localhost:3001/add_url", {url: this.state.url})
      .then((response) => {
        this.setState({url: ''});
        this.getUrlsHandler();
      }, (error) => {
        console.log(error);
      });
    }

  componentDidMount() {
    this.getUrlsHandler();
  }

  render() {

    const {urls} = this.state;

    return(
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-5 offset-md-2">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Short Url</th>
                    <th>Requests</th>
                    <th>Go There</th>
                  </tr>
                </thead>
                <tbody>
                  {urls.map(url => (
                    <tr key={url._id}>
                      <td>{url.short_url}</td>
                      <td>{url.count}</td>
                      <td>
                        <a href={url.url} className="btn btn-info" onClick={() => this.getUrlHandler(url.short_url)} target="_blank" rel="noreferrer">
                          <i className="fas fa-link"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-3">
              <form onSubmit={this.submitHandler}>
                <div className="form-group">
                  <label htmlFor="url"><i className="fas fa-link"></i> - Url</label>
                  <input type="text" name="url" className="form-control" id="url" value={this.state.url} onChange={this.changeHandler} />
                </div>
                <button type="submit" className="btn btn-success">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
