import React, { useState , useEffect, Suspense} from 'react'
import '../css/Home.css'
import { APIKEY, BASEURL } from '../services/api'
import MovieCard from '../components/MovieCard'

const Home = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);   

    const getPopularMovies = async () => {
        const response = await fetch(`${BASEURL}/movie/popular?api_key=${APIKEY}`);
        const data = await response.json()
        return data.results
    };

    const searchMovies = async (query) => {
        const response = await fetch(`${BASEURL}/search/movie?api_key=${APIKEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json()
        return data.results
    };

    useEffect(() => {
     const loadPopularMovies = async () => {
        try {
            const popularMovies = await getPopularMovies()
            setMovies(popularMovies)
        } catch (err) {
            setError("failed to load movies...")
        }
     }
    loadPopularMovies()
    }, [])
    
    const handleSearch = async (e) => {
        e.preventDefault()
        if (loading) return
        setLoading(true)

        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch(err) {
            console.log(err)
            setError("failed to load movies...")
        }
    };

  return (
    <div className='Home'>
        <form onSubmit={handleSearch} className='search-form'>
            <input
             type="text"
             placeholder='Search for movies...'
             className='search-input'
             value={searchQuery}
             onChange={(e)=>setSearchQuery(e.target.value)}
            />
            <button type='submit' className='search-button'>Search</button>    
        </form>

        {error && <div className='error-message'>{error}</div> }
        
        <Suspense fallback={"loading..."}>
            <div className='movies-grid'>
                {movies.map((movie)=>(
                    movie.title.toLowerCase().includes(searchQuery) && 
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
        </Suspense>
    </div>
  )
}

export default Home