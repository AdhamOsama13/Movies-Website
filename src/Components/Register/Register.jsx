import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function Register() {
let navigate =useNavigate();
const [errorList, seterrorList] = useState([])
const [error, setError] = useState('') 
const [isLoading, setisLoading] = useState(false) 
const [user, setUser] = useState({
  first_name:'',
  last_name:'',
  age:0,
  email:'',
  password:''
})
function getUserData(eventInfo) {
  let myUser={...user}
  myUser[eventInfo.target.name]=eventInfo.target.value;
  setUser(myUser);
  console.log(myUser)
}

async function sendRegisterDataToApi() {
 let {data}=await axios.post(`https://route-movies-api.vercel.app/signup`, user);
 console.log(data.message)
 if (data.message == 'success') {
  setisLoading(false)
  navigate('/login');
  
 }else {
  setisLoading(false)

  setError(data.message)
 }
}

function sumbitRegisterForm(e){
  setisLoading(true);
  e.preventDefault();
  
 let validation =  validateFormRegister();
 if(validation.error){
  setisLoading(false);
  seterrorList(validation.error.details)
 }else {
sendRegisterDataToApi();
 }
}
function validateFormRegister() {
 let scheme= Joi.object({
    first_name:Joi.string().min(3).max(10).required(),
    last_name:Joi.string().min(3).max(10).required(),
    age:Joi.number().min(16).max(80).required(),
    email:Joi.string().email({  tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().pattern(/^[A-Z][a-z]{3,6}/)
  });
  return scheme.validate(user, {abortEarly:false})
}

  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                
            </Helmet>
  {errorList.map((err, index)=> {
    if(err.context.label == 'password') {
      return <div key={index} className="alert alert-danger my-2">Password invalid</div>
    }else {
    return  <div key={index} className="alert alert-danger my-2">{err.message}</div>
    }}
  )}
  {error.length>0? <div className="alert alert-danger my-2">{error}</div>:'' }
  <form onSubmit={sumbitRegisterForm}>
     <label htmlFor="first_name">First Name</label>
     <input onChange={getUserData} type="text" className="form-control my-input my-2" name="first_name" id="first_name"/>
     <label htmlFor="last_name">Last Name</label>
     <input onChange={getUserData} type="text" className="form-control my-input my-2" name="last_name" id="last_name"/>
     <label htmlFor="age">Age</label>
     <input onChange={getUserData} type="number" className="form-control my-input my-2" name="age" id="age"/>
     <label htmlFor="email">Email</label>
     <input onChange={getUserData} type="email" className="form-control my-input my-2" name="email" id="email"/>
     <label htmlFor="password">Password</label>
     <input onChange={getUserData} type="password" className="form-control my-input my-2" name="password" id="password"/>
      
      <button className="btn btn-info">
        {isLoading==true?<i className='fa fa-spinner fa-spin'></i>:'Register'}
      </button>



  </form>
  </>
}
