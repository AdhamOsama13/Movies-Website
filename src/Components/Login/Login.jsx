import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function Login({saveUserData}) {
let navigate =useNavigate();
const [errorList, seterrorList] = useState([])
const [error, setError] = useState('') 
const [isLoading, setisLoading] = useState(false) 
const [user, setUser] = useState({

  email:'',
  password:''
})
function getUserData(eventInfo) {
  let myUser={...user}
  myUser[eventInfo.target.name]=eventInfo.target.value;
  setUser(myUser);
  console.log(myUser)
}

async function sendloginDataToApi() {
 let {data}=await axios.post(`https://route-movies-api.vercel.app/signin`, user);
 console.log(data.message)
 if (data.message == 'success') {
  setisLoading(false)
  localStorage.setItem('userToken', data.token)
  saveUserData();
  navigate('/');
  
 }else {
  setisLoading(false)

  setError(data.message)
 }
}

function sumbitloginForm(e){
  setisLoading(true);
  e.preventDefault();
  
 let validation =  validateFormlogin();
 if(validation.error){
  setisLoading(false);
  seterrorList(validation.error.details)
 }else {
sendloginDataToApi();
 }
}
function validateFormlogin() {
 let scheme= Joi.object({

    email:Joi.string().email({  tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().pattern(/^[A-Z][a-z]{3,6}/)
  });
  return scheme.validate(user, {abortEarly:false})
}

  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>
  {errorList.map((err, index)=> {
    if(err.context.label == 'password') {
      return <div key={index} className="alert alert-danger my-2">Password invalid</div>
    }else {
    return  <div key={index} className="alert alert-danger my-2">{err.message}</div>
    }}
  )}
  {error.length>0? <div className="alert alert-danger my-2">{error}</div>:'' }
  <form onSubmit={sumbitloginForm}>

     <label htmlFor="email">Email</label>
     <input onChange={getUserData} type="email" className="form-control my-input my-2" name="email" id="email"/>
     <label htmlFor="password">Password</label>
     <input onChange={getUserData} type="password" className="form-control my-input my-2" name="password" id="password"/>
      
      <button className="btn btn-info">
        {isLoading==true?<i className='fa fa-spinner fa-spin'></i>:'login'}
      </button>



  </form>
  </>
}
