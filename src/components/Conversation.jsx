import React from 'react'

const Conversation = () => {
	return (
		<div className="w-full h-fit p-3 flex flex-col my-6">
			<span className="flex justify-between items-center border-b border-gray-400 my-4">
				<p className="text-xl text-gray-800 font-bold">Conversations</p>
				<p className="text-sm text-green-400 font-light">7 Reading</p>
			</span>
			<div className="text-sm font-light my-6">Welcome to TechCrunch comments! Please keep conversations courteous and on-topic. See our <span className="cursor-pointer transition delay-300 text-sm text-green-500 font-medium hover:text-green-700">community guidelines</span> for more information.
			</div>
			<form className="flex my-2">
				<input type="text" id="photo" placeholder="What's on your mind" className="create_input" />
			</form>
			<div className="flex flex-col  items-center space-y-2 my-6">
				<span className="text-lg text-center font-semibold text-gray-800">Comment Icon</span>
				<p className="text-lg text-center font-medium text-gray-600">No one seems to have shared their thoughts on this topic yet</p>
				<p className="text-sm font-medium text-gray-500">Leave a comment so your voice will be heard first.</p>
				
			</div>
		</div>
	)
}

export default Conversation