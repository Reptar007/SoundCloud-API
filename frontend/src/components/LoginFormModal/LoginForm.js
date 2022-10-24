import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect ,useHistory } from 'react-router-dom'

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("")
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

 const sessionUser = useSelector((state) => state.session.user);

 if (sessionUser) return <Redirect to="/logged-in" />;

  const handleSubmit = async(e) => {
    e.preventDefault();
    setHasSubmitted(true)

    setErrors([]);
    let newUser = await dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors)
        }
      }
    );

    if(newUser) history.push('/logged-in')
};
 
  return (
    <form onSubmit={handleSubmit}>
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
        {hasSubmitted && errors.length > 0 && (
            errors.map((error, idx) => (
            <li className="errors" key={idx}>
              <img
                className="errorDuck"
                src="https://i.imgur.com/7OuSWd1.png"
                alt=""
              />{" "}
              {error}
            </li>
          )))}   
      <button type="submit">Log In</button>
      <button
        type="submit"
        onClick={() => {
          setCredential("Demo-lition");
          setPassword("password");
        }}
        >
        Demo User
      </button>
    </form>
  );
}

export default LoginForm;
