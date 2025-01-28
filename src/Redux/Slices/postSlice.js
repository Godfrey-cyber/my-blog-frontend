import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
	name: "post",
	initialState: {
		posts: [],
		isFetching: false,
		error: null,
		errorMsg: null,
	    uploadLoading: false,
	    uploadError: null,
	    uploadSuccess: false,
	},
	reducers: {
		makePostStart: (state) => {
			state.uploadLoading = true
			state.error = false
			state.uploadError = null
			state.uploadSuccess = false
			// state.post = []
		},
		makePostSuccess: (state, action) => {
			state.uploadLoading = false
			state.error = false
			state.post.push(action.payload);
			state.uploadSuccess = true
			state.uploadError = null
		},
		makePostFailure: (state, action) => {
			state.uploadLoading = false
			state.error = true
			state.uploadError = action.payload
			state.uploadSuccess = false
			// state.post = []
		},
		// fetch appointment
		getPostsStart: (state, action) => {
			state.isFetching = true
			state.error = false
			state.errMsg = null
			state.post = null
		},
		getPostsSuccess: (state, action) => {
			state.isFetching = false
			state.error = false
			state.errMsg = null
			state.posts = action.payload;
		},
		getPostsFailure: (state, action) => {
			state.isFetching = false
			state.error = true
			state.errMsg = action.payload
			state.post = null
		}
	}
})

export const { makePostsStart, makePostsFailure, makePostsSuccess, getPostsStart, getPostsSuccess, getPostsFailure } = postSlice.actions
export const selectPost = (state => state.post?.posts)
export const postError = (state => state.post?.errMsg)
export default postSlice.reducer