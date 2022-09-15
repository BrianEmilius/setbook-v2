import { AnimatePresence } from "framer-motion"
import { CookiesProvider, useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import TokenContext from "./TokenContext"
import PageHeaderContext from "./PageHeaderContext"
import Router from "./components/Router"

function App() {
	const [token, setToken] = useState(null)
	const [cookies] = useCookies(["setbook-account"])
	const [pageHeader, setPageHeader] = useState({title:"", back: false})
	
	useEffect(function() {
		if (cookies["setbook-account"])
			setToken(cookies["setbook-account"])
	}, [])

	return (
		<CookiesProvider>
			<TokenContext.Provider value={{token, setToken}}>
				<PageHeaderContext.Provider value={{pageHeader, setPageHeader}}>
					<AnimatePresence>
						<Router token={token}/>
					</AnimatePresence>
				</PageHeaderContext.Provider>
			</TokenContext.Provider>
		</CookiesProvider>
	)
}

export default App
