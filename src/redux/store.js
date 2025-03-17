import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice'
import tweetSlice from './slices/tweetSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
        tweet: tweetSlice,
    }
})

export default store