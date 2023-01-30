import React from 'react'
import { Helmet } from 'react-helmet'

export default function Profile({userData}) {
    let {first_name, last_name, email, age}=userData
  return (<>
   <Helmet>
                <meta charSet="utf-8" />
                <title>My Profile</title>
                
            </Helmet>
    <h4>Name : {first_name} {last_name}</h4>
    <h4>Email : {email}</h4>    
    <h4>Age : {age}</h4>    
    </>)
}
