import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {

  const movieDeleteHandler = (id)=>{
    props.onMovieDelete(id);
  }


  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <React.Fragment key={movie.id}>
          
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          />
          <button onClick={()=>movieDeleteHandler(movie.id)}> Delete Movie</button>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default MovieList;
