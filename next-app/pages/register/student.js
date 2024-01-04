import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import { Store } from 'react-notifications-component';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { Container, Alert } from 'react-bootstrap-v5';
import { axios } from '../../helpers';
import StudentStep2 from './studentStep2';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { DataServices } from '../../services/dataServices';
import { getOptions } from '../../utils';
import { useDispatch } from 'react-redux';
import { LOGINUSER } from './../../redux/constants';

const dataServices = new DataServices();

const Register = () => {
	const dispatch = useDispatch();
	const [passwordType, setpasswordType] = useState('password');
	const [showAlert, setshowAlert] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [emailfverify, setemailfverify] = useState('');
	const [first_name, setFirst_name] = useState('');
	const [last_name, setLast_name] = useState('');
	const [country_of_residence, setCountry_of_residence] = useState('');
	const [mobile_number, setMobile_number] = useState('');
	const [study_destination, setStudy_destination] = useState('');
	const [study_level, setStudy_level] = useState('');
	const [formStep, setFormStep] = useState('1');
	const [countries, setCountries] = useState([]);
	const [studyLevels, setStudyLevels] = useState([]);
	const [universities, setUnivesities] = useState([]);
	const [disciplines, setDisciplines] = useState([]);
	const [state, setstate] = useState({
		email: '',
		password: '',
		retypePassword: '',
	});

	const changePasswordType = () => {
		if (passwordType === 'password') {
			setpasswordType('text');
		} else {
			setpasswordType('password');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (state.password !== state.retypePassword) {
			Store.addNotification({
				message: 'Password not same!',
				type: 'danger',
				insert: 'top',
				container: 'top-right',
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else if (state.password.length < 6) {
			Store.addNotification({
				message: 'Password Length must b greater than 5 digits!',
				type: 'danger',
				insert: 'top',
				container: 'top-right',
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
		const data = {
			email: state.email,
			password: state.password,
		};
		try {
			const res = await axios.post(`/student_user/`, data);
			const regRes = res.data;
			setFormStep('2');
			setshowAlert(true);
			setemailfverify(state.email);
			if (res.data !== undefined) {
				console.log(res.data);
				const config = {
					headers: {
						'Content-Type': 'application/json',
					},
				};
				try {
					console.log(data);
					const res = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
						data,
						config
					);
					if (res.data !== 'undefined') {
						localStorage.setItem('token', res.data.token);
						localStorage.setItem('user_id', res.data.user.id);
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
					message: err.response.data.email,
					type: 'danger',
					insert: 'top',
					container: 'top-right',
					dismiss: {
						duration: 6000,
						onScreen: true,
					},
				});
			}
			setisLoading(false);
		}
	};

	const studentReg = async () => {
		setisLoading(true);
		const user_data = {
			first_name: first_name,
			last_name: last_name,
			id: localStorage.getItem('user_id'),
		};
		const data = {
			first_name: first_name,
			last_name: last_name,
			country_of_residence: country_of_residence.id,
			mobile_number: mobile_number,
			study_destination: 'AU',
			study_level: study_level.id,
			university: universities.id || 1,
			study_discipline: disciplines.id || 2,
			user: user_data,
		};
		// Get token from local storage
		const token = localStorage.getItem('token');

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Token ${token}`, // add token to Authorization header
				},
			};
			const res = await axios.post('/student_profile/', data, config);
			const profile = res.data;
			localStorage.setItem('user_profile', JSON.stringify(profile));
			Store.addNotification({
				message: 'Profile update successfully!',
				type: 'success',
				insert: 'top',
				container: 'top-right',
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});

			setshowAlert(true);
			setemailfverify(state.email);
			setstate({ email: '', password: '', retypePassword: '' });
			router.push('/dashboard');
		} catch (err) {
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
			setisLoading(false);
		}
	};

	React.useEffect(() => {
		const fetcher = async () => {
			const countries = await dataServices.getCountries();
			const coursestype = await dataServices.getCoursesTypes();
			const universities = await dataServices.getUniversities();
			const disciplines = await dataServices.getDisciplines();

			setCountries(getOptions(countries.data, true));
			setStudyLevels(getOptions(coursestype.data));
			setUnivesities(getOptions(universities.data.results));
			setDisciplines(getOptions(disciplines.data));
		};

		if (formStep === '2') {
			fetcher();
		}
	}, [formStep]);

	// console.log(countries);
	// console.log(studyLevels);
	// console.log(universities);
	// console.log(disciplines);

	return (
		<div className='index'>
			<Head>
				<title>Student Register - SemesterOne</title>
				<meta
					name='description'
					content='Register with SemesterOne and get updated with the universities and their courses in Australia.'
				/>
				<meta
					data-rh='true'
					property='og:title'
					content='Student Register - SemesterOne'
				/>
				<meta
					data-rh='true'
					property='og:description'
					content='Register with SemesterOne and get updated with the universities and their courses in Australia.'
				/>

				<link
					rel='canonical'
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/register/student`}
				></link>
			</Head>
			<Header />
			<Container>
				<main className='auth mt-5'>
					<div className='row'>
						<div className='col-lg-7'>
							<div className='auth-img'>
								<img
									src='/images/register_student.svg'
									width='100%'
									height='auto'
								/>
							</div>
							<div className='rl-box mt-3'>
								<h5>For Education Agents</h5>
								<p>
									With access to 40+ universities and 3600+ courses from
									Australia, you can help your students find their dream
									courses.
								</p>
								<Link
									legacyBehavior
									href='/register/agent/'
									title='Register as a recruitment Partners - SemesterOne'
								>
									<a title='Register as a recruitment Partners - SemesterOne'>
										Register as an agent
									</a>
								</Link>
							</div>
						</div>
						<div className='col-lg-5 auth-form'>
							{formStep === '1' ? (
								<h5>Register as a student</h5>
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
							{formStep === '1' ? (
								<form onSubmit={handleSubmit}>
									<div className='input-area mt-4'>
										<input
											type='email'
											required
											placeholder='Email Address'
											id='email'
											value={state.email}
											onChange={(e) =>
												setstate({ ...state, email: e.target.value })
											}
										/>
									</div>
									<div className='input-area mt-4'>
										<input
											type={passwordType}
											required
											placeholder='Password'
											id='pwd'
											value={state.password}
											onChange={(e) =>
												setstate({ ...state, password: e.target.value })
											}
										/>
										{passwordType === 'password' ? (
											<BsEye
												onClick={changePasswordType}
												className='icon'
												size='20px'
											/>
										) : (
											<BsEyeSlash
												onClick={changePasswordType}
												className='icon'
												size='20px'
											/>
										)}
									</div>
									<div className='input-area mt-4'>
										<input
											type={passwordType}
											required
											placeholder='Confirm Password'
											id='confirmpwd'
											value={state.retypePassword}
											onChange={(e) =>
												setstate({ ...state, retypePassword: e.target.value })
											}
										/>
										{passwordType === 'password' ? (
											<BsEye
												onClick={changePasswordType}
												className='icon'
												size='20px'
											/>
										) : (
											<BsEyeSlash
												onClick={changePasswordType}
												className='icon'
												size='20px'
											/>
										)}
									</div>
									{isLoading ? (
										<button
											type='submit'
											disabled
											className='disabled submit-btn mt-4'
										>
											<span className='spinner-border spinner-border-sm'></span>
										</button>
									) : (
										<button type='submit' className='submit-btn mt-4'>
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
									universities={universities}
									setUnivesities={setUnivesities}
									disciplines={disciplines}
									setDisciplines={setDisciplines}
									studentReg={studentReg}
									isLoading={isLoading}
								/>
							)}
							<div className='divider'>
								<div className='line'></div>
								<span className='ml-2 mr-2'>or</span>
								<div className='line'></div>
							</div>
							<div className='social-btns'>
								<button className='fb'>
									<FaFacebookF size='17px' className='mr-3 icon' /> facebook
								</button>
								<button className='ml-3 gg'>
									<FaGoogle size='17px' className='mr-3 icon' /> Google
								</button>
							</div>
							<div className='bottom'>
								<span>
									Already have a account:{' '}
									<Link
										legacyBehavior
										href='/auth/login'
										title='Login - SemesterOne'
									>
										<a title='Login - SemesterOne'>Login</a>
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
