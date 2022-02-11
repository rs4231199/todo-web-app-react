import { useState } from "react"

export default function TaskInput({ addTask }) {
	const [error, setError] = useState(false);

	const handleInput = () => {
		const input = document.querySelector('.input-field');
		if (input.value.length < 5) {
			setError(true)
			return;
		}
		addTask(input.value)
		input.value = ""
	}

	return (
		<div>
			<input
				type="text"
				className="input-field"
				onKeyPress={(event) => {
					if (event.key === 'Enter' || event.key === 13) {
						handleInput()
					}
				}}
				onChange={({ target }) => {
					if (error && target.value.length >= 5) {
						setError(false)
					}
				}}
			/>
			<button onClick={handleInput} className="add-task"> Add task</button>
			{error && <p className="error">A task can't be created with less than five characters</p>}
		</div>
	)
}