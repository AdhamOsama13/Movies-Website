import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Movies from './Components/Movies/Movies'
import TV from './Components/TV/TV'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import People from './Components/People/People'
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import Profile from './Components/Profile/Profile';
import { useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import { Offline } from 'react-detect-offline';
import notFound from './Components/notFound/notFound';



function App() {

  useEffect(()=> {
    if(localStorage.getItem('userToken')!==null){
      saveUserData();
    }
  }, [])

  const [userData, setuserData] = useState(null)

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken')
  let decodedToken  =  jwtDecode(encodedToken)
  setuserData(decodedToken)
    
  }

  let routers= createBrowserRouter([
    {path:'/' , element:<Layout setuserData={setuserData} userData={userData}/>,errorElement:<notFound/>,children:[
    
      {index:true , element: <ProtectedRoute userData={userData}><Home/></ProtectedRoute>},
      {path:'movies' , element:<ProtectedRoute userData={userData}><Movies/></ProtectedRoute>},
      {path:'people' , element: <ProtectedRoute userData={userData}><People/></ProtectedRoute>},
      {path:'profile' , element:<ProtectedRoute userData={userData}><Profile userData={userData}/></ProtectedRoute>},
      {path:'tv' , element: <ProtectedRoute userData={userData}><TV/></ProtectedRoute>},
      {path:'itemdetails/:id/:media_type' , element: <ProtectedRoute userData={userData}><ItemDetails/></ProtectedRoute>},
      {path:'login' , element:<Login saveUserData={saveUserData}/>},
      {path:'register' , element:<Register/>},
      
    ]}
    
  ])
  return<>
  <div>
    <Offline><div className='offline'>You are Offline!</div></Offline>
  </div>
   <RouterProvider router={routers}/>
   </>
}

export default App;
