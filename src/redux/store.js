import {configureStore} from '@reduxjs/toolkit';
import genresReducer from './filtersSlice';
import moviesReducer from './moviesSlice';

import tvShowsReducer from './tvShowsSlice';

export const store=configureStore({
    reducer:{
        genres:genresReducer,
        movies:moviesReducer,
        tvShows:tvShowsReducer,
    },
});