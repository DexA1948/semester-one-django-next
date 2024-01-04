import React, { useState } from "react";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Container } from "react-bootstrap-v5";
import ReCAPTCHA from "react-google-recaptcha";
const Login = () => {
	// const [isLoading, setisLoading] = useState(false);
	const [contactInfo, setContactInfo] = useState({
		fullName: "",
		email: "",
		phone: "",
		message: "",
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setContactInfo({ ...contactInfo, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			contactInfo.fullName &&
			contactInfo.email &&
			contactInfo.phone &&
			contactInfo.message
		) {
			//create newContactInfo with id
			const newContactInfo = {
				...contactInfo,
				id: new Date().getTime().toString(),
			};

			console.log(newContactInfo);

			//post the data newContactInfo}

			// reset the fields to initial state
			setContactInfo({
				fullName: "",
				email: "",
				phone: "",
				message: "",
			});
		}
	};
	return (
		<div className="index">
			<Head>
				<title>Contact | SemesterOne</title>
				<meta
					name="description"
					content="List of all the universities and their coursers in Australia. There are 43 universities in Australia. Take a look today! - SemesterOne"
				/>
				<meta
					data-rh="true"
					property="og:title"
					content="List of universities in Australia | SemesterOne"
				/>
				<meta
					data-rh="true"
					property="og:description"
					content="List of all the universities and their coursers in Australia. There are 43 universities in Australia. Take a look today! - SemesterOne"
				/>
				<link rel="canonical" href={`${process.env.REACT_APP_SITE_KEY}`}></link>
			</Head>
			<Header />
			<Container>
				<main className="home">
					<div className="auth mt-5">
						<div className="row">
							<div className="col-lg-6 auth-img">
								<img src="/images/agent-form.svg" width="100%" height="auto" />
							</div>
							<div className="col-lg-6 auth-form">
								<h5>Contact Us</h5>
								<p>Email: info@semesterone.com</p>

								<form>
									<div className="input-area mt-4">
										<input
											type="text"
											name="fullName"
											id="fullName"
											placeholder="Full name"
											value={contactInfo.fullName}
											onChange={handleChange}
										/>
									</div>
									<div className="input-area mt-4">
										<input
											type="email"
											name="email"
											id="email"
											placeholder="Email address"
											value={contactInfo.email}
											onChange={handleChange}
										/>
									</div>
									<div className="input-area mt-4">
										<input
											type="tel"
											name="phone"
											id="phone"
											placeholder="Phone number"
											value={contactInfo.phone}
											onChange={handleChange}
										/>
									</div>
									<div className="input-area mt-4">
										<textarea
											name="message"
											id="message"
											cols="30"
											rows="10"
											placeholder="Message..."
											value={contactInfo.message}
											onChange={handleChange}></textarea>
									</div>
									<div className="captcha mt-4">
										<ReCAPTCHA
											sitekey="6Ld5sw8kAAAAABxyzqhAoVnxIBZoMkxXlj7lHNyJ"
											size="normal"
										/>
									</div>
									{/* {isLoading ? (
										<button
											onSubmit={handleSubmit}
											type='submit'
											disabled
											className='disabled submit-btn mt-4'>
											<span className='spinner-border spinner-border-sm'></span>
										</button>
									) : ( */}
									<button
										type="submit"
										onClick={handleSubmit}
										className="submit-btn mt-4">
										Submit
									</button>
									{/* )} */}
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

export default Login;
