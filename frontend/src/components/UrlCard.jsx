import React from 'react';

function UrlCard({
  u,
  editCode,
  setEditCode,
  newUrl,
  setNewUrl,
  handleUpdate,
  handleDelete
}) {
  return (
    <div className="card">
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
  );
}

export default UrlCard;
