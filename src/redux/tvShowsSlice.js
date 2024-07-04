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
  async ({ navType, query, genreClicked, rating,yearFrom, yearTo }) => {
    
    console.log(navType, query, genreClicked, rating,yearFrom, yearTo);
 
     console.log('Fetching Moives is running');
     let url;
 
     if (navType === 'now_playing' || navType ==='popular' || navType==='top_rated') {
       url = `${BASE_URL}/tv/${navType}?api_key=${API_KEY}`;
     } else if (navType === 'trend') {
       url = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`;
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
