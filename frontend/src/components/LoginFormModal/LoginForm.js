import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'


function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory()

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    history.push(`/logged-in`)

    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <h1> Log In </h1>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      <button type="submit">Log In</button>
      <button
        onClick={() => {
          setCredential("Demo-lition")
          setPassword("password")
        }}
      >
        Demo User
      </button>
    </form>
  );
}

export default LoginForm;
