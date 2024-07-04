//src/components/Header.js
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchMovies } from '../../redux/moviesSlice';
import { fetchTvShows } from '../../redux/tvShowsSlice';
import './Header.css';
import { setNavType ,setQuery,resetFilters,clearQuery} from '../../redux/filtersSlice';


const API_KEY = 'e46d9b84798dfc2b0f8c6153f7ea4910';
const BASE_URL = 'https://api.themoviedb.org/3';

const Header = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  //console.log(searchQuery.length);
  
  console.log('Headers is running');

  const filters=useSelector((state)=>state.genres);
  console.log('headers List:',filters); ////////////////////


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(event.target.value);
    dispatch(setQuery(searchQuery));
    if(filters.type==='movie'){
      dispatch(fetchMovies({ ...filters,navType: 'search' ,query: searchQuery}));
    }
    else{
    dispatch(fetchTvShows({ ...filters,navType: 'search' ,query: searchQuery}));
    }
  };


  const handleLinkClick = (navValue) => {
   // console.log('Header:',navValue);                 

    dispatch(setNavType(navValue)); 
    if (!filters.query) {
      if (filters.type === 'movie') {
        dispatch(fetchMovies({ ...filters,  navType: navValue }));
      } else {
        dispatch(fetchTvShows({ ...filters,  navType: navValue  }));
      }
     
    }
  };


  return (
    <header className='header'>
        <Link className='header-left' onClick={() => handleLinkClick('popular')} to='/popular'> <p  >Discover</p></Link> 
      <nav>
        <ul className='list'>
        <li className='l1'><Link to='/popular' className='l1' onClick={() => handleLinkClick('popular')}>Popular</Link></li>

       <li className='l2'> <Link to='/trend' className='nav1' onClick={() => handleLinkClick('trend')}>Trend</Link></li>
       <li className='l2'> <Link to='/new' className='nav1' onClick={() => handleLinkClick('now_playing')}>Newest</Link></li>
       <li className='l2'>  <Link to='/top' className='nav1' onClick={() => handleLinkClick('top_rated')}>Top Rated</Link></li>
        </ul>
      </nav>

      <div className="nav-right">
      <img  src="https://img.icons8.com/?size=100&id=59878&format=png&color=FFFFFF" alt="search--v1"/>
      <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} className='header-input'/>
  
      </div>
    </header>
    
  );
};

export default Header;


