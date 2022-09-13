import { AnimatePresence } from "framer-motion"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CookiesProvider } from "react-cookie"
import { useState } from "react"
import TokenContext from "./TokenContext"
import Layout from "./components/Layout"
import FSLayout from "./components/FSLayout"
import SignUp from "./scenes/SignUp"
import CreateSuccess from "./scenes/CreateSuccess"
import ActivateAccount from "./scenes/ActivateAccount"
import SigIn from "./scenes/SignIn"
import Excersises from "./scenes/Exercises"

function App() {
	const [token, setToken] = useState(null)
	return (
		<CookiesProvider>
			<TokenContext.Provider value={{token, setToken}}>
				<AnimatePresence>
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
				</AnimatePresence>
			</TokenContext.Provider>
		</CookiesProvider>
	)
}

export default App
