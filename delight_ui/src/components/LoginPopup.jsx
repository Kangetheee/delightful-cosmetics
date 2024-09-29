import React, { useState } from 'react'
import { FaXmark } from 'react-icons/fa6'

const LoginPopup = ({ setShowLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false)  // Manage login vs signup state

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logic for handling login or signup form submission
    if (isSignUp) {
      console.log('Sign Up logic here')
    } else {
      console.log('Login logic here')
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flexCenter bg-black/50 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-md max-w-md w-full'>
        
        {/* Close Button */}
        <FaXmark 
          className='text-xl cursor-pointer float-right' 
          onClick={() => setShowLogin(false)} 
        />

        <h4 className='text-center text-2xl mb-4'>
          {isSignUp ? "Sign Up" : "Login"}
        </h4>

        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div className='space-y-4 mb-4'>
            {isSignUp && (
              <input
                type='text'
                placeholder='Your Name' 
                required={isSignUp}  // Name field is required only for Sign Up
                className='border border-slate-900/20 w-full p-2 pl-4 rounded-md outline-none'
              />
            )}
            <input
              type='email'
              placeholder='Your Email'
              required
              className='border border-slate-900/20 w-full p-2 pl-4 rounded-md outline-none'
            />
            <input
              type='password'
              placeholder='Your Password'
              required
              className='border border-slate-900/20 w-full p-2 pl-4 rounded-md outline-none'
            />
          </div>

          {/* Checkbox (e.g., terms and conditions) */}
          {isSignUp && (
            <div className='mb-4'>
              <label className='flex items-center'>
                <input type='checkbox' required className='mr-2' />
                Agree to terms and conditions
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-secondary text-white p-2 rounded-md'
          >
            {isSignUp ? "Create Account" : "Login"}
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <p className='text-center mt-4'>
          {isSignUp ? "Already have an account?" : "Don't have an account?"} 
          <span
            className='text-secondary cursor-pointer ml-1'
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginPopup
