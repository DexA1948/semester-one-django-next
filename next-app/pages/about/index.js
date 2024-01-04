import React from "react";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Container } from "react-bootstrap-v5";

export default function Blogs() {
	return (
		<div className="index">
			<Head>
				<title>About | SemesterOne</title>
				<meta
					name="description"
					content="There are 43 universities in Australia. Alongside the universities, there are numerous different colleges offering advanced education courses. Take a look today! - SemesterOne"
				/>
				<meta data-rh="true" property="og:title" content="About SemesterOne" />
				<meta
					data-rh="true"
					property="og:description"
					content="There are 43 universities in Australia. Alongside the universities, there are numerous different colleges offering advanced education courses. Take a look today! - SemesterOne"
				/>
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/about`}></link>
			</Head>
			<Header />
			<Container>
				<main className="home">
					<div className="blog-sec mt-5">
						<div className="top-heading">
							<h2>About</h2>
						</div>
						<div className="row mt-5">
							<div className="col-lg-2"></div>
							<div className="col-lg-8 about">
								<p>
									Do you want to study in Australia? SemesterOne is here to help
									you find the best Australian universities and their courses.
									Find the undergraduate and postgraduate courses in Australia.
									University of New South Wales, University of Technology Sydney
									are one of the best universities in Australia. Join us to find
									out more.
								</p>
							</div>
							<div className="col-lg-2"></div>
						</div>
					</div>
				</main>
			</Container>
			<Footer />
		</div>
	);
}
