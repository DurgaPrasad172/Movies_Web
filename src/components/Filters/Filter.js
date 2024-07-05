//src/components/filters/filter.js
import React ,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from 'react-rating';
import Select from 'react-select';
import { fetchMovies } from '../../redux/moviesSlice';
import { fetchTvShows } from '../../redux/tvShowsSlice';
import { setFilter, toggleGenre, setRating } from '../../redux/filtersSlice';
import { FaStar } from 'react-icons/fa';

import './Filter.css';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.genres);

  const typeOptions = [
    { value: 'movie', label: 'Movie' },
    { value: 'tv', label: 'TV Show' },
  ];

  const genreOptions = filters.genresList.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

  const yearOptions = Array.from({ length: 124 }, (_, i) => ({
    value: 1900 + i,
    label: (1900 + i).toString(),
  }));

  useEffect(() => {
    if (!filters.yearFrom) {
      dispatch(setFilter({ name: 'yearFrom', value: 1900 }));
    }
    if (!filters.yearTo) {
      dispatch(setFilter({ name: 'yearTo', value: 2024 }));
    }
  }, [dispatch, filters.yearFrom, filters.yearTo]);


  const handleInputChange = (name, value) => {
    dispatch(setFilter({ name, value }));

    if (!filters.query) {
      if (filters.type === 'movie') {
        dispatch(fetchMovies({ ...filters, [name]: value }));
      } else {
        dispatch(fetchTvShows({ ...filters, [name]: value }));
      }
    }
  };

  

  
  const handleGenreChange = (selectedOptions) => {
    const selectedGenres = selectedOptions.map((option) => option.value);
    dispatch(setFilter({ name: 'genreClicked', value: selectedGenres }));

    if (!filters.query) {
      if (filters.type === 'movie') {
        dispatch(fetchMovies({ ...filters, genreClicked: selectedGenres }));
      } else {
        dispatch(fetchTvShows({ ...filters, genreClicked: selectedGenres }));
      }
    }
  };

  const handleRatingChange = (newRating) => {
    dispatch(setRating(newRating));

    if (!filters.query) {
      if (filters.type === 'movie') {
        dispatch(fetchMovies({ ...filters, rating: newRating }));
      } else {
        dispatch(fetchTvShows({ ...filters, rating: newRating }));
      }
    }
  };

  return (
   <>
      <p className='filter-head'>Discover Options</p>
    <div>
    <p className='filter-subhead'>Type</p>
    <div>
        
        <Select
           className='genre-bg'
          id="type"
          name="type"
          options={typeOptions}
          value={typeOptions.find(option => option.value === filters.type)}
          onChange={(option) => handleInputChange('type', option.value)}
        />
      </div>

  
        <p  className='filter-subhead'>Genre:</p>
        <div>
        <Select
          className='genre-bg'
          id="genre"
          name="genre"
          options={genreOptions}
          isMulti
          value={genreOptions.filter(option => filters.genreClicked.includes(option.value))}
          onChange={handleGenreChange}
        />
      </div>


<p  className='filter-subhead'>Year</p>
<div className='years'>
      <div>
        <Select
         className='genre-bg'
          id="yearFrom"
          name="yearFrom"

          options={yearOptions}
          value={yearOptions.find(option => option.value === filters.yearFrom)}
          onChange={(option) => handleInputChange('yearFrom', option.value)}
        />
      </div>
      <span className='symbol'>-</span>
      <div  className='yearbox'>

        <Select
          id="yearTo"
          name="yearTo"
           className='genre-bg'
          options={yearOptions}
          value={yearOptions.find(option => option.value === filters.yearTo)}
          onChange={(option) => handleInputChange('yearTo', option.value)}
        />
      </div>
</div>
<p  className='filter-subhead'>Ratings</p>


        <Rating
          initialRating={filters.rating}
          onChange={handleRatingChange}
          emptySymbol={<FaStar className="star-icon" size={20} />}
          fullSymbol={<FaStar className="star-icon" size={20} fill="#ffc107" />}
          fractions={2}
        />
       <span> & up</span>
    
</div>
      </>


  );
};

export default Filters;
