import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Profile from "./Pages/Profile/Profile";
import UserSettings from "./Pages/UserSettings/UserSettings";
import { useAuthStore } from "./Store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./Store/useThemeStore";

const App = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-neutral"></span>
      </div>
    );
  }

  return (
    <>
      <div data-theme={theme}>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/settings" element={<UserSettings />} />
        </Routes>
        {/* Conditionally render the footer
        {location.pathname !== "/settings" && <MyFooter />} */}
      </div>
    </>
  );
};

export default App;
