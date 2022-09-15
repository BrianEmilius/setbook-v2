import { useContext } from "react"
import PageHeaderContext from "../PageHeaderContext"

export default function AppBar() {
	const {pageHeader} = useContext(PageHeaderContext)

	const style = {
		background: `linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
		linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
		linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
		linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
		linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
		linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424)`,
		backgroundColor: "#131313",
		backgroundSize: "20px 20px"
	}

	return (
		<header
			style={style}
			className="flex items-center justify-center h-[8vh]"
		>
			<h1 className="text-white">{pageHeader?.title}</h1>
		</header>
	)
}
