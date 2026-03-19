import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import { authStore } from "./stores/authstore";
import { useEffect, type JSX } from "react";
import AppHeader from "./components/AppHeader";
import UsersPage from "./pages/UsersPage";
import UserProfilePage from "./pages/ProfilePage";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return authStore.isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  useEffect(() => {
    authStore.getMe();
  }, []);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <FeedPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/users/:userId" element={<UserProfilePage />} />
        <Route path="/posts/:postId" element={<UserProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
