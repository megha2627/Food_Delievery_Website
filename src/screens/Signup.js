import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Signup = () => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    });
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });
            const json = await response.json();
            console.log(json);

            if(json.success) {
                alert("Successfully created account!");
            } else {
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
        <>
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name='name' 
                        value={credentials.name} 
                        onChange={onChange} 
                    />
                </div>
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
                <div className="mb-3">
                    <label htmlFor="geolocation" className="form-label">Location</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name='geolocation' 
                        value={credentials.geolocation} 
                        onChange={onChange} 
                        id="geolocation"
                    />
                </div>
                <button type="submit" className="btn btn-primary m-3">Submit</button>
                <Link to="/login" className="btn btn-danger m-3">Already a user?</Link>
            </form>
        </div>
        </>
    );
};

export default Signup;