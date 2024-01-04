import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { CourseCard } from '../../components/home/cards';
import { Container } from 'react-bootstrap-v5';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import axios from 'axios';
import { store } from 'react-notifications-component';
import Select from 'react-select';
import Highlighter from 'react-highlight-words';
import AdsContainer from '../../components/adsContainer';

export default function Courses({
	states_options,
	course_types_options,
	disciplines_options,
	courseTypeParam,
	disciplineParam,
	stateParam,
	nextUrl,
	courseCount,
	coursesData,
	ads,
	disciplineTitle,
	degreeTitle,
	stateTitle,
	headUrl,
}) {
	// debugger;
	const router = useRouter();
	const [courses, setcourses] = useState(coursesData);
	const [morecourses, setmorecourses] = useState(nextUrl);
	const [totalcourses, settotalcourses] = useState(courseCount);
	const [moreLoading, setmoreLoading] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [state, setstate] = useState(stateParam);
	const [discipline, setdiscipline] = useState(disciplineParam);
	const [courseType, setcourseType] = useState(courseTypeParam);

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
				courses_res.next !== ''
			) {
				const newnexturl = await courses_res.next.replace(
					'http://',
					'https://'
				);
				setmorecourses(newnexturl);
			} else {
				setmorecourses(courses_res.next);
			}
			setmoreLoading(false);
		} catch (error) {
			setmoreLoading(false);
		}
	};
	const filterCourses = async (e) => {
		e.preventDefault();
		if (
			(courseType === null || courseType === '') &&
			(state === null || state === '') &&
			(discipline === null || discipline === '')
		) {
			store.addNotification({
				message: 'Please select atleast one option!',
				type: 'danger',
				insert: 'top',
				container: 'top-right',
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else if (
			courseType !== null &&
			courseType !== '' &&
			(state === null || state === '') &&
			(discipline === null || discipline === '')
		) {
			router.replace(`/courses/${courseType.value}`);
		} else if (
			courseType !== null &&
			courseType !== '' &&
			discipline !== null &&
			discipline !== '' &&
			(state === null || state === '')
		) {
			router.replace(`/courses/${courseType.value}/${discipline.value}`);
		} else if (
			courseType !== null &&
			courseType !== '' &&
			(discipline === null || discipline === '') &&
			state !== null &&
			state !== ''
		) {
			router.replace(`/courses/${courseType.value}/${state.value}`);
		} else if (
			(courseType === null || courseType === '') &&
			discipline !== null &&
			discipline !== '' &&
			(state === null || state === '')
		) {
			router.replace(`/courses/${discipline.value}`);
		} else if (
			(courseType === null || courseType === '') &&
			discipline !== null &&
			discipline !== '' &&
			state !== null &&
			state !== ''
		) {
			router.replace(`/courses/${discipline.value}/${state.value}`);
		} else if (
			courseType !== null &&
			courseType !== '' &&
			discipline !== null &&
			discipline !== '' &&
			state !== null &&
			state !== ''
		) {
			router.replace(
				`/courses/${courseType.value}/${discipline.value}/${state.value}`
			);
		} else if (
			(courseType === null || courseType === '') &&
			(discipline === null || discipline === '') &&
			state !== null &&
			state !== ''
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

	const setCourses = async () => {
		setcourses(coursesData);
		setmorecourses(nextUrl);
		settotalcourses(courseCount);
		setstate(stateParam);
		setdiscipline(disciplineParam);
		setcourseType(courseTypeParam);
	};

	useEffect(() => {
		setCourses();
	}, [router]);
	return (
		<div className='index'>
			<Head>
				<title>
					{degreeTitle} {disciplineTitle} Courses in{' '}
					{stateTitle ? stateTitle : 'Australia'}. ({totalcourses} courses
					found) | SemesterOne
				</title>
				<meta
					name='description'
					content={`Looking for ${disciplineTitle} ${degreeTitle} courses in ${
						stateTitle ? stateTitle : 'Australia'
					}? Choose from the best full time and part time courses from leading universities in Australia. Apply now.`}
				/>
				<meta
					data-rh='true'
					property='og:title'
					content={`${degreeTitle} ${disciplineTitle} Courses in ${
						stateTitle ? stateTitle : 'Australia'
					}. (${totalcourses} courses found) | SemesterOne`}
				/>
				<meta
					data-rh='true'
					property='og:description'
					content={`Looking for ${disciplineTitle} ${degreeTitle} courses in ${
						stateTitle ? stateTitle : 'Australia'
					}? Choose from the best full time and part time courses from leading universities in Australia. Apply now.`}
				/>
				<meta data-rh='true' property='og:url' content={headUrl} />
				<link rel='canonical' href={headUrl}></link>
			</Head>
			<Header />
			<Container>
				<main className='home'>
					<div className='courses-sec mt-5'>
						<div className='top-heading'>
							{disciplineTitle || degreeTitle || stateTitle ? (
								<h1>
									{disciplineTitle} {degreeTitle} Courses in{' '}
									{stateTitle ? stateTitle : 'Australia'}
								</h1>
							) : (
								<h1>
									Finds Undergraduate and Postgraduate courses in Australia
								</h1>
							)}
						</div>
						<div className='row'>
							<div className='col-lg-3'>
								<div className='filter'>
									<h5>Filter</h5>
									<div className='divider'></div>
									<form className='mt-4'>
										<div className='row'>
											<div className='col-12 mt-4'>
												<Select
													options={course_types_options}
													isClearable
													placeholder='Select Degree'
													onChange={(e) => setcourseType(e)}
													value={courseType}
													formatOptionLabel={formatOptionLabel}
												/>
											</div>
											<div className='col-12 mt-4'>
												<Select
													options={states_options}
													isClearable
													placeholder='Select State'
													onChange={(e) => setstate(e)}
													value={state}
													formatOptionLabel={formatOptionLabel}
												/>
											</div>
											<div className='col-12 mt-4'>
												<Select
													options={disciplines_options}
													placeholder='Select Discipline'
													isClearable
													onChange={(e) => setdiscipline(e)}
													value={discipline}
													formatOptionLabel={formatOptionLabel}
												/>
											</div>
											<div className='col-12 btns mt-4'>
												<button onClick={filterCourses}>Search</button>
												<button onClick={resetFilter} className='rbtn ml-3'>
													Reset
												</button>
											</div>
										</div>
									</form>
								</div>
								<AdsContainer ads={ads} isDivide={false} />
							</div>
							<div className='col-lg-9'>
								<h5 className='count mt-4'>{totalcourses} Courses Found</h5>
								<div className='row'>
									{isLoading ? (
										<>
											<div className='col-lg-6'>
												<SkeletonTheme
													color='rgba(195, 195, 195, 0.11)'
													highlightColor='rgba(93, 93, 93, 0.11)'
												>
													<p>
														<Skeleton height={200} />
														<Skeleton />
														<Skeleton />
													</p>
												</SkeletonTheme>
											</div>
											<div className='col-lg-6'>
												<SkeletonTheme
													color='rgba(195, 195, 195, 0.11)'
													highlightColor='rgba(93, 93, 93, 0.11)'
												>
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
												<div key={row.id} className='col-lg-6 mt-4'>
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
									<div className='row mt-4'>
										<div className='col-lg-6'>
											<SkeletonTheme
												color='rgba(195, 195, 195, 0.11)'
												highlightColor='rgba(93, 93, 93, 0.11)'
											>
												<p>
													<Skeleton height={200} />
													<Skeleton />
													<Skeleton />
												</p>
											</SkeletonTheme>
										</div>
										<div className='col-lg-6'>
											<SkeletonTheme
												color='rgba(195, 195, 195, 0.11)'
												highlightColor='rgba(93, 93, 93, 0.11)'
											>
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
											<div onClick={loadMore} className='seeall-btn'>
												<a title='Load more courses - SemesterOne'>View More</a>
											</div>
										) : (
											<div className='seeall-btn disabled'>
												<a title='Load more courses - SemesterOne'>
													No more data
												</a>
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

export async function getServerSideProps({ params, res, req }) {
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
	let param = '';
	let degreeTitle = '';
	let disciplineTitle = '';
	let stateTitle = '';
	let courseIndex = -1;
	let disciplineIndex = -1;
	let stateIndex = -1;
	let courseTypeParam = '';
	let disciplineParam = '';
	let stateParam = '';
	let headUrlTypes = '';
	if (params && params.slug && params.slug.length > 0) {
		param = '?';

		for (let s = 0; s < params.slug.length; s++) {
			if (disciplineIndex === -1) {
				disciplineIndex = disciplines_options.findIndex(
					(x) => x.value === params.slug[s]
				);
			}
			if (stateIndex === -1) {
				stateIndex = states_options.findIndex(
					(x) => x.value === params.slug[s]
				);
			}
			if (courseIndex === -1) {
				courseIndex = course_types_options.findIndex(
					(x) => x.value === params.slug[s]
				);
			}
		}

		if (courseIndex > -1) {
			let val = course_types_options[courseIndex].value;
			courseTypeParam = {
				label: course_types_options[courseIndex].label,
				value: val,
				id: course_types_options[courseIndex].id,
			};
			degreeTitle = course_types_options[courseIndex].label;
			param += 'course_type=' + val + '&';
			headUrlTypes += `${val}/`;
		}
		if (disciplineIndex > -1) {
			let val = disciplines_options[disciplineIndex].value;
			disciplineParam = {
				label: disciplines_options[disciplineIndex].label,
				value: val,
				id: disciplines_options[disciplineIndex].id,
			};
			disciplineTitle = disciplines_options[disciplineIndex].label;
			param += 'discipline=' + val + '&';
			headUrlTypes += `${val}/`;
		}
		if (stateIndex > -1) {
			let val = states_options[stateIndex].value;
			stateParam = {
				label: states_options[stateIndex].label,
				value: val,
				id: states_options[stateIndex].id,
			};
			stateTitle = states_options[stateIndex].label;
			param += 'state=' + val + '&';
			headUrlTypes += `${val}/`;
		}
		var str = param;
		var newStr = str.slice(0, -1);
		newStr += '';
	}
	const resCourses = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/courses/${newStr}`
	);
	const headUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/courses/${headUrlTypes}`;
	// console.log(`${process.env.NEXT_PUBLIC_API_URL}/courses/${newStr}`);
	const bannersRes = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/banners/${newStr}`
	);
	const ads = await bannersRes.json().then((res) => res);
	const courses_res = await resCourses.json();
	let coursesData = courses_res.results;
	let nextUrl = '';
	// setcourses(courses_res.results);
	if (
		courses_res.next !== null &&
		courses_res.next !== undefined &&
		courses_res.next !== ''
	) {
		nextUrl = await courses_res.next.replace('http://', 'https://');
		// setmorecourses(newnexturl);
	} else {
		nextUrl = courses_res.next;
		// setmorecourses(courses_res.next);
	}
	let courseCount = courses_res.count;
	// res.setHeader(
	// 	"Cache-Control",
	// 	"public, s-maxage=10, stale-while-revalidate=59"
	// );
	return {
		props: {
			states_options,
			course_types_options,
			disciplines_options,
			courseTypeParam,
			disciplineParam,
			stateParam,
			nextUrl,
			courseCount,
			coursesData,
			ads,
			disciplineTitle,
			degreeTitle,
			stateTitle,
			headUrl,
		}, // will be passed to the page component as props
	};
}
