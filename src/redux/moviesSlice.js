//src/redux/moviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setTotalResults } from './filtersSlice';

const API_KEY = 'e46d9b84798dfc2b0f8c6153f7ea4910';
const BASE_URL = 'https://api.themoviedb.org/3';

const pageSize=20;

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async ({ navType, query, genreClicked, rating,yearFrom, yearTo,page }) => {
    
   console.log(navType, query, genreClicked, rating,yearFrom, yearTo,page);

    console.log('Fetching Moives is running');
    let url;

    if (navType === 'now_playing' || navType ==='popular' || navType==='top_rated') {
      url = `${BASE_URL}/movie/${navType}?&page=${page}api_key=${API_KEY}`;
    } else if (navType === 'trend') {
      url = `${BASE_URL}/trending/movie/week?page=${page}api_key=${API_KEY}`;
    }
    
    if (query.length>0) {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
    } else if(genreClicked.length || yearFrom || yearTo){
      url = `${BASE_URL}/discover/movie?page=${page}&api_key=${API_KEY}`;

      console.log('url in not query',url);
      if (navType === 'popular') {
        url += '&sort_by=popularity.desc';

      } else if(navType === 'trend'){
        url+='&sort_by=vote_count.desc';
      }else if ( navType === 'now_playing') {
        url += '&sort_by=release_date.desc';
      } else if (navType === 'top_rated') {
        url += '&sort_by=vote_average.desc';
      }

      if (genreClicked.length > 0) {
        url += `&with_genres=${genreClicked.join(',')}`;
      }
      if (yearFrom) url += `&release_date.gte=${yearFrom}-01-01`;
      if (yearTo) url += `&release_date.lte=${yearTo}-12-31`;
      if (rating) url+=`&vote_average.gte=${rating}&vote_average.lte=5`;
    }
    
      console.log('url',url);
      const response = await fetch(url);
      const data = await response.json();
      console.log('In Fetch Movies',data.results);

      
      return data.results;
    }
  );
  
console.log('moviesSlice is running');

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    data:[],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
