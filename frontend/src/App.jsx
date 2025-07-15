import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

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
      setShortUrl(`http://localhost:5000/${res.data.shortCode}`);
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
    <div className="container">
      <h1 className="title">🔗 URL Shortener</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Paste a long URL here"
          required
          className="input"
        />
        <button type="submit" className="submit-btn">Shorten</button>
      </form>

      {error && <p className="error">{error}</p>}
      {shortUrl && (
        <p className="short-url">
          Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </p>
      )}

      <h2 style={{ marginTop: '40px' }}>📋 Your Shortened URLs</h2>
      {urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        <div className="card-list">
          {urls.map((u) => (
            <div key={u._id} className="card">
              <div>
                <strong>Short:</strong>{' '}
                <a href={`http://localhost:5000/${u.shortCode}`} target="_blank" rel="noreferrer">
                  {u.shortCode}
                </a>
              </div>

              <div style={{ marginTop: '6px' }}>
                <strong>Original:</strong>{' '}
                {editCode === u.shortCode ? (
                  <>
                    <input
                      type="text"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="edit-input"
                    />
                    <div style={{ marginTop: '10px' }}>
                      <button onClick={() => handleUpdate(u.shortCode)} className="save-btn">Save</button>
                      <button onClick={() => setEditCode(null)} className="cancel-btn">Cancel</button>
                    </div>
                  </>
                ) : (
                  <span className="url-text">{u.url}</span>
                )}
              </div>

              <div style={{ marginTop: '10px' }}>
                <strong>Accessed:</strong> {u.accessCount} times
              </div>

              {editCode !== u.shortCode && (
                <div className="btn-group">
                  <button
                    onClick={() => {
                      setEditCode(u.shortCode);
                      setNewUrl(u.url);
                    }}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(u.shortCode)} className="delete-btn">
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
