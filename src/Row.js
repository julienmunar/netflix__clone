import React, { useEffect, useState } from 'react'
import axiosIntercept from './axiosIntercept'
import './row.css'

function Row({title,fetchUrl, isLargeRow=false}) {
   
   const baseUrl="https://image.tmdb.org/t/p/original"
    const[movies, setMovies]=useState([])
    useEffect(()=>{
        async function fetchData (){
            const request= await axiosIntercept.get(fetchUrl)
    
            setMovies(request.data.results)
            return request
        }
fetchData()

    },[fetchUrl])
  

  
    return (
    <div className='row'>
    <h2>{title}</h2>    
    <div className='row__posters'>
     {movies.map((movie)=>(
         ((isLargeRow && movie.poster_path) || (!isLargeRow &&movie.backdrop_path)) && (
         <img className={`row__poster ${isLargeRow && "row_posterLarge"}`} key={movie.id} src={`${baseUrl}${ isLargeRow ? movie.poster_path : movie.backdrop_path}` }alt={movie.name}/>)

     ))}
    </div>
    </div>
  )
}

export default Row