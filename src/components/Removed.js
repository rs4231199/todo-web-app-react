export default function Removed({ removed }) {
	return (
		<div>
			<h2>Removed Tasks</h2>
			<ul>
				{
					removed.map((text, index) => {
						return (
							<li key={index} className="removed">
								{text}
							</li>
						)
					})
				}
			</ul>
		</div>
	)
}