// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const API_KEY = 'e46d9b84798dfc2b0f8c6153f7ea4910';
// const BASE_URL = 'https://api.themoviedb.org/3';

// export const fetchTvShows = createAsyncThunk('tvShows/fetchTvShows', async ({ type, query, genre, yearFrom, yearTo }) => {
//   let url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc`;

//   if (type === 'popular') {
//     url = `${BASE_URL}/tv/popular?api_key=${API_KEY}`;
//   } else if (type === 'top_rated') {
//     url = `${BASE_URL}/tv/top_rated?api_key=${API_KEY}`;
//   } else if (type === 'search') {
//     url = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`;
//   }

//   const response = await fetch(url);
//   const data = await response.json();
//   return data.results;
// });

// const tvShowsSlice = createSlice({
//   name: 'tvShows',
//   initialState: {
//     list: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTvShows.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTvShows.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.list = action.payload;
//       })
//       .addCase(fetchTvShows.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default tvShowsSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'e46d9b84798dfc2b0f8c6153f7ea4910';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTvShows = createAsyncThunk('tvShows/fetchTvShows',
  async ({ navType, query, genreClicked, rating,yearFrom, yearTo,page }) => {
    
    console.log(navType, query, genreClicked, rating,yearFrom, yearTo);
 
     console.log('Fetching Moives is running');
     let url;
 
     if (navType === 'now_playing' || navType ==='popular' || navType==='top_rated') {
       url = `${BASE_URL}/tv/${navType}?api_key=${API_KEY}`;
     } else if (navType === 'trend') {
       url = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`;
     }
      
     if (query.length>0) {
      url = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&page=${page}`;
    } else if(genreClicked.length || yearFrom || yearTo){
      url = `${BASE_URL}/discover/tv?page=${page}&api_key=${API_KEY}`;

      console.log('url in not query',url);
      if (navType === 'popular') {
        url += '&sort_by=popularity.desc';
        console.log('url in not query popular',url);
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
      if (yearTo) url += `&release_date.te=${yearTo}-12-31`;
      if (rating) url+=`&vote_average.gte=${rating}&vote_average.lte=5`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  });
  


const tvShowsSlice = createSlice({
  name: 'tvShows',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTvShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTvShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTvShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tvShowsSlice.reducer;
