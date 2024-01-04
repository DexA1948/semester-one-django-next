export const getOptions = (res, objRes) => {
	if (objRes) {
		const options = Object.keys(res).map((el) => {
			return {
				label: res[el],
				value: el,
				id: el,
			};
		});
		return options;
	} else {
		const options = [];
		res.forEach((opt) => {
			options.push({
				label: opt.name,
				value: opt.slug,
				id: opt.id,
			});
		});
		return options;
	}
};
