export default function Overlay({ show, children }) {
	return show ? (
		<div className="fixed w-full h-[100vh] backdrop-filter-blur top-0 left-0">
			{children}
		</div>
	) : null
}