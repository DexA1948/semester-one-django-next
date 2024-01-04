import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { BlogCard } from '../../components/home/cards';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Container } from 'react-bootstrap-v5';
import AddComponent from '../../components/ads';
import AdsContainer from '../../components/adsContainer';

export default function Blogs({ blogsRes, nextUrl, ads }) {
	const [blogs, setblogs] = useState(blogsRes);
	const [moreblogs, setmoreblogs] = useState(nextUrl);
	const [moreLoading, setmoreLoading] = useState(false);
	const [isLoading, setisLoading] = useState(false);

	const loadMore = async () => {
		try {
			setmoreLoading(true);
			const res = await fetch(`${moreblogs}`);
			const blogs_res = await res.json();
			setblogs(blogs.concat(blogs_res.results));

			if (blogs_res.next != null) {
				setmoreblogs(blogs_res.next);
			} else {
				setmoreblogs(null);
			}
			setmoreLoading(false);
		} catch (error) {
			setmoreLoading(false);
		}
	};

	// useEffect(async () => {
	// try {
	// 	setisLoading(true);
	// 	const res = await fetch(
	// 		`${process.env.NEXT_PUBLIC_API_URL}/blogs/?limit=12/`
	// 	);
	// 	const blogs_res = await res.json();
	// 	setblogs(blogs_res.results);
	// 	if (blogs_res.next != null) {
	// 		setmoreblogs(blogs_res.next);
	// 	} else {
	// 		setmoreblogs(null);
	// 	}
	// 	setisLoading(false);
	// } catch (error) {
	// 	setisLoading(false);
	// 	console.log(error);
	// }
	// }, []);

	return (
		<div className='index'>
			<Head>
				<title>Blogs | Course Advice | SemesterOne</title>
				<meta
					name='description'
					content='Course advice and learn more about Undergraduate and Postgraduate Courses in Australia - SemesterOne'
				/>
				<meta
					data-rh='true'
					property='og:title'
					content='Blogs | Course Advice | SemesterOne'
				/>
				<meta
					data-rh='true'
					property='og:description'
					content='Course advice and learn more about Undergraduate and Postgraduate Courses in Australia - SemesterOne'
				/>
				<meta
					data-rh='true'
					property='og:url'
					content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/blog/`}
				/>
				<link
					rel='canonical'
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/blog/`}
				></link>
			</Head>
			<Header />
			<Container>
				<main className='home'>
					<div className='blog-sec mt-5'>
						<div className='top-heading'>
							<h2>Blogs</h2>
						</div>
						{ads && <AdsContainer ads={ads} isDivide={true} />}
						<div className='row mt-3'>
							{isLoading ? (
								<>
									<div className='col-lg-4 col-md-6 mt-4'>
										<SkeletonTheme
											color='rgba(195, 195, 195, 0.11)'
											highlightColor='rgba(93, 93, 93, 0.11)'
										>
											<p>
												<Skeleton height={240} />
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
												<Skeleton height={240} />
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
												<Skeleton height={240} />
												<Skeleton />
												<Skeleton />
											</p>
										</SkeletonTheme>
									</div>
								</>
							) : (
								<>
									{blogs &&
										blogs.length > 0 &&
										blogs.map((row) => (
											<div key={row.id} className='col-lg-4 col-md-6 mt-4'>
												<BlogCard
													image={row.image || '/images/blog.jpg'}
													title={row.title}
													slug={row.slug}
													author={
														row.author_name == ' '
															? 'No Author'
															: row.author_name
													}
													date={row.date}
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
											<Skeleton height={240} />
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
											<Skeleton height={250} />
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
											<Skeleton height={250} />
											<Skeleton />
											<Skeleton />
										</p>
									</SkeletonTheme>
								</div>
							</div>
						) : (
							<>
								{moreblogs !== null ? (
									<div onClick={loadMore} className='seeall-btn'>
										<a title='Load more blogs - SemesterOne'>View More</a>
									</div>
								) : (
									<div className='seeall-btn disabled'>
										<a title='Load more blogs - SemesterOne'>No more data</a>
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

export async function getServerSideProps({ req, res }) {
	const resblogs = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/blogs/?limit=12`
	);
	const blogs_res = await resblogs.json();
	const nextUrl = await blogs_res.next.replace('http://', 'https://');
	// console.log("blogs_res", blogs_res.length);
	const bannersRes = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/banners/?blogs_banner=true`
	);
	const ads = await bannersRes.json().then((res) => res);
	// res.setHeader(
	// 	"Cache-Control",
	// 	"public, s-maxage=10, stale-while-revalidate=59"
	// );
	return {
		props: {
			blogsRes: blogs_res.results,
			nextUrl: nextUrl,
			ads,
		}, // will be passed to the page component as props
	};
}
