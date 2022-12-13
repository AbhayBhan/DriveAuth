import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const emailRef = useRef();
    const {resetPass} = useAuth();
    const [err, setErr] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setMsg('');
            setErr('');
            setLoading(true);
            await resetPass(emailRef.current.value);
            setMsg('The instructions has been sent to your email');
        } catch(err){
            setErr(err.message);
        }
        setLoading(false);
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h3 className='text-center font-weight-bold mb-3'>Reset Password</h3>
                {err && <Alert variant='danger'>{err}</Alert>}
                {msg && <Alert variant='success'>{msg}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' required ref={emailRef} />
                    </Form.Group>
                    <Button disabled={loading} type='submit' className='w-100 mt-4'>Reset Password</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Done resetting? <Link to="/login">Log in here</Link>
        </div>
    </>
  )
}

export default Login