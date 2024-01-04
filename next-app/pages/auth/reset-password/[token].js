import React, { useState } from "react";
import Head from "next/head";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { useRouter } from "next/router";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Container } from "react-bootstrap-v5";
import axios from "axios";
import { store } from "react-notifications-component";

const RecoveryPassword2 = () => {
	const router = useRouter();
	const [passwordType, setpasswordType] = useState("password");
	const [password, setpassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");
	const changePasswordType = () => {
		if (passwordType === "password") {
			setpasswordType("text");
		} else {
			setpasswordType("password");
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
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
		} else if (password.length < 6) {
			store.addNotification({
				message: "Password length must b greater than 5 digits!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else {
			const { token } = router.query;
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const data = {
				token: token,
				password: password,
			};
			try {
				const res = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/reset_password/`,
					data,
					config
				);
				if (res.data.message !== undefined) {
					router.push("/auth/reset-password/finish", null, { shallow: true });
				} else if (res.data.error !== undefined) {
					store.addNotification({
						message: res.data.error,
						type: "success",
						insert: "top",
						container: "top-right",
						dismiss: {
							duration: 3000,
							onScreen: true,
						},
					});
				}
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<div className="index">
			<Head>
				<title>Recovery Passsword - SemestorOne</title>
				<meta name="description" content="Recovery passsword semestorone" />
				<meta
					data-rh="true"
					property="og:title"
					content="Recovery Passsword - SemestorOne"
				/>
				<meta
					data-rh="true"
					property="og:description"
					content="Recovery passsword semestorone"
				/>
			</Head>
			<Header />
			<Container>
				<main className="auth">
					<div className="row">
						<div className="col-lg-6 auth-img">
							<img src="/images/recovery-img.svg" width="100%" height="auto" />
						</div>
						<div className="col-lg-6 auth-form">
							<h5>Change Password</h5>
							<form onSubmit={handleSubmit}>
								<div className="input-area mt-4">
									<input
										required
										type={passwordType}
										placeholder="Enter Password"
										id="pwd"
										value={password}
										onChange={(e) => setpassword(e.target.value)}
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
										required
										type={passwordType}
										placeholder="Confirm Password"
										value={confirmPassword}
										onChange={(e) => setconfirmPassword(e.target.value)}
										id="confirmpwd"
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
								<button type="submit" className="submit-btn mt-4">
									Save New Password
								</button>
							</form>
						</div>
					</div>
				</main>
			</Container>
			<Footer />
		</div>
	);
};

export default RecoveryPassword2;
