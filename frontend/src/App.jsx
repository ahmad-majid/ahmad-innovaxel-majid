import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [urls, setUrls] = useState([]);
  const [editCode, setEditCode] = useState(null);
  const [newUrl, setNewUrl] = useState('');

  const API = 'http://localhost:5000/shorten';

  const fetchUrls = async () => {
    try {
      const res = await axios.get(`${API}/`);
      setUrls(res.data);
    } catch (err) {
      console.error('Error fetching URLs:', err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    try {
      const res = await axios.post(`${API}`, { url: longUrl });
      setShortUrl(`${API}/${res.data.shortCode}`);
      setLongUrl('');
      fetchUrls();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleUpdate = async (code) => {
    try {
      await axios.put(`${API}/${code}`, { url: newUrl });
      setEditCode(null);
      setNewUrl('');
      fetchUrls();
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleDelete = async (code) => {
    if (!window.confirm('Are you sure you want to delete this URL?')) return;
    try {
      await axios.delete(`${API}/${code}`);
      fetchUrls();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>URL Shortener</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          required
          style={{ padding: '8px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', marginLeft: '10px' }}>
          Shorten
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </p>
      )}

      <h2 style={{ marginTop: '40px' }}>All URLs</h2>
      {urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: '10px' }}>
          <thead>
            <tr>
              <th>Short Code</th>
              <th>Original URL</th>
              <th>Access Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((u) => (
              <tr key={u._id}>
                <td>
                  <a href={`${API}/${u.shortCode}`} target="_blank" rel="noreferrer">
                    {u.shortCode}
                  </a>
                </td>
                <td>
                  {editCode === u.shortCode ? (
                    <>
                      <input
                        type="text"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        style={{ width: '300px' }}
                      />
                      <button onClick={() => handleUpdate(u.shortCode)}>Save</button>
                      <button onClick={() => setEditCode(null)}>Cancel</button>
                    </>
                  ) : (
                    u.url
                  )}
                </td>
                <td>{u.accessCount}</td>
                <td>
                  {editCode !== u.shortCode && (
                    <>
                      <button
                        onClick={() => {
                          setEditCode(u.shortCode);
                          setNewUrl(u.url);
                        }}
                        style={{ marginRight: '8px' }}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDelete(u.shortCode)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
