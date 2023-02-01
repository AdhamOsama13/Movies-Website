import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Helmet } from 'react-helmet'
import MediaItem from '../MediaItem/MediaItem'

export default function TV() {
  const [trendingTv, setTrendingTv] = useState([])
  async function getTrending(callback){

    let {data}= await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=aa15a4edd81fdb1bc0dd3822b4f36c7e`)
    callback(data.results);
  
    }
    useEffect(()=> {
      getTrending(setTrendingTv)
  
  } , [])
  return <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>TV Series</title>
            </Helmet>
    <div className="row py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-3"></div>
        <h2 className='h4'>Trending Tv Series <br />To Watch Right Now</h2>
        <p className='py-2 text-muted'>Most Watched TV Series To Watch Right Now</p>
        <div className="brdr w-100 mt-3"></div>
        </div>
       
      </div>
   {trendingTv.map((item , index)=> <MediaItem key={index} item={item}/>)}
    </div>
    </>}