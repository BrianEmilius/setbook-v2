import { Outlet } from "react-router-dom"
import { ToastContainer, Zoom } from "react-toastify"
import AppBar from "./AppBar"

export default function Layout() {
	return (
		<>
			<AppBar/>
			<main>
				<Outlet/>
			</main>
			<ToastContainer
				closeButton={false}
				hideProgressBar={true}
				transition={Zoom}
				limit={3}
				newestOnTop={true}
			/>
		</>
	)
}