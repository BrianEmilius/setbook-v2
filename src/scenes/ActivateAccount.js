import axios from "axios"
import { useSearchParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import FormInput from "../components/FormInput"

export default function ActivateAccount() {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	async function handleSubmit(event) {
		event.preventDefault()
		const e = new URLSearchParams(searchParams).get("e")
		const c = new URLSearchParams(searchParams).get("c")

		try {
			const response = await axios.patch("/.netlify/functions/activate", {
				email: e,
				activationCode: c,
				password: event.target.password.value
			})

			if (response.status === 200) {
				toast.success("Your account has been successfully activated", {
					position: toast.POSITION.BOTTOM_CENTER
				})
				navigate("/")
			}
			
		} catch (error) {
			if (error.response?.status === 406) {
				toast.error("Please enter a password", {
					position: toast.POSITION.BOTTOM_CENTER
				})
			}
			if (error.response?.status === 500) {
				toast.error("Something went wrong, try again later.", {
					position: toast.POSITION.BOTTOM_CENTER
				})
			}
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col justify-center w-full">
			<h1 className="text-lg font-bold text-white">Activate Account</h1>
			<p className="text-white">Choose a password for the account {new URLSearchParams(searchParams).get("e")}</p>
			<FormInput type="password" name="password" label="Password"/>
			<button type="submit" className="bg-slate-500 text-white rounded-sm px-5 py-2">Activate</button>
		</form>
	)
}
