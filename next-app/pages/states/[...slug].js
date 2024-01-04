import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Container } from "react-bootstrap-v5";
import parse from "html-react-parser";
import { UniversitiesCard } from "../../components/home/cards";

export default function StatePage({ state, universities }) {
	const [isLoading, setisLoading] = useState(false);
	const [totalUniversities, settotalUniversities] = useState("");
	return (
		<div className="index">
			<Head>
				<title>{`Find Undergraduate and Postgraduate courses in ${state.name}`}</title>
				<meta
					name="description"
					content={`Find Undergraduate & Postgraduate courses in ${state.name}. Apply for undergraduate and postgraduate courses from ${universities.length}+ universities in ${state.name} now.`}
				/>
				{/* <meta
					data-rh="true"
					property="og:image"
					content={state.logo_image || state.logo}
				/> */}
				<meta
					data-rh="true"
					property="og:title"
					content={`Find undergraduate and postgraduate courses in ${state.name}`}
				/>
				<meta
					data-rh="true"
					property="og:description"
					content={`Find Undergraduate & Postgraduate courses in ${state.name}. Apply for undergraduate and postgraduate courses from ${universities.length}+ universities in ${state.name} now.`}
				/>
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/states/${state.name}`}></link>
			</Head>
			<Header />
			<Container>
				<main className="home">
					<div className="statePage mt-5">
						<div
							className="uni_img"
							style={{
								backgroundImage: `linear-gradient(rgba(38, 32, 96, 0.529), rgba(38, 32, 96, 0.693)), url(${
									state.banner ||
									"https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&ixlib=rb-1.2.1&q=80&w=1500"
								})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}>
							<div className="row" style={{ width: "100%" }}>
								<div className="col-lg-12">
									<div className="university-name-ranking">
										<h1 className="mt-3">Universities in {state.name}</h1>
									</div>
								</div>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col-lg-12 col-md-12">
								<div className="content">
									<div className="top">
										<div className="body">
											<h2>About {state.name}</h2>
											<div className="mt-4">{parse(`${state.body}`)}</div>
										</div>
									</div>
								</div>
							</div>

							{/* <div className="col-lg-3 col-md-5">
								<div className="stats"></div>
								<div className="find-courses mt-3">
									<h5>Find Courses</h5>
									<div className="divider mt-3 mb-3"></div>
								</div>
							</div> */}
						</div>
						<div className="row mt-5">
							<div className="top">
								<h2>{`There are ${universities.length} universities in ${state.name}`}</h2>
							</div>
						</div>
						<div className="row mt-2">
							{isLoading ? (
								<>
									<div className="col-lg-4 col-md-6 mt-4">
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
									<div className="col-lg-4 col-md-6 mt-4">
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
									{universities.map((row) => (
										<div key={row.id} className="col-lg-4 col-md-6 mt-4">
											<UniversitiesCard
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
								</>
							)}
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

	axios.get(`${process.env.NEXT_PUBLIC_API_URL}/states/?slug=${slug}`);

	const resStates = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/states/?slug=${slug}`
	);
	const state = await resStates.json();

	const res2 = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/universities/?state=${slug}`
	);
	const universities_res = await res2.json();
	// res.setHeader(
	// 	"Cache-Control",
	// 	"public, s-maxage=10, stale-while-revalidate=59"
	// );
	return {
		props: {
			state: state[0],
			universities: universities_res.results,
		}, // will be passed to the page component as props
	};
}
