# Happy Thoughts Project Plan

## Day 1: Setup

X Fork and clone the repository.
X Install dependencies (`npm install`).
X Create basic structure:
X `App.js` for the main component.
X Components folder for reusable components (`MessageForm`, `MessageList`, `MessageItem`).

- Add a basic layout in `App.js`.

---

## Day 2: Form and State

- Create `MessageForm`:
  X Add a text input and submit button.
  X Use `useState` to manage input value.
  X Add a character counter (max 140 characters).
  X Clear input after submission.

---

## Day 3: Display Messages

X Create `MessageList`:
X Use `useState` in `App.js` to store thoughts.
X Pass thoughts to `MessageList` as props.
X §§ kiov bvcx cc Create `MessageItem`:
X Display each thought with a heart button, like count, and timestamp.

---

## Day 4: Add Interactivity

x Add a "like" button to `MessageItem`.
x Use `useState` to manage and update like counts.

---

## Day 5: Responsiveness and Error Handling

- Make the app responsive (320px to 1600px).
- Add error handling:
  - Show a warning if input is empty or exceeds 140 characters.

---

## Day 6: Stretch Goals

- Add a live character counter that turns red when the limit is exceeded.
- Add animations for new messages.
- Show a friendly error state for failed submissions.

---

## Day 7: Final Touches

- Test on different screen sizes and browsers.
- Refactor code for readability.
- Deploy the app (e.g., Netlify or Vercel).
