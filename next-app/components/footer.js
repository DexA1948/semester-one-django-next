import React from "react";
import Link from "next/link";
import {
	GrFacebookOption,
	GrInstagram,
	GrTwitter,
	GrYoutube,
} from "react-icons/gr";
import { Container } from "react-bootstrap-v5";

const Footer = () => {
	return (
		<footer>
			<div className="footer p-4">
				<Container>
					<div className="row">
						<div className="col-lg-4 col-md-4 col-sm-8 col-12 detail">
							<Link legacyBehavior href="/">
								<img
									src="/images/semesterone-logo.png"
									height="auto"
									width="80px"
									alt="semesterOne Logo"
									title="SemesterOne"
								/>
							</Link>
							<p>
								Do you want to study in Australia? SemesterOne is here to help
								you find the best Australian universities and their courses.
								Find the undergraduate and postgraduate courses in Australia.
							</p>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-4 col-6">
							{/* <h5>Home</h5> */}
							<ul className="nav flex-column">
								<li className="nav-item">
									<Link legacyBehavior href="/">
										<a title="SemesterOne">
											<span className="nav-link">Home</span>
										</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link legacyBehavior href="/courses">
										<a title="View all courses in Australia">
											<span className="nav-link">Courses</span>
										</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link legacyBehavior href="/universities">
										<a title="View all universities in Australia">
											<span className="nav-link">University</span>
										</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link legacyBehavior href="/blog">
										<a title="View all blogs and course advices in Australia">
											<span className="nav-link">Blogs</span>
										</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link legacyBehavior href="/agents">
										<a title="View all agents in Australia">
											<span className="nav-link">Agents</span>
										</a>
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-4 col-6">
							{/* <h5>Pages</h5> */}
							<ul className="nav flex-column">
								<li className="nav-item">
									<Link legacyBehavior href="/about">
										<a title="About SemesterOne">
											<span className="nav-link">About Us</span>
										</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link legacyBehavior href="/contact">
										<a title="Contact SemesterOne">
											<span className="nav-link">Contact Us</span>
										</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link legacyBehavior href="/privacy">
										<a title="Privacy Policy - SemesterOne">
											<span className="nav-link">Privacy Policy</span>
										</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link legacyBehavior href="/terms-and-conditions">
										<a title="Terms and Condition - SemesterOne">
											<span className="nav-link">Terms & Conditions</span>
										</a>
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-4 col-6">
							{/* <h5>Social Media</h5> */}
							<ul className="nav flex-column">
								<li className="nav-item">
									<a
										href="https://web.facebook.com/semesterone?_rdc=1&_rdr"
										target="_blank"
										className="nav-link text-nowrap"
										title="SemesterOne Facebook">
										<GrFacebookOption size="18px" className="icon mr-2" />
										Facebook
									</a>
								</li>
								<li className="nav-item">
									<Link legacyBehavior href="/">
										<span className="nav-link text-nowrap">
											<GrTwitter size="18px" className="icon mr-2" /> Twitter
										</span>
									</Link>
								</li>
								<li className="nav-item">
									<Link legacyBehavior href="/">
										<span className="nav-link text-nowrap">
											<GrInstagram size="18px" className="icon mr-2" />{" "}
											Instagram
										</span>
									</Link>
								</li>
								<li className="nav-item">
									<Link legacyBehavior href="/">
										<span className="nav-link text-nowrap">
											<GrYoutube size="18px" className="icon mr-2" /> Youtube
										</span>
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="divider"></div>
					<div className="d-flex mt-3">
						<div className="p-2 mb-3 ml-auto mr-auto copyright">
							&copy; 2021{" "}
							<Link legacyBehavior href="/" title="SemesterOne">
								semesterone.com
							</Link>
							, All Right Reserved.
						</div>
					</div>
				</Container>
			</div>
		</footer>
	);
};

export default Footer;
