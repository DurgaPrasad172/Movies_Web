import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Filters from './components/Filters/Filter';
import MovieList from './components/MoviesList/MovieList';
import { fetchGenresList } from './redux/filtersSlice';
import { fetchMovies } from './redux/moviesSlice';
import { fetchTvShows } from './redux/tvShowsSlice';
import './App.css';
import TvShowsList from './components/TvShowsList/TvShowsList';

function App() {
  const dispatch = useDispatch();
 
  const filters=useSelector((state)=>state.genres);
  console.log(filters);
  
  useEffect(() => {
    if (filters.type === 'movie') {
      dispatch(fetchMovies({ ...filters, navType: 'popular' }));
    } else {
      dispatch(fetchTvShows({ ...filters, navType: 'popular' }));
    }
    dispatch(fetchGenresList());
    console.log('APP.JS useEffect');
  }, [dispatch, filters.type]);

  return (
    <Router>
    <div className="App overflow-hidden w-screen h-screen flex">
      <div className="flex-1 p-6">
        <Header />
        <div className='p-6 w-full h-full'>

          <Routes>

            <Route path='/popular' element={filters.type==='movie'?<MovieList/>:<TvShowsList/>}/>
            <Route path='/trend' element={filters.type==='movie'?<MovieList/>:<TvShowsList/>}/>
            <Route path='/new' element={filters.type==='movie'?<MovieList/>:<TvShowsList/>}/>
            <Route path='/top' element={filters.type==='movie'?<MovieList/>:<TvShowsList/>}/>
          </Routes>
        
        </div>
      </div>
      <aside className="px-10 py-8 shadow-2x1 w-96">
        <Filters />
      </aside>
    </div>
    </Router>
  );
}

export default App;
