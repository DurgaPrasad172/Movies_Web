//src/redux/filterSlice.js
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

export const fetchGenresList=createAsyncThunk('genres/fetchGenres',async()=>{
    const response= await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=e46d9b84798dfc2b0f8c6153f7ea4910');
    const data=await response.json();
    console.log('Fetch Gnres is running',data.genres);
    return data.genres;
});



const pageSize=20;
console.log('filtersSlice is running');

const genresSlice=createSlice({
    name:'genres',
    initialState:{
        page:1,
        navType:'popular',
        query:'',
        type:'movie',
        genresList:[],
        genreClicked:[],
        yearFrom:1900,
        yearTo:2024,
        rating:0,
        status:'idle',
        error:null,
        totalResults:0,
    },
    reducers:{
        setFilter(state,action){
            state[action.payload.name]=action.payload.value;
        },
        setNavType(state,action){
            state.navType=action.payload;
        },
        setQuery(state, action) {
            state.query = action.payload;
          },
        setPage(state,action){
          state.page=action.payload;
        },
        setTotalResults(state, action) {
          state.totalResults = action.payload;
        },
        toggleGenre(state, action) {
            const genreId = action.payload;
            if (state.genreClicked.includes(genreId)) {
              state.genreClicked= state.genreClicked.filter((id) => id !== genreId);
            } else {
              state.genreClicked.push(genreId);
            }
          },
          setRating(state, action) {
            state.rating = action.payload;
          },
          clearQuery(state) {
            state.query = '';
          },
          resetFilters(state) {
            state.query = '';
            state.selectedGenres = [];
            state.yearFrom = '';
            state.yearTo = '';
            state.navType = 'popular';
          },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchGenresList.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchGenresList.fulfilled,(state,action)=>{
            state.status='loading';
            state.genresList=action.payload;
        })
        .addCase(fetchGenresList.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        });
    },
});

export const {setFilter,setNavType,setQuery,toggleGenre,resetFilters,clearQuery,setRating,setPage,setTotalResults}=genresSlice.actions;
export default genresSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const API_KEY = 'e46d9b84798dfc2b0f8c6153f7ea4910';
// const BASE_URL = 'https://api.themoviedb.org/3';

// export const fetchGenres = createAsyncThunk('genres/fetchGenres', async (type) => {
//   let url;
//   if (type === 'movie') {
//     url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
//   } else if (type === 'tv') {
//     url = `${BASE_URL}/genre/tv/list?api_key=${API_KEY}`;
//   } else {
//     throw new Error('Invalid genre type specified.');
//   }

//   const response = await fetch(url);
//   const data = await response.json();
//   return data.genres;
// });

// const genresSlice = createSlice({
//   name: 'genres',
//   initialState: {
//     genres: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchGenres.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchGenres.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.genres = action.payload;
//       })
//       .addCase(fetchGenres.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default genresSlice.reducer;
