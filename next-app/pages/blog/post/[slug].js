import React from "react";
import Head from "next/head";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { Container } from "react-bootstrap-v5";
import parse from "html-react-parser";
import Moment from "react-moment";
import { BlogCard } from "../../../components/home/cards";
import AddComponent from "../../../components/ads";
import AdsContainer from "../../../components/adsContainer";

export default function BlogPost({ post, latestposts, ads, slug }) {
	return (
		<div className="index">
			<Head>
				<title>{post.title}</title>
				<meta name="description" content={post.blurb} />
				<meta data-rh="true" property="og:image" content={post.image} />
				<meta data-rh="true" property="og:title" content={post.title} />
				<meta data-rh="true" property="og:description" content={post.blurb} />
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/blog/${slug}`}></link>
			</Head>
			<Header />
			<Container>
				<main className="home blogPost mt-5">
					<div className="row">
						<div className="col-lg-2"></div>
						<div className="col-lg-8 post">
							<h1>{post.title}</h1>
							<div className="author-box mt-3 ">
								<img
									src="/images/user.png"
									width="50px"
									heigh="auto"
									title={`${post.author_name} Avatar`}
									alt={`${post.author_name} Avatar`}
								/>
								<div className="text ">
									<p>
										{post.author_name == " " ? "No Author" : post.author_name}
									</p>
									<span>
										<Moment format="D MMM YYYY" withTitle>
											{post.date}
										</Moment>
									</span>
								</div>
							</div>
							<div className="image mt-4">
								<img src={post.image} alt="SemesterOne" />
							</div>
							<div className="body mt-4">{parse(`${post.body}`)}</div>
							<AdsContainer ads={ads} isDivide={false} />
						</div>
						<div className="col-lg-2"></div>
					</div>
					<div className="blogs-sec mt-5">
						<div className="top">
							<h5 className="mt-4">Blog & News</h5>
							<h2>See Our Latest Blog</h2>
						</div>
						<div className="row mt-5">
							{latestposts.map((row) => (
								<div key={row.id} className="col-lg-4 col-md-6 mt-4">
									<BlogCard
										image={row.image || "/images/blog.jpg"}
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
		const resBlogs = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/blogs/?slug=${slug}`
		);
		const post = await resBlogs.json().then((res) => res.results);

		const res1 = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/blogs/?limit=3`
		);
		const latestposts = await res1.json().then((res) => res.results);
		const bannersRes = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/banners/`
		);
		const ads = await bannersRes.json().then((res) => res);
		console.log("from try");
		return {
			props: { post: post[0], latestposts: latestposts, ads: ads, slug: slug }, // will be passed to the page component as props
		};
	} catch (error) {
		console.log("from error");
		return {
			props: {},
		};
	}
}

// res.setHeader(
// 	"Cache-Control",
// 	"public, s-maxage=10, stale-while-revalidate=59"
// );
