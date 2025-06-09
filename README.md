# 💭 Happy Thoughts App

A full-stack social media app where users can share their happy thoughts, like posts, and interact with others. Built with React, featuring authentication, CRUD operations, and real-time updates.

![Happy Thoughts App](Example.png)

## ✨ Features

### 🔐 **Authentication System**

- **User Registration** - Sign up with name, email, and secure password
- **User Login** - Secure authentication with JWT tokens
- **Session Management** - Persistent login state across browser sessions
- **Auto-logout** - Automatic logout on token expiration

### 📝 **Thought Management**

- **Create Thoughts** - Share happy thoughts up to 140 characters
- **View Thoughts** - Browse all thoughts from the community
- **Edit Own Thoughts** - Modify your own thoughts after posting
- **Delete Own Thoughts** - Remove your thoughts with confirmation

### ❤️ **Social Interaction**

- **Like/Unlike** - Express appreciation for thoughts
- **Real-time Updates** - Optimistic UI updates for instant feedback
- **Owner Permissions** - Only edit/delete your own content

### 📱 **User Experience**

- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Loading States** - Clear feedback during API operations
- **Error Handling** - User-friendly error messages and recovery
- **Cross-browser Compatible** - Tested on Chrome, Firefox, Safari, Edge

## 🚀 Quick Start

### **Prerequisites**

Before running this app, you need:

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **Backend API** running on `http://localhost:8080`

### **Backend Setup**

This frontend requires a compatible backend API. The backend should provide:

```
POST /auth/signup    - User registration (requires: name, email, password)
POST /auth/login     - User authentication (requires: email, password)
GET  /thoughts       - Fetch all thoughts (public endpoint)
POST /thoughts       - Create new thought (requires authentication)
PUT  /thoughts/:id   - Update thought (requires authentication + ownership)
DELETE /thoughts/:id - Delete thought (requires authentication + ownership)
POST /thoughts/:id/like - Like/unlike thought (requires authentication)
```

**Password Requirements:**

- Minimum 6 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)

### **Frontend Installation**

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd js-project-happy-thoughts
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API URL** (if different from localhost:8080)

   ```javascript
   // src/config/api.js
   export const API_URL = "http://your-backend-url";
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Button.jsx      # Reusable button component
│   ├── ErrorMessage.jsx # Error display component
│   ├── HappyThoughtForm.jsx # Thought creation form
│   ├── LoginForm.jsx   # User login form
│   ├── SignupForm.jsx  # User registration form
│   ├── ThoughtCard.jsx # Individual thought display
│   ├── ThoughtList.jsx # List of thoughts
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication state management
├── hooks/             # Custom React hooks
│   └── useThoughts.js # Thoughts data management
├── utils/             # Utility functions
│   ├── authFetch.js   # Authenticated API calls
│   └── errorHandler.js # Global error handling
├── config/            # Configuration
│   └── api.js         # API URL configuration
├── styles/            # Styling
│   ├── GlobalStyles.js # Global CSS styles
│   └── media.js       # Responsive breakpoints
└── App.jsx            # Main application component
```

## 🔧 Technical Details

### **Built With**

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Styled Components** - CSS-in-JS styling
- **ESLint** - Code linting

### **Key Features**

- **JWT Authentication** - Secure token-based authentication
- **Optimistic Updates** - Immediate UI feedback with error rollback
- **Responsive Design** - Mobile-first approach with breakpoints
- **Error Boundaries** - Graceful error handling and recovery
- **Cross-browser Support** - Compatible with all modern browsers

### **API Integration**

- **Fetch API** - Modern HTTP client
- **Token Management** - Automatic token handling and refresh
- **Error Handling** - Comprehensive error scenarios covered
- **Rate Limiting** - Respects backend rate limiting

## 🧪 Testing

### **Cross-Browser Testing**

See `CROSS_BROWSER_TESTING.md` for comprehensive testing instructions.

### **Manual Testing Checklist**

- [ ] User registration with password validation
- [ ] User login with error handling
- [ ] Thought creation and display
- [ ] Like/unlike functionality
- [ ] Edit/delete own thoughts
- [ ] Responsive design across devices
- [ ] Error scenarios and recovery

## 🚀 Deployment

### **Build for Production**

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### **Environment Variables**

Update `src/config/api.js` with your production API URL:

```javascript
export const API_URL = "https://your-production-api.com";
```

### **Netlify Deployment** (Recommended)

This app is optimized for Netlify deployment with the included `netlify.toml` configuration.

**Quick Deploy:**

1. **Connect to Git:**

   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com) and login
   - Click "New site from Git"
   - Connect your repository
   - Netlify will automatically use the `netlify.toml` configuration
   - Deploy!

**Manual Deploy:**

```bash
npm run build
# Upload the dist/ folder to Netlify
```

### **Other Deployment Platforms**

This app can also be deployed to:

- **Vercel** - Frontend platform
- **GitHub Pages** - Free static hosting
- **AWS S3** - Cloud storage with CloudFront

## 🔒 Security

- **Input Validation** - Client-side validation with server-side verification
- **Token Security** - JWT tokens with automatic expiration handling
- **CORS Protection** - Proper cross-origin request handling
- **XSS Prevention** - React's built-in XSS protection
- **Secure Authentication** - Password requirements and validation

## 🎨 Design System

### **Colors**

- **Primary:** #ff4d4d (Happy Pink)
- **Background:** #ffffff (Clean White)
- **Text:** #333333 (Dark Gray)
- **Success:** #4CAF50 (Green)
- **Error:** #f44336 (Red)

### **Typography**

- **Font Stack:** System fonts with fallbacks
- **Responsive:** Scales appropriately across devices

### **Breakpoints**

- **Desktop:** 1024px+
- **Tablet:** 768px
- **Mobile:** 480px
- **Small Mobile:** 320px

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is for educational purposes.

## 🆘 Troubleshooting

### **Common Issues**

**App won't start:**

- Check Node.js version (requires v16+)
- Run `npm install` to install dependencies
- Ensure port 5173 is available

**Authentication not working:**

- Verify backend is running on correct port
- Check API_URL in `src/config/api.js`
- Confirm backend accepts the required auth format

**Network errors:**

- Check browser console for errors
- Verify backend CORS configuration
- Ensure backend API endpoints match expected format

**Styling issues:**

- Clear browser cache
- Check for JavaScript console errors
- Verify styled-components is properly installed

### **Getting Help**

If you encounter issues:

1. Check the browser console for errors
2. Verify backend API is running and accessible
3. Review the network tab in developer tools
4. Check the `CROSS_BROWSER_TESTING.md` guide

---

Made with ❤️ for spreading happiness!
