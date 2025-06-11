import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { LogoutButton } from './components/LogoutButton';
import { Signup } from './components/SignUp';
import { Login } from './components/Login';
import { ThoughtForm } from './components/ThoughtForm';
import { ThoughtList } from './components/ThoughtList';
import { getToken } from './auth';

const API_URL = 'https://happy-thoughts-api-xvxs.onrender.com/thoughts';

const Main = styled.main`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Heading = styled.h1`
  text-align: center;
  font-family: 'Helvetica Neue', sans-serif;
`;

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = Boolean(getToken());

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      fetch(API_URL, {
        headers: {
          Authorization: getToken(),
        },
        credentials: 'include', // <--- TILLAGT
      })
        .then((res) => res.json())
        .then((data) => {
          setThoughts(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  const submitMessage = (message) => {
    setIsLoading(true);
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
      body: JSON.stringify({ message }),
      credentials: 'include', // <--- TILLAGT
    })
      .then((res) => res.json())
      .then((newThought) => {
        setThoughts((prev) => [newThought, ...prev]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const likeThought = (id) => {
    fetch(`${API_URL}/${id}/like`, {
      method: 'PATCH',
      credentials: 'include', // <--- TILLAGT
    })
      .then((res) => res.json())
      .then(() => {
        setThoughts((prev) =>
          prev.map((thought) =>
            thought._id === id
              ? { ...thought, hearts: thought.hearts + 1 }
              : thought
          )
        );
      });
  };

  const deleteThought = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: getToken(),
      },
      credentials: 'include', // <--- TILLAGT
    })
      .then((res) => {
        if (res.ok) {
          setThoughts((prev) => prev.filter((t) => t._id !== id));
        }
      });
  };

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Main>
              <LogoutButton />
              <Heading>Happy Thoughts</Heading>
              <ThoughtForm onSubmitMessage={submitMessage} isLoading={isLoading} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <ThoughtList
                  thoughts={thoughts}
                  onLike={likeThought}
                  onDelete={deleteThought}
                />
              )}
            </Main>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
