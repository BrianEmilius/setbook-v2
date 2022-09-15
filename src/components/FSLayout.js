import { Outlet } from "react-router-dom"
import { ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function FSLayout() {
	return (
		<>
			<main>
				<Outlet />
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