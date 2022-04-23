import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../style.css"

export default ()=> {
  // const [firstname, setfirstname] = useState("");
  // const [lastname, setlastname] = useState("");
  // const [mobile, setmobile] = useState("");
  // const [email, setemail] = useState("");
  // const [password, setpassword] = useState("");
  //const [existemailmsg, setexistemailmsg] = useState("");
  const [errmsg, seterrmsg] = useState("");
  const [loading, setloading] = useState("");
  const [submitmsg, setsubmitmsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = async (data) => {
    try {
      const response=await axios.post(`${process.env.REACT_APP_SURL}/register`,data)
      if(response.status==200){
        setsubmitmsg('Your account create successfully')
        reset({})
        //console.log("success")
      }
  
    } catch (err) {
      if(err=='Error: Request failed with status code 422')
      { setsubmitmsg(" ")
        seterrmsg('email is already exist')
        //console.log('exist')
      }
      else{
        setsubmitmsg(" ")
        seterrmsg('something is wrong try again')
        //console.log('error')
      }
    }
  };
  // const onSubmit = data => console.log(data);

  return (
    <div className="mt-5 p-5 signup_page">
      
      <div className="container signup-form mt-5">
        
        <form className="p-5 card" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center">Sign up here</h2>
        <br />
          <div className="form-group">
            <input
              type="text"
              className={
                errors.firstname ? "form-control is-invalid" : "form-control"
              }
              {...register("firstname", { required: "this field is required" })}
              placeholder="Enter your firstname"
            />
            <p className="text-danger">{errors.firstname?.message}</p>
          </div>
          <div className="form-group">
            <input
              type="text"
              className={
                errors.lastname ? "form-control is-invalid" : "form-control"
              }
              {...register("lastname", { required: "this field is required" })}
              placeholder="Enter your lastname"
            />
            <p className="text-danger">{errors.lastname?.message}</p>
          </div>
          <div className="form-group">
            <input
              type="number"
              className={
                errors.mobile ? "form-control is-invalid" : "form-control"
              }
              {...register("mobile", {
                required: "this field is required",
                minLength: { value: 10, message: "not less than 10" },
                maxLength: { value: 10, message: "not greater than 10" }
              })}
              placeholder="Enter your mobile number"
            />
            <p className="text-danger">{errors.mobile?.message}</p>
          </div>
          <div className="form-group">
            <input
              type="text"
              className={
                errors.email ? "form-control is-invalid" : "form-control"
              }
              {...register("email", {
                required: "this field is rquired",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "give a valid email",
                },
              })}
              placeholder="Enter your email"
            />
            {/* <p className='text-danger'>{errors.email ?"email is required":""}</p> */}
            <p className="text-danger">{errors.email?.message}</p>
          </div>

          <div className="form-group">
            <input
              type="password"
              className={
                errors.password ? "form-control is-invalid" : "form-control"
              }
              {...register("password", {
                required: "this field is rquired",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    "password must contain uppercase,lowercase,number,special character and password length must be more than 8",
                },
              })}
              placeholder="Enter your password"
            />
            <p className="text-danger">{errors.password?.message}</p>
          </div>
          <div className="form-group">
            <input
              type="password"
              className={
                errors.cpassword ? "form-control is-invalid" : "form-control"
              }
              {...register('cpassword',{required: "this field is rquired",
              validate: value =>
              value === password.current || "The passwords do not match"})}
              placeholder="Confirm your password"
            />
            <p className="text-danger">{errors.cpassword?.message}</p>
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="signup" />
          </div>
          <p className="text-success">{submitmsg}</p>
          <p className="text-danger">{errmsg}</p>
          <p>
            already have account? <Link to="/login">click here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
