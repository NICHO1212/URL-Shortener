import React, { useState } from 'react';

export default function Login() {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  async function loginUser(credentials) {
    return fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json()).catch(error => {
      sessionStorage.setItem('jwt', '');
      window.location.href = "http://localhost:3000/";
    });
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    const jwt = await loginUser({
      username,
      password
    });
    sessionStorage.setItem('jwt', jwt.token);
    window.location.href = "http://localhost:3000/";
  }

  return(
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="username" className="form-control" id="username" 
              onChange={e => setUserName(e.target.value)} placeholder="Write your username" />
          </div>
          <div className="form-group">
            <input type="password" name="password" className="form-control" id="password" 
              onChange={e => setPassword(e.target.value)} placeholder="Write your password"  />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">Let's go!</button>
          </div>
        </form>
      </div>
    </div>
  );
}