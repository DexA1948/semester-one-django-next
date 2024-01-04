import { axios } from "../helpers";

export class DataServices {
	getTopUniversities() {
		return axios.get(`/universities/?ordering=-course_count&limit=6`);
	}

	getLatestBlogs() {
		return axios.get("/blogs/?limit=3");
	}

	getDisciplines() {
		return axios.get("/disciplines/");
	}

	getCoursesTypes() {
		return axios.get("/coursestype/");
	}

	getStates() {
		return axios.get("/states/");
	}

	getFeatures() {
		return axios.get("/features/");
	}

	getNotes() {
		return axios.get("/notes/");
	}

	getTestimonials() {
		return axios.get("/testimonials/");
	}

	getCourses() {
		return axios.get("/courses/?limit=1");
	}

	getBanners() {
		return axios.get("/banners/?home_banner=true");
	}

	getCountries() {
		return axios.get("/countries/");
	}

	getUniversities() {
		return axios.get("/universities/");
	}

	getAgencies() {
		return axios.get("/agencies_options/");
	}
}
