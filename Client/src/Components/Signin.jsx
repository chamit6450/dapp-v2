import React, { useState, useMemo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import "@solana/wallet-adapter-react-ui/styles.css";

// Auth component for handling user login
function Signin() {
  // State variables to store email, password, and messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  // useNavigate hook for navigation
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async () => {
    try {
      // Send POST request to the login API
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Parse the JSON response
      const data = await response.json();

      if (response.ok) {
        // If login is successful
        setMessage("Login successful!");
        setToken(data.token);

        // Navigate to the Home page with the user's email in the state        
          localStorage.setItem("auth_token",data.token);
          navigate("/home");
        
      } else {
        // If login fails, display an error message
        setMessage(data.msg || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };


  return (
    <>
      {/* Main section for login form */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>

              {/* Form for user login */}
              <form className="space-y-4 md:space-y-6" action="#">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                /><br/>

                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /><br/>

                {/* Button to trigger login */}
                <button
                  type="button"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleLogin}
                >
                  Sign in
                </button>

                

                {/* Display a message if there is one */}
                {message && <p>{message}</p>}

                {/* Link to sign-up page if the user doesn't have an account */}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  New to platform? <a href="./Signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
     
    </>
  );
}

export default Signin;
