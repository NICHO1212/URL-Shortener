import './App.css';
import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import {Url} from './components/Url'

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

  logout = () => {
    sessionStorage.setItem('jwt', '');
    window.location.href = "http://localhost:3000/";
  }

  getUrlsHandler = async () => {
    await axios.get("http://localhost:3001/", {
      headers: {
				'jwt': sessionStorage.getItem('jwt')
			}}).then(response => {
        //ORDER BY SHORT BY COUNT DESC
        response.data.sort(function (a, b) {
          if (a.count < b.count) return 1;
          if (a.count > b.count) return -1;
          return 0;
        });
        //GET FIRST 20 ITEMS
        let urls = response.data.slice(0, 20);
        this.setState({urls: urls});
      }).catch(error => {
        sessionStorage.setItem('jwt', '');
      });
  }

  getUrlHandler = (short_url) => {
    axios.get("http://localhost:3001/" + short_url, {headers: {
      'jwt': sessionStorage.getItem('jwt')
    }}).then(response => {
        window.open(response.data.url, '_blank');
        this.getUrlsHandler();
    }, (error) => {
      this.logout();
    });
    
  }

  changeHandler = e => {
    this.setState({url: e.target.value});
  }

  submitHandler = e => {
    e.preventDefault();
    axios.post("http://localhost:3001/add_url", 
    {url: this.state.url},
      {headers: {'jwt': sessionStorage.getItem('jwt')}}
      ).then((response) => {
        this.setState({url: '', short_url: response.data.short_url});
        this.getUrlsHandler();
      }).catch(error => {
        sessionStorage.setItem('jwt', '');
        window.location.href = "http://localhost:3000/";
      });
  }

  componentDidMount() {
    this.getUrlsHandler();
  }

  render() {
    const {urls} = this.state;
    const {short_url} = this.state;

    if(!sessionStorage.getItem('jwt')) {
      return <Login />
    }
    
    return(
      <div className="App">
        <div className="container">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={() => {
                return(
                  <div className="row">
                    <div className="col-md-8">
                      <h3>Top 20 most requested</h3>
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th width="55%">Long Url</th>
                            <th width="15%">Requests</th>
                            <th width="15%">Short Url</th>
                            <th width="15%">Take Me There</th>
                          </tr>
                        </thead>
                        <tbody>
                          {urls?.map(url => (
                            <tr key={url._id}>
                              <td>{url.url}</td>
                              <td>{url.count}</td>
                              <td>{url.short_url}</td>
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
                    <div className="col-md-4">
                      <h3>New Short URL</h3>
                      <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                          <input type="text" name="url" className="form-control" id="url" 
                            value={this.state.url} onChange={this.changeHandler} placeholder="Paste a URL here" />
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
              <Route exact path='/:short_url' component={Url}/>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
