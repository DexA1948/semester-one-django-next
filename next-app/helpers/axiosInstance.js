import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	header: {
		'Content-Type': 'application/json',
	},
});

export default instance;
