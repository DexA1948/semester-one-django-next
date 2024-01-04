import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { UniversitiesCard } from '../../components/home/cards';
import { Container } from 'react-bootstrap-v5';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Universities({ universitiesRes, nextUrl, uniCount }) {
	const [universities, setuniversities] = useState(universitiesRes);
	const [totalUniversities, settotalUniversities] = useState(uniCount);
	const [moreuniversities, setmoreuniversities] = useState(nextUrl);
	const [moreLoading, setmoreLoading] = useState(false);
	const [isLoading, setisLoading] = useState(false);

	const loadMore = async () => {
		try {
			setmoreLoading(true);
			const res = await fetch(moreuniversities);
			const universities_res = await res.json();
			setuniversities(universities.concat(universities_res.results));

			if (
				universities_res.next !== null &&
				universities_res.next !== undefined &&
				universities_res.next !== ''
			) {
				const newnexturl = await universities_res.next.replace(
					'http://',
					'https://'
				);
				setmoreuniversities(newnexturl);
			} else {
				setmoreuniversities(null);
			}
			setmoreLoading(false);
		} catch (error) {
			setmoreLoading(false);
		}
	};

	useEffect(() => {}, []);

	return (
		<div className='index'>
			<Head>
				<title>
					List of universities in Australia ({totalUniversities} universities
					found)
				</title>
				<meta
					name='description'
					content={`List of all the universities and their coursers in Australia. There are ${totalUniversities} universities in Australia. Take a look today! - SemesterOne`}
				/>
				<meta
					data-rh='true'
					property='og:title'
					content={`List of universities in Australia (${totalUniversities} universities found)`}
				/>
				<meta
					data-rh='true'
					property='og:description'
					content={`List of all the universities and their coursers in Australia. There are ${totalUniversities} universities in Australia. Take a look today! - SemesterOne`}
				/>
				<link
					rel='canonical'
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/universities`}
				></link>
			</Head>
			<Header />
			<Container>
				<main className='home'>
					<div className='universities-sec mt-5'>
						<div className='top-heading'>
							<h1>Universities in Australia</h1>
							<h3>There are {totalUniversities} universities in Australia</h3>
						</div>
						<div className='row mt-3'>
							{isLoading ? (
								<>
									<div className='col-lg-4 col-md-6 mt-4'>
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
									<div className='col-lg-4 col-md-6 mt-4'>
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
									{universities.map((row) => (
										<div key={row.id} className='col-lg-4 col-md-6 mt-4'>
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
								{moreuniversities !== null ? (
									<div onClick={loadMore} className='seeall-btn'>
										<a title='Load more Australian Universities - SemesterOne'>
											View More
										</a>
									</div>
								) : (
									<div className='seeall-btn disabled'>
										<a title='No more data'>No more data</a>
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

export async function getServerSideProps({ params, res, req }) {
	let nextUrl = null;
	const resUni = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/universities/?ordering=-course_count&limit=15`
	);
	const universities_res = await resUni.json();
	if (
		universities_res.next !== null &&
		universities_res.next !== undefined &&
		universities_res.next !== ''
	) {
		nextUrl = await universities_res.next.replace('http://', 'https://');
	}
	// res.setHeader(
	// 	"Cache-Control",
	// 	"public, s-maxage=10, stale-while-revalidate=59"
	// );
	return {
		props: {
			universitiesRes: universities_res.results,
			nextUrl: nextUrl,
			uniCount: universities_res.count,
		}, // will be passed to the page component as props
	};
}
