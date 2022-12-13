import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const confPassRef = useRef();
    const {signUp} = useAuth();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(passRef.current.value !== confPassRef.current.value){
            return setErr("Passwords Do not match!");
        }
        try{
            setErr('');
            setLoading(true);
            await signUp(emailRef.current.value, passRef.current.value);
            navigate('/')
        } catch(err){
            setErr(err.message);
        }
        setLoading(false);
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h3 className='text-center font-weight-bold mb-3'>Sign Up!</h3>
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
                    <Form.Group id="confPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' required ref={confPassRef} />
                    </Form.Group>
                    <Button disabled={loading} type='submit' className='w-100 mt-4'>Create Account</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already Have an Account? <Link to='/login'>Login Here</Link> 
        </div>
    </>
  )
}

export default SignUp