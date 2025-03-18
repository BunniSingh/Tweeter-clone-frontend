import {createSlice} from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name: "TWEET",
    initialState: {
        tweets: null,
        refresh: false,
    },
    reducers:{
        setAllTweets(state , action){
            state.tweets = action.payload;
        },

        refresh (state, action) {
            state.refresh = !state.refresh;
        }
    }
})

export const {setAllTweets, refresh} = tweetSlice.actions;
export default tweetSlice.reducer;
