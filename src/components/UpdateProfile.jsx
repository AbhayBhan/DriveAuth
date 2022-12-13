import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
    const passRef = useRef();
    const confPassRef = useRef();
    const {updatePass} = useAuth();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if(passRef.current.value !== confPassRef.current.value){
            return setErr("Passwords Do not match!");
        }
        
        try{
          await updatePass(passRef.current.value);
          setLoading(false);
          navigate('/');
        }
        catch (error) {
          setErr(error.message);
          setLoading(false);
        }
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h3 className='text-center font-weight-bold mb-3'>Change Password</h3>
                {err && <Alert variant='danger'>{err}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="password">
                        <Form.Label>Enter the new Password</Form.Label>
                        <Form.Control type='password' required ref={passRef} />
                    </Form.Group>
                    <Form.Group id="confPassword">
                        <Form.Label>Confirm the Password</Form.Label>
                        <Form.Control type='password' required ref={confPassRef} />
                    </Form.Group>
                    <Button disabled={loading} type='submit' className='w-100 mt-4'>Change Password</Button>
                </Form>
            </Card.Body>
        </Card>
    </>
  )
}

export default SignUp