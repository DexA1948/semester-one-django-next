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

const Profile = () => {
	const { isAuth, isLoading } = useSelector((state) => state.AuthReducer);
	const [editOtherDoc, setEditOtherDoc] = useState(false);
	const [editStudentDoc, setEditStudentDoc] = useState(false);
	const [editWorkDoc, setEditWorkDoc] = useState(false);
	const [editEnglishDoc, setEditEnglishDoc] = useState(false);

	/* for edit student docs */
	const [level, setLevel] = useState('');
	const [institute, setInstitute] = useState('');
	const [year, setYear] = useState('');
	const [pdf, setPdf] = useState(null);

	/* for edit work docs */
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [position, setPosition] = useState('');
	const [pdfFile, setPdfFile] = useState(null);

	/* for edit student docs */
	const handleLevelChange = (event) => {
		setLevel(event.target.value);
	};

	const handleInstituteChange = (event) => {
		setInstitute(event.target.value);
	};

	const handleYearChange = (event) => {
		setYear(event.target.value);
	};

	const handlePdfUpload = (event) => {
		setPdf(event.target.files[0]);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// handle form submission
	};

	/* for edit work docs */
	function handleNameChange(e) {
		setName(e.target.value);
	}

	function handleEmailChange(e) {
		setEmail(e.target.value);
	}

	function handlePositionChange(e) {
		setPosition(e.target.value);
	}

	return (
		<>
			<div className='Profile-wrapper'>
				<Head>
					<title>Profile</title>

					<link
						rel='canonical'
						href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`}></link>
				</Head>

				<Header />
				{isAuth ? (
					<Container>
						<div className='profile'>
							<div className='welcome-text'>
								<h2>My Profile</h2>
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
									<h2>Hi ! Chris Martins</h2>
									<div className='desc'>
										<p>
											<span>
												{' '}
												<AiOutlineMail />
											</span>
											Email: mchrish10@gmail.com
										</p>
										<p>
											<span>
												{' '}
												<AiOutlinePhone />
											</span>
											Phone no: +977 9852658426
										</p>
										<p>
											<span>
												<IoPersonOutline />
											</span>
											Your Role no: Student
										</p>
										<p>
											<span>
												<IoLocationOutline />
											</span>
											Address: Balaju, Kathmandu, Nepal
										</p>
									</div>

									<div className='button'>
										<Link legacyBehavior href='/dashboard/editprofile'>
											<a>Update Profile</a>
										</Link>
									</div>
								</div>
							</div>
							<div className='document'>
								<div className='student-document'>
									<div className='head'>
										<p className='title'>Student Document</p>
										<span onClick={() => setEditStudentDoc(!editStudentDoc)}>
											<AiOutlineEdit />
										</span>
									</div>

									<div className='document-desc'>
										{editStudentDoc ? (
											<form onSubmit={handleSubmit}>
												<div>
													<input
														type='text'
														id='level'
														placeholder='Enter Your Level'
														value={level}
														onChange={handleLevelChange}
													/>
												</div>
												<div>
													<input
														type='text'
														id='institute'
														placeholder='Enter Your Institute'
														value={institute}
														onChange={handleInstituteChange}
													/>
												</div>
												<div>
													<input
														type='text'
														id='year'
														placeholder='Enter Your Passed Year'
														value={year}
														onChange={handleYearChange}
													/>
												</div>
												<div>
													<label htmlFor='pdf'>Upload PDF: </label>
													<input
														type='file'
														id='pdf'
														accept='.pdf'
														onChange={handlePdfUpload}
													/>
												</div>

												<div className='button' type='submit'>
													<Link legacyBehavior href='/'>
														<a>Update Documents</a>
													</Link>
												</div>
											</form>
										) : (
											<p> You have not entered any education documents</p>
										)}
									</div>
								</div>
								<div className='student-document'>
									<div className='head'>
										<p className='title'>Work Experience</p>
										<span onClick={() => setEditWorkDoc(!editWorkDoc)}>
											<AiOutlineEdit />
										</span>
									</div>

									<div className='document-desc'>
										{editWorkDoc ? (
											<form onSubmit={handleSubmit}>
												<input
													type='text'
													placeholder='Name'
													value={name}
													onChange={handleNameChange}
												/>
												<input
													type='email'
													placeholder='Email'
													value={email}
													onChange={handleEmailChange}
												/>
												<input
													type='text'
													placeholder='Enter Your Position'
													value={position}
													onChange={handlePositionChange}
												/>
												<input
													type='file'
													accept='.pdf'
													onChange={handlePdfUpload}
												/>
												<div className='button' type='submit'>
													<Link legacyBehavior href='/'>
														<a>Update Documents</a>
													</Link>
												</div>
											</form>
										) : (
											<p> You have not entered any Work Experience documents</p>
										)}
									</div>
								</div>
								<div className='student-document'>
									<div className='head'>
										<p className='title'>Other Document</p>
										<span onClick={() => setEditOtherDoc(!editOtherDoc)}>
											<AiOutlineEdit />
										</span>
									</div>

									<div className='document-desc'>
										{editOtherDoc ? (
											<form onSubmit={handleSubmit}>
												<input
													type='text'
													placeholder='Enter Your Position'
													value={position}
													onChange={handlePositionChange}
												/>
												<input
													type='file'
													accept='.pdf'
													onChange={handlePdfUpload}
												/>
												<div className='button' type='submit'>
													<Link legacyBehavior href='/'>
														<a>Update Documents</a>
													</Link>
												</div>
											</form>
										) : (
											<p> You have not entered any documents</p>
										)}
									</div>
								</div>
								<div className='student-document'>
									<div className='head'>
										<p className='title'>English Test score</p>
										<span onClick={() => console.log('yello')}>
											<AiOutlineEye />
										</span>
									</div>

									<div className='document-desc'>
										<p> You have not entered any documents</p>
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

export default Profile;
