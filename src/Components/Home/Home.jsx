import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import MediaItem from '../MediaItem/MediaItem'

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTv, setTrendingTv] = useState([])
  const [trendingPeople, setTrendingPeople] = useState([])
 async function getTrending(mediaType , callback){

  let {data}= await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=aa15a4edd81fdb1bc0dd3822b4f36c7e`)
  callback(data.results);

  }
  useEffect(()=> {
      getTrending('movie' , setTrendingMovies);
      getTrending('tv' , setTrendingTv);
      getTrending('person' , setTrendingPeople);
  } , [])
  return <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
            </Helmet>
    <div className="row py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-3"></div>
        <h2 className='h4'>Trending Movies <br />To Watch Right Now</h2>
        <p className='py-2 text-muted'>Most Watched Movies To Watch Right Now</p>
        <div className="brdr w-100 mt-3"></div>
        </div>
       
      </div>
   {trendingMovies.slice(0,10).map((item , index)=> <MediaItem key={index} item={item}/>)}
    </div>
     <div className="row py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-3"></div>
        <h2 className='h4'>Trending TV Shows <br />To Watch Right Now</h2>
        <p className='py-2 text-muted'>Most Watched TV Shows To Watch Right Now</p>
        <div className="brdr w-100 mt-3"></div>
        </div>
       
      </div>
   {trendingTv.slice(0,10).map((item , index)=> <MediaItem key={index} item={item}/>)}
    </div>
    <div className="row py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-3"></div>
        <h2 className='h4'>Trending People <br />To Watch Right Now</h2>
        <p className='py-2 text-muted'>Most Watched People Right Now</p>
        <div className="brdr w-100 mt-3"></div>
        </div>
       
      </div>
   {trendingPeople.filter((person)=>person.profile_path !==null).slice(0,10).map((item , index)=> <MediaItem key={index} item={item}/>)}
    </div>

    

    </>
  
}
