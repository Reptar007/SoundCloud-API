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

  const user = useSelector(state => state.session.user)


  const handleSubmit = (e) => {
    e.preventDefault();
    const userErrors = []


    if(userErrors.length > 0) return
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        console.log('hello from .catch ', data)
        if (data && data.errors) setErrors(data.errors);
      }
    );
  

  // if(response.errors) {
  //     response.errors.forEach(e => {
  //       userErrors.push(e)
  //     })  
  // }
  // setErrors(userErrors)

  
  // // history.push('/logged-in')
  // return console.log(response)
};

console.log('this is my errors', errors)
  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <button type="submit">Log In</button>
      <button 
        type="submit"
        onClick={() => {
          setCredential("Demo-lition");
          setPassword("password")
        }}
      > Demo User</button>
    </form>
  );
}

export default LoginForm;
