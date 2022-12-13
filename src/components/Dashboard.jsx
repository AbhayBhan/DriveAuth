import React from 'react'
import {Card, Button} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link, useNavigate} from 'react-router-dom';

const Dashboard = () => {
  const {currentUser, logout} = useAuth();
  const navigate = useNavigate();

  const handleOut = async () => {
    try{
      await logout();
      navigate('/login');
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
    <Card>
      <Card.Body>
        <h2 className='text-center mb-4'> LOGGED IN AS </h2>
        <h3 className='text-center mb-3'>{currentUser && currentUser.email}</h3>
        <Link to="/updateprof" className='btn btn-secondary w-100 mb-2'>Update Data</Link>
      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        <Button variant="link" onClick={handleOut}>Log out</Button>
    </div>
    </>
  )
}

export default Dashboard