//src/components/MoviesList/MovieLists.js
import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {TailSpin} from 'react-loader-spinner';
import { fetchGenresList } from '../../redux/filtersSlice';
import ReactPaginate from 'react-paginate';
import { setPage ,setTotalResults} from '../../redux/filtersSlice';
import { fetchMovies } from '../../redux/moviesSlice';
import { fetchTvShows } from '../../redux/tvShowsSlice';

import './MovieList.css';

const MovieList = () => {
  const dispatch = useDispatch();
  console.log('MovieList.js Runnign');


  const movies = useSelector((state) => state.movies.list);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  const genresList = useSelector((state) => state.genres.genresList); 
  const filters=useSelector((state)=>state.genres);
  
  const currentPage=useSelector((state)=>state.genres.page);
  const totalResults = useSelector((state) => state.genres.totalResults);
 
  useEffect(() => {
    dispatch(fetchGenresList());
  }, [dispatch]);

  useEffect(() => {
    if (filters.type === 'movie') {
      dispatch(fetchMovies({ ...filters, page: currentPage }));
    } else {
      dispatch(fetchTvShows({ ...filters, page: currentPage }));
    }
  }, [dispatch, filters, currentPage]);

 
  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    dispatch(setPage(newPage));
  };


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
  <div className='pagination'>
  <ReactPaginate
          pageCount={Math.ceil(filters.totalResults / 20)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={10}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
          previousLabel={'<'}
          nextLabel={'>'}
        />
    
       
  </div>

  </div>


  );
};

export default MovieList;





