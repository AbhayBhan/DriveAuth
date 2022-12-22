import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <>
        <nav className='container flex flex-row p-6 border-b-2 border-dashed mb-12 border-black justify-between w-[100vw]'>
            <h1 className='text-5xl font-bold'>Poodle.</h1>
            <button onClick={() => navigate('/user')} className='text-xl font-bold rounded-xl px-2 bg-[#989DD0] text-purple-900 transition-all duration-100 hover:text-[#989DD0] hover:bg-purple-900'>Your Profile</button>
        </nav>
    </>
  )
}

export default Navbar