import React, { useEffect, useState } from 'react'
import BannerImg from './netflix-banner-1024x272.jpg'
import './banner.css'
import axios from './axiosIntercept'
import requests from './requests'

const Banner = () => {

    const [movie,setMovie]=useState([])
    useEffect(()=>{

async function fetchData(){
    const request = await axios.get(requests.fetchNetflixOriginals);
    setMovie(
        request.data.results[Math.floor(Math.random() * request.data.results.length-1)]
    )
}
fetchData()
    },[])




    const truncate = (string, n)=>{
return (string?.length > n ? string.substr(0, n-1 ) + '...' : string)
    }
const string = 'Esse excepteur velit elit sit minim tempor esse. Et commodo aliqua cillum proident amet ullamco reprehenderit. Ad duis elit nostrud elit sit mollit aliqua duis nostrud incididunt voluptate laboris.'
    return (
        <header className='banner' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`, backgroundPosition: 'center center', backgroundSize: 'cover' }}>
     
            <div className='banner__contents'>
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.orginal_name }</h1>
                <div className='banner__buttons'>
                    <button className='banner__button'>
                        Play
                    </button>
                    <button className='banner__button'>
                        My List
                    </button>
                </div>
                <h1 className='banner__description'>{truncate(`${movie?.overview}`,150)}</h1>
            </div>
            <div className='banner__fadeBottom'></div>
        </header>
    )
}

export default Banner