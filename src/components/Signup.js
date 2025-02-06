import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [credentials, setcredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password, cpassword} = credentials;

    if(password !== cpassword){
        alert("Passwords doesnot match");
        return;
    }

    const response = await fetch("http://localhost:2700/api/auth/createUser", {
       
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name, email, password
      }),
    });

    const json = await response.json();

    console.log(json);

    if (json.success) {
      //redirect
      console.log("Success");

      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Your Name"
            onChange={onChange}
            name = "name"
            value = {credentials.name}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            name = "email"
            value = {credentials.email}
          />

          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-2">
          <label htmlFor="cpassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={onChange}
            name = "password"
            value = {credentials.password}
            minLength={5}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Password"
            name = "cpassword"
            value = {credentials.cpassword}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
