import React, {Component} from 'react';
import axios from 'axios';

export class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  submitHandler = e => {
    e.preventDefault();
    axios.post("http://localhost:3001/add_url", this.state);
    this.setState({url: ''});
    //RELOAD LIST
  }

  render() {
    return(
      <div>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="url"><i className="fas fa-link"></i> - Url</label>
            <input type="text" name="url" className="form-control" id="url" value={this.state.url} onChange={this.changeHandler} />
          </div>
          <button type="submit" className="btn btn-success">Save</button>
        </form>
      </div>
    );
  }
}

export default Form;