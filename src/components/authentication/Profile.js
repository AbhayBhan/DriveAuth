import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {signout} = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try{
      await signout();
      navigate('/login');
    }
    catch(err){
      console.log(err.message);
    }
  }
  return (
    <div>
      <button onClick={handleSignout}>Signout</button>
    </div>
  )
}

export default Profile