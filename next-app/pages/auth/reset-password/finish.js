import React from "react";
import Head from "next/head";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { useRouter } from "next/router";
import { MdVerifiedUser } from "react-icons/md";
import { Container } from "react-bootstrap-v5";

const RecoveryPasswordFinish = () => {
	const router = useRouter();
	return (
		<div className="index">
			<Head>
				<title>Recovery Passsword - Finish</title>
				<meta name="description" content="Recovery Passsword - Finish" />
				<meta
					data-rh="true"
					property="og:title"
					content="Recovery Passsword Finish - SemestorOne"
				/>
				<meta
					data-rh="true"
					property="og:description"
					content="Recovery Passsword finished semestorone"
				/>
			</Head>
			<Header />
			<Container>
				<main className="auth">
					<div className="row">
						<div className="col-lg-3"></div>
						<div className="col-lg-6 finish-box">
							<div className="ccard">
								<MdVerifiedUser className="icon" size="40px" />
								<h5 className="mt-4">
									Password Changed <br />
									Successfully
								</h5>
								<button
									className="mt-4"
									onClick={() =>
										router.push("/login/", null, { shallow: true })
									}
								>
									Back to Login
								</button>
							</div>
						</div>
						<div className="col-lg-3"></div>
					</div>
				</main>
			</Container>
			<Footer />
		</div>
	);
};

export default RecoveryPasswordFinish;
