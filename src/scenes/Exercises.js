import axios from "axios"
import { useContext, useEffect } from "react"
import Overlay from "../components/Overlay"
import PageHeaderContext from "../PageHeaderContext"
import TokenContext from "../TokenContext"

export default function Excersises() {
	const {token} = useContext(TokenContext)
	const {setPageHeader} = useContext(PageHeaderContext)

	useEffect(function() {
		setPageHeader({title: "Exercises", back: false})

		axios.get("/.netlify/functions/get-exercises", {
			headers: {
				authorization: token
			}
		})
			.then(res=>console.log(res))
	}, [])
	return (
		<>
			<Overlay show={false}>
				flergh
			</Overlay>
		</>
	)
}