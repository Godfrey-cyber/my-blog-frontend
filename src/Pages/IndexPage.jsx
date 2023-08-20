import React, { useEffect, useState } from 'react'
import Post from "../components/Post"

const IndexPage = () => {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		fetch("http://localhost:5000/posts/allposts").then(res => {
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