import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import axios from "axios";
import { loginRoute, registerRoute } from "../utils/APIRoutes.js";

const LoginSignup = () => {
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const { data } = await axios.post(loginRoute, formData, {
        headers: { Accept: "application/json" },
      });

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signup = async () => {
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password should be at least 8 characters long");
      return;
    }

    try {
      const { data } = await axios.post(registerRoute, formData);

      console.log(data);

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        window.location.replace("/");
      } else {
        alert(data.errors || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h2>{state}</h2>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            ""
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password "
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click Here
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
