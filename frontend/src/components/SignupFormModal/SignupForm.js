import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupForm( { setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validateErrors, setValidateErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  
  useEffect(() => {
    const errors = []
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) errors.push("Please provide a valid email.");
    if(password !== confirmPassword) errors.push('Confirm Password field must be the same as the Password field.')
    if (username.length < 4)
    errors.push("Please provide a username with at least 4 characters.");
    if(password.length < 6) errors.push("Password must be 6 characters or more.");
    if(firstName.length === 0) errors.push("First Name is required");
    if(lastName.length === 0) errors.push("Last Name is required");
    setValidateErrors(errors)
  }, [username, password, firstName, lastName, email,confirmPassword])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    
    if(validateErrors.length > 0) return
    
    const playload = {
      email,
      username,
      password,
      firstName,
      lastName
    }
    
    let goodSignUp = await dispatch(sessionActions.signup(playload))
    if(goodSignUp && validateErrors.length === 0) {
      history.push('/')
    }
    
    setEmail('')
    setUsername('')
    setLastName('')
    setFirstName('')
    setPassword('')
    setConfirmPassword('')
    setValidateErrors([])
  };
  
  if (sessionUser) return <Redirect to="/" />;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1> Sign Up Form </h1>
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
        <ul className="errors">
          {hasSubmitted && validateErrors.length > 0 && (
            <h2>Opps you done quacked up!</h2>
          )}
          {hasSubmitted &&
            validateErrors.length > 0 &&
            validateErrors.map((error, idx) => (
              <li key={idx}>
                <img
                  className="errorDuck"
                  src="https://i.imgur.com/7OuSWd1.png"
                  alt=""
                />{" "}
                {error}
              </li>
            ))}
        </ul>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupForm;
