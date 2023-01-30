import axios from 'axios'
import React, { useState,useEffect } from 'react'
import MediaItem from '../MediaItem/MediaItem'

export default function TV() {
  const [tredingPeople, setTrendingPeople] = useState([])
  async function getTrending(callback){

    let {data}= await axios.get(`https://api.themoviedb.org/3/trending/person/week?api_key=aa15a4edd81fdb1bc0dd3822b4f36c7e`)
    callback(data.results);
  
    }
    useEffect(()=> {
      getTrending(setTrendingPeople)
  
  } , [])
  return (
    <div className="row py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-3"></div>
        <h2 className='h4'>Trending People </h2>
        <p className='py-2 text-muted'>Most Searched People Right Now</p>
        <div className="brdr w-100 mt-3"></div>
        </div>
       
      </div>
   {tredingPeople.map((item , index)=> <MediaItem key={index} item={item}/>)}
    </div>
  )}