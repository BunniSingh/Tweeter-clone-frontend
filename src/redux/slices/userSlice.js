import { createSlice } from "@reduxjs/toolkit";
import { refresh } from "./tweetSlice";

const userSlice = createSlice({
  name: "USER",
  initialState: {
    user: null,
    otherUsers: null,
    profile: null,
    refresh: false,
  },
  reducers: {
    setUserDetails(state, action) {
      state.user = action.payload;
    },

    setOtherUser(state, action) {
      state.otherUsers = action.payload;
    },

    getMyProfile(state, action) {
      state.profile = action.payload;
    },

    updateFollowandUnfollow(state, action) {
      if (state.user.following.includes(action.payload)) {
        state.user.following = state.user.following.filter(
          (id) => id !== action.payload
        );
      } else {
        state.user.following.push(action.payload);
      }
    },

    updateProfileFollowers(state, action) {
      const userId = action.payload;
      if (state.profile.followers.includes(userId)) {
        state.profile.followers = state.profile.followers.filter(
          (id) => id !== userId
        );
      } else {
        state.profile.followers.push(userId);
      }
    },

    updateBookmarkandRemoveBookmark(state, action) {
      const id = action.payload;
      if (state.user.bookmarks.includes(id)) {
        //remove
        state.user.bookmarks = state.user.bookmarks.filter(
          (bookmarkId) => bookmarkId !== id
        );
      } else {
        //add
        state.user.bookmarks.push(id);
      }
    },
  },
});

export const {
  setUserDetails,
  setOtherUser,
  getMyProfile,
  updateFollowandUnfollow,
  updateProfileFollowers,
  updateBookmarkandRemoveBookmark,
} = userSlice.actions;

export default userSlice.reducer;
