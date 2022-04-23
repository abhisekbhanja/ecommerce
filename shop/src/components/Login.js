import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loginerrmsg, setloginerrmsg] = useState("");

    let navigate=useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit=async(data)=>{
       
        try {
       
        const ld=await axios.post(`${process.env.REACT_APP_SURL}/login`,data)
       if(ld){
           //console.log(ld.data)
        localStorage.setItem('loginusertoken',ld.data.token);
        navigate("/")
        window.location.reload(false);
        }
       else{console.log("invalid user")}
        } 
        catch (err) {
            if(err=="Error: Network Error"){console.log("something wrong !")}
          else if(err=="Error: Request failed with status code 422")
        {setloginerrmsg("invalid credentials")}
        }
    }
  return (
    <div className='mt-5 p-5 signup_page'>
    
    <div className="container signup-form mt-5">


       <form className='p-5 card' onSubmit={handleSubmit(onSubmit)}>
       <h2 className='text-center'>Login here</h2>
       <br />
       <div className="form-group">
          <input type="text"
          className={errors.email?'form-control is-invalid':'form-control'}
         {...register("email",{required:"this field is required"})}
          placeholder="Enter your email" />
          <p className='text-danger'>{errors.email?.message}</p>
        </div>
       <div className="form-group">
          <input type="password"
          className={errors.password?'form-control is-invalid':'form-control'}
          {...register("password",{required:"this field is required"})}
          placeholder="Enter your password" />
          <p className='text-danger'>{errors.password?.message}</p>
        </div>
       <div className="form-group">
          <input type="submit" className='btn btn-success' value="login" />
          <p className='text-danger'>{loginerrmsg}</p>
        </div>
        <p>create an account? <Link to='/signup'>click here</Link></p>
       
       </form>
    </div>
</div>
  )
}
