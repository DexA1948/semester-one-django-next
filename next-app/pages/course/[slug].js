import React from "react";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";
import { Container } from "react-bootstrap-v5";
import parse from "html-react-parser";
import { BsDownload } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { GiChart } from "react-icons/gi";
import router from "next/router";

export default function CourseSearchPage({ course, courseTypes, slug }) {
	const gotoApplyForm = () => {
		let token = localStorage.getItem("token");
		if (token) {
			router.push("/");
		} else {
			router.push("/auth/login/");
		}
	};
	return (
		<div className="index">
			<Head>
				<title>{`${course?.university?.name} | Find undergraduate and postgraduate courses in ${course?.university?.name}`}</title>
				{/* <meta
					data-rh="true"
					property="og:image"
					content={course.university_logo || course.university.logo_image}
				/> */}
				<meta name="description" content={course?.university?.description} />
				<meta
					data-rh="true"
					property="og:title"
					content={`${course?.university?.name} | Find undergraduate and postgraduate courses in ${course?.university?.name}`}
				/>
				<meta
					data-rh="true"
					property="og:description"
					content={course?.university?.description}
				/>
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/course/${slug}`}></link>
			</Head>
			<Header />
			<Container>
				<main className="home universityPage mt-5">
					<div
						className="uni_img"
						style={{
							backgroundImage: `linear-gradient(rgba(38, 32, 96, 0.529), rgba(38, 32, 96, 0.693)), url(${
								course?.university?.logo ||
								"https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&ixlib=rb-1.2.1&q=80&w=1500"
							})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}>
						<div className="row" style={{ width: "100%" }}>
							<div className="col-lg-3" style={{ background: "white" }}>
								<div className="uni_logo">
									<img
										src={
											course?.university?.logo_image || course?.university?.logo
										}
										alt={`${course?.university?.name} logo`}
										title={`${course?.university?.name}`}
									/>
								</div>
							</div>
							<div className="col-lg-9">
								<div className="university-name-ranking">
									<h2 className="mt-3">{course?.name}</h2>
									<Link
										href={`/universities/${course?.university?.slug}/`}
										title={`View ${course?.university?.name} Page`}>
										<h3 className="uniname">{course?.university?.name}</h3>
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="row mt-5">
						<div className="col-lg-9">
							<div className="content">
								<div className="body">
									<h2>
										About {course?.name} at {course?.university?.name}
									</h2>
									<div className="mt-4 p">{parse(`${course?.body}`)}</div>
								</div>
								<div className="footer-btns">
									{/* <Link href="/" title={`Apply to ${course.name}`}> */}
									<a className="apply" onClick={gotoApplyForm} href="#">
										Apply Now
									</a>
									{/* </Link> */}
									{/* <Link href="/" title="Download syllabus - SemesterOne">
										<a>
											Download syllabus <BsDownload className="icon ml-2" />
										</a>
									</Link> */}
									<Link legacyBehavior href="/">
										<a className="read">Read About University</a>
									</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-3">
							<div className="summary">
								<h5>Course Summary</h5>
								<div className="divider mt-2 mb-3"></div>
								<div className="row stat">
									<div className="col-6 col-lg-12">
										<p>Study level</p>
										<span>{course?.course_type}</span>
									</div>
									<div className="col-6 col-lg-12">
										<p>Discipline</p>
										<span>{course?.discipline}</span>
									</div>
									<div className="col-6 col-lg-12">
										<p>Cricos</p>
										<span>{course?.cricos_code}</span>
									</div>
									<div className="col-6 col-lg-12">
										<p>Duration</p>
										<span>{course?.duration}</span>
									</div>
									<div className="col-6 col-lg-12">
										<p>Study mode</p>
										<span>{course?.study_mode}</span>
									</div>
									<div className="col-6 col-lg-12">
										<p>Fee*</p>
										<span>{course?.fee}</span>
									</div>
								</div>
							</div>
							<div className="find-courses mt-3">
								<h5>Find Courses</h5>
								<div className="divider mt-2 mb-3"></div>
								<Link
									legacyBehavior
									href={`/universities/${course?.university?.slug}/courses`}
									title={`View all courses in ${course?.university?.name}`}>
									<span>
										View all courses
										<BsArrowRight className="icon" size="20px" />
									</span>
								</Link>
								{courseTypes &&
									courseTypes.length > 0 &&
									courseTypes.map((row) => (
										<Link
											legacyBehavior
											href={`/universities/${course?.university?.slug}/courses/${row.slug}`}
											key={row.slug}
											title={`View all ${row.name} courses in ${course?.university?.name}`}>
											<span>
												{row.name}
												<BsArrowRight className="icon" size="20px" />
											</span>
										</Link>
									))}
							</div>
							<div className="apply_btn">
								<a
									// target="_blank"
									className=" mt-3"
									onClick={gotoApplyForm}
									href="#">
									Apply Now
								</a>
							</div>
						</div>
					</div>
				</main>
			</Container>
			<Footer />
		</div>
	);
}

export async function getServerSideProps({ params, req, res }) {
	const { slug } = params;

	try {
		const courseRes = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/?slug=${slug}`
		);

		const course = await courseRes.json();
		const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coursestype/`);
		const coursesTypes_res = await res2.json();
		// res.setHeader(
		// 	"Cache-Control",
		// 	"public, s-maxage=10, stale-while-revalidate=59"
		// );
		return {
			props: {
				course:
					course.results && course.results.length > 0 ? course.results[0] : [],
				courseTypes: coursesTypes_res,
				slug,
			}, // will be passed to the page component as props
		};
	} catch (error) {
		return {
			props: {},
		};
	}
}
