import React, { useState } from "react";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Container, Alert } from "react-bootstrap-v5";
import { axios } from "../../helpers";
import { Store } from "react-notifications-component";
import AgentStep2 from "./agentStep2";
import { DataServices } from "../../services/dataServices";
import { getOptions } from "../../utils";
import router, { useRouter } from 'next/router';

const dataServices = new DataServices();

const Register = () => {
	const [passwordType, setpasswordType] = useState("password");
	const [showAlert, setshowAlert] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [emailfverify, setemailfverify] = useState("");
	const [step, setFormStep] = useState("1");
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	const [country_of_residence, setCountry_of_residence] = useState("");
	const [mobile_number, setMobile_number] = useState("");
	const [address, setAddress] = useState("");
	const [type, setType] = useState("");
	const [selectedAgency, setSelectedAgency] = useState();
	const [profile_image, selectedProfileImage] = useState("");
	const [agency_id, setAgency_id] = useState("");
	const [countries, setCountries] = useState([]);
	const [agencyOptions, setAgencyOptions] = useState([]);

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
			Store.addNotification({
				message: "Password does not match!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else if (state.password.length < 6) {
			Store.addNotification({
				message: "Password length must be greater than 5 digits!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else {
			createAgent();
		}
	};

	const createAgent = async () => {
		setisLoading(true);
		const data = {
			email: state.email,
			password: state.password,
		};
		try {
			const res = await axios.post("/agent_user/", data);
			const regRes = res.data;
			setFormStep("2");
			Store.addNotification({
				message: "Agent registration successful. Complete this step for full agent profile!",
				type: "success",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 5000,
					onScreen: true,
				},
			});
			setshowAlert(true);
			setemailfverify(state.email);
			if (res.data !== undefined) {
				const config = {
					headers: {
						'Content-Type': 'application/json',
					},
				};
				try {
					const res = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
						data,
						config
					);
					if (res.data !== 'undefined') {
						localStorage.setItem('token', res.data.token);
						localStorage.setItem('agent_id', res.data.user.id);
						dispatch({ type: LOGINUSER, payload: res.data.user });
					}
					setisLoading(false);
				} catch (err) {
					if (err.response.data !== 'undefined') {
						Store.addNotification({
							message: err.response.data.error[0],
							type: 'danger',
							insert: 'top',
							container: 'top-right',
							dismiss: {
								duration: 3000,
								onScreen: true,
							},
						});
					}
					setisLoading(false);
				}
			}
			setisLoading(false);
		} catch (err) {
			if (err.response !== undefined) {
				Store.addNotification({
					message: err.response.data.email
						? err.response.data.email[0]
						: err.response.data.error[0],
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

	const agentProfileReg = async () => {
		setisLoading(true);
		// Get token from local storage
		const token = localStorage.getItem('token');
		console.log(agency_id)
		console.log(agency_id.id)
		const config = {
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Token ${token}`, // add token to Authorization header
			},
		};
		const data = {
			user: {
				first_name,
				last_name,
			},
			country: country_of_residence.id,
			phone_number: mobile_number,
			address: address,
			type: type.id,
			agency: agency_id.id,
		};
		try {
			const res = await axios.post(`/agent_profile/`, data, config);
			const profile = res.data;
			localStorage.setItem("agent_profile", JSON.stringify(profile));
			Store.addNotification({
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
			router.push('/');
		} catch (err) {
			if (err.response !== undefined) {
				Store.addNotification({
					message: err.response.data.detail,
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

	React.useEffect(() => {
		const getData = async () => {
			if (step === "2") {
				const agencies = await dataServices.getAgencies();
				const countries = await dataServices.getCountries();

				setAgencyOptions(getOptions(agencies.data));
				setCountries(getOptions(countries.data, true));
			}
		};
		getData();
	}, [step]);

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
							{step === "1" ? (
								<h5>Register as an agent</h5>
							) : (
								<h5>Please fill your additional detail.</h5>
							)}
							{/* {showAlert ? (
                <Alert variant="success">
                  {`Email verification link send to your email: ${emailfverify}`}
                </Alert>
              ) : (
                ""
              )} */}
							{step === "1" ? (
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
									<p className="auth-terms mt-2">
										By registering, you agree to our{" "}
										<Link legacyBehavior href="/terms-and-conditions/">
											<a title="SemesterOne Terms & Conditions">
												Terms & Conditions
											</a>
										</Link>
									</p>
								</form>
							) : (
								<AgentStep2
									first_name={first_name}
									setFirst_name={setFirst_name}
									last_name={last_name}
									setLast_name={setLast_name}
									country_of_residence={country_of_residence}
									setCountry_of_residence={setCountry_of_residence}
									mobile_number={mobile_number}
									setMobile_number={setMobile_number}
									address={address}
									setAddress={setAddress}
									type={type}
									setType={setType}
									setSelectedAgency={setSelectedAgency}
									selectedAgency={selectedAgency}
									profile_image={profile_image}
									selectedProfileImage={selectedProfileImage}
									isLoading={isLoading}
									countries={countries}
									agentProfileReg={agentProfileReg}
									agencyOptions={agencyOptions}
									setAgency_id={setAgency_id}
									agency_id={agency_id}
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
