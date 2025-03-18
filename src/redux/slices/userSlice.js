import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "USER",
    initialState: {
        user: null,
        otherUsers: null,
        profile: null,
    },
    reducers:{
        setUserDetails(state, action){
            state.user = action.payload;
        },

        setOtherUser(state, action){
            state.otherUsers = action.payload;
        },

        getMyProfile(state, action){
            state.profile = action.payload;
        },

        updateFollowandUnfollow(state, action){
            if(state.user.following.includes(action.payload)){
                state.user.following = state.user.following.filter(id => id !== action.payload);
            }else{
                state.user.following.push(action.payload);
            }
        },
        
       
    }
})

export const {setUserDetails, setOtherUser, getMyProfile, updateFollowandUnfollow} = userSlice.actions;
export default userSlice.reducer;
