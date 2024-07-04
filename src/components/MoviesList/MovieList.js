import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {TailSpin} from 'react-loader-spinner';
import { fetchGenresList } from '../../redux/filtersSlice';
import Pagination from 'react-paginate';

import './MovieList.css';

const MovieList = () => {
  const dispatch = useDispatch();
  console.log('MovieList.js Runnign');


  const movies = useSelector((state) => state.movies.list);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  const genresList = useSelector((state) => state.genres.genresList); 

 
  useEffect(() => {
    dispatch(fetchGenresList());
  }, [dispatch]);

  console.log('MovieList.js Running');
 


  if (status === 'loading') {
    return  (
      <div className='Loading'>
        <TailSpin type='Oval' color='#00BFFF' height={80} width={80} /> 
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
 
  return (
  // <div className='movie-container'>
  
  //     <div className="movie-grid">
  //       {movies && (
  //         movies.map((movie) => (
  //           <div key={movie.id} className="movie-card">
  //             <img className='movie-img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
  //             <div>
               
  //               <p className='movie-info'>{movie.title}</p>
              
  //               <p className='movie-info'>{movie.genre_ids[0]},{movie.release_date.slice(0,4)}</p>
                
  //             </div>
             
  //           </div>
  //         ))
  //       // ) : (
  //       //   <div>No movies found</div>
  //       )}
  //     </div>
      
  //     <div className='Pagination'>

  //     </div>
  
  //   </div>

 
  <div className='movie-container'>
  <div className="movie-grid">
    {movies && movies.map((movie) => (
      <div key={movie.id} className="movie-card">
        
        
        <img className='movie-img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p className='movie-title'>{movie.title}</p>
          <p className='movie-info'>
               {movie.genre_ids.length > 0 && genresList.length > 0 && (
                  <>{genresList.find((g) => g.id === movie.genre_ids[0])?.name}</>
                )}{', '}
                {movie.release_date.slice(0, 4)}
          </p>
  
      </div>
    ))}
  </div>

  <div className='Pagination'>
    {/* Pagination component goes here */}
  </div>
</div>

  );
};

export default MovieList;
