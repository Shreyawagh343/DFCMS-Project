import React from 'react'
import Login from './Login'
import Signingoogle from './Signingoogle'

const Mainpage = () => {
  return (
    <>
    <div className="">
        <h1 className='text-[1.2rem] w-[60vw] ml-[22rem] mt-[14rem]'><span className='text-blue-500'>Welcome to the Digital Forensic Management System!</span> Our platform ensures secure and efficient management of digital evidence, streamlining investigations and enhancing collaboration. Simplify your forensic processes with us and safeguard the digital world!</h1>
       <Signingoogle/>
       <button className='w-96 h-14 border border-gray-300 rounded-md md:ml-[35rem] mt-6 text-center text-black' onClick={()=>document.getElementById("my_modal_3").showModal()}><span><img src="https://img.freepik.com/premium-vector/black-letter-is-black-white-image_764382-167533.jpg?w=740" alt="" className='w-14 h-12 -ml-5 inline' /></span>Use Email And Password</button>
        <Login/>
    </div>
    </>
  )
}

export default Mainpage
