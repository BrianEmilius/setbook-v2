import axios from "axios"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import FormInput from "../components/FormInput"
import TokenContext from "../TokenContext"
import { useCookies } from "react-cookie"

export default function SigIn() {
	const { setToken } = useContext(TokenContext)
	const navigate = useNavigate()
	const [cookies, setCookies] = useCookies(["setbook-account"])

	async function handleSubmit(event) {
		event.preventDefault()

		try {
			const response = await axios.post("/.netlify/functions/token", JSON.stringify({
				email: event.target.email.value,
				password: event.target.password.value
			}))

			if (response.status === 201) {
				const { token, maxAge } = response.data
				
				setToken(token)
				if (event.target.remember.checked) {
					setCookies("setbook-account", token, {
						maxAge
					})
				}
				navigate("/")
			}
		} catch (error) {
			if (error.response?.status === 403) {
				toast.error("You entered a wrong email or password", {
					position: toast.POSITION.BOTTOM_CENTER
				})
			}
			if (error.response?.status === 400) {
				toast.error("You must enter both an email and a password", {
					position: toast.POSITION.BOTTOM_CENTER
				})
			}
			if (error.response?.status === 500) {
				toast.error("Something went wrong. Please try again later.", {
					position: toast.POSITION.BOTTOM_CENTER
				})
			}
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col w-full">
			<h1 className="text-lg font-bold text-white">Sign In</h1>
			<FormInput type="email" name="email" label="Email"/>
			<FormInput type="password" name="password" label="Password"/>
			<div>
				<label className="text-white my-3 form-check-label inline-block">
					<input
						type="checkbox"
						name="remember"
						className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
					/>
					Keep me signed in on this device
				</label>
			</div>
			<button type="submit" className="bg-slate-500 text-white px-5 py-2 rounded-sm">Sign in</button>
			<p className="text-white mt-3">
				Don't already have an account? <Link to="/signup" className="text-blue-500 underline">Sign up for free!</Link>
			</p>
		</form>
	)
}
