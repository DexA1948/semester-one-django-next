import React from "react";
export default function HomeHeaderCard({
	title,
	count,
	titleStyle,
	icon,
	cardStyle,
	cardBodyStyle,
}) {
	return (
		<div className="card home-header-card position-absolute" style={cardStyle}>
			<div className="card-body" style={cardBodyStyle}>
				<div className="">
					<img src={icon} />
				</div>
				<div className="content">
					<p className="mb-0 count" style={titleStyle}>
						{count}+
					</p>
					<p className="mb-0 title">{title}</p>
				</div>
			</div>
		</div>
	);
}
