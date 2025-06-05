# Happy Thoughts App - Testing Guide

## Prerequisites

1. **Backend Server**: Ensure your Happy Thoughts backend is running at `http://localhost:8080`
2. **Frontend Server**: Run `npm run dev` to start the Vite app (will be on `http://localhost:5173` or `http://localhost:5174`)
3. **Browser DevTools**: Open Browser Console (F12) and Network tab for debugging

## Phase 6: Testing & Validation

### Task 6.1: Authentication Flow Testing ✅

#### Test 1: Sign Up with New User

**Steps:**

1. Open `http://localhost:5174`
2. You should see the login form (if not authenticated)
3. Click "Sign up here" to switch to signup form
4. Fill in:
   - Email: `test@example.com` (or unique email)
   - Password: `password123` (min 6 characters)
   - Confirm Password: `password123`
5. Click "❤️ Sign Up ❤️"

**Expected Results:**

- ✅ Form shows loading state ("Creating account...")
- ✅ On success: Redirects to main app with user info displayed
- ✅ User email shows in top bar: "Welcome back, test@example.com"
- ✅ Console: Check localStorage has `token` key
- ✅ Network tab: POST to `/auth/signup` returns 200/201

**Validation Commands:**

```javascript
// Check token in console
localStorage.getItem("token"); // Should return JWT token
```

#### Test 2: Verify JWT Token Storage

**Steps:**

1. In browser console, run: `localStorage.getItem('token')`
2. Copy the token and decode it at [jwt.io](https://jwt.io)

**Expected Results:**

- ✅ Token exists in localStorage
- ✅ Token contains user information (email, id, etc.)
- ✅ Token has valid expiration time

#### Test 3: Logout and Login

**Steps:**

1. Click "Logout" button in top bar
2. Should return to login form
3. Log in with the same credentials:
   - Email: `test@example.com`
   - Password: `password123`
4. Click "❤️ Log In ❤️"

**Expected Results:**

- ✅ Logout shows loading state briefly
- ✅ Returns to login form
- ✅ Token removed from localStorage
- ✅ Login success returns to main app
- ✅ Network tab: POST to `/auth/login` returns 200

#### Test 4: Page Refresh Authentication State

**Steps:**

1. While logged in, refresh the page (F5 or Ctrl+R)
2. Check if user remains logged in

**Expected Results:**

- ✅ User stays logged in after refresh
- ✅ Token persists in localStorage
- ✅ App shows authenticated state immediately

### Task 6.2: CRUD Operations Testing

#### Test 5: View Thoughts Without Authentication

**Steps:**

1. Logout if authenticated
2. Check if thoughts are visible on login screen

**Expected Results:**

- ✅ Thoughts should load and display
- ✅ No edit/delete buttons visible
- ✅ Like buttons may be disabled or show login prompt
- ✅ Form is disabled with placeholder "Please log in to post a thought..."

#### Test 6: Create Thoughts (Authenticated)

**Steps:**

1. Log in
2. Type a happy thought (5-140 characters)
3. Click "❤️ Send Happy Thought ❤️"

**Expected Results:**

- ✅ Thought appears immediately (optimistic update)
- ✅ Thought shows your email as owner
- ✅ Form resets after submission
- ✅ Network tab: POST to `/thoughts` returns 200/201

#### Test 7: Edit Own Thoughts

**Steps:**

1. Find a thought you created (shows your email)
2. Click "✏️ Edit" button
3. Modify the text
4. Click "Save"

**Expected Results:**

- ✅ Edit/Delete buttons only visible on your thoughts
- ✅ Text changes to textarea in edit mode
- ✅ Save/Cancel buttons appear
- ✅ Optimistic update shows immediately
- ✅ Network tab: PUT to `/thoughts/:id` returns 200

#### Test 8: Delete Own Thoughts

**Steps:**

1. Find a thought you created
2. Click "🗑️ Delete" button
3. Confirm deletion in popup

**Expected Results:**

- ✅ Confirmation dialog appears
- ✅ Thought disappears immediately (optimistic update)
- ✅ Network tab: DELETE to `/thoughts/:id` returns 200

#### Test 9: Cannot Edit Others' Thoughts

**Steps:**

1. Look for thoughts with different owner emails
2. Verify no edit/delete buttons appear

**Expected Results:**

- ✅ Edit/Delete buttons only on your thoughts
- ✅ Other users' thoughts are read-only

### Task 6.3: Error Scenarios Testing

#### Test 10: Login with Wrong Credentials

**Steps:**

1. Logout if authenticated
2. Try logging in with wrong password
3. Try with non-existent email

**Expected Results:**

- ✅ Shows appropriate error message
- ✅ Form remains on login screen
- ✅ Network tab: POST returns 401/400
- ✅ No token saved to localStorage

#### Test 11: Create Thought Without Authentication

**Steps:**

1. Logout
2. Try to access authenticated endpoints directly via console:

```javascript
fetch("http://localhost:8080/thoughts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "Test" }),
});
```

**Expected Results:**

- ✅ Returns 401 Unauthorized
- ✅ Form is disabled when not authenticated

#### Test 12: Token Expiration Handling

**Steps:**

1. Login normally
2. Manually expire/corrupt token in localStorage:

```javascript
localStorage.setItem("token", "invalid-token");
```

3. Try to like a thought or create a thought

**Expected Results:**

- ✅ Automatic logout triggered
- ✅ Redirected to login form
- ✅ Clear error message about session expiry

#### Test 13: Network Error Handling

**Steps:**

1. Stop the backend server
2. Try to perform actions (login, create thought, etc.)

**Expected Results:**

- ✅ User-friendly error messages
- ✅ No app crashes
- ✅ Proper error handling in UI

### Task 6.4: Cross-Browser Testing

#### Test 14: Browser Compatibility

**Test in each browser:**

- Chrome
- Firefox
- Safari (if on Mac)
- Edge

**Expected Results:**

- ✅ Consistent UI appearance
- ✅ All functionality works
- ✅ localStorage persists across sessions
- ✅ No console errors

## Manual Testing Checklist

### Authentication ✅

- [ ] Sign up new user
- [ ] JWT token stored correctly
- [ ] Login with credentials
- [ ] Logout functionality
- [ ] Page refresh maintains state
- [ ] Token expiration handling

### CRUD Operations ✅

- [ ] View thoughts without auth
- [ ] Create thoughts when authenticated
- [ ] Edit own thoughts only
- [ ] Delete own thoughts only
- [ ] Cannot edit others' thoughts

### Error Handling ✅

- [ ] Wrong login credentials
- [ ] Network errors
- [ ] Token expiration
- [ ] Unauthorized access attempts

### UX/UI ✅

- [ ] Loading states show correctly
- [ ] Error messages are user-friendly
- [ ] Optimistic updates work
- [ ] Responsive design maintained
- [ ] No console errors

## Common Issues & Solutions

### Issue: "Failed to fetch"

**Solution:** Check if backend server is running at `http://localhost:8080`

### Issue: CORS errors

**Solution:** Ensure backend has proper CORS configuration for `http://localhost:5174`

### Issue: Token not persisting

**Solution:** Check localStorage in DevTools, ensure no browser privacy settings blocking storage

### Issue: Optimistic updates not reverting

**Solution:** Check Network tab for actual server responses, verify error handling

---

**Testing Status:**

- Task 6.1: ⏳ In Progress
- Task 6.2: ⚪ Pending
- Task 6.3: ⚪ Pending
- Task 6.4: ⚪ Pending
