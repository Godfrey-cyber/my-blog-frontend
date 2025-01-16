import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: [],
		isFetching: false,
		error: false,
		errMsg: null,
		success: false
	},
	reducers: {
		loginStart: (state) => {
			state.isFetching = true
			state.error = false
			state.errMsg = null
			state.currentUser = null
		},
		loginSuccess: (state, action) => {
			state.isFetching = false
			state.error = false
			state.currentUser = action.payload
			state.errMsg = null
		},
		loginFailure: (state, action) => {
			state.isFetching = false
			state.error = true
			state.errMsg = action.payload
			state.currentUser = null
		},
		//register user
		registerStart: (state) => {
			state.isFetching = true
			state.error = false
			state.currentUser = null
			state.errMsg = null
		},
		registerSuccess: (state, action) => {
			state.isFetching = false
			state.error = false
			state.currentUser = action.payload
			state.errMsg = null
		},
		registerFailure: (state, action) => {
			state.isFetching = false
			state.error = true
			state.currentUser = null
			state.errMsg = action.payload
		},
		logoutStart: (state) => {
			state.isFetching = true
			state.error = false
			state.currentUser = null
			state.errMsg = null
		},
		logoutSuccess: (state) => {
			state.isFetching = false
			state.errMsg = null
			state.error = false
		}
		,
		logoutFailure: (state) => {
			state.isFetching = false
			state.currentUser = null
			state.error = true
			// state.errMsg = action.payload
		},
		getUserStart: (state) => {
			state.isFetching = true
			state.error = false
			state.currentUser = null
			state.errMsg = null
		},
		getUserSuccess: (state) => {
			state.isFetching = false
			state.currentUser = action.payload
			state.errMsg = null
			state.error = false
		}
		,
		getUserFailure: (state) => {
			state.isFetching = false
			state.currentUser = null
			state.error = true
			// state.errMsg = action.payload
		}
	}
})

export const { getUserStart, getUserSuccess, getUserFailure, loginFailure, loginSuccess, loginStart, registerStart, registerSuccess, registerFailure, logoutStart, logoutFailure, logoutSuccess } = userSlice.actions
export const selectUser = (state => state?.user?.currentUser)
export const loginError = (state => state.user?.errMsg)
export const registerError = (state => state.user?.errMsg)
export default userSlice.reducer