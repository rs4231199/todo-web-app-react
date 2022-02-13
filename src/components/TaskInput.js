import { useEffect, useRef, useState } from "react"

export default function TaskInput({ addTask }) {
	const [value, setValue] = useState('')
	const [error, setError] = useState(false)
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef.current.focus()
	}, [])

	const handleInput = () => {
		if (value.length < 5) {
			setError(true)
			return;
		}
		addTask(value)
		setValue('')
	}

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' || event.key === 13) {
			handleInput()
		}
	}

	const handleChange = ({ target }) => {
		setValue(target.value)
		if (error && target.value.length >= 5) {
			setError(false)
		}
	}

	return (
		<div>
			<input
				type="text"
				className="input-field"
				ref={inputRef}
				value={value}
				onKeyPress={handleKeyPress}
				onChange={handleChange}
			/>
			<button onClick={handleInput} className="add-task">Add task</button>
			{error && <p className="error">A new task can't be created with less than five characters</p>}
		</div>
	)
}