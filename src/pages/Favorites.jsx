import React from 'react'
import '../css/Favorites.css'
import { useMovieContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'
import { Suspense } from 'react'

const Favorites = () => {
  const {favorites} = useMovieContext();
  
  if (favorites) {
  return (
      <div className='favorites'>
        <h2>Your Favorites</h2>
        <Suspense fallback={"loading..."}>
          <div className='movies-grid'>
            {favorites.map((movie)=>(
              <MovieCard movie={movie} key={movie.id}/>
            ))}
          </div>
        </Suspense>
      </div>
  )
  }
}

export default Favorites


