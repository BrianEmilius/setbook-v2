import { Outlet } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import splash from "../splash-image-lg.jpg"

export default function FSLayout() {
	return (
		<>
			<main
				style={{backgroundImage: `url(${splash})`, backgroundSize: "cover", height: "100vh", backgroundPositionX: "75%"}}
				className="flex flex-col items-center justify-center px-4"
			>
				<Outlet />
			</main>
		</>
	)
}