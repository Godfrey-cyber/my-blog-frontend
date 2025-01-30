import { useState, useEffect } from 'react'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Link, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { modules, formats, client, getCategories } from "../assets/utilities"
import { makePostsStart, makePostsFailure, makePostsSuccess } from "../Redux/Slices/postSlice.js"

const CreatePost = () => {
	const [redirect, setRedirect] = useState(false)
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [photo, setPhoto] = useState('')
	const [content, setContent] = useState('')
	const [category, setCategory] = useState('')
	const [catId, setCatId] = useState('')
	const [catName, setcatName] = useState('')
	const dispatch = useDispatch()
	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await client.get("/categories/getCategories")
				setCategory(response?.data?.data)
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
		
		dispatch(makePostsStart())
		try {
			const res = await client.post("/posts/createpost", userData)
			if (res.status === 201) {
	    		dispatch(makePostsSuccess(res.data))
	    		navigate("/")
	    		console.log(res.data);
	    		// toast.success("Successfully Logged in🥇");
	    	}
		} catch (error) {
			dispatch(makePostsFailure(error?.response?.data?.msg || "Registration Failed"))
			// setFormData((prevData) => ({
            //     ...prevData,
            //     password: ""
            // }));
            console.log(error)
		}
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
				<ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} formats={formats} className="w-full" />
				<button type="submit" className="create_button">Create</button>
			</form>
		</section>
	)
}

export default CreatePost