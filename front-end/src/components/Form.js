import React from 'react';
import UrlTable from './UrlTable';

function Form() {

  var form = {};
  const url = "http://localhost:3001/add_url";

  const addUrl = () => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    UrlTable.getUrls();
  }

  const handleChange = async e=>{
    e.persist();
    form = {url: e.target.value};
  }

  return(
    <form>
      <div className="form-group">
        <label htmlFor="url"><i className="fas fa-link"></i> - Url</label>
        <input type="text" name="url" className="form-control" id="url" onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-success" onClick={() => addUrl()}>Save</button>
    </form>
  );
}

export default Form;