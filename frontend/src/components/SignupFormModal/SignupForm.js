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
  const [validateErrors, setValidateErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  
  useEffect(() => {
    const errors = {}
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) errors.email = "Please provide a valid email.";
    if(password !== confirmPassword) errors.confirmPassword ='Confirm Password field must be the same as the Password field.'
    if (username.length < 4)
    errors.username ="Please provide a username with at least 4 characters.";
    if(password.length < 6) errors.password = "Password must be 6 characters or more."
    if(firstName.length === 0) errors.firstName = "First Name is required"
    if(lastName.length === 0) errors.lastName = "Last Name is required"
    setValidateErrors(errors)
  }, [username, password, firstName, lastName, email,confirmPassword])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    
    if(Object.keys(validateErrors).length > 0) return
    
    const playload = {
      email,
      username,
      password,
      firstName,
      lastName
    }
    
    let goodSignUp = await dispatch(sessionActions.signup(playload))
    if(goodSignUp && Object.values(validateErrors).length === 0) {
      history.push('/')
    }
    
    setEmail('')
    setUsername('')
    setLastName('')
    setFirstName('')
    setPassword('')
    setConfirmPassword('')
    setValidateErrors({})
  };
  
  if (sessionUser) return <Redirect to="/" />;
  return (
    <>
      <form onSubmit={handleSubmit}>
        {hasSubmitted ? <h2>Opps you done qucked up</h2> :
        <h1> Sign Up Form </h1>
        }
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        {hasSubmitted && validateErrors.firstName && (
          <li className="errors">
            <img
              className="errorDuck"
              src="https://i.imgur.com/7OuSWd1.png"
              alt=""
            />{" "}
            {validateErrors.firstName}
          </li>
        )}
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        {hasSubmitted && validateErrors.lastName && (
          <li className="errors">
            <img
              className="errorDuck"
              src="https://i.imgur.com/7OuSWd1.png"
              alt=""
            />{" "}
            {validateErrors.lastName}
          </li>
        )}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {hasSubmitted && validateErrors.email && (
          <li className="errors">
            <img
              className="errorDuck"
              src="https://i.imgur.com/7OuSWd1.png"
              alt=""
            />{" "}
            {validateErrors.email}
          </li>
        )}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {hasSubmitted && validateErrors.username && (
          <li className="errors">
            <img
              className="errorDuck"
              src="https://i.imgur.com/7OuSWd1.png"
              alt=""
            />{" "}
            {validateErrors.username}
          </li>
        )}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {hasSubmitted && validateErrors.password && (
          <li className="errors">
            <img
              className="errorDuck"
              src="https://i.imgur.com/7OuSWd1.png"
              alt=""
            />{" "}
            {validateErrors.password}
          </li>
        )}
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        {hasSubmitted && validateErrors.confirmPassword && (
          <li className="errors">
            <img
              className="errorDuck"
              src="https://i.imgur.com/7OuSWd1.png"
              alt=""
            />{" "}
            {validateErrors.confirmPassword}
          </li>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupForm;
