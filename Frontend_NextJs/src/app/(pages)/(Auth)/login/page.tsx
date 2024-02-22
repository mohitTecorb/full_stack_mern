'use client'
import React, { useState } from 'react'
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(">>>>>>>>", userData);
  }
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <div className='bg-slate-200 w-[600px] p-10 rounded-2xl shadow-2xl'>
        <div className='bg-transparent'>
          <h2 className='text-2xl text-black font-bold'>LOGIN</h2>
          <div className='w-full bg-slate-200 h-1'></div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className='flex flex-col'>
                <label>Email</label>
                <input type='text'
                  name="email"
                  value={userData?.email}
                  onChange={handleChange}
                  className='bg-slate-100 border-2 border-slate-200 py-2 rounded-lg shadow-md' />
              </div>
              <div className='flex flex-col mt-5'>
                <label>Password</label>
                <input type='text'
                  name="password"
                  value={userData?.password}
                  onChange={handleChange}
                  className='bg-slate-100 border-2 border-slate-200 py-2 rounded-lg shadow-md' />
              </div>
              <div className='flex justify-end'>
                <button type='submit'
                 className='py-5 px-12 shadow-md bg-orange-400 mt-5 rounded-lg '>Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login