import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'

const SignupForm = () => {
    const [details, setDetails] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        email: '',
        password: '',
    });

    const [addUserMutation] = useMutation(ADD_USER)
    const addUser = async (details) => {
        try {
            await addUserMutation(details)({
                variables: {
                    firstName: details.firstName,
                    lastName: details.lastName,
                    address: details.address,
                    city: details.city,
                    state: details.state,
                    zipcode: details.zipcode,
                    phone: details.phone,
                    email: details.email,
                    password: details.password
                }
            })
        }
        catch (Error) {
            throw Error
        }
    }


    return (
        <div className='signup-page'>
            {(Error !== "") ? (<div className="error">[Error]</div>) : ""}
            <Form onSubmit={addUser}>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" onChange={e => setDetails({ ...details, firstName: e.target.value })} value={details.firstName}> </Form.Control>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" onChange={e => setDetails({ ...details, lastName: e.target.value })} value={details.lastName}> </Form.Control>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" onChange={e => setDetails({ ...details, address: e.target.value })} value={details.address}> </Form.Control>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" onChange={e => setDetails({ ...details, city: e.target.value })} value={details.city}> </Form.Control>
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" onChange={e => setDetails({ ...details, state: e.target.value })} value={details.state}> </Form.Control>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control type="text" onChange={e => setDetails({ ...details, zipcode: e.target.value })} value={details.zipcode}> </Form.Control>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" onChange={e => setDetails({ ...details, phone: e.target.value })} value={details.phone}> </Form.Control>

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Make Password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                </Form.Group>
                <Button className='formButton' variant="secondary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default SignupForm;