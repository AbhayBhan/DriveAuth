import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
    const emailRef = useRef();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {resetPass} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setError('');
            await resetPass(emailRef.current.value);
            setSuccess("Instructions has been sent!");
            setTimeout(() => {
                navigate('/login')
            },2000);
        }
        catch(err){
            setSuccess('');
            setError(err.message);
        }
    }

  return (
    <div className='container flex justify-center w-[300px] mx-auto'>
    <div className='container flex flex-col mt-14 p-4 items-center mx-auto border-2 rounded-lg bg-slate-50 border-black'>
        <h1 className='text-4xl font-bold mb-12'>Regain your Poodle.</h1>
        {success && <div className='bg-green-400 mb-2 text-black text-center'>
            {success}
        </div>}
        <form onSubmit={handleSubmit} className='flex flex-col items-center space-x-0 space-y-4'>
            <div className='flex flex-col items-start space-y-1'>
                <h3 className='text-sm'>Enter your Email</h3>
                <input ref={emailRef} type='email' className='border-2 rounded-md border-gray-400' />
            </div>
            <button type='submit' className='px-3 w-[185px] py-1 rounded-xl bg-[#989DD0] text-purple-900 transition-all duration-100 hover:text-[#989DD0] hover:bg-purple-900'>Reset Password</button>
        </form>
        {error && <div className='bg-red-400 text-black text-center'>
            {error}
        </div>}
    </div>
    </div>
  )
}

export default ForgotPass