import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);

  const fetchMovieHandler =async ()=>{

    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('https://swapi.py4e.com/api/films');
      
      if(!res.ok){
        throw new Error("Something went Wrong' to 'Something went wrong ....Retrying");
      }

      const data = await res.json();

      
      const transformedMovies = data.results.map((movie)=>{
            return{
              id: movie.episode_id,
              title: movie.title,
              openingText: movie.opening_crawl,
              releaseDate: movie.release_data,
            }
          })
  
      setMovies(transformedMovies);
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
    setIsLoading(false);
    
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading&& movies.length === 0 && <p> Found No Movies</p>}
        {isLoading&& <p>Loading...</p>}
        {!isLoading && error && <p> {error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
