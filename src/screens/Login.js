import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ password: '', email: '' });
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                })
            });
            const jsonResponse = await response.json();
            console.log('jsonResponse: ', jsonResponse);

            if (!jsonResponse.success) {
                alert('Enter Valid Credentials to continue.');
            } else {
                localStorage.setItem('authToken', jsonResponse.authToken);
                console.log(localStorage.getItem('authToken'));
                navigate("/");
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
            <h1 className='mt-3'>Enter your credentials to Login.</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} />
                </div>
                <button type="submit" className="m-3 btn btn-success">Login</button>
                <Link className="m-3 btn btn-danger" to="/signup">I'm a new User</Link>
            </form>
        </div>
    );
}

export default Login;
