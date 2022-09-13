import axios from "axios"
import { useContext, useEffect } from "react"
import Overlay from "../components/Overlay"
import TokenContext from "../TokenContext"

export default function Excersises() {
	const {token} = useContext(TokenContext)
	useEffect(function() {
		axios.get("/.netlify/functions/get-exercises", {
			headers: {
				authorization: token
			}
		})
			.then(res=>console.log(res))
	}, [])
	return (
		<>
			<h1>Exercises</h1>
			<Overlay show={false}>
				flergh
			</Overlay>
		</>
	)
}