export default function Overlay({ show, children }) {
	function handleClick(event) {

	}

	return show ? (
		<div
			onClick={handleClick}
			className="fixed w-full h-[100vh] backdrop-filter backdrop-blur-sm top-0 left-0 bg-white/10 flex items-center justify-center">
			{children}
		</div>
	) : null
}
