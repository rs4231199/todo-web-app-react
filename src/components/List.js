export default function List({ tasks, toggleTaskStatus }) {
	const listItems = tasks.map((task, index) => {
		return (
			<li
				key={index}
				className={
					task.active ? 'task' : 'task task-completed'
				}
				onClick={
					() => toggleTaskStatus(index)
				}
			>
				{task.text}
			</li>
		)
	})

	return (
		<div>
			<h2>Tasks</h2>
			<ul>
				{
					listItems
				}
			</ul>
		</div>
	)
}