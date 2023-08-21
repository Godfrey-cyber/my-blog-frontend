import React, { useEffect, useState } from 'react'
import Post from "../components/Post"

const IndexPage = () => {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		fetch("https://my-blog-backend-t19h.onrender.com/posts/allposts").then(res => {
			res.json().then(data => {
				setPosts(data)
			})
		})
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