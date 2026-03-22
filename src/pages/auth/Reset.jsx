import React, { useState } from 'react';
import {useParams} from "react-route-dom";

const Reset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {token}=useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log("Password reset successful!");
      // Add your API call logic here

    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="reset-form-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="password"
          placeholder="Enter Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input 
          type="password"
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default Reset;