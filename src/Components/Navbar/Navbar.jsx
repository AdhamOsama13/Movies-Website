import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({userData , logOut}) {
 
  return ( <nav className='p-2 d-flex justify-content-between flex-md-row flex-column'>
    <div className="left-nav flex-md-row flex-column d-flex align-items-center">

      <h1 className='m-0 pe-3'>Noxe</h1>
{userData?<ul className="list-unstyled d-flex m-0 align-items-center flex-md-row flex-column">
        <li className='px-2'> <Link to='/'>Home</Link>  </li>
        <li className='px-2'> <Link to='movies'>Movies</Link>  </li>
        <li className='px-2'> <Link to='tv'>TV</Link>  </li>
        <li className='px-2'> <Link to='people'>People</Link>  </li>

      </ul>:''}
      
    </div>
    <div className="right-nav d-flex flex-md-row flex-column  align-items-center">

    <div className="social-media">
      <i className='fab fa-facebook mx-1'></i>
      <i className='fab fa-instagram mx-1'></i>
      <i className='fab fa-twitter mx-1'></i>
      <i className='fab fa-spotify mx-1'></i>
      <i className='fab fa-youtube mx-1'></i>
    </div>

      <ul className="list-unstyled flex-md-row flex-column d-flex m-0 align-items-center">
        
        {userData?<>
        <li className='px-2 cursor' > <span onClick={logOut}>Logout</span>  </li>
        <li className='px-2'> <Link to='/profile'>Profile</Link>  </li>
        </> : <>
        <li className='px-2'> <Link to='login'>Login</Link>  </li>
        <li className='px-2'> <Link to='/register'>Register</Link>  </li>
        </>}
      </ul>
    </div>
    </nav>
  )
}
