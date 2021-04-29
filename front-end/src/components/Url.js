import React, {Component} from 'react';
import axios from 'axios';

export class Url extends Component {

	constructor(props) {
		super(props);
		this.state = {
			urls: [],
			url: '',
			short_url: props.match.params.short_url,
			redirect: ''
		};
	}

	getUrlHandler = () => {
		axios.get("http://localhost:3001/" + this.state.short_url, {
			headers: {
				'jwt': sessionStorage.getItem('jwt')
			}}).then(response => {
				window.open(response.data.url);
				window.location.href = "http://localhost:3000/";
			}).catch(error => {
        sessionStorage.setItem('jwt', '');
				window.location.href = "http://localhost:3000/";
      });
	}

	componentDidMount() {
		this.getUrlHandler();
	}

	render() {
		return (<h1>You are being redirected to an external website </h1>);
	}
}

export default Url;