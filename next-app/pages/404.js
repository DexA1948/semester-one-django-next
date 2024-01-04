import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import { Container } from "react-bootstrap-v5";

function Error404({ statusCode }) {
	return (
		<div className="index">
			<Head>
				<title>404 Page Not Found | SemesterOne</title>
				<meta
					name="description"
					content="There are 43 universities in Australia. Alongside the universities, there are numerous different colleges offering advanced education courses. Take a look today! - SemesterOne"
				/>
				<meta
					data-rh="true"
					property="og:title"
					content="404 Page Not Found | SemesterOne"
				/>
				<meta
					data-rh="true"
					property="og:description"
					content="There are 43 universities in Australia. Alongside the universities, there are numerous different colleges offering advanced education courses. Take a look today! - SemesterOne"
				/>
			</Head>
			<Header />
			<Container>
				<div id="notfound">
					<div className="notfound">
						<div className="notfound-404">
							<img
								alt="404 - Page Not Found"
								title="404 - Page Not Found"
								src="/images/404_image.svg"
								className="image-404"
							/>
							<p>The page you looking for could not be found.</p>
							<Link legacyBehavior href="/">
								<a title="Back to SemesterOne">Back Home</a>
							</Link>
						</div>
					</div>
				</div>
			</Container>
			<Footer />
		</div>
		// <p>
		// 	{statusCode
		// 		? `An error1 ${statusCode} occurred on server`
		// 		: "An error2 occurred on client"}
		// </p>
	);
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error404;
