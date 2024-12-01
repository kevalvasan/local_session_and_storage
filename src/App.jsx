import React, { useState, useEffect } from "react";

const CounterAndForm = () => {
  // Counter State: Initialize from localStorage using lazy initialization
  const [counter, setCounter] = useState(() => {
    const savedCounter = localStorage.getItem("counter");
    return savedCounter ? parseInt(savedCounter, 10) : 0; // Use saved value or default to 0
  });

  // Email and Password State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Counter: Save value to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("counter", counter);
  }, [counter]);

  // Clear sessionStorage on reload
  useEffect(() => {
    const handlePageReload = () => {
      sessionStorage.clear();
    };

    // Add event listener for page reload
    window.addEventListener("beforeunload", handlePageReload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handlePageReload);
    };
  }, []);

  // Form: Save email and password to sessionStorage
  const handleFormSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);
    alert("Email and Password saved to session storage!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Counter Section */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Counter
      </h2>
      <div className="flex justify-center items-center space-x-4 mb-4">
        <button
          onClick={() => setCounter(counter - 1)}
          className="w-12 h-12 bg-blue-500 text-white text-xl rounded-full hover:bg-blue-600 flex justify-center items-center"
        >
          -
        </button>
        <span className="text-xl font-semibold">{counter}</span>
        <button
          onClick={() => setCounter(counter + 1)}
          className="w-12 h-12 bg-blue-500 text-white text-xl rounded-full hover:bg-blue-600 flex justify-center items-center"
        >
          +
        </button>
      </div>
      <p className="text-center text-gray-600 text-sm sm:text-base">
        The counter value persists even if you close and reopen the tab.
      </p>

      <hr className="my-6" />

      {/* Form Section */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Save Email and Password
      </h2>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none text-sm sm:text-base"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none text-sm sm:text-base"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Save
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4 text-sm sm:text-base">
        The email and password will be cleared if you close or reload the tab.
      </p>
    </div>
  );
};

export default CounterAndForm;
