import { useEffect, useState } from 'react';
import {
  getAllUrls,
  createShortUrl,
  updateUrl,
  deleteUrl
} from './api';
import UrlCard from './components/UrlCard';
import './index.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [urls, setUrls] = useState([]);
  const [editCode, setEditCode] = useState(null);
  const [newUrl, setNewUrl] = useState('');

  const fetchUrls = async () => {
    try {
      const data = await getAllUrls();
      setUrls(data);
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
      const data = await createShortUrl(longUrl);
      setShortUrl(`http://localhost:5000/${data.shortCode}`);
      setLongUrl('');
      fetchUrls();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleUpdate = async (code) => {
    try {
      await updateUrl(code, newUrl);
      setEditCode(null);
      setNewUrl('');
      fetchUrls();
  } catch (err) {
  console.error(err);
  alert('Update failed');
}
  };

  const handleDelete = async (code) => {
    if (!window.confirm('Are you sure you want to delete this URL?')) return;

    try {
      await deleteUrl(code);
      fetchUrls();
   } catch (err) {
  console.error(err);
  alert('Update failed');
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
            <UrlCard
              key={u._id}
              u={u}
              editCode={editCode}
              setEditCode={setEditCode}
              newUrl={newUrl}
              setNewUrl={setNewUrl}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
