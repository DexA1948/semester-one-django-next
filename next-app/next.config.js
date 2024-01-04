module.exports = {
	trailingSlash: true,
	images: {
		domains: ["dev.semesterone.com", "semesterone.com"],
	},
	headers: async () => {
		return [
			{
				source: "/:pages*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
};
