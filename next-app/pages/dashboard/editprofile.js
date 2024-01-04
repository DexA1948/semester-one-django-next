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
			<div className='edit-Profile-wrapper'>
				<Head>
					<title>Edit Profile</title>

					<link
						rel='canonical'
						href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`}></link>
				</Head>

				<Header />
				{isAuth ? (
					<Container>
						<div className='edit-profile'>
							<div className='welcome-text'>
								<h2>Profile Edit</h2>
								<p>Keep Your Profile Updated</p>
							</div>

							<div className='profile-info rounded'>
								<div className='profile-image'>
									<img
										src='https://img.freepik.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink_176532-13861.jpg?size=626&ext=jpg'
										alt='profile-image'
									/>
								</div>

								<div className='profile-desc'>
									<div className='desc'>
										<form>
											<div className='outer first'>
												<div className='input-wrapper'>
													<label htmlFor='firstName'>First Name:</label>
													<input
														type='text'
														id='firstName'
														name='firstName'
														placeholder='Enter your first name'
														value={formData.firstName}
														onChange={handleInputChange}
													/>
												</div>
												<div className='input-wrapper'>
													<label htmlFor='middleName'>Middle Name:</label>
													<input
														type='text'
														id='middleName'
														name='middleName'
														placeholder='Enter your middle name'
														value={formData.middleName}
														onChange={handleInputChange}
													/>
												</div>

												<div className='input-wrapper'>
													<label htmlFor='lastName'>Last Name:</label>
													<input
														type='text'
														id='lastName'
														name='lastName'
														placeholder='Enter your last name'
														value={formData.lastName}
														onChange={handleInputChange}
													/>
												</div>
											</div>

											<div className='outer second'>
												<div className='input-wrapper'>
													<label htmlFor='emailAddress'>Email Address:</label>
													<input
														type='email'
														id='emailAddress'
														name='emailAddress'
														placeholder='Enter your email address'
														value={formData.emailAddress}
														onChange={handleInputChange}
													/>
												</div>
												<div className='input-wrapper'>
													<label htmlFor='gender'>Gender:</label>
													<select
														id='gender'
														name='gender'
														value={formData.gender}
														onChange={handleInputChange}>
														<option value=''>Select gender</option>
														<option value='male'>Male</option>
														<option value='female'>Female</option>
														<option value='other'>Other</option>
													</select>
												</div>
											</div>
											<div className='outer third'>
												<div className='input-wrapper'>
													<label htmlFor='phoneNumber'>Phone Number:</label>
													<input
														type='tel'
														id='phoneNumber'
														name='phoneNumber'
														placeholder='Enter your phone number'
														value={formData.phoneNumber}
														onChange={handleInputChange}
													/>
												</div>
												<div className='input-wrapper'>
													<label htmlFor='address'>Address:</label>
													<input
														type='address'
														id='address'
														name='address'
														placeholder='Enter your address'
														value={formData.address}
														onChange={handleInputChange}
													/>
												</div>
											</div>
										</form>
									</div>

									<div className='button'>
										<Link legacyBehavior href='/'>
											<a>Update</a>
										</Link>
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
