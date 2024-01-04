import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Container } from 'react-bootstrap-v5';
import {
	AiOutlineMail,
	AiOutlinePhone,
	AiOutlineEdit,
	AiOutlineEye,
} from 'react-icons/ai';
import { IoPersonOutline, IoLocationOutline } from 'react-icons/io5';
import 'react-circular-progressbar/dist/styles.css';
import Link from 'next/link';

import { useSelector } from 'react-redux';
const EditProfile = () => {
	const { isAuth, isLoading } = useSelector((state) => state.AuthReducer);
	const [formData, setFormData] = useState({
		firstName: '',
		middleName: '',
		lastName: '',
		emailAddress: '',
		gender: '',
		phoneNumber: '',
		address: '',
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};
	return (
		<>
			{' '}
			<div className='saved-wrapper'>
				<Head>
					<title>Edit Profile</title>

					<link
						rel='canonical'
						href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`}></link>
				</Head>

				<Header />
				{isAuth ? (
					<Container>
						<div className='saved'>
							<div className='welcome-text'>
								<h2>My Saved</h2>
								<p>Save your favourite colleges and view it later</p>
							</div>

							<div className='profile-info rounded'>
								<div className='college'>
									<div className='image-wrapper'>
										<img src='/images/cqu.png' alt='university-icon' />
									</div>
									<div className='college-info'>
										<p className='field'>
											AUR20516 - Certificate II in Automotive Servicing
											Tecnology
										</p>
										<p className='name'>CQUniversity Australia</p>
										<div className='actions'>
											<div className='button'>
												<Link legacyBehavior href='/'>
													<a>View Details</a>
												</Link>
											</div>

											<div className='button'>
												<Link legacyBehavior href='/'>
													<a className='unsave'>Unsave</a>
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className='college'>
									<div className='image-wrapper'>
										<img src='/images/western.png' alt='university-icon' />
									</div>
									<div className='college-info'>
										<p className='field'>Advanced Structural Geology</p>
										<p className='name'>
											The University of Western Australia (UWA)
										</p>
										<div className='actions'>
											<div className='button'>
												<Link legacyBehavior href='/'>
													<a>View Details</a>
												</Link>
											</div>

											<div className='button'>
												<Link legacyBehavior href='/'>
													<a className='unsave'>Unsave</a>
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className='college'>
									<div className='image-wrapper'>
										<img src='../../images/bsb.png' alt='university-icon' />
									</div>
									<div className='college-info'>
										<p className='field'>
											BSB41419 Certificate IV in Work Health and Safety
										</p>
										<p className='name'>Charles Darwin University</p>
										<div className='actions'>
											<div className='button'>
												<Link legacyBehavior href='/'>
													<a>View Details</a>
												</Link>
											</div>

											<div className='button'>
												<Link legacyBehavior href='/'>
													<a className='unsave'>Unsave</a>
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className='college' style={{ marginTop: '2rem' }}>
									<div className='image-wrapper'></div>

									<div className='college-info'>
										<div className='button'>
											<Link legacyBehavior href='/'>
												<a
													style={{ borderRadius: '15px', padding: '7px 25px' }}>
													UPDATE
												</a>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Container>
				) : (
					<p
						style={{
							width: '100%',
							height: '100vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						Restricted, please login first...
					</p>
				)}
				<Footer />
			</div>
		</>
	);
};

export default EditProfile;
