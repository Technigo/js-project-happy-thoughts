# Happy Thoughts

[![Netlify Status](https://api.netlify.com/api/v1/badges/8131bd8a-605d-4338-89f7-97ca5fcc0cc4/deploy-status)](https://app.netlify.com/sites/creative-hotteok-2e5655/deploys)

# High-level map of "Happy Thoughts"

Here’s a high-level map of your “Happy Thoughts” app and how the pieces fit together:

1. App.jsx  
   • Root of your UI.  
   • Calls useThoughts() to:  
    – fetch all existing thoughts on mount (GET /thoughts)  
    – expose `thoughts`, `loading`, `error`, a helper `addThought()` (for adding new items), and `newThoughtId` (for “just added” animations).  
   • Renders:  
    – a `<Loader/>` or error message while loading  
    – `<ThoughtForm onSubmit={addThought}/>` for the post‐form  
    – `<LikeCounter/>` (your global like tracker)  
    – A list of `<Thought/>` items by mapping over `thoughts`

2. useThoughts.js  
   • Manages the array of thoughts in state.  
   • `fetchThoughts()` calls api.getThoughts(), handles loading/error, populates state.  
   • `addThought(messageOrObj)` is your optimistic‐UI helper—creates a temp object, inserts it immediately, then (if you refactor) only merges a server‐returned Thought object when the POST resolves.  
   • Internally tracks “in progress” fetch/post operations with refs to avoid duplicates (and to work around React StrictMode double‐invoke in dev).

3. api.js  
   • Central-place for all network calls.  
   • `getThoughts()` → fetch GET /thoughts → JSON array  
   • `postThought(message)` → deduplicateRequest wrapper → fetch POST /thoughts → JSON of the new thought  
   • `likeThought(id)` → fetch POST /thoughts/:id/like → JSON with updated hearts  
   • `deduplicateRequest(key, fn)` prevents firing the exact same request twice in flight.

4. usePostThought.js  
   • Handles the **form** state: `message`, `isPosting`, `error`, `remainingChars`.  
   • `handleInputChange()` updates the text and clears errors.  
   • `postThought()` does client-side validation, guards against double-submit with `isSubmittingRef`, calls the API (or an injected fallback), and on success:  
    – clears the input  
    – invokes your `onSuccess(data)` callback (which, in your form, is `addThought(data)` from useThoughts)

5. ThoughtForm.jsx  
   • UI for the happy-thought input form.  
   • Takes an `onSubmit` prop (wired to `addThought` in App).  
   • Uses usePostThought to:  
    – bind `value`/`onChange`  
    – disable the button while posting or on invalid input  
    – handle submission via the hook’s `handleSubmit` (which calls postThought + your onSuccess)

6. Thought.jsx  
   • Renders a single thought bubble: the text, date, and a heart-button.  
   • Receives props like `message`, `createdAt`, `hearts`, and a `onLike` handler (wired to api.likeThought via your useLikeSystem hook).

7. LikeCounter.jsx (and/or useLikeSystem.js)  
   • Tracks likes separately (global total).  
   • Calls api.likeThought(id) when you click a heart.

—Flow when you post a new thought—

1. User types → `handleInputChange` in usePostThought → updates `message`.
2. User clicks “Send” → `<StyledForm onSubmit={handleSubmit}>` → calls usePostThought.handleSubmit → prevents default, calls postThought().
3. postThought() validates, sets `isSubmittingRef`, calls `api.postThought(message)`.
4. On success, postThought clears the input and calls `onSuccess(data)` → this is the `addThought(data)` you passed in.
5. addThought(data) in useThoughts merges the real server object into your `thoughts` array (and clears your temp placeholder).
6. App re-renders, the new `<Thought/>` appears at the top.

Everything that talks to the network lives in api.js; your custom hooks handle orchestration (state, optimistic updates, duplicate prevention), and components render the UI and wire user events back into those hooks.
