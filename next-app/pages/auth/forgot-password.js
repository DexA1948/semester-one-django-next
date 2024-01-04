import React, { useState } from "react";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Container } from "react-bootstrap-v5";
import axios from "axios";
import { store } from "react-notifications-component";

const RecoveryPassword1 = () => {
	const [email, setemail] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const data = {
			email: email,
		};
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot_password/`,
				data,
				config
			);
			if (res.data.message !== undefined) {
				store.addNotification({
					message: res.data.message,
					type: "success",
					insert: "top",
					container: "top-right",
					dismiss: {
						duration: 3000,
						onScreen: true,
					},
				});
			} else if (res.data.error !== undefined) {
				store.addNotification({
					message: res.data.error,
					type: "danger",
					insert: "top",
					container: "top-right",
					dismiss: {
						duration: 3000,
						onScreen: true,
					},
				});
			}
			setemail("");
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="index">
			<Head>
				<title>Forgot Password - SemesterOne</title>
				<meta name="description" content="Reset your password." />
				<meta
					data-rh="true"
					property="og:title"
					content="Forgot Password - SemesterOne"
				/>
				<meta
					data-rh="true"
					property="og:description"
					content="Forgot Password - SemesterOne"
				/>
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/forgot-password`}
				></link>
			</Head>
			<Header />
			<Container>
				<main className="home">
					<div className="auth mt-5">
						<div className="row">
							<div className="col-lg-6 auth-img">
								<img
									src="/images/recovery-img.svg"
									width="100%"
									height="auto"
								/>
							</div>
							<div className="col-lg-6 auth-form">
								<h5>Recovery Password</h5>
								<form onSubmit={handleSubmit}>
									<div className="input-area mt-4">
										<input
											type="email"
											required
											placeholder="Email Address"
											id="email"
											value={email}
											onChange={(e) => setemail(e.target.value)}
										/>
									</div>
									<button type="submit" className="submit-btn mt-4">
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</main>
			</Container>
			<Footer />
		</div>
	);
};

export default RecoveryPassword1;
