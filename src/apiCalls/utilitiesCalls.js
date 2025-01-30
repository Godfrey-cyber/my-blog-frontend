export const getCategories = async () => {
	try {
		const response = await client.get("/categories/getCategories")
		return response
	} catch (error) {
		console.log(error.message)
	}
	// return response;
}

export const login = async (event, email, password, dispatch, loginStart, loginFailure, loginSuccess, formData, navigate, setFormData) => {
	event.preventDefault()
	if (!email || !password) {
		alert("All required fields must be filled.");
		// toast.warn("All required fields must be filled.")
        return;
	}
	dispatch(loginStart())
	try {
		const res = await client.post("/users/login", formData)
		if (res.status === 200) {
    		dispatch(loginSuccess(res.data.user))
    		navigate("/")
    		console.log(res.data.user);
    		// toast.success("Successfully Logged in🥇");
    	}
	} catch (error) {
		dispatch(loginFailure(error?.response?.data?.msg || "Registration Failed"))
		setFormData((prevData) => ({
            ...prevData,
            password: ""
        }));
	}
}