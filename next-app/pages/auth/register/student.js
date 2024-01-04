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
import StudentStep2 from "./studentStep2";

const Register = () => {
	const [passwordType, setpasswordType] = useState("password");
	const [showAlert, setshowAlert] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [emailfverify, setemailfverify] = useState("");
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	const [country_of_residence, setCountry_of_residence] = useState("");
	const [mobile_number, setMobile_number] = useState("");
	const [study_destination, setStudy_destination] = useState("");
	const [study_level, setStudy_level] = useState("");
	const [formStep, setFormStep] = useState("1");
	const [countries, setCountries] = useState([]);
	const [studyLevels, setStudyLevel] = useState([]);
	const [studyDestination, setStudyDestination] = useState([]);
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

	const getCountries = async () => {
		const res = await fetch("/api/countries", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				url: `${process.env.NEXT_PUBLIC_API_URL}/countries/`,
			}),
		});

		const result = await res.json();

		const countriesRenderOption = Object.keys(result).map((el, idx) => {
			return {
				label: result[el],
				value: el,
				id: el,
			};
		});
		setCountries(countriesRenderOption);
	};
	const getStudyLevel = async () => {
		const res = await fetch("/api/studyLevel", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				url: `${process.env.NEXT_PUBLIC_API_URL}/coursestype/`,
			}),
		});

		const result = await res.json();
		if (result && result.length > 0) {
			const studyLevelRenderOption = result.map((el, idx) => {
				return {
					label: el.name,
					value: el.slug,
					id: el.id,
				};
			});
			setStudyLevel(studyLevelRenderOption);
		}
	};
	const getStudyDestination = async () => {
		const res = await fetch("/api/studyDestination", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				url: `${process.env.NEXT_PUBLIC_API_URL}/coursestype/`,
			}),
		});

		const result = await res.json();
		if (result && result.length > 0) {
			const studyLevelRenderOption = result.map((el, idx) => {
				return {
					label: el.name,
					value: el.slug,
					id: el.id,
				};
			});
			setStudyDestination(studyLevelRenderOption);
		}
	};
	React.useEffect(() => {
		getCountries();
		getStudyLevel();
		// getStudyDestination();
	}, []);
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
			createStudent();
		}
	};
	const createStudent = async () => {
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
			const res = await fetch("/api/createStudent", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					url: `${process.env.NEXT_PUBLIC_API_URL}/student_user/`,
					email: state.email,
					password: state.password,
				}),
			});
			const regRes = await res.json();
			localStorage.setItem("user_id", regRes[0].id);
			setFormStep("2");

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
			if (res.data !== undefined) {
				console.log(res.data);
			}
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
	};
	const studentReg = async () => {
		debugger;
		setisLoading(true);
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		// const data = {
		// 	email: state.email,
		// 	password: state.password,
		// };
		try {
			const res = await fetch("/api/createStudentProfile", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					url: `${process.env.NEXT_PUBLIC_API_URL}/student_profile/`,
					first_name: first_name,
					last_name: last_name,
					country_of_residence: country_of_residence,
					mobile_number: mobile_number,
					study_destination: study_destination,
					study_level: study_level,
					id: localStorage.getItem("user_id"),
				}),
			});
			const profile = await res.json();
			localStorage.setItem("user_profile", JSON.stringify(profile));
			store.addNotification({
				message: "Profile update successfully!",
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
			if (res.data !== undefined) {
				console.log(res.data);
			}
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
	};
	return (
		<div className="index">
			<Head>
				<title>Student Register - SemesterOne</title>
				<meta
					name="description"
					content="Register with SemesterOne and get updated with the universities and their courses in Australia."
				/>
				<meta
					data-rh="true"
					property="og:title"
					content="Student Register - SemesterOne"
				/>
				<meta
					data-rh="true"
					property="og:description"
					content="Register with SemesterOne and get updated with the universities and their courses in Australia."
				/>

				<link
					rel="canonical"
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/register/student`}></link>
			</Head>
			<Header />
			<Container>
				<main className="auth mt-5">
					<div className="row">
						<div className="col-lg-7">
							<div className="auth-img">
								<img
									src="/images/register_student.svg"
									width="100%"
									height="auto"
								/>
							</div>
							<div className="rl-box mt-3">
								<h5>For Education Agents</h5>
								<p>
									With access to 40+ universities and 3600+ courses from
									Australia, you can help your students find their dream
									courses.
								</p>
								<Link
									legacyBehavior
									href="/register/agent/"
									title="Register as a recruitment Partners - SemesterOne">
									<a title="Register as a recruitment Partners - SemesterOne">
										Register as an agent
									</a>
								</Link>
							</div>
						</div>
						<div className="col-lg-5 auth-form">
							{formStep === "1" ? (
								<h5>Register as a student</h5>
							) : (
								<h5>Please fill your additional detail.</h5>
							)}
							{showAlert ? (
								<Alert variant="success">
									{`Email verification link send to your email: ${emailfverify}`}
								</Alert>
							) : (
								""
							)}
							{formStep === "1" ? (
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
											Continue
										</button>
									)}
								</form>
							) : (
								<StudentStep2
									first_name={first_name}
									setFirst_name={setFirst_name}
									last_name={last_name}
									setLast_name={setLast_name}
									country_of_residence={country_of_residence}
									setCountry_of_residence={setCountry_of_residence}
									mobile_number={mobile_number}
									setMobile_number={setMobile_number}
									study_destination={study_destination}
									setStudy_destination={setStudy_destination}
									study_level={study_level}
									setStudy_level={setStudy_level}
									countries={countries}
									studyLevels={studyLevels}
									studentReg={studentReg}
								/>
							)}
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
									<Link
										legacyBehavior
										href="/auth/login"
										title="Login - SemesterOne">
										<a title="Login - SemesterOne">Login</a>
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
