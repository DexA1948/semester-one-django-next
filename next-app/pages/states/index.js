import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { StatesCard } from "../../components/home/cards";
import { Container } from "react-bootstrap-v5";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function States({ states_res, stateLength, nextUrl }) {
	const [states, setstates] = useState(states_res);
	const [totalStates, settotalStates] = useState(stateLength);
	const [morestates, setmorestates] = useState(nextUrl);
	const [moreLoading, setmoreLoading] = useState(false);
	const [isLoading, setisLoading] = useState(false);

	const loadMore = async () => {
		try {
			setmoreLoading(true);
			const res = await fetch(morestates);
			const states_res = await res.json();
			setstates(states.concat(states_res.results));

			if (
				states_res.next !== null &&
				states_res.next !== undefined &&
				states_res.next !== ""
			) {
				const newnexturl = await states_res.next.replace("http://", "https://");
				setmorestates(newnexturl);
			} else {
				setmorestates(null);
			}
			setmoreLoading(false);
		} catch (error) {
			setmoreLoading(false);
		}
	};

	useEffect(() => {}, []);

	return (
		<div className="index">
			<Head>
				<title>List of states in Australia | SemesterOne</title>
				<meta
					name="description"
					content="List of all the states in Australia. There are 43 universities in Australia. Take a look today! - SemesterOne"
				/>
				<meta
					data-rh="true"
					property="og:title"
					content="List of states in Australia | SemesterOne"
				/>
				<meta
					data-rh="true"
					property="og:description"
					content="List of all the states and their coursers in Australia. There are 43 universities in Australia. Take a look today! - SemesterOne"
				/>
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/states`}></link>
			</Head>
			<Header />
			<Container>
				<main className="home">
					<div className="universities-sec mt-5">
						<div className="top-heading-state">
							<h1>States in Australia</h1>
							<h2>There are {totalStates} states in Australia</h2>
						</div>
						<div className="row mt-5">
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
									{states.map((row) => (
										<div key={row.id} className="col-lg-4 col-md-6 mt-4">
											<StatesCard
												banner={row.banner}
												name={row.name}
												slug={row.slug}
												short_name={row.short_name}
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
								{morestates !== null ? (
									<div onClick={loadMore} className="seeall-btn">
										<a title="Load more Australian states - SemesterOne">
											View More
										</a>
									</div>
								) : (
									<div className="seeall-btn disabled">
										<a title="No more data">No more data</a>
									</div>
								)}
							</>
						)}
					</div>
				</main>
			</Container>
			<Footer />
		</div>
	);
}
export async function getServerSideProps({ params, req, res }) {
	let nextUrl = null;
	const resStates = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/states/`);
	const states_res = await resStates.json();
	if (states_res.next !== null && states_res.next !== undefined) {
		nextUrl = states_res.next.replace("http://", "https://");
	}
	// res.setHeader(
	// 	"Cache-Control",
	// 	"public, s-maxage=10, stale-while-revalidate=59"
	// );
	return {
		props: {
			states_res,
			stateLength: states_res.length,
			nextUrl,
		}, // will be passed to the page component as props
	};
}
