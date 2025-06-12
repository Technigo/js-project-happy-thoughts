import React from 'react';
import styled from 'styled-components';

const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 12px;
  background: none;
  border: none;
  font-size: 44px;
  cursor: pointer;
  color: #222;
  line-height: 1;
  padding: 0;
  z-index: 2;
  transition: color 0.2s;

  &:hover,
  &:focus {
    color: #f4511e;
    outline: none;
  }
`;

export const DeleteBtn = ({ thoughtId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(
        `http://localhost:8081/thoughts/${thoughtId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete the thought');
      }
      onDelete(thoughtId);
    } catch (error) {
      console.error('Error deleting thought:', error);
    }
  };

  return (
    <DeleteButton onClick={handleDelete} aria-label='Delete'>
      ×
    </DeleteButton>
  );
};
