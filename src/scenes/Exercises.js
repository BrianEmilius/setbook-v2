import { useContext, useEffect } from "react"
import { toast } from "react-toastify"
import ExerciseListItem from "../components/ExerciseListItem"
import Overlay from "../components/Overlay"
import useAxios from "../hooks/useAxios"
import PageHeaderContext from "../PageHeaderContext"

export default function Excersises() {
	const {setPageHeader} = useContext(PageHeaderContext)
	const { data, loading, error } = useAxios("/.netlify/functions/get-exercises")
	
	useEffect(function() {
		setPageHeader({title: "Exercises", back: false})
		if (error) {
			toast.error(error)
		}
	}, [error])

	return (
		<>
			<ul>
				{data?.map(exercise => <ExerciseListItem key={exercise._id} id={exercise._id} title={exercise.title} />)}
			</ul>
			<Overlay show={false}>
				floof
			</Overlay>
		</>
	)
}
