import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {

    const [credentials, setCredentials] = useState({ name: '', password: '', email: '', geolocation: '' });
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await fetch('http://localhost:5000/user/createuser', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.geolocation
                })
            });
            const jsonResponse = await response.json();
            console.log('jsonResponse: ', jsonResponse);

            if (!jsonResponse.success) {
                alert('Enter Valid Credentials to continue.');
            } else {
                alert('User is successfully created.');
            }
        } catch (error) {
            console.log('Error occurred while creating user. ', error);
        }
    };

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };
    return (
        <div className='container'>
            <h1 className='mt-3'>Enter your details to sign up.</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="geolocation" value={credentials.geolocation} onChange={handleChange} />
                </div>
                <button type="submit" className="m-3 btn btn-success">Signup</button>
                <Link className="m-3 btn btn-danger" to="/">Already a user</Link>
            </form>
        </div>
    );
}

export default Signup;
