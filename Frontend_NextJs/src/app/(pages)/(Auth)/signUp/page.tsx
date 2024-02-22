'use client'
import React, { useState } from 'react'
const Signup = () => {
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
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
                    <h2 className='text-2xl text-black font-bold'>SIGNUP</h2>
                    <div className='w-full bg-slate-200 h-1'></div>
                    <div>
                        <form onSubmit={(e) => { handleSubmit(e) }}>
                            <div className='flex flex-col'>
                                <label>Fullname</label>
                                <input type='text'
                                    value={userData?.fullName}
                                    onChange={handleChange}
                                    name="fullName"
                                    className='bg-slate-100 border-2 border-slate-200 py-2 rounded-lg shadow-md' />
                            </div>
                            <div className='flex flex-col mt-5'>
                                <label>Email</label>
                                <input type='text'
                                    value={userData?.email}
                                    onChange={handleChange}
                                    name="email"
                                    className='bg-slate-100 border-2 border-slate-200 py-2 rounded-lg shadow-md' />
                            </div>
                            <div className='flex flex-col mt-5'>
                                <label>Phone number</label>
                                <input type='text'
                                    value={userData?.phoneNumber}
                                    onChange={handleChange}
                                    name="phoneNumber"
                                    className='bg-slate-100 border-2 border-slate-200 py-2 rounded-lg shadow-md' />
                            </div>
                            <div className='flex flex-col mt-5'>
                                <label>Password</label>
                                <input type='text'
                                    value={userData?.password}
                                    onChange={handleChange}
                                    name="password"
                                    className='bg-slate-100 border-2 border-slate-200 py-2 rounded-lg shadow-md' />
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type='submit'
                                    className='py-5 px-12 shadow-md bg-orange-400 mt-5 rounded-lg '>
                                    Signup
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup