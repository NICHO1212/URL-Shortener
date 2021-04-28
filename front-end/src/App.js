import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      url: '',
      short_url: '',
      redirect: ''
    };
  }

  getUrlsHandler = async () => {
    await axios.get("http://localhost:3001/")
      .then(response => {
        //ORDER BY SHORT BY COUNT DESC
        response.data.sort(function (a, b) {
          if (a.count < b.count) return 1;
          if (a.count > b.count) return -1;
          return 0;
        });
        //GET FIRST 20 ITEMS
        let urls = response.data.slice(0, 20);
        this.setState({urls: urls});
      });
  }

  getUrlHandler = (short_url) => {
    axios.get("http://localhost:3001/" + short_url)
      .then(response => {
        window.open(response.data.url, '_blank');
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
        this.setState({short_url: response.data.short_url});
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
    const {short_url} = this.state;
    
    return(
      <div className="App">
        <div className="container">
          <Router>
            <Switch>

              <Route exact path="/" component={() => {
                return(
                  <div className="row">
                    <div className="col-md-5 offset-md-1">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Short Url</th>
                            <th>Requests</th>
                            <th>Take Me There</th>
                          </tr>
                        </thead>
                        <tbody>
                          {urls?.map(url => (
                            <tr key={url._id}>
                              <td>{url.short_url}</td>
                              <td>{url.count}</td>
                              <td>
                                <button className="btn btn-info" onClick={() => this.getUrlHandler(url.short_url)} target="_blank" rel="noreferrer">
                                  <i className="fas fa-link"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-5">
                      <h3>New Short URL</h3>
                      <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                          <input type="text" name="url" className="form-control" id="url" value={this.state.url} onChange={this.changeHandler} placeholder="Paste a URL here" />
                        </div>
                        <div className="button-group">
                          <button type="submit" className="btn btn-success">Save</button>
                        </div>
                      </form>
                      <div className="from-group">
                        <label>
                          <i className="far fa-hand-point-down"></i> Down here you will see your new short URL <i className="far fa-hand-point-down"></i>
                        </label>
                        <br/>
                        <label><strong>{short_url}</strong></label>
                      </div>
                    </div>
                  </div>
                );
              }} />
                
              <Route exact path='/:short_url' component={() => {
                let { short_url } = useParams();

                //por alguna razon suma dos a la cuenta de acceso
                //esto es algo que no pude resolver

                axios.get("http://localhost:3001/" + short_url)
                  .then(response => {
                    this.setState({redirect: response.data.url});
                  }).finally(() => {
                    window.location.href = "http://localhost:3000/";
                    if(this.state.redirect) {
                      window.open(this.state.redirect, '_blank');
                      this.setState({redirect: ''});
                    }
                });
                return 1;
              }}/>

            </Switch>
          </Router>
        </div>
      </div>
      
    );
  }
}

export default App;
