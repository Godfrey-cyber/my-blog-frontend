import React, { useEffect, useState } from 'react'
import Post from "../components/Post"
import { useSelector, useDispatch } from "react-redux"
import { client } from "../assets/utilities.js"
import { getPostsFailure, getPostsSuccess, getPostsStart, selectPost } from "../Redux/Slices/postSlice.js"

const IndexPage = () => {
	// const [posts, setPosts] = useState([])
	const dispatch = useDispatch()
	const posts = useSelector(selectPost)
	console.log(posts)
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
	return (
		<>
			{posts?.length > 0 && posts.map(post => (
				<>
					<Post {...post} key={post._id} />
				</>
			))}
		</>
	)
}

export default IndexPage