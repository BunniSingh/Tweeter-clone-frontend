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

       
    }
})

export const {setUserDetails, setOtherUser, getMyProfile} = userSlice.actions;
export default userSlice.reducer;
