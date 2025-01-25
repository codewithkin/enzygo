
import React from 'react';
import { createRouter, Route, RouterProvider, Link, Outlet, useSearch, Navigate } from '@tanstack/react-router';

// Root route (Home page)
const rootRoute = new Route({
  path: '/',
  component: () => <div>Home Page</div>,
});

// About route
const aboutRoute = new Route({
  path: '/about',
  component: () => <div>About Page</div>,
});

// User route with dynamic parameter (`:userId`)
const userRoute = new Route({
  path: '/users/:userId',
  component: ({ params }) => <div>User ID: {params.userId}</div>,
});

// ============================================================================
// 2. Nested Routes
// ============================================================================

/**
 * Nested routes allow you to create complex layouts.
 * Use the `children` property to define child routes.
 */

// Dashboard route with nested routes
const dashboardRoute = new Route({
  path: '/dashboard',
  component: () => (
    <div>
      <h1>Dashboard</h1>
      {/* Render child routes here */}
      <Outlet />
    </div>
  ),
  children: [
    // Dashboard home route
    new Route({ path: '/', component: () => <div>Dashboard Home</div> }),
    // Dashboard settings route
    new Route({ path: '/settings', component: () => <div>Settings</div> }),
  ],
});

// ============================================================================
// 3. Search Params (Query Strings)
// ============================================================================

/**
 * Search params allow you to handle query strings in a type-safe way.
 * Use the `useSearch` hook to access search params in your components.
 */

// Search route with search params
const searchRoute = new Route({
  path: '/search',
  component: () => {
    // Access search params using the `useSearch` hook
    const { query } = useSearch();
    return <div>Search Query: {query}</div>;
  },
});

// ============================================================================
// 4. Code Splitting (Lazy Loading)
// ============================================================================

/**
 * Use `React.lazy` to load components dynamically for better performance.
 */

// Lazy-loaded route
const lazyRoute = new Route({
  path: '/lazy',
  component: React.lazy(() => import('./LazyComponent')),
});

// Example lazy-loaded component
const LazyComponent = () => <div>Lazy Loaded Component</div>;

// ============================================================================
// 5. Route Guards (Protected Routes)
// ============================================================================

/**
 * Protect routes by checking conditions (e.g., authentication).
 * Use the `Navigate` component to redirect users if conditions aren't met.
 */

// Protected route
const protectedRoute = new Route({
  path: '/protected',
  component: () => {
    // Simulate authentication check
    const isAuthenticated = false; // Replace with actual auth logic
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return <Navigate to="/login" />;
    }
    return <div>Protected Content</div>;
  },
});

// ============================================================================
// 6. Error Handling (404 Not Found)
// ============================================================================

/**
 * Add a catch-all route to handle 404 errors.
 */

// 404 route
const notFoundRoute = new Route({
  path: '*',
  component: () => <div>404 - Not Found</div>,
});

// ============================================================================
// 7. Create the Router
// ============================================================================

/**
 * Combine all routes into a single router using `createRouter`.
 */

const router = createRouter({
  routes: [
    rootRoute,
    aboutRoute,
    userRoute,
    dashboardRoute,
    searchRoute,
    lazyRoute,
    protectedRoute,
    notFoundRoute,
  ],
});

// ============================================================================
// 8. Navigation
// ============================================================================

/**
 * Use the `Link` component to navigate between routes.
 */

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/users/123">User 123</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/search?query=tanstack">Search</Link>
      <Link to="/protected">Protected</Link>
    </nav>
  );
}

// ============================================================================
// 9. App Component
// ============================================================================

/**
 * Wrap your app with the `RouterProvider` to enable routing.
 */

function App() {
  return (
    <div>
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// ============================================================================
// 10. Entry Point (Render the App)
// ============================================================================

/**
 * Render the app in the root DOM element.
 */

import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ============================================================================
// 11. Advanced: File-Based Routing (Optional)
// ============================================================================

/**
 * TanStack Router supports file-based routing for simpler route management.
 * Example file structure:
 * src/
 *   routes/
 *     index.tsx        -> Home page
 *     about.tsx        -> About page
 *     users/
 *       [userId].tsx   -> User page
 */

// Example file-based route components
export function Home() {
  return <div>Home</div>;
}

export function About() {
  return <div>About</div>;
}

export function User({ params }: { params: { userId: string } }) {
  return <div>User ID: {params.userId}</div>;
}

// ============================================================================
// 12. Testing
// ============================================================================

/**
 * Test your routes using tools like React Testing Library.
 */

import { render, screen } from '@testing-library/react';

test('renders home page', () => {
  render(<App />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});

// ============================================================================
// 13. Deployment
// ============================================================================

/**
 * Deploy your app to platforms like Vercel, Netlify, or any static hosting service.
 */

// ============================================================================
// 14. Resources
// ============================================================================

/**
 * - Official Documentation: https://tanstack.com/router
 * - GitHub Repository: https://github.com/tanstack/router
 */

// ============================================================================
// End of File
// ============================================================================