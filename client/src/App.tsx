import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import FeedPage from "./pages/FeedPage";
import { authStore } from "./stores/authstore";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return authStore.isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {

  return (
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
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
      </Routes>
  )
}

export default App
