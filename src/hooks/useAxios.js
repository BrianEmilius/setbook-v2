import axios from "axios"
import { useContext, useEffect, useState } from "react"
import TokenContext from "../TokenContext"

export default function useAxios(url) {
	const [data, setData] = useState()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState()
	const { token } = useContext(TokenContext)

	useEffect(function() {
		(async function(){
			try {
				const response = await axios.get(url, {
					headers: {
						authorization: token
					}
				})
		
				if (response.status === 200) {
					setData(response.data)
					setLoading(false)
				}
			} catch (error) {
				setError(error)
			}
		})()
	}, [])

	return {
		data, loading, error
	}
}
