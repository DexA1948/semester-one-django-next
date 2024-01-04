import React from "react";
import Link from "next/link";
const AddComponent = ({ ad }) => {
	return (
		<div className="card mb-3 adContainer">
			<div className="sponsored">Sponsored</div>
			<Link legacyBehavior href={ad.target_url}>
				<a title={`${ad.title}`} target="_blank">
					<img
						src={`${ad.image}`}
						className="card-img-top"
						alt={`${ad.title}`}
						title={`${ad.title}`}
					/>
				</a>
			</Link>
			<div className="card-body">
				<h5 className="card-title">{ad.title}</h5>
				<p className="card-text">{ad.description}</p>
			</div>
		</div>
	);
};

export default AddComponent;
