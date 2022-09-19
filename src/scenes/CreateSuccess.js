import { Link, useLocation } from "react-router-dom"

export default function CreateSuccess() {
	const { state } = useLocation()

	return (
		<div>
			<h1 className="text-lg font-bold text-white">Account Created!</h1>
			<p className="text-white">Congratulations, the account {state?.email} has been created. Please check your email to activate your account.</p>
			<p className="text-sm text-white">An email has been sent to you from 'no-reply@topshelf.dk'.
				Please check your inbox and click the activation link to activate your account.
				If you have not recieved an email within 1 hour, check your spam folder or click here to send a new activation email.</p>
			<Link to="/" className="bg-slate-500 text-white px-5 py-2 rounded-sm inline-block mt-3">Back to home</Link>
		</div>
	)
}
