import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';
import Link from 'next/link';
import { Container } from 'react-bootstrap-v5';
import parse from 'html-react-parser';
import { GiChart } from 'react-icons/gi';
import AdsContainer from '../../../../components/adsContainer';
import { RiStarLine } from 'react-icons/ri';
import ReactStars from 'react-rating-stars-component';
import { axios } from '../../../../helpers';
import { Store } from 'react-notifications-component';
import router from 'next/router';
import { DataServices } from './../../../../services/dataServices';
import { getOptions } from './../../../../utils/index';
import Select from 'react-select';

const dataServices = new DataServices();

export default function UniversityCoursePage({ course, ads }) {
	const [countries, setCountries] = useState([]);
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		mobile_number: '',
		country_of_residence: '',
		studyPlan: '',
		agree: false,
		enquiry: false,
		offers: false,
	});

	React.useEffect(() => {
		const fetcher = async () => {
			const countries = await dataServices.getCountries();

			setCountries(getOptions(countries.data, true));
		};

		fetcher();
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log('testing');

		try {
			const res = await axios.patch('/student_profile/', formData);
			console.log(res);
			const profile = res.data;
			console.log(profile);
			localStorage.setItem('user_profile', JSON.stringify(profile));
			Store.addNotification({
				message: 'Applied to course successfully!',
				type: 'success',
				insert: 'top',
				container: 'top-right',
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
			// setshowAlert(true);
		} catch (err) {
			console.log('testing error');
			if (err.response !== undefined) {
				console.log(err.response);
				Store.addNotification({
					message: err.response.data.detail,
					type: 'danger',
					insert: 'top',
					container: 'top-right',
					dismiss: {
						duration: 3000,
						onScreen: true,
					},
				});
			}
		}
	};

	const gotoApplyForm = () => {
		let token = localStorage.getItem('token');
		if (token) {
			router.push('/');
		} else {
			router.push('/login/');
		}
	};
	return (
		<div className='index'>
			<Head>
				<title>{`${course.name} in ${course.university.name}`}</title>
				<meta
					data-rh='true'
					property='og:url'
					content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/universities/${course.university.slug}/course/${course.slug}/`}
				/>
				<meta
					name='description'
					content={`Learn more about ${course.name} at ${course.university.name}`}
				/>
				<meta
					data-rh='true'
					property='og:title'
					content={`${course.name} in ${course.university.name}`}
				/>
				<meta
					data-rh='true'
					property='og:description'
					content={`Learn more about ${course.name} at ${course.university.name}`}
				/>
				<link
					rel='canonical'
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/universities/${course.university.slug}/course/${course.slug}/`}
				></link>
			</Head>
			<Header />
			<Container>
				<main className='home'>
					<div className='universityPage mt-5'>
						<div
							className='uni_img'
							style={{
								backgroundImage: `linear-gradient(rgba(38, 32, 96, 0.529), rgba(38, 32, 96, 0.693)), url(${
									course.university.logo ||
									'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&ixlib=rb-1.2.1&q=80&w=1500'
								})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
						>
							<div className='row' style={{ width: '100%' }}>
								<div className='col-lg-3' style={{ background: 'white' }}>
									<div className='uni_logo'>
										<img
											src={
												course.university.logo_image || course.university.logo
											}
											alt={`${course.university.name} logo`}
											title={`${course.university.name}`}
										/>
									</div>
								</div>
								<div className='col-lg-9'>
									<div className='university-name-ranking'>
										<h1 className='mt-3'>{course.name}</h1>
										<Link
											legacyBehavior
											href={`/universities/${course.university.slug}/`}
											title={`View ${course.university.name} Page`}
										>
											<a title={`View ${course.university.name} Page`}>
												<h3 className='uniname'>{course.university.name}</h3>
											</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className='row mt-5'>
							<div className='col-lg-9'>
								<div className='content'>
									<div className='body'>
										<h2>About {course.name}</h2>
										<div className='mt-4 p'>{parse(`${course.body}`)}</div>
									</div>
									<div className='divider mt-3 mb-3'></div>
									<div className='footer-btns'>
										{/* <Link legacyBehavior href="/" title={`Apply to ${course.name}`}> */}
										<a className='apply' onClick={gotoApplyForm} href='#'>
											Apply Now
										</a>
										{/* </Link> */}
										{/* <Link legacyBehavior href="/" title="Download syllabus - SemesterOne">
											<a>
												Download syllabus <BsDownload className="icon ml-2" />
											</a>
										</Link> */}
										<Link
											legacyBehavior
											href={`/universities/${course.university.slug}/`}
										>
											<a
												title={`Read about ${course.university.name}`}
												className='read'
											>
												Read About University
											</a>
										</Link>
									</div>
								</div>
								<AdsContainer ads={ads} isDivide={false} />
							</div>

							<div className='col-lg-3'>
								{/* <div className="apply_btn">
									<a onClick={gotoApplyForm} href="#">
										Apply Now
									</a>
								</div> */}

								<div
									className='apply-form border border-light-grey bg-white  mb-3'
									style={{ borderRadius: '10px' }}
								>
									<style jsx>
										{`
											.apply-form {
												font-size: 13px;
											}
											select {
												border: 1px solid red;
												width: 100%;
												padding: 7px 0;
												border: none;
												border-bottom: 1px solid grey;
												outline: none;
												color: grey;
											}

											select:active {
												border: none;
												outline: none;
											}

											input {
												border: none;
												border-bottom: 1px solid grey;
												border-radius: 0;
												padding: 7px 0;
											}
											input::placeholder {
												font-size: 13px;
											}

											.form-metadata {
												background-color: #05397c;
												color: #fff;
												border-radius: 10px 10px 0 0;
											}
											h4 {
												font-size: 1.3rem;
											}
											.btn {
												font-size: 14px;
											}
										`}
									</style>
									<div className='form-metadata p-4'>
										<h4 className='mb-3' style={{fontSize: "1.1rem"}}>Interested in applying?</h4>
										<p className='mb-3'>
											Enter your details below and we'll get back to you ASAP
										</p>
									</div>
									<form onSubmit={handleSubmit} className='p-4'>
										<fieldset className='d-flex flex-column gap-3'>
											<div className='mb-3'>
												<input
													type='text'
													className='form-control'
													placeholder='First Name*'
													required
													value={formData.first_name}
													onChange={(event) =>
														setFormData({
															...formData,
															first_name: event.target.value,
														})
													}
												/>
											</div>
											<div className='mb-3'>
												<input
													type='text'
													className='form-control'
													placeholder='Last Name*'
													required
													value={formData.last_name}
													onChange={(event) =>
														setFormData({
															...formData,
															last_name: event.target.value,
														})
													}
												/>
											</div>
											<div className='mb-3'>
												<input
													type='email'
													className='form-control'
													placeholder='Email Address*'
													required
													value={formData.email}
													onChange={(event) =>
														setFormData({
															...formData,
															email: event.target.value,
														})
													}
												/>
											</div>
											<div className='mb-3'>
												<input
													type='phone'
													className='form-control'
													placeholder='Mobile number*'
													required
													value={formData.mobile_number}
													onChange={(event) =>
														setFormData({
															...formData,
															mobile_number: event.target.value,
														})
													}
												/>
											</div>

											<div className='mb-3'>
												<Select
													className='w-100'
													options={countries}
													isClearable
													placeholder='Select country_of_residence '
													value={formData.country_of_residence}
													onChange={(event) =>
														setFormData({
															...formData,
															country_of_residence: event,
														})
													}
												/>
											</div>

											<small className='mb-3'>
												Semesterone will not share your details with others
												without your permission
											</small>
											<div className='form-check mb-3'>
												<input
													className='form-check-input'
													type='checkbox'
													name='agree'
													id='agree'
													required
													value={formData.agree}
													onChange={(event) =>
														setFormData({
															...formData,
															agree: event.target.value,
														})
													}
												/>
												<label className='form-check-label' htmlFor='agree'>
													I agree to semesterone <a href='#'>Terms</a> and{' '}
													<a href='#'>Privacy Policy</a>
												</label>
											</div>
											<div className='form-check mb-3'>
												<input
													className='form-check-input'
													type='checkbox'
													name='enquiry'
													id='enquiry'
													value={formData.enquiry}
													onChange={(event) =>
														setFormData({
															...formData,
															enquiry: event.target.value,
														})
													}
												/>
												<label className='form-check-label' htmlFor='enquiry'>
													Please contact me by phone, emails or SMS to assist
													with my enquiry
												</label>
											</div>
											<div className='form-check mb-3'>
												<input
													className='form-check-input'
													type='checkbox'
													name='offers'
													id='offers'
													value={formData.offers}
													onChange={(event) =>
														setFormData({
															...formData,
															offers: event.target.value,
														})
													}
												/>
												<label className='form-check-label' htmlFor='offers'>
													I would like to receive updates and offers from
													semesterone
												</label>
											</div>
											<div className='mb-1 mt-3'>
												<button
													className='btn btn-success text-center w-100'
													type='submit'
												>
													Apply Now
												</button>
											</div>
										</fieldset>
									</form>
								</div>
								<div className='summary'>
									<h5>Course Summary</h5>
									<div className='divider mt-2 mb-3'></div>
									<div className='row stat'>
										<div className='col-6 col-lg-12'>
											<p>Study level</p>
											<span>{course.course_type}</span>
										</div>
										<div className='col-6 col-lg-12'>
											<p>Discipline</p>
											<span>{course.discipline}</span>
										</div>
										<div className='col-6 col-lg-12'>
											<p>Cricos</p>
											<span>{course.cricos_code}</span>
										</div>
										<div className='col-6 col-lg-12'>
											<p>Duration</p>
											<span>{course.duration}</span>
										</div>
										<div className='col-6 col-lg-12'>
											<p>Study mode</p>
											<span>{course.study_mode}</span>
										</div>
										<div className='col-6 col-lg-12'>
											<p>Fee*</p>
											<span>{course.fee}</span>
										</div>
									</div>
								</div>
								<div className='stats mt-3'>
									<h5>University Summary</h5>
									<div className='divider mt-2 mb-3'></div>
									<p className='mt-4 list'>
										<GiChart size='22px' className='mr-2 icon' />
										AU Ranking: <span>{course.university.au_ranking || 0}</span>
									</p>
									<p className='list'>
										<GiChart size='22px' className='mr-2 icon' />
										QS Ranking: <span>{course.university.qs_ranking || 0}</span>
									</p>
									<p className='list'>
										<RiStarLine size='22px' className='mr-2 icon' /> Favourite:{' '}
										<span>{course.university.fav_count || 0}</span>
									</p>
									{course.university.rating &&
										course.university.rating.total > 0 && (
											<div className='rating mt-2'>
												<ReactStars
													count={5}
													value={
														course.university.rating.total /
														course.university.rating.count
													}
													size={20}
													edit={false}
													activeColor='#FFB300'
												/>
												{course.university.rating.count > 10 && (
													<span className='ml-3'>
														{course.university.rating.total /
															course.university.rating.count}{' '}
														({course.university.rating.count})
													</span>
												)}
											</div>
										)}
								</div>
							</div>
						</div>
					</div>
				</main>
			</Container>
			<Footer />
		</div>
	);
}

export async function getServerSideProps({ params, res, req }) {
	const { courseslug } = params;
	const courseRes = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/courses/?slug=${courseslug}`
	);
	const course = await courseRes.json();
	const bannersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners/`);
	const ads = await bannersRes.json().then((res) => res);
	// res.setHeader(
	// 	"Cache-Control",
	// 	"public, s-maxage=10, stale-while-revalidate=59"
	// );
	return {
		props: {
			course:
				course.results && course.results.length > 0 ? course.results[0] : [],
			ads,
		}, // will be passed to the page component as props
	};
}
