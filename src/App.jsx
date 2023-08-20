import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header.jsx"
import Post from "./components/Post.jsx"
import Login from "./components/Login.jsx"
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

function App() {
  return ( 
    <UserContextProvider>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/register'} element={<Register />} />
                <Route path={'/create'} element={<CreatePost />} />
                <Route path={'/post/:id'} element={<PostPage />} />
                <Route path={'/edit/:id'} element={<EditPost />} />
                <Route path={'/categories/:id'} element={<Categories />} />
                <Route path="*" element={<Page404 />} />
            </Route>
        </Routes>
    </UserContextProvider>
  )
}

export default App
