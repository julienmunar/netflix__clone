import React from 'react'
import './homescreen.css'
import Nav from './Nav'
import Banner from './Banner';
import requests from './requests';
import Row from './Row';
const HomeScreen = () => {
    return (
        <div className='homescreen'>
            <Nav />
            <Banner />
           <Row title='Netflix Orignals' fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
           <Row title='TopRated' fetchUrl={requests.fetchTopRated} />
           <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
           <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
           <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
           <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
           <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
           


        </div>
    )
}

export default HomeScreen