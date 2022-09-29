import { useNavigate } from "react-router-dom"

export default function ExerciseListItem({title, id}) {
	const navigate = useNavigate()

	return (
		<li className="flex items-center even:bg-slate-200 px-2 py-2">
			<button
				className="w-full py-1 px-2 rounded-md text-left"
				onClick={()=>navigate(`/exercise/${id}`)}
			>
				<span className="text-white">{title}</span>
			</button>
		</li>
	)
}
