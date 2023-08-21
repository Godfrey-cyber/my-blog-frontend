import { useState, useEffect } from 'react'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Link, Navigate } from "react-router-dom"
import { modules, formats, client, getCategories } from "../assets/utilities"

const CreatePost = () => {
	const [redirect, setRedirect] = useState(false)
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [photo, setPhoto] = useState('')
	const [content, setContent] = useState('')
	const [category, setCategory] = useState('')
	const [catId, setCatId] = useState('')
	const [catName, setcatName] = useState('')

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await client.get("/categories/getCategories")
				setCategory(response.data.data)
				// console.log(response)
			} catch (error) {
				// return res.status(401).json(error)
				console.log(error)
			}
		}
		getCategories()
	}, [])
	// console.log(getCategories())
	// console.log(category)

	//buttons
    const handleChange = (event) => {
    	if (event.target.name = "catId") {
    		setCatId(event.target.value)
    	}
    	console.log(catId)
    }
	//create post
	const createPost = async (event) => {
		event.preventDefault()
		
		const userData = new FormData()
		userData.set("title", title)
		userData.set("summary", summary)
		userData.set("content", content)
		userData.set("catId", catId)
		userData.set("catName", catName)
		// userData.set("category", category)
		userData.set("photo", photo[0])
		try {
			const response = await fetch("http://localhost:5000/posts/createpost", {
			method: "POST",
			body: userData,
			credentials: "include",
		})
			console.log(await response.json())
			console.log(response.ok)
			if (response.ok) {
				setRedirect(true)
			}
		} catch (error) {
			if (error || response.status === "400") {
				return res.status(400).json("Something went wrong")
			} else {
				console.log(error)
			}
		}

		console.log(userData)
		
		// try {
		// 	const response = await client.post("/posts/createpost", {
		// 		body: userData, 
		// 	    headers: { "Content-Type": "application/json" },
		// 	    withCredentials: true,
		// 	})
			
		// } catch(error) {
			// if (response.status === 400) {
		 //        console.log("Bad request! Something went wrong please try again later");
		 //    } else {
		        // console.log(error)
		    // }	
		// }
	}
	if (redirect) {
		return <Navigate to={'/'}/>
	}
	return (
		<section className="create_section min-h-[calc(100vh - 60px)]">
			<form action="" onSubmit={createPost} className="create_form">
				<h4 className="text-gray-600 font-bold items-center my-4">Creating a Post</h4>
					<select onChange={handleChange} className="create_input" name="catId" placeholder="Add a category" id="">
						{category?.length > 0 && category.map(cat => (
							<option className="text-sm text-gray-700 font-light" key={cat._id} value={cat._id}>{cat.name}</option>
						))}
					</select>
				<input type="title" value={title} onChange={event => setTitle(event.target.value)} id="title" placeholder="Enter your title" className="create_input" />
				<input type="summary" value={summary} onChange={event => setSummary(event.target.value)} id="summary" placeholder="Enter your summary" className="create_input" />
				<input type="file" onChange={event => setPhoto(event.target.files)} id="photo" placeholder="Enter your photo" className="create_input" />
				{/*<textarea className="mx-auto outline-none border-2 border-gray-300 w-full bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700" name="" id="" cols="30" placeholder="Write your post here.." rows="10"></textarea>*/}
				<ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} formats={formats} className="w-full" />
				<button type="submit" className="create_button">Create</button>
			</form>
		</section>
	)
}

export default CreatePost