import React, { useState } from "react";
import Head from "next/head";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Container, Alert } from "react-bootstrap-v5";
import axios from "axios";
import { store } from "react-notifications-component";

const Register = () => {
	const [passwordType, setpasswordType] = useState("password");
	const [showAlert, setshowAlert] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [emailfverify, setemailfverify] = useState("");
	const [state, setstate] = useState({
		email: "",
		password: "",
		retypePassword: "",
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
		if (state.password !== state.retypePassword) {
			store.addNotification({
				message: "Password not same!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else if (state.password.length < 6) {
			store.addNotification({
				message: "Password Length must b greater than 5 digits!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else {
			setisLoading(true);
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const data = {
				email: state.email,
				password: state.password,
			};
			try {
				const res = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/agent_user/`,
					data,
					config
				);
				store.addNotification({
					message: "Registration succesfully completed!",
					type: "success",
					insert: "top",
					container: "top-right",
					dismiss: {
						duration: 3000,
						onScreen: true,
					},
				});
				setshowAlert(true);
				setemailfverify(state.email);
				setstate({ email: "", password: "", retypePassword: "" });
				setisLoading(false);
			} catch (err) {
				if (err.response !== undefined) {
					store.addNotification({
						message: err.response.data.unique_violation,
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
		}
	};
	return (
		<div className="index">
			<Head>
				<title>Agent Register - SemesterOne</title>
				<meta
					name="description"
					content="Register with SemesterOne and get updated with the universities and their courses in Australia."
				/>
				<meta
					data-rh="true"
					property="og:title"
					content="Agent Register - SemesterOne"
				/>
				<meta
					data-rh="true"
					property="og:description"
					content="Register with SemesterOne and get updated with the universities and their courses in Australia."
				/>
				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/register/agent`}></link>
			</Head>
			<Header />
			<Container>
				<main className="auth mt-5">
					<div className="row">
						<div className="col-lg-7">
							<div className="auth-img">
								<img src="/images/agent_page.svg" width="100%" height="auto" />
							</div>
							<div className="rl-box mt-3">
								<h5>For Students</h5>
								<p>
									Explore undergraduate & postgraduate courses in Australia. In
									less than 5 minutes, you may search, compare, shortlist, and
									apply to courses with only a few clicks!
								</p>
								<Link
									legacyBehavior
									href="/register/student/"
									title="Register as a student - SemesterOne">
									<a title="Register as a student - SemesterOne">
										Register as a student
									</a>
								</Link>
							</div>
						</div>
						<div className="col-lg-5 auth-form">
							<h5>Register as an agent</h5>
							{showAlert ? (
								<Alert variant="success">
									{`Email verification link send to your email: ${emailfverify}`}
								</Alert>
							) : (
								""
							)}
							<form onSubmit={handleSubmit}>
								<div className="input-area mt-4">
									<input
										type="email"
										required
										placeholder="Email Address"
										id="email"
										value={state.email}
										onChange={(e) =>
											setstate({ ...state, email: e.target.value })
										}
									/>
								</div>
								<div className="input-area mt-4">
									<input
										type={passwordType}
										required
										placeholder="Password"
										id="pwd"
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
								<div className="input-area mt-4">
									<input
										type={passwordType}
										required
										placeholder="Confirm Password"
										id="confirmpwd"
										value={state.retypePassword}
										onChange={(e) =>
											setstate({ ...state, retypePassword: e.target.value })
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
								{isLoading ? (
									<button
										type="submit"
										disabled
										className="disabled submit-btn mt-4">
										<span className="spinner-border spinner-border-sm"></span>
									</button>
								) : (
									<button type="submit" className="submit-btn mt-4">
										Register
									</button>
								)}
								<p className="auth-terms mt-2">
									By registering, you agree to our{" "}
									<Link legacyBehavior href="/terms-and-conditions/">
										<a title="SemesterOne Terms & Conditions">
											Terms & Conditions
										</a>
									</Link>
								</p>
							</form>
							<div className="divider">
								<div className="line"></div>
								<span className="ml-2 mr-2">or</span>
								<div className="line"></div>
							</div>
							<div className="social-btns">
								<button className="fb">
									<FaFacebookF size="17px" className="mr-3 icon" /> facebook
								</button>
								<button className="ml-3 gg">
									<FaGoogle size="17px" className="mr-3 icon" /> Google
								</button>
							</div>
							<div className="bottom">
								<span>
									Already have a account:{" "}
									<Link href="/login/" title="Login in SemesterOne">
										Login
									</Link>
								</span>
							</div>
						</div>
					</div>
				</main>
			</Container>
			<Footer />
		</div>
	);
};

export default Register;
