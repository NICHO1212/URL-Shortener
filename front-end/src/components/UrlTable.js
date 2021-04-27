import React, {Component} from 'react';
import axios from 'axios';

export class UrlTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      urls: []
    };
  }

  getUrlsHandler = () => {
    axios.get("http://localhost:3001/")
      .then(response => {
        this.setState({urls: response.data});
      });
  }

  getUrlHandler = (short_url) => {
    axios.get("http://localhost:3001/" + short_url)
      .then(response => {
        this.getUrlsHandler();
      });
  }

  componentDidMount() {
    this.getUrlsHandler();
  }
  

  render() {
    const {urls} = this.state;

    return(
      <div>
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
    );
  }
}

export default UrlTable;
