import React from "react";
import AddComponent from "./ads";
const AdsContainer = ({ ads, isDivide }) => {
	return (
		<div className="row mt-5 mb-4">
			{ads && ads.length > 0
				? ads.map((a, i) => {
						return (
							<div
								className={`${
									ads.length > 1 && isDivide ? "col-6 " : "col-12 mb-3"
								}`}
								key={i}
							>
								<AddComponent ad={a} />
							</div>
						);
				  })
				: ""}
		</div>
	);
};

export default AdsContainer;
