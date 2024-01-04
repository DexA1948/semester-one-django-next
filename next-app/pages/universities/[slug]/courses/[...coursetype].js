import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';
import Link from 'next/link';
import { CourseCard } from '../../../../components/home/cards';
import { Container } from 'react-bootstrap-v5';
import { useRouter } from 'next/router';
import { GiChart } from 'react-icons/gi';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import _ from 'lodash';
import AdsContainer from '../../../../components/adsContainer';
import Select from 'react-select';
import Highlighter from 'react-highlight-words';

export default function UniversityCourses({
	course,
	nextUrl,
	totalCount,
	disciplines_res,
	coursesTypes_res,
	university,
	coursetypeProps,
	disciplineProps,
	ads,
	disciplineTitle,
	degreeTitle,
	headUrl,
}) {
	const router = useRouter();
	const { slug, coursetype } = router.query;
	const [courses, setcourses] = useState(course);
	const [morecourses, setmorecourses] = useState(nextUrl);
	const [totalcourses, settotalcourses] = useState(totalCount);
	const [moreLoading, setmoreLoading] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [disciplines, setdisciplines] = useState(disciplines_res);
	const [courseTypes, setcourseTypes] = useState(coursesTypes_res);
	const [discipline, setdiscipline] = useState(disciplineProps);
	const [courseType, setcourseType] = useState(coursetypeProps);
	const loadMore = async () => {
		try {
			setmoreLoading(true);
			const res = await fetch(`${morecourses}`);
			const courses_res = await res.json();
			setcourses(courses.concat(courses_res.results));
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
			console.log(error);
		}
	};
	const filterCourses = async (e) => {
		e.preventDefault();
		// setisLoading(true);
		// let url = "";
		if (
			courseType !== '' &&
			courseType !== null &&
			discipline !== '' &&
			discipline !== null
		) {
			router.replace(
				`/universities/${slug}/courses/${courseType.value}/${discipline.value}`
			);
		} else if (
			courseType !== '' &&
			courseType !== null &&
			(discipline === '' || discipline === null)
		) {
			router.replace(`/universities/${slug}/courses/${courseType.value}`);
		} else if (
			(courseType === '' || courseType === null) &&
			discipline !== '' &&
			discipline !== null
		) {
			router.replace(`/universities/${slug}/courses/${discipline.value}`);
		}
		// const res = await fetch(url);
		// const courses_res = await res.json();
		// setcourses(courses_res.results);
		// if (
		// 	courses_res.next !== null &&
		// 	courses_res.next !== undefined &&
		// 	courses_res.next !== ""
		// ) {
		// 	const newnexturl = await courses_res.next.replace("http://", "https://");
		// 	setmorecourses(newnexturl);
		// } else {
		// 	setmorecourses(courses_res.next);
		// }
		// settotalcourses(courses_res.count);
		// setisLoading(false);
	};
	const resetFilter = async (e) => {
		e.preventDefault();
		setcourseType('');
		setdiscipline('');
		setisLoading(true);
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/?university_slug=${slug}`
		);
		const courses_res = await res.json();
		setcourses(courses_res.results);
		if (
			courses_res.next !== null &&
			courses_res.next !== undefined &&
			courses_res.next !== ''
		) {
			const newnexturl = await courses_res.next.replace('http://', 'https://');
			setmorecourses(newnexturl);
		} else {
			setmorecourses(courses_res.next);
		}
		settotalcourses(courses_res.count);
		setisLoading(false);
	};
	useEffect(() => {
		setcourses(course);
		// try {
		// 	let coursestype;
		// 	if (coursetype === "all") {
		// 		coursestype = "";
		// 	} else {
		// 		coursestype = coursetype;
		// 	}
		// 	debugger;
		// 	setisLoading(true);
		// 	const res = await fetch(
		// 		`${process.env.NEXT_PUBLIC_API_URL}/courses/?university_slug=${slug}&course_type=${coursestype}`
		// 	);
		// 	const courses_res = await res.json();
		// 	setcourses(courses_res.results);
		// 	if (courses_res.next !== null) {
		// 		const newnexturl = await courses_res.next.replace(
		// 			"http://",
		// 			"https://"
		// 		);
		// 		setmorecourses(newnexturl);
		// 	} else {
		// 		setmorecourses(courses_res.next);
		// 	}
		// 	settotalcourses(courses_res.count);
		// 	const res2 = await fetch(
		// 		`${process.env.NEXT_PUBLIC_API_URL}/disciplines/`
		// 	);
		// 	const disciplines_res = await res2.json();
		// 	setdisciplines(disciplines_res);
		// 	const res1 = await fetch(
		// 		`${process.env.NEXT_PUBLIC_API_URL}/coursestype/`
		// 	);
		// 	const coursesTypes_res = await res1.json();
		// 	setcourseTypes(coursesTypes_res);
		// 	setisLoading(false);
		// } catch (error) {
		// 	setisLoading(false);
		// 	console.log(error);
		// }
	}, [router]);
	function formatOptionLabel({ label }, { inputValue }) {
		return <Highlighter searchWords={[inputValue]} textToHighlight={label} />;
	}
	return (
		<div className='index'>
			<Head>
				<title>
					{degreeTitle} {disciplineTitle} courses in {university.name}. (
					{totalCount} courses found)
				</title>
				<meta
					name='description'
					content={`Find the ${degreeTitle} courses, degrees and subjects from ${university.name} in Australia. Search for accredited courses offered by ${university.name}`}
				/>
				<meta
					data-rh='true'
					property='og:title'
					content={`${degreeTitle} ${disciplineTitle} courses in ${university.name}. (${totalCount} courses found)`}
				/>
				<meta
					data-rh='true'
					property='og:description'
					content={`Find the ${degreeTitle} courses, degrees and subjects from ${university.name} in Australia. Search for accredited courses offered by ${university.name}.`}
				/>
				<meta data-rh='true' property='og:url' content={headUrl} />
				<link rel='canonical' href={headUrl}></link>
			</Head>
			<Header />
			<Container>
				<main className='home universityPage'>
					<div className='courses-sec mt-5'>
						<div
							className='uni_img'
							style={{
								backgroundImage: `linear-gradient(rgba(38, 32, 96, 0.529), rgba(38, 32, 96, 0.693)), url(${
									university.logo ||
									'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&ixlib=rb-1.2.1&q=80&w=1500'
								})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
						>
							<div className='row' style={{ width: '100%' }}>
								<div className='col-lg-3' style={{ background: 'white' }}>
									<div className='uni_logo'>
										<img
											src={university.logo_image || university.logo}
											alt={`${university.name} logo`}
										/>
									</div>
								</div>
								<div className='col-lg-9'>
									<div className='university-name-ranking'>
										<h1 className='mt-3'>
											{disciplineTitle} {degreeTitle} Courses in{' '}
											{university.name}
										</h1>
										<Link
											legacyBehavior
											href={`/universities/${university.slug}/`}
											title={`View ${university.name} Page`}
										>
											<a title={`View ${university.name} Page`}>
												<h3 className='uniname'>{university.name}</h3>
											</a>
										</Link>
									</div>
								</div>
							</div>
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
													options={courseTypes}
													isClearable
													placeholder='Select Degree'
													onChange={(e) => setcourseType(e)}
													value={courseType}
													formatOptionLabel={formatOptionLabel}
												/>
											</div>
											<div className='col-12 mt-4'>
												<Select
													options={disciplines}
													isClearable
													placeholder='Select Discipline'
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
								<h5 className='count mt-4'>{totalCount} Courses Found</h5>
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
												<a title='No more data'>No more data</a>
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
	// setisLoading(true);
	let nextUrl = '';
	const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/disciplines/`);
	const disciplines_res = await res2.json();
	const res1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coursestype/`);
	const coursesTypes_res = await res1.json();
	const { coursetype, slug } = params;
	let type = '';
	let dis = '';
	let url = '';
	let headUrl = '';
	let degreeTitle = '';
	let disciplineTitle = '';
	if (
		coursetype &&
		coursetype.length > 0 &&
		coursesTypes_res &&
		coursesTypes_res.length > 0
	) {
		for (const c of coursetype) {
			let val = coursesTypes_res.find((x) => x.slug === c);
			if (val)
				type = {
					label: val.name,
					value: val.slug,
					id: val.id,
				};
		}
	}
	if (
		coursetype &&
		coursetype.length > 0 &&
		disciplines_res &&
		disciplines_res.length > 0
	) {
		for (const c of coursetype) {
			let val = disciplines_res.find((x) => x.slug === c);
			if (val)
				dis = {
					label: val.name,
					value: val.slug,
					id: val.slug,
				};
		}
	}
	if (type && dis) {
		degreeTitle = type.label;
		disciplineTitle = dis.label;
	} else if (type && !dis) {
		degreeTitle = type.label;
	} else if (!type && dis) {
		disciplineTitle = dis.label;
	}
	if (type !== '' && dis !== '') {
		url = `${process.env.NEXT_PUBLIC_API_URL}/courses/?university_slug=${slug}&course_type=${type.value}&discipline=${dis.value}`;
		headUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/universities/${slug}/courses/${type.value}/${dis.value}/`;
	} else if (type !== '' && dis === '') {
		url = `${process.env.NEXT_PUBLIC_API_URL}/courses/?university_slug=${slug}&course_type=${type.value}`;
		headUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/universities/${slug}/courses/${type.value}/`;
	} else if (type === '' && dis !== '') {
		url = `${process.env.NEXT_PUBLIC_API_URL}/courses/?university_slug=${slug}&discipline=${dis.value}`;
		headUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/universities/${slug}/courses/${dis.value}/`;
	} else if (type === '' && dis === '') {
		headUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/universities/${slug}/courses/`;
	}

	const searchRes = await fetch(url);
	const courses_res = await searchRes.json();
	const coursesData = courses_res.results;
	if (
		courses_res.next !== null &&
		courses_res.next !== undefined &&
		courses_res.next !== ''
	) {
		nextUrl = await courses_res.next.replace('http://', 'https://');
	} else {
		nextUrl = courses_res.next;
	}
	const totalCount = courses_res.count;

	const res3 = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/universities/?slug=${params.slug}`
	);
	const university = await res3.json().then((res3) => res3.results);
	const bannersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners/`);
	const ads = await bannersRes.json().then((res) => res);
	var course_types_options = [];
	for (var i = 0; i < coursesTypes_res.length; i++) {
		course_types_options.push({
			label: coursesTypes_res[i].name,
			value: coursesTypes_res[i].slug,
			id: coursesTypes_res[i].id,
		});
	}
	var disciplines_options = [];
	for (var i = 0; i < disciplines_res.length; i++) {
		disciplines_options.push({
			label: disciplines_res[i].name,
			value: disciplines_res[i].slug,
			id: disciplines_res[i].slug,
		});
	}
	// res.setHeader(
	// 	"Cache-Control",
	// 	"public, s-maxage=10, stale-while-revalidate=59"
	// );
	return {
		props: {
			course: coursesData,
			nextUrl: nextUrl,
			totalCount: totalCount,
			disciplines_res: disciplines_options,
			coursesTypes_res: course_types_options,
			university: university && university.length > 0 ? university[0] : [],
			coursetypeProps: type,
			disciplineProps: dis,
			ads,
			disciplineTitle,
			degreeTitle,
			headUrl,
		}, // will be passed to the page component as props
	};
}
