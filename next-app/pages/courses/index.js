import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { CourseCard } from "../../components/home/cards";
import { Container } from "react-bootstrap-v5";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRouter } from "next/router";
import axios from "axios";
import { store } from "react-notifications-component";
import Select from "react-select";
import Highlighter from "react-highlight-words";
import AddComponent from "../../components/ads";
import AdsContainer from "../../components/adsContainer";

export default function Courses({
	states_options,
	course_types_options,
	disciplines_options,
	ads,
	courses_res,
	coursesCount,
	nextUrl,
}) {
	const router = useRouter();
	const [courses, setcourses] = useState(courses_res);
	const [morecourses, setmorecourses] = useState(nextUrl);
	const [totalcourses, settotalcourses] = useState(coursesCount);
	const [moreLoading, setmoreLoading] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [state, setstate] = useState(null);
	const [discipline, setdiscipline] = useState(null);
	const [courseType, setcourseType] = useState(null);

	const loadMore = async () => {
		try {
			setmoreLoading(true);
			const res = await fetch(`${morecourses}`);
			const courses_res = await res.json();
			setcourses(courses.concat(courses_res.results));
			setcourses(courses_res.results);
			if (
				courses_res.next !== null &&
				courses_res.next !== undefined &&
				courses_res.next !== ""
			) {
				const newnexturl = await courses_res.next.replace(
					"http://",
					"https://"
				);
				setmorecourses(newnexturl);
			} else {
				setmorecourses(courses_res.next);
			}
			setmoreLoading(false);
		} catch (error) {
			setmoreLoading(false);
			console.log(error);
		}
	};
	const filterCourses = async (e) => {
		e.preventDefault();
		if (
			(courseType === null || courseType === "") &&
			(state === null || state === "") &&
			(discipline === null || discipline === "")
		) {
			store.addNotification({
				message: "Please select atleast one option!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else if (
			courseType !== null &&
			courseType !== "" &&
			(state === null || state === "") &&
			(discipline === null || discipline === "")
		) {
			router.replace(`/courses/${courseType.value}`);
		} else if (
			courseType !== null &&
			courseType !== "" &&
			discipline !== null &&
			discipline !== "" &&
			(state === null || state === "")
		) {
			router.replace(`/courses/${courseType.value}/${discipline.value}`);
		} else if (
			courseType !== null &&
			courseType !== "" &&
			(discipline === null || discipline === "") &&
			state !== null &&
			state !== ""
		) {
			router.replace(`/courses/${courseType.value}/${state.value}`);
		} else if (
			(courseType === null || courseType === "") &&
			discipline !== null &&
			discipline !== "" &&
			(state === null || state === "")
		) {
			router.replace(`/courses/${discipline.value}`);
		} else if (
			(courseType === null || courseType === "") &&
			discipline !== null &&
			discipline !== "" &&
			state !== null &&
			state !== ""
		) {
			router.replace(`/courses/${discipline.value}/${state.value}`);
		} else if (
			courseType !== null &&
			courseType !== "" &&
			discipline !== null &&
			discipline !== "" &&
			state !== null &&
			state !== ""
		) {
			router.replace(
				`/courses/${courseType.value}/${discipline.value}/${state.value}`
			);
		} else if (
			(courseType === null || courseType === "") &&
			(discipline === null || discipline === "") &&
			state !== null &&
			state !== ""
		) {
			router.replace(`/courses/${state.value}`);
		}
	};
	const resetFilter = async (e) => {
		e.preventDefault();
		router.replace(`/courses/`);
	};
	function formatOptionLabel({ label }, { inputValue }) {
		return <Highlighter searchWords={[inputValue]} textToHighlight={label} />;
	}

	const getCourses = async () => {
		if (router.query.discipline) {
			const dis_value = disciplines_options.filter(
				({ value }) => value === router.query.discipline
			);
			setdiscipline(dis_value[0]);
		}
		if (router.query.course_type) {
			const ct_value = course_types_options.filter(
				({ value }) => value === router.query.course_type
			);
			setcourseType(ct_value[0]);
		}
		if (router.query.state) {
			const state_value = states_options.filter(
				({ value }) => value === router.query.state
			);
			setstate(state_value[0]);
		}
		setcourses(courses_res);
		settotalcourses(coursesCount);
		setmorecourses(nextUrl);
		// try {
		// 	setisLoading(true);
		// 	const res = await axios.get(
		// 		`${process.env.NEXT_PUBLIC_API_URL}/courses/`
		// 	);
		// 	const courses_res = await res.data;
		// 	// setcourses(courses_res.results);
		// 	if (
		// 		courses_res.next !== null &&
		// 		courses_res.next !== undefined &&
		// 		courses_res.next !== ""
		// 	) {
		// 		const newnexturl = await courses_res.next.replace(
		// 			"http://",
		// 			"https://"
		// 		);
		// 		setmorecourses(newnexturl);
		// 	} else {
		// 		setmorecourses(courses_res.next);
		// 	}
		// 	setcourses(courses_res);
		// 	settotalcourses(coursesCount);
		// 	// settotalcourses(courses_res.count);
		// 	setisLoading(false);
		// } catch (error) {
		// 	setisLoading(false);
		// 	console.log(error);
		// }
	};
	useEffect(() => {
		getCourses();
	}, [router]);
	return (
		<div className="index">
			<Head>
				<title>{`Find Undergraduate and Postgraduate courses in Australia. (${totalcourses} courses found) - SemesterOne`}</title>
				<meta
					name="description"
					content="Want to find undergraduate and postgraduate courses in Australia? We will help you to discover accredited courses offered by Australian universities."
				/>
				<meta
					data-rh="true"
					property="og:title"
					content={`Find Undergraduate and Postgraduate courses in Australia. (${totalcourses} courses found) - SemesterOne`}
				/>
				<meta
					data-rh="true"
					property="og:description"
					content="Want to find undergraduate and postgraduate courses in Australia? We will help you to discover accredited courses offered by Australian universities."
				/>
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/courses/`}></link>
			</Head>
			<Header />
			<Container>
				<main className="home">
					<div className="courses-sec mt-5">
						<div className="top-heading">
							<h1>Find Undergraduate and Postgraduate courses in Australia</h1>
						</div>
						<div className="row">
							<div className="col-lg-3">
								<div className="filter">
									<h5>Filter</h5>
									<div className="divider"></div>
									<form className="mt-4">
										<div className="row">
											<div className="col-12 mt-4">
												<Select
													options={course_types_options}
													isClearable
													placeholder="Select Degree"
													onChange={(e) => setcourseType(e)}
													value={courseType}
													formatOptionLabel={formatOptionLabel}
												/>
											</div>
											<div className="col-12 mt-4">
												<Select
													options={states_options}
													isClearable
													placeholder="Select State"
													onChange={(e) => setstate(e)}
													value={state}
													formatOptionLabel={formatOptionLabel}
												/>
											</div>
											<div className="col-12 mt-4">
												<Select
													options={disciplines_options}
													placeholder="Select Discipline"
													isClearable
													onChange={(e) => setdiscipline(e)}
													value={discipline}
													formatOptionLabel={formatOptionLabel}
												/>
											</div>
											<div className="col-12 btns mt-4">
												<button onClick={filterCourses}>Search</button>
												<button onClick={resetFilter} className="rbtn ml-3">
													Reset
												</button>
											</div>
										</div>
									</form>
								</div>
								<AdsContainer ads={ads} isDivide={false} />
							</div>
							<div className="col-lg-9">
								<h5 className="count mt-4">{totalcourses} Courses Found</h5>
								<div className="row">
									{isLoading ? (
										<>
											<div className="col-lg-6">
												<SkeletonTheme
													color="rgba(195, 195, 195, 0.11)"
													highlightColor="rgba(93, 93, 93, 0.11)">
													<p>
														<Skeleton height={200} />
														<Skeleton />
														<Skeleton />
													</p>
												</SkeletonTheme>
											</div>
											<div className="col-lg-6">
												<SkeletonTheme
													color="rgba(195, 195, 195, 0.11)"
													highlightColor="rgba(93, 93, 93, 0.11)">
													<p>
														<Skeleton height={200} />
														<Skeleton />
														<Skeleton />
													</p>
												</SkeletonTheme>
											</div>
										</>
									) : (
										<>
											{courses.map((row) => (
												<div key={row.id} className="col-lg-6 mt-4">
													<CourseCard
														university_logo={
															row.university.logo_image || row.university.logo
														}
														course_type={row.course_type}
														discipline={row.discipline}
														name={row.name}
														slug={row.slug}
														university_name={row.university.name}
														cricos_code={row.cricos_code}
														fee={row.fee}
														duration={row.duration}
														study_mode={row.study_mode}
														university_slug={row.university.slug}
													/>
												</div>
											))}
										</>
									)}
								</div>
								{moreLoading ? (
									<div className="row mt-4">
										<div className="col-lg-6">
											<SkeletonTheme
												color="rgba(195, 195, 195, 0.11)"
												highlightColor="rgba(93, 93, 93, 0.11)">
												<p>
													<Skeleton height={200} />
													<Skeleton />
													<Skeleton />
												</p>
											</SkeletonTheme>
										</div>
										<div className="col-lg-6">
											<SkeletonTheme
												color="rgba(195, 195, 195, 0.11)"
												highlightColor="rgba(93, 93, 93, 0.11)">
												<p>
													<Skeleton height={200} />
													<Skeleton />
													<Skeleton />
												</p>
											</SkeletonTheme>
										</div>
									</div>
								) : (
									<>
										{morecourses !== null ? (
											<div onClick={loadMore} className="seeall-btn">
												<a title="Load more courses - SemesterOne">View More</a>
											</div>
										) : (
											<div className="seeall-btn disabled">
												<a title="No more data">No more data</a>
											</div>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				</main>
			</Container>
			<Footer />
		</div>
	);
}
export async function getServerSideProps({ req, res }) {
	const res3 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/disciplines/`);
	const disciplines = await res3.json();
	const res4 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coursestype/`);
	const coursesTypes = await res4.json();
	const res5 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/states/`);
	const states = await res5.json();
	var states_options = [];
	for (var i = 0; i < states.length; i++) {
		states_options.push({
			label: states[i].name,
			value: states[i].slug,
			id: states[i].id,
		});
	}
	var course_types_options = [];
	for (var i = 0; i < coursesTypes.length; i++) {
		course_types_options.push({
			label: coursesTypes[i].name,
			value: coursesTypes[i].slug,
			id: coursesTypes[i].id,
		});
	}
	var disciplines_options = [];
	for (var i = 0; i < disciplines.length; i++) {
		disciplines_options.push({
			label: disciplines[i].name,
			value: disciplines[i].slug,
			id: disciplines[i].slug,
		});
	}
	const bannersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners/`);
	const ads = await bannersRes.json().then((res) => res);
	const coursesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/`);
	let coursesJson = await coursesRes.json();
	let courses_res = coursesJson.results;
	let nextUrl = "";
	if (
		coursesJson.next !== null &&
		coursesJson.next !== undefined &&
		coursesJson.next !== ""
	) {
		nextUrl = await coursesJson.next.replace("http://", "https://");
		// setmorecourses(newnexturl);
	} else {
		nextUrl = coursesJson.next;
		// setmorecourses(courses_res.next);
	}
	// res.setHeader(
	// 	"Cache-Control",
	// 	"public, s-maxage=10, stale-while-revalidate=59"
	// );
	return {
		props: {
			states_options,
			course_types_options,
			disciplines_options,
			ads,
			courses_res,
			coursesCount: coursesJson.count,
			nextUrl,
		}, // will be passed to the page component as props
	};
}
