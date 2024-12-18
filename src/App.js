import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-8b263-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedMovies = [];

      for(const key in data){
        loadedMovies.push({
          id:key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);


  async function deleteMovieHandler(id){

    try {
      const response = await fetch(`https://react-http-8b263-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${id}.json`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the movie');
      }
      console.log(movies);
      setMovies((prev)=> prev.filter((movie)=> movie.id!== id));
      console.log(movies);

      console.log('Movie deleted successfully');
    } catch (error) {
      console.error(error.message);
    }


  }


  async function addMovieHandler(movie) {
    const res = await fetch('https://react-http-8b263-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',{
      method:'POST',
      body: JSON.stringify(movie),
      headers:{
        'Content-type': 'application/json'
      }
    })

    const data = res.json();
    console.log(data);

  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies}  onMovieDelete={deleteMovieHandler}/>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
