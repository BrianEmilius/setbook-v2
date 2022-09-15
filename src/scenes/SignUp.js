import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import splash from "../splash-image-lg.jpg"

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
		<div
			style={{backgroundImage: `url(${splash})`, backgroundSize: "cover", height: "100vh", backgroundPositionX: "75%"}}
		>
			<form onSubmit={handleSubmit}>
				<h1 className="text-lg font-bold">Sign Up For Free</h1>
				<div>
					<label>
						Email
						<input type="email" name="email" className="block" placeholder="your@email.com" />
					</label>
				</div>
				<button type="submit" className="bg-slate-500 text-white rounded-sm px-5 py-2">Sign up</button>
			</form>
		</div>
	)
}
