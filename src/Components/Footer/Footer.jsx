import React from 'react'

export default function Footer() {
  return <>
    <div className='text-center pt-5 my-5 container'>
    <p className='text-white h5'>Follow us on social media</p>
      <div className="footerSocialMedia d-flex w-25 justify-content-between mx-auto">
        
      <a href={"https://www.facebook.com/"} target="_blank"> <i className='fab fa-facebook mx-1'></i></a>
    <a href={"https://www.instagram.com/"} target="_blank"> <i className='fab fa-instagram mx-1'></i></a>
    <a href={"https://www.twitter.com/"} target="_blank"> <i className='fab fa-twitter mx-1'></i></a>
    <a href={"https://www.spotify.com/"} target="_blank"><i className='fab fa-spotify mx-1'></i></a>
    <a href={"https://www.youtube.com/"} target="_blank">  <i className='fab fa-youtube mx-1'></i></a>
      </div>
      <div className="rights">
        <p className='text-white pt-3 h6'>All rights reserved © 2023</p>
      </div>
      </div>
      </>
  
}
