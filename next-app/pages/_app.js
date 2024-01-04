import React, { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { useRouter } from "next/router";
import NProgress from "nprogress"; //nprogress module
import { Provider } from "react-redux";
import Store from "../redux/index";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

// import * as ga from "../lib/ga";

import "../sass/index.scss";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	NProgress.configure({ showSpinner: false });
	Router.events.on("routeChangeStart", () => NProgress.start());
	Router.events.on("routeChangeComplete", () => handleRouteChange);
	Router.events.on("routeChangeError", () => NProgress.done());
	const handleRouteChange = (url) => {
		NProgress.done();
		// ga.pageview(url);
	};
	useEffect(() => {
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	
	return (
		<>
			<Head>
				<meta
					data-rh="true"
					property="og:image"
					content="/images/SemesterOne-og-min.png"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta data-rh="true" name="author" content="SemesterOne" />
				<meta
					data-rh="true"
					data-react-helmet="true"
					property="og:type"
					content="website"
				/>
				<meta
					data-rh="true"
					data-react-helmet="true"
					property="og:locale"
					content="en_GB"
				/>
				<meta
					data-rh="true"
					data-react-helmet="true"
					property="og:site_name"
					content="SemesterOne"
				/>
				<meta
					data-rh="true"
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					data-rh="true"
					rel="shortcut icon"
					href="/images/semesterone-logo.png"
					type="image/x-icon"
				/>
				<link rel="icon" href="/images/semesterone-logo.png" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
			</Head>

			<Provider store={Store} session={pageProps.session}>
				<ReactNotifications />
				<Component {...pageProps} />
			</Provider>
		</>
	);
}

export default MyApp;
