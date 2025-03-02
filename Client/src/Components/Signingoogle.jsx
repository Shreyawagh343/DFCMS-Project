import React from 'react'
import {GoogleAuthProvider ,  signInWithPopup} from "firebase/auth"
import { auth } from './Firebase';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


function googleLogin(){
    const provider= new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async(result)=>{
        console.log(result);
        if(result.user){
          toast.success("User logged in Successfully!",{
            position:"top-center",
          });
          window.location.href="/home";
        }
    })

}
const Signingoogle = () => {
  return (
    <>
    <button className='w-96 h-14 border border-gray-300 rounded-md md:ml-[35rem] mt-6 text-center text-black' onClick={googleLogin}><span><img src="https://cdn.iconscout.com/icon/free/png-256/free-google-240-434167.png" alt="" className='w-14 h-12 -ml-5 inline'/></span>Sign-in with google</button>
    <Link to="/loginhome"><button className='w-96 h-14 border border-gray-300 rounded-md md:ml-[35rem] mt-6 text-center text-black' >Use Username and Password</button></Link>
    </>
  )
}

export default Signingoogle