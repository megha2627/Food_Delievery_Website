import React from 'react'
import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({
   
    email: "",
    password: ""
    
});
let navigate=useNavigate();

const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:4000/api/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              
                email: credentials.email,
                password: credentials.password
               
            })
        });
        const json = await response.json();
        console.log(json);

        if(json.success) {
            localStorage.setItem("userEmail",credentials.email);
            localStorage.setItem("authToken",json.authToken);
            console.log(localStorage.getItem("authToken"));
          //alert("Successfully created account!");
          navigate("/");
            
        } 

        else {
            alert("Failed to create account");
        }
        
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred");
    }
}

const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    
    <div>
       <div className="container">
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name='email' 
                        value={credentials.email} 
                        onChange={onChange} 
                        id="email" 
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        name='password' 
                        value={credentials.password} 
                        onChange={onChange} 
                        id="password"
                    />
                </div>
               
                <button type="submit" className="btn btn-primary m-3">Submit</button>
                <Link to="/createuser" className="btn btn-danger m-3">I am a new user</Link>
             
            </form>
        </div>
      
    </div>
  )
}
