import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import FormInput from "../components/FormInput"

export default function SignUp() {
	const navigate = useNavigate()

	async function handleSubmit(event) {
		event.preventDefault()

		try {
			const res = await axios.post("/.netlify/functions/create-user", JSON.stringify({
				email: event.target.email.value
			}))

			if (res.status === 201) {
				navigate("/create-success", {state: {email: event.target.email.value}})
			}
		} catch (error) {
			if (error.response.status === 406) {
				toast.error("Please enter a valid email address", {
					position: toast.POSITION.BOTTOM_CENTER
				})
			}
			if (error.response.status === 400) {
				navigate("/create-success", {state: {email: event.target.email.value}})
			}
			if (error.response.status === 500) {
				toast.error("Something went wrong, try again later.", {
					position: toast.POSITION.BOTTOM_CENTER
				})
			}
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col w-full">
			<h1 className="text-lg font-bold text-white">Sign Up For Free</h1>
			<FormInput type="email" name="email" label="Email" />
			<label className="text-white my-3 form-check-label inline-block">
				<input
					type="checkbox"
					name="acceptTOS"
					className="w-4 h-4 text-blue-600 bg-gray-100 rounded-sm border-gray-300 mr-3"
				/>
				I have read and accept the <a href="/TOS" className="text-blue-500 underline" target="_blank" rel="noopener">terms and conditions</a>
			</label>
			<button type="submit" className="bg-slate-500 text-white rounded-sm px-5 py-2 mt-3">Sign up</button>
		</form>
	)
}
