import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import {
	FeatureCard,
	UniversitiesCard,
	BlogCard,
	CommentCard,
} from "../components/home/cards";
import { Container } from "react-bootstrap-v5";
import { store } from "react-notifications-component";
import Select from "react-select";
import Highlighter from "react-highlight-words";
import AddComponent from "../components/ads";
import AdsContainer from "../components/adsContainer";
import HomeHeaderCard from "../components/homeHeaderCard";
import { DataServices } from "../services/dataServices";
import { getOptions } from "../utils";

export default function Home({
	topUniversities,
	latestsBlogs,
	states_options,
	course_types_options,
	disciplines_options,
	features,
	notes,
	testimonials,
	ads,
	courseCount,
	totalUniversities,
}) {
	const [state, setstate] = useState(null);
	const [discipline, setdiscipline] = useState(null);
	const [courseType, setcourseType] = useState(null);
	const router = useRouter();

	const filterCourses = async (e) => {
		e.preventDefault();
		if (courseType === null && state === null && discipline === null) {
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
		} else if (courseType !== null && state === null && discipline === null) {
			router.replace(`/courses/${courseType.value}`);
		} else if (courseType !== null && discipline !== null && state === null) {
			router.replace(`/courses/${courseType.value}/${discipline.value}`);
		} else if (courseType !== null && discipline === null && state !== null) {
			router.replace(`/courses/${courseType.value}/${state.value}`);
		} else if (courseType === null && discipline !== null && state === null) {
			router.replace(`/courses/${discipline.value}`);
		} else if (courseType === null && discipline !== null && state !== null) {
			router.replace(`/courses/${discipline.value}/${state.value}`);
		} else if (courseType !== null && discipline !== null && state !== null) {
			router.replace(
				`/courses/${courseType.value}/${discipline.value}/${state.value}`
			);
		} else if (courseType === null && discipline === null && state !== null) {
			router.replace(`/courses/${state.value}`);
		}
	};

	function formatOptionLabel({ label, inputValue }) {
		return <Highlighter searchWords={[inputValue]} textToHighlight={label} />;
	}

	return (
		<div className="index">
			<Head>
				<title>
					Find Undergraduate & Postgraduate courses in Australia - SemesterOne
				</title>
				<meta
					name="description"
					content={`Want to study in Australia? SemesterOne will help you find the best universities and courses in Australia of your choice among ${totalUniversities} universities and 3665+ courses.`}
				/>
				<meta
					data-rh="true"
					property="og:title"
					content="Find Undergraduate & Postgraduate courses in Australia - SemesterOne"
				/>
				<meta
					data-rh="true"
					property="og:description"
					content={`Want to study in Australia? SemesterOne will help you find the best universities and courses in Australia of your choice among ${totalUniversities} universities and 3665+ courses.`}
				/>
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`}></link>
			</Head>

			<Header />
			{/* <Container> */}
			<main className="home">
				<div className="home-header-container justify-content-center align-items-center d-flex">
					<Container>
						<div className="row header-section">
							<div className="col-12 col-md-6 home-top-left position-relative">
								<div className="d-none d-md-block">
									<HomeHeaderCard
										title="Universities"
										count={totalUniversities}
										titleStyle={{ color: "#28C76F" }}
										icon="/images/uni-icon.svg"
										cardStyle={{ top: "140px", right: "-185px" }}
										cardBodyStyle={{
											display: "flex",
											padding: "10px 50px 10px 10px",
										}}
									/>
								</div>

								{notes && notes.length !== 0 && (
									<div className="note">
										<span className="fill">Note</span>
										<span className="ml-2 note-text text-nowrap ">
											{notes[0].text}
										</span>
									</div>
								)}
								<header>
									<h1>
										Find <span>Undergraduate</span> & <span>Postgraduate</span>{" "}
										courses in <span>Australia</span>.
									</h1>
									<h5>
										{`There are ${totalUniversities} universities and ${courseCount}+ courses in Australia.`}
									</h5>
								</header>
								<div className="buttons">
									<button
										onClick={() =>
											router.push("/courses", null, { shallow: true })
										}
										className="btn-1">
										Get Started
									</button>
									<button
										onClick={() =>
											router.push("/contact", null, { shallow: true })
										}
										className="btn-2">
										Contact Us
									</button>
								</div>
							</div>
							<div className="col-md-6 home-top-right d-none d-md-block">
								<div className="d-none d-md-block">
									<HomeHeaderCard
										title="Courses"
										count={courseCount}
										titleStyle={{ color: "#FFB300" }}
										icon="/images/course-icon.svg"
										cardStyle={{
											top: "0px",
											right: "60px",
											textAlign: "center",
										}}
										cardBodyStyle={{
											// display: "flex",
											padding: "10px 10px 10px 0px",
										}}
									/>
									<HomeHeaderCard
										title="Students"
										count="1500"
										titleStyle={{ color: "#FF4E4E" }}
										icon="/images/student-icon.svg"
										cardStyle={{ bottom: "0", right: "20px" }}
										cardBodyStyle={{
											display: "flex",
											padding: "10px 50px 10px 10px",
										}}
									/>
								</div>
								{/* <img
									alt="SemesterOne Hero Banner"
									title="SemesterOne Banner"
									src="/images/student-image.png"
									width="100%"
									height="auto"
								/> */}
							</div>
						</div>
					</Container>
				</div>
				<Container className="position-relative">
					<div className="search-sec">
						<div className="row">
							{/* <div className="col-lg-1 d-none d-md-block"></div> */}
							<div className="offset-col-1 col-lg-12">
								<div className="search-area">
									<h5>Find Universities and Courses in Australia</h5>
									<form className="mt-4">
										<div className="row">
											<div className="col-sm-3 col-12 mt-3">
												<Select
													options={course_types_options}
													isClearable
													placeholder="Select Degree"
													onChange={(e) => setcourseType(e)}
													formatOptionLabel={formatOptionLabel}
												/>
											</div>
											<div className="col-sm-3 col-12 mt-3">
												<Select
													options={states_options}
													isClearable
													placeholder="Select State"
													onChange={(e) => setstate(e)}
													formatOptionLabel={formatOptionLabel}
												/>
											</div>
											<div className="col-sm-3 col-12 mt-3">
												<Select
													options={disciplines_options}
													placeholder="Select Discipline"
													isClearable
													onChange={(e) => setdiscipline(e)}
													formatOptionLabel={formatOptionLabel}
												/>
											</div>
											<div className="col-sm-3 col-12 mt-3">
												<button onClick={filterCourses}>Search</button>
											</div>
										</div>
									</form>
								</div>
							</div>

							{/* <div className="col-lg-1"></div> */}
						</div>
					</div>
					<div className="features-sec mt-5">
						<div className="top">
							<h3 className="mt-4">Our Feature</h3>
							<h2>We will help you find the course of your choice</h2>
						</div>
						<div className="row mt-4">
							{features?.map((row) => {
								return (
									<div key={row.id} className="col-lg-4 col-md-6 col-sm-6 mt-4">
										<FeatureCard feature={row} key={row.id} />
									</div>
								);
							})}
						</div>
					</div>

					<AdsContainer ads={ads} isDivide={true} />

					<div className="universities-sec">
						<div className="top">
							<h3 className="mt-4">Courses & Universities</h3>
							<h2>Popular Universities in Australia</h2>
						</div>
						<div className="row mt-3">
							{topUniversities &&
								topUniversities.length > 0 &&
								topUniversities?.map((row) => (
									<div key={row.id} className="col-lg-4 col-md-6 mt-4">
										<UniversitiesCard
											id={row.id}
											logo={row.logo_image || row.logo}
											name={row.name}
											slug={row.slug}
											au_ranking={row.au_ranking || 0}
											qs_ranking={row.qs_ranking || 0}
											fav_count={row.fav_count || 0}
											undergraduate_courses={
												row.course_type_count.Undergraduate || 0
											}
											diploma_courses={row.course_type_count.Diploma || 0}
											postgraduate_courses={
												row.course_type_count.Postgraduate || 0
											}
											course_type_count={row.course_type_count}
											rating={row.rating}
										/>
									</div>
								))}
						</div>
						<div className="seeall-btn">
							<Link
								href="/universities/"
								title="View all universities in Australia - SemesterOne">
								See All
							</Link>
						</div>
					</div>
				</Container>

				{testimonials && (
					<div className="testimonial-sec mt-5">
						<Container className="position-relative">
							<div className="row">
								<div className="col-lg-6 testimal-detail">
									<div className="row">
										<div className="col-lg-8">
											<h3>Testimonials</h3>
											<h2>What do Students Say About Us</h2>
											<p>
												Read more about the students journey to Australia and
												the experience they got with the application process.
											</p>
											{/* <button>Learn More</button> */}
										</div>
									</div>
								</div>
								<div className="col-lg-6 student-comments">
									{testimonials?.map((testimonial, index) => {
										let student_img = "/images/student.jpg";
										if (index == 1) {
											student_img = "/images/student1.jpg";
										} else if (index == 2) {
											student_img = "/images/student2.jpg";
										}
										return (
											<CommentCard
												img={student_img}
												key={testimonial.id}
												name={testimonial.author}
												body={testimonial.review}
												className={index == 1 ? "ml-auto" : null}
											/>
										);
									})}
								</div>
							</div>
						</Container>
					</div>
				)}
				<Container className="position-relative">
					<div className="blog-sec mb-5 mt-5">
						<div className="top">
							<h3 className="">Blogs & Course Advices</h3>
							<h2>See Our Latest Blogs</h2>
						</div>
						<div className="row mt-3">
							{latestsBlogs?.map((row) => (
								<div key={row.id} className="col-lg-4 col-md-6 mt-4">
									<BlogCard
										image={row.image}
										title={row.title}
										slug={row.slug}
										author={
											row.author_name == " " ? "No Author" : row.author_name
										}
										date={row.date}
									/>
								</div>
							))}
						</div>
						<div className="seeall-btn">
							<Link
								href="/blog/"
								title="View all blog posts and course advices - SemesterOne">
								See All
							</Link>
						</div>
					</div>
				</Container>
			</main>
			{/* </Container> */}
			<Footer />
		</div>
	);
}

export async function getServerSideProps({ res, req }) {
	const dataServices = new DataServices();
	try {
		const topUniversities = await dataServices.getTopUniversities();
		const latestsBlogs = await dataServices.getLatestBlogs();
		const disciplines = await dataServices.getDisciplines();
		const coursesTypes = await dataServices.getCoursesTypes();
		const states = await dataServices.getStates();
		const features = await dataServices.getFeatures();
		// const notes = await dataServices.getNotes();
		const testimonials = await dataServices.getTestimonials();
		const courses = await dataServices.getCourses();
		const banners = await dataServices.getBanners();

		const disciplines_options = getOptions(disciplines.data);
		const course_types_options = getOptions(coursesTypes.data);
		const states_options = getOptions(states.data);

		return {
			props: {
				topUniversities: topUniversities.data.results,
				latestsBlogs: latestsBlogs.data.results,
				disciplines_options,
				course_types_options,
				states_options,
				features: features.data,
				// notes: notes.data,
				testimonials: testimonials.data,
				ads: banners.data,
				courseCount: courses.data.count,
				totalUniversities: topUniversities.data.count,
			},
		};
	} catch (err) {
		return {
			props: {},
		};
	}
}
