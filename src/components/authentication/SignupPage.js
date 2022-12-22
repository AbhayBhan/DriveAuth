import React, { useRef, useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SignupPage = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confpasswordRef = useRef();
    const {currentUser, signin} = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(passwordRef.current.value !== confpasswordRef.current.value){
            setError("The passwords do not match!")
            return;
        }
        try{
            setError('');
            await signin(emailRef.current.value, passwordRef.current.value);
            navigate('/home');
        }
        catch(err){
            setError(err.message);
        }
    }

  return (
    <div className='container flex justify-center w-[300px] mx-auto'>
    <div className='container flex flex-col mt-14 p-4 items-center mx-auto border-2 rounded-lg bg-slate-50 border-black'>
        <h1 className='text-4xl font-bold mb-12'>Get your own Poodle.</h1>
        {currentUser && currentUser.email}
        <form onSubmit={handleSubmit} className='flex flex-col items-center space-x-0 space-y-4'>
            <div className='flex flex-col items-start space-y-1'>
                <h3 className='text-sm'>Enter an Email</h3>
                <input ref={emailRef} type='email' className='border-2 rounded-md border-gray-400' />
            </div>
            <div className='flex flex-col items-start space-y-1'>
                <h3 className='text-sm'>Set a Password</h3>
                <input ref={passwordRef} type='password' className='border-2 rounded-md border-gray-400' />
            </div>
            <div className='flex flex-col items-start space-y-1'>
                <h3 className='text-sm'>Confirm Password</h3>
                <input ref={confpasswordRef} type='password' className='border-2 rounded-md border-gray-400' />
            </div>
            <button type='submit' className='px-3 w-[185px] py-1 rounded-xl bg-[#989DD0] text-purple-900 transition-all duration-100 hover:text-[#989DD0] hover:bg-purple-900'>Sign in</button>
        </form>
        <h3 className='text-md mt-2'>Have an account? <Link className='text-blue-700 underline' to='/login'>Log In!</Link></h3>
        {error && <div className='bg-red-400 text-black text-center'>
            {error}
        </div>}
    </div>
    </div>
  )
}

export default SignupPage