import { useEffect, useState } from "react"

export default function FormInput({ type, name, label, placeholder }) {
	const [isFocused, setIsFocused] = useState(false)
	const [value, setValue] = useState("")
	const id = Math.random().toString(32)
	
	useEffect(function() {
		if (value.length) 
			setIsFocused(true)
	}, [])

	function focusHandler() {
		if (isFocused && value === "") {
			setIsFocused(false)
		} else {
			setIsFocused(true)
		}
	}

	return (
		<div className="relative">
			<label
				htmlFor={id}
				className={isFocused ? "transition-all absolute left-2 text-xs" : "transition-all absolute left-2 top-3"}>
				{label}
			</label>
			<input
				type={type}
				name={name}
				id={id}
				className="w-full px-2 pb-2 pt-3 outline-none focus:border-blue-500 border-b-4 border-transparent box-border"
				onFocus={focusHandler}
				onBlur={focusHandler}
				onChange={e => setValue(e.target.value)}
			/>
		</div>
	)
}
