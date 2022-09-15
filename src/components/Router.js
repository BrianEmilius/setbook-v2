import { BrowserRouter, Route, Routes } from "react-router-dom"
import ActivateAccount from "../scenes/ActivateAccount"
import CreateSuccess from "../scenes/CreateSuccess"
import Excersises from "../scenes/Exercises"
import SigIn from "../scenes/SignIn"
import SignUp from "../scenes/SignUp"
import FSLayout from "./FSLayout"
import Layout from "./Layout"

export default function Router({token}) {
	return (
		<BrowserRouter>
			<Routes>
				{token ?
				<Route path="/" element={<Layout/>}>
					<Route default path="/" element={<Excersises/>}/>
				</Route>
				:
				<Route path="/" element={<FSLayout/>}>
					<Route default path="/" element={<SigIn/>}/>
					<Route path="/signup" element={<SignUp/>}/>
					<Route path="/create-success" element={<CreateSuccess/>}/>
					<Route path="/activate-account" element={<ActivateAccount/>}/>
				</Route>
				}
			</Routes>
		</BrowserRouter>
	)
}
