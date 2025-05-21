# Happy Thoughts App

This is a simple and uplifting messaging app where users can share what's making them happy at the moment. It's built with React and connected to a public API to store and display thoughts from all users. The app includes several features and stretch goals for an improved experience and accessibility.

## Live Demo

Check out the live website at [Happy Thoughts on Netlify](https://happy-thoughts-rn.netlify.app)

## Features

- **Post Happy Thoughts:** Users can type and submit a happy message, which is instantly shown in the list.
- **Like Thoughts:** Users can click the ❤️ button to send likes and spread positivity.
- **Character Counter:** Shows the number of characters used and highlights red over 140.
- **Loading State:** Displays a spinner while fetching data from the API.
- **Dark/Light Mode Toggle:** Easily switch between dark and light themes.
- **Persistent Like Count:** Keeps track of how many thoughts you've liked using localStorage.
- **Responsive Design:** Works well from 320px up to large desktop screens.
- **Accessibility Considerations:** Semantic elements and Lighthouse score above 95.

## Project Structure

- **`App.jsx`:** Main file with layout, routing, theme toggle, and state.
- **`components/ThoughtForm.jsx`:** Form for submitting new thoughts.
- **`components/ThoughtList.jsx`:** Maps and renders all thoughts.
- **`components/ThoughtCard.jsx`:** Displays each individual thought.
- **`App.css`:** Styling for light/dark mode, layout, and responsiveness.

## How to Run Locally

1. Clone this repository
2. Navigate to the project folder
3. Run `npm install`
4. Run `npm start`
5. Visit `http://localhost:3000` in your browser

## Future Improvements

- Add user authentication to separate personal vs. global thoughts
- Add animations when liking or submitting a thought
- Support for filtering or searching thoughts
- Internationalization support (i18n)

© 2025 Happy Thoughts App. All Rights Reserved. | Developed & Designed by Ricardo Nicolau
