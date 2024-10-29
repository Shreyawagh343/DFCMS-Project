import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios  from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data =>{
      const userinfo ={
          email:data.email,
          password:data.password,
      }
      axios.post("http://localhost:4001/users/Login",userinfo) 
      .then((res)=>{
          console.log(res.data)
          if(res.data){
            toast.success('Successfully Login!');
            document.getElementById("my_modal_3").close();
            setTimeout(() => {
              localStorage.setItem("users",JSON.stringify(res.data.user))
              window.location.reload()
            }, 2000);
          }
         
      })
      .catch((err)=>{
          if(err.response){
              console.log(err)
              toast.error("Error: " + err.response.data.message);
          }
      })
  };


  
  return (
    <>
      <div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box md:w-full w-9/12 -ml-5 dark:bg-slate-900 dark:text-white" >
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={()=>document.getElementById("my_modal_3").close()}>✕</Link>
              <h3 className="font-bold text-center md:text-3xl text-2xl">Login</h3>

              <input type="email" className='w-11/12 h-12 border border-gray-300 rounded-md pl-5 md:ml-5 ml-3 mt-6 dark:bg-slate-900 dark:text-white' placeholder='Email'{...register("email", { required: { value: true, message: "This field is required" } })} />
              {errors.email && <span className='text-red-700 text-xs pl-5'>{errors.email.message}</span>}

              <input type="password" className='w-11/12 h-12 border border-gray-300 rounded-md pl-5 md:ml-5 ml-3 mt-6 dark:bg-slate-900 dark:text-white' placeholder='Password'{...register("password", { required: { value: true, message: "This field is required" }, minLength: { value: 8, message: "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number" }, pattern: { value: 8, message: "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number" } })} />
              {errors.password && <span className='text-red-700 text-xs pl-5'>{errors.password.message}</span>}
              <div className="login">
             <button className='w-11/12 h-12 border border-gray-300 rounded-md pl-5 md:ml-5 ml-3 mt-6 text-center text-white bg-blue-600'>Login</button>
              <p className=' md:text-1xl text-xs mt-3 md:ml-28 ml-9'>Don't have a account?<Link to="/signin" className='text-blue-500 pl-2'>Signup</Link></p>
              </div>
            </form>
          </div>
        </dialog>
      </div >
    </>

  )
}

export default Login