import React, {useState, useEffect} from 'react';

function UrlTable() {

  useEffect(() => {
    getUrls();
  }, []);

  const [urls, setUrls] = useState([]);
  
  const get_url = "http://localhost:3001/";

  const getUrls = async () => {
    const data = await fetch(get_url);
    setUrls(await data.json());
  };

  const getUrl = async (short_url) => {
    await fetch(get_url + short_url);
    getUrls();
  };

  return(
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
              <a href={url.url} className="btn btn-info" onClick={() => getUrl(url.short_url)} target="_blank" rel="noreferrer">
                <i className="fas fa-link"></i>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UrlTable;