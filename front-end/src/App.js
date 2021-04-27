import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const axios = require('axios');
const get_url = "http://localhost:3001/";
const add_url = "http://localhost:3001/add_url"


class App extends Component {

  state = {
    urls:[],
    form: {
      url: ''
    }
  }

  getUrls = () => {
    axios.get(get_url)
      .then(response => {
        this.setState({urls: response.data});
      });
  }

  addUrl = () => {
    axios.post(add_url, this.state.form)
      .then(response=>{
        this.getUrls();
      }).catch(error=>{
        console.log(error.message);
      })
  }

  getUrl = (short_url) => {
    axios.get(get_url + short_url)
      .then(response => {
        //REDIRECT TO A NEW WINDOW
        this.getUrls();
      });
  }

  handleChange = async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  componentDidMount() {
    this.getUrls();
  }

  render() {

    const {urls} = this.state;

    return (
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
                        <a href={url.url} className="btn btn-info" onClick={() => this.getUrl(url.short_url)} target="_blank" rel="noreferrer">
                          <i className="fas fa-link"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-3">
              <form>
                <div className="form-group">
                  <label htmlFor="url"><i className="fas fa-link"></i> - Url</label>
                  <input type="text" name="url" className="form-control" id="url" onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-success" onClick={() => this.addUrl()}>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
