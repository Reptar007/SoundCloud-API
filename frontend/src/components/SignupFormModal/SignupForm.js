import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupForm( { setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([])
  
  
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) return <Redirect to="/logged-in" />;

  const handleSubmit = async(e) => {
    e.preventDefault();
    setHasSubmitted(true)
    if (password === confirmPassword) {
    setErrors([]);
     const newuser = await dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
      if(newuser) history.push('/logged-in')
      } else {
        return setErrors(['Confirm Password field must be the same as the Password field']);
      }
  };
    

  return (
    <>
      <form onSubmit={handleSubmit}>
        {hasSubmitted ? (
          <h2>Opps you done Qucked Up</h2>
        ) : (
          <h1> Sign Up Form </h1>
        )}
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        {hasSubmitted &&
          errors.length > 0 &&
          errors.map((error, idx) => (
            <li className="errors" key={idx}>
              <img
                className="errorDuck"
                src="https://i.imgur.com/7OuSWd1.png"
                alt=""
              />{" "}
              {error}
            </li>
          ))}

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupForm;
