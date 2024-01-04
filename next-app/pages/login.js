import React, { useState } from "react";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Container } from "react-bootstrap-v5";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGINUSER } from "../redux/constants";
import Router from "next/router";
import { Store } from "react-notifications-component";
const Login = () => {
	const dispatch = useDispatch();
	const [passwordType, setpasswordType] = useState("password");
	const [isLoading, setisLoading] = useState(false);
	const [state, setstate] = useState({
		email: "",
		password: "",
	});

	const changePasswordType = () => {
		if (passwordType === "password") {
			setpasswordType("text");
		} else {
			setpasswordType("password");
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setisLoading(true);
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const data = {
			username: state.email,
			password: state.password,
			email: state.email,
		};
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
				data,
				config
			);
			if (res.data !== "undefined") {
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("userId",res.data.user.id);
				dispatch({ type: LOGINUSER, payload: res.data.user });
			}
			setisLoading(false);
			Router.push("/");
		} catch (err) {
			if (err.response.data !== "undefined") {
				Store.addNotification({
					message: err.response.data.error[0],
					type: "danger",
					insert: "top",
					container: "top-right",
					dismiss: {
						duration: 3000,
						onScreen: true,
					},
				});
			}
			setisLoading(false);
		}
	};
	return (
		<div className="index">
			<Head>
				<title>Login to SemesterOne.</title>
				<meta name="description" content="Login to semesterone." />
				<meta
					data-rh="true"
					property="og:title"
					content="Login to semesterone."
				/>
				<meta
					data-rh="true"
					property="og:description"
					content="Login to semesterone."
				/>
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/login`}></link>
			</Head>
			<Header />
			<Container>
				<main className="home">
					<div className="auth mt-5">
						<div className="row">
							<div className="col-lg-7">
								<div className="auth-img">
									<img
										src="/images/login_page.svg"
										width="100%"
										height="auto"
									/>
								</div>
								<div className="row mb-5">
									<div className="col-sm-6 mt-4">
										<div className="rl-box">
											<h5>For Students</h5>
											<p>
												Explore undergraduate & postgraduate courses in
												Australia. In less than 5 minutes, you may search,
												compare, shortlist, and apply to courses with only a few
												clicks!
											</p>
											<Link
												href="/register/student/"
												title="Register as a student - SemesterOne">
												Register as a student
											</Link>
										</div>
									</div>
									<div className="col-sm-6 mt-4">
										<div className="rl-box">
											<h5>For Education Agents</h5>
											<p>
												With access to 40+ universities and 3600+ courses from
												Australia, you can help your students find their dream
												courses.
											</p>
											<Link
												href="/register/agent/"
												title="Registe as an agent - SemesterOne">
												Register as an agent
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-5 auth-form">
								<h5>Login To SemesterOne</h5>
								<form onSubmit={handleSubmit}>
									<div className="input-area mt-4">
										<input
											type="email"
											placeholder="Enter email"
											id="email"
											required
											value={state.email}
											onChange={(e) =>
												setstate({ ...state, email: e.target.value })
											}
										/>
									</div>
									<div className="input-area mt-4">
										<input
											type={passwordType}
											placeholder="Enter password"
											id="pwd"
											required
											value={state.password}
											onChange={(e) =>
												setstate({ ...state, password: e.target.value })
											}
										/>
										{passwordType === "password" ? (
											<BsEye
												onClick={changePasswordType}
												className="icon"
												size="20px"
											/>
										) : (
											<BsEyeSlash
												onClick={changePasswordType}
												className="icon"
												size="20px"
											/>
										)}
									</div>
									<div className="recovery-btn">
										<Link
											href="/auth/forgot-password"
											title="Recover Password - SemesterOne">
											Recovery Password
										</Link>
									</div>
									{isLoading ? (
										<button
											type="submit"
											disabled
											className="disabled submit-btn mt-4">
											<span className="spinner-border spinner-border-sm"></span>
										</button>
									) : (
										<button type="submit" className="submit-btn mt-4">
											Login
										</button>
									)}
								</form>
								<div className="divider">
									<div className="line"></div>
									<span className="ml-2 mr-2">or</span>
									<div className="line"></div>
								</div>
								<div className="social-btns">
									<button className="fb" onClick={() => signIn()}>
										<FaFacebookF size="17px" className="mr-3 icon" /> facebook
									</button>
									<button className="ml-3 gg">
										<FaGoogle size="17px" className="mr-3 icon" /> Google
									</button>
								</div>
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
