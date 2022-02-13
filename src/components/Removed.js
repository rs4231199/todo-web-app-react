export default function Removed({ removed }) {
	const listItems = removed.map((text, index) => {
		return (
			<li key={index} className="removed">
				{text}
			</li>
		)
	})

	return (
		<div>
			<h2>Removed Tasks</h2>
			<ul>
				{listItems}
			</ul>
		</div>
	)
}