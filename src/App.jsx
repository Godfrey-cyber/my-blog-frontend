import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header.jsx"
import Post from "./components/Post.jsx"
import Login from "./Pages/Login.jsx"
import Register from "./components/Register.jsx"
import IndexPage from "./Pages/IndexPage.jsx"
import Layout from "./components/Layout.jsx"
import CreatePost from "./components/CreatePost.jsx"
import Page404 from "./components/Page404.jsx"
import { Route, Routes } from "react-router-dom"
import { UserContextProvider } from "././UserContext.jsx"
import PostPage from "./Pages/PostPage.jsx"
import EditPost from "./Pages/EditPost.jsx"
import Categories from "./Pages/Categories.jsx"
import { useSelector, useDispatch } from "react-redux"
import { client } from "./assets/utilities.js"
import { selectPost, getPostsFailure, getPostsSuccess, getPostsStart } from "./Redux/Slices/postSlice.js"
import { selectUser } from "./Redux/Slices/userSlice.js"

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        const getAllPosts = async () => {
            dispatch(getPostsStart())
            try {
                const res = await client.get("/posts/allposts")
                if(res.status === 200) {
                    dispatch(getPostsSuccess(res?.data))
                    console.log(res.data)
                }
            } catch (error) {
                if(error)
                dispatch(getPostsFailure(error.message))
                console.log(error)
            }
        }
        getAllPosts()
    }, [])
    const user = useSelector(selectUser).user
    console.log(user)
  return ( 
    <UserContextProvider>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path={'/login_user'} element={<Login />} />
                <Route path={'/register'} element={<Register />} />
                <Route path={'/create'} element={!user ? <Login/> : <CreatePost />} />
                <Route path={'/post/:id'} element={<PostPage />} />
                <Route path={'/edit/:id'} element={!user ? <Login/> : <EditPost />} />
                <Route path={'/categories/:id'} element={<Categories />} />
                <Route path="*" element={<Page404 />} />
            </Route>
        </Routes>
    </UserContextProvider>
  )
}

export default App
