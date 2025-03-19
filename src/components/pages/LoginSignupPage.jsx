import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../css/style.css";
import { useAuth } from "./AuthContext"; // Import useAuth

const LoginSignupPage = () => {
  const [isVisible, setIsVisible] = useState(true); // Controls visibility of the login page
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // Use the login function from AuthContext

  // Create a ref for the modal
  const modalRef = useRef();

  // Close the modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsVisible(false); // Close the modal
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (isLogin) {
      try {
        // Call the login API
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          email,
          password,
        });
        console.log("Login response:", response.data); // Debugging log
  
        // Verify that the response contains the user object
        if (!response.data.user) {
          throw new Error("User data not found in response");
        }
  
        // Update the currentUser state in AuthContext
        login(response.data.user); // Pass the user data to the login function
        setIsVisible(false); // Close the modal after successful login
      } catch (error) {
        setError(error.response?.data?.message || "Login failed. Please check your credentials.");
      } finally {
        setLoading(false);
      }
    } else {
      // Signup logic
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
  
      try {
        // Call the signup API
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
          username,
          email,
          password,
        });
        console.log("Signup response:", response.data); // Debugging log
  
        // Verify that the response contains the user object
        if (!response.data.user) {
          throw new Error("User data not found in response");
        }
  
        // Update the currentUser state in AuthContext
        login(response.data.user); // Pass the user data to the login function
        setIsVisible(false); // Close the modal after successful signup
      } catch (error) {
        setError(error.response?.data?.message || "Signup failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the forgot password API
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        email: forgotPasswordEmail,
      });
      console.log("Forgot password response:", response.data);

      setForgotPasswordMessage(response.data.message);
      setError(""); // Clear any previous errors
      setShowForgotPassword(false); // Redirect back to login page
    } catch (error) {
      setForgotPasswordMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If the modal is not visible, return null (don't render anything)
  if (!isVisible) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-box" ref={modalRef}>
        <button className="close-btn" onClick={() => setIsVisible(false)}>✖</button>
        <h2>{showForgotPassword ? "Forgot Password" : isLogin ? "Login" : "Signup"}</h2>
        {error && <p className="error-message">{error}</p>}
        {forgotPasswordMessage && <p className="success-message">{forgotPasswordMessage}</p>}

        {showForgotPassword ? (
          // Forgot Password Form
          <form onSubmit={handleForgotPasswordSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
          </form>
        ) : (
          // Login/Signup Form
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
            <button type="submit" disabled={loading}>{loading ? "Submitting..." : (isLogin ? "Login" : "Signup")}</button>
          </form>
        )}

        {!showForgotPassword && isLogin && (
          <p>
            Don't have an account?{" "}
            <button className="toggle-btn" onClick={() => setIsLogin(false)}>
              Signup
            </button>
            <br />
            Forgot your password?{" "}
            <button className="toggle-btn" onClick={() => setShowForgotPassword(true)}>
              Reset Password
            </button>
          </p>
        )}

        {!showForgotPassword && !isLogin && (
          <p>
            Already have an account?{" "}
            <button className="toggle-btn" onClick={() => setIsLogin(true)}>
              Login
            </button>
          </p>
        )}

        {showForgotPassword && (
          <p>
            Remember your password?{" "}
            <button className="toggle-btn" onClick={() => setShowForgotPassword(false)}>
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignupPage;