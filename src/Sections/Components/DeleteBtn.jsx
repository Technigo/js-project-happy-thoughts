// DeleteBtn.js
import React from 'react';

export const DeleteBtn = ({ thoughtId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/thoughts/${thoughtId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete the thought');
      }
      onDelete(thoughtId); // Update the UI in parent component
    } catch (error) {
      console.error('Error deleting thought:', error);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={handleDelete}
        style={{
          position: 'relative',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          fontSize: '1.3rem',
          cursor: 'pointer',
          color: '#f357a8',
          fontWeight: 'bold',
          lineHeight: 1,
        }}
        aria-label='Delete'
      >
        ×
      </button>
    </div>
  );
};
