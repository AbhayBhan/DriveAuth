import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const {login} = useAuth();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setErr('');
            setLoading(true);
            await login(emailRef.current.value, passRef.current.value);
            navigate('/');
        } catch(err){
            setErr(err.message);
        }
        setLoading(false);
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h3 className='text-center font-weight-bold mb-3'>Log In</h3>
                {err && <Alert variant='danger'>{err}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' required ref={emailRef} />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' required ref={passRef} />
                    </Form.Group>
                    <Button disabled={loading} type='submit' className='w-100 mt-4'>Log in</Button>
                    <div className='w-100 mt-3'>
                        <Link to="/resetpass">Forgot Password?</Link>
                    </div>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Don't have an account? <Link to="/signup">Create here</Link>
        </div>
    </>
  )
}

export default Login