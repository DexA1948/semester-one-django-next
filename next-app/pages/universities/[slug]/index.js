import React from "react";
import Head from "next/head";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Link from "next/link";
import { Container } from "react-bootstrap-v5";
import { GiChart } from "react-icons/gi";
import { RiBookletLine, RiStarLine } from "react-icons/ri";
import parse from "html-react-parser";
import { UniversitiesCard } from "../../../components/home/cards";
import { BsArrowRight } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import {
	GrFacebookOption,
	GrTwitter,
	GrInstagram,
	GrLinkedinOption,
	GrYoutube,
} from "react-icons/gr";
import { BiWorld } from "react-icons/bi";
import AddComponent from "../../../components/ads";
import AdsContainer from "../../../components/adsContainer";

export default function UniversityPage({
	university,
	similarUniversities,
	courseTypes,
	ads,
}) {
	return (
		<div className="index">
			<Head>
				<title>{`${university.name} | Undergraduate and Postgraduate Courses in ${university.name}`}</title>
				<meta
					name="description"
					content={`${university.description}`}
				/>
				<meta
					data-rh="true"
					property="og:url"
					content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/universities/${university.slug}/`}
				/>
				<meta
					data-rh="true"
					property="og:title"
					content={`${university.name} | Find undergraduate and postgraduate courses in ${university.name}`}
				/>
				<meta
					data-rh="true"
					property="og:description"
					content={`Learn more about ${university.name}. Find undergraduate and postgraduate courses in ${university.name}`}
				/>
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/universities/${university.slug}/`}
				></link>
			</Head>
			<Header />
			<Container>
				<main className="home universityPage">
					<div className="courses-sec mt-5">
						<div
							className="uni_img"
							style={{
								backgroundImage: `linear-gradient(rgba(38, 32, 96, 0.529), rgba(38, 32, 96, 0.693)), url(${
									university.logo ||
									"https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&ixlib=rb-1.2.1&q=80&w=1500"
								})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						>
							<div className="row" style={{ width: "100%" }}>
								<div className="col-lg-3" style={{ background: "white" }}>
									<div className="uni_logo">
										<img
											src={university.logo_image || university.logo}
											alt={`${university.name} logo`}
										/>
									</div>
								</div>
								<div className="col-lg-9">
									<div className="university-name-ranking">
										<h1 className="mt-3">{university.name}</h1>
										<div className="ranking">
											<div className="box1 ">
												<GiChart className="icon" size="40px" />
												<div className="text ">
													<p>AU Ranking</p>
													<span>{university.au_ranking}</span>
												</div>
											</div>
											<div className="box2 ml-4 ">
												<GiChart className="icon" size="40px" />
												<div className="text ">
													<p>QS Ranking</p>
													<span>{university.qs_ranking}</span>
												</div>
											</div>
										</div>
										{university.rating && university.rating.total > 0 && (
											<div className="rating mt-2">
												<ReactStars
													count={5}
													value={
														university.rating.total / university.rating.count
													}
													size={20}
													edit={false}
													activeColor="#FFB300"
												/>
												{university.rating.count > 10 && (
													<span className="ml-3">{university.rating.total/university.rating.count} ({university.rating.count})</span>
												)}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col-lg-9 col-md-7">
								<div className="content">
									<div className="top">
										{/* <div className="row">
									<div className="col-lg-3">
										<div className="uni_logo">
											<img
												src={university.logo_image || university.logo}
												alt={`${university.name} logo`}
											/>
										</div>
									</div>
									<div className="col-lg-9">
										<h5 className="mt-3">{university.name}</h5>
										<div className="ranking">
											<div className="box1 ">
												<GiChart className="icon" size="40px" />
												<div className="text ">
													<p>AU Ranking</p>
													<span>{university.au_ranking}</span>
												</div>
											</div>
											<div className="box2 ml-4 ">
												<GiChart className="icon" size="40px" />
												<div className="text ">
													<p>QS Ranking</p>
													<span>{university.qs_ranking}</span>
												</div>
											</div>
										</div>
									</div>
								</div> */}
										{/* <div className="divider mt-5"></div> */}
										<div className="body">
											<h2>About {university.name}</h2>
											<div className="mt-4">{parse(`${university.body}`)}</div>
										</div>
										<div className="social-btns">
											<a
												target="_blank"
												className="mt-3"
												href={university.facebook_link}
											>
												<GrFacebookOption className="mr-2" />
												Facebook
											</a>
											<a
												target="_blank"
												className="mt-3"
												href={university.twitter_link}
											>
												<GrTwitter className="mr-2" />
												Twitter
											</a>
											<a
												target="_blank"
												className="mt-3"
												href={university.instagram_link}
											>
												<GrInstagram className="mr-2" />
												Instagram
											</a>
											<a
												target="_blank"
												className="mt-3"
												href={university.linkedin_link}
											>
												<GrLinkedinOption className="mr-2" />
												Linkedin
											</a>
											<a
												target="_blank"
												className="mt-3"
												href={university.youtube_link}
											>
												<GrYoutube className="mr-2" />
												Youtube
											</a>
											<a
												target="_blank"
												className="mt-3"
												href={university.website}
											>
												<BiWorld className="mr-2" />
												Website
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-md-5">
								<div className="stats">
									<h5>Summary</h5>
									<div className="divider mt-2 mb-3"></div>
									<p className="mt-4 list">
										<GiChart size="22px" className="mr-2 icon" />
										AU Ranking: <span>{university.au_ranking || 0}</span>
									</p>
									<p className="list">
										<GiChart size="22px" className="mr-2 icon" />
										QS Ranking: <span>{university.qs_ranking || 0}</span>
									</p>
									{university.course_type_count &&
									Object.keys(university.course_type_count).length > 0
										? Object.keys(university.course_type_count).map((c, i) => {
												return (
													<Link
														href={`/universities/${
															university.slug
														}/courses/${c.toLowerCase()}`}
														key={i}
													>
														<p className="list cursor-pointer">
															<RiBookletLine
																size="22px"
																className="mr-2 icon"
															/>{" "}
															{c}:{" "}
															<span>{university.course_type_count[c]}</span>
														</p>
													</Link>
												);
										  })
										: ""}
									<p className="list">
										<RiStarLine size="22px" className="mr-2 icon" /> Favourite:{" "}
										<span>{university.fav_count || 0}</span>
									</p>
								</div>
								<div className="find-courses mt-3">
									<h5>Find Courses</h5>
									<div className="divider mt-2 mb-2"></div>
									<Link
										href={`/universities/${university.slug}/courses`}
										title={`View all courses in ${university.name}`}
									>
										<span>
											View all courses
											<BsArrowRight className="icon" size="20px" />
										</span>
									</Link>
									{courseTypes.map((row) => (
										<Link
											href={`/universities/${university.slug}/courses/${row.slug}`}
											key={row.slug}
											title={`View all ${row.name} courses in ${university.name}`}
										>
											<span>
												{row.name}
												<BsArrowRight className="icon" size="20px" />
											</span>
										</Link>
									))}
								</div>
								<div className="web_btn">
									<a
										target="_blank"
										className=" mt-3"
										href={university.website}
									>
										Visit university Website
									</a>
								</div>
								<AdsContainer ads={ads} isDivide={false} />
							</div>
						</div>
						<div className="universities-sec mt-3">
							<div className="top">
								<h5 className="mt-4">Course & University</h5>
								<h2>Similar Universities in Australia</h2>
							</div>
							<div className="row mt-3">
								{similarUniversities.map((row) => (
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
						</div>
					</div>
				</main>
			</Container>
			<Footer />
		</div>
	);
}

export async function getServerSideProps({ params }) {
	const { slug } = params;

	const resUni = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/universities/?slug=${slug}`
	);
	const university = await resUni.json().then((res) => res.results);

	const res1 =
		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/universities/?limit=3&
                              ordering=-course_count&state=${university[0].state[0].slug}`);
	const similarUniversities = await res1.json().then((res) => res.results);

	const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coursestype/`);
	const coursesTypes_res = await res2.json();
	const bannersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners/`);
	const ads = await bannersRes.json().then((res) => res);
	return {
		props: {
			university: university[0],
			similarUniversities,
			courseTypes: coursesTypes_res,
			ads,
		}, // will be passed to the page component as props
	};
}
