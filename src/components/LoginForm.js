import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginForm = ({ login }) => {
    const [details, setDetails] = useState({ email: '', password: '' });

    const submitHandler = (e) => {
        e.preventDefault();
        login(details);
    };

    const registerHandler = (e) => {
        e.preventDefault();

    }

    return (
        <div className='login-page mt-4'>
            <Form onSubmit={submitHandler} className="mt-8">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                </Form.Group>
                <Button className='formButton' variant="secondary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    );
}

export default LoginForm;