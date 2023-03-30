import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  
  const navigate = useNavigate();
  const [cred, setCred] = useState({ name:"", email:"", password:"", cpassword:"" });

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = cred;
    const response = await fetch("https://inotebook-uuc5.onrender.com/api/auth/createuser", {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name,email,password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken)
      navigate('/');
      props.showAlert("Account Created Successfully","success");
    }
    else {
      props.showAlert("Invalid Credentials","danger");
    }
  }

  return (
    <>
    <h3 style={{textAlign:"center",marginTop:"15px"}}>Create a new account</h3>
    <div style={{ display: "flex", justifyContent: "center" }} className="my-5">
      <form style={{ width: "500px", height: "400px" }} onSubmit={handleSubmit}>
        <div className="mb-3" >
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} name="name" required />
        </div>
        <div className="mb-3" >
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name="email" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name="password" required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
    </>
  )
}
