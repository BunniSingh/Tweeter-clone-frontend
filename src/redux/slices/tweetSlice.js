import {createSlice} from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name: "TWEET",
    initialState: {
        tweets: null,
    },
    reducers:{
        setAllTweets(state , action){
            state.tweets = action.payload;
        }
    }
})

export const {setAllTweets} = tweetSlice.actions;
export default tweetSlice.reducer;
