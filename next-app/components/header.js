import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BsChevronLeft } from 'react-icons/bs';
import Sidebar from 'react-sidebar';
import { FiMenu } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { authenticate, logout } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { Container } from 'react-bootstrap-v5';
import { useRouter } from 'next/router';

const Navbar = (props) => {
	const [popup, setPopup] = useState(false);
	const popupRef = useRef(null);
	const router = useRouter();
	const dispatch = useDispatch();

	const logoutUser = async () => {
		const token = localStorage.getItem('token');

		if (token) {
			dispatch(logout(token));
		}
	};

	const { isAuth, isLoading } = useSelector((state) => state.AuthReducer);

	const getToken = async () => {
		if (!isAuth) {
			const token = localStorage.getItem('token');

			if (token) {
				dispatch(authenticate(token));
			}
		}
	};

	useEffect(() => {
		const handleClickOutSide = (event) => {
			if (!popupRef?.current?.contains(event.target)) {
				setPopup(false);
			}
		};

		document.addEventListener('click', handleClickOutSide);
		return () => {
			document.removeEventListener('click', handleClickOutSide);
		};
	}, [popupRef]);
	useEffect(() => {
		getToken();
	}, []);
	return (
		<>
			<div className='p-2 cnav '>
				<ul className={`nav nav-pills ${props.flex}`}>
					<li className={`nav-item ${router.route == '/' ? 'active-nav' : ''}`}>
						<Link legacyBehavior href='/'>
							<a title='SemesterOne'>Home</a>
						</Link>
					</li>
					<li
						className={`nav-item ${
							router.route == '/courses' ? 'active-nav' : ''
						}`}>
						<Link legacyBehavior href='/courses'>
							<a title='View all courses in Australia'>Courses</a>
						</Link>
					</li>
					<div className='custom_dropdown'>
						<a
							className={`nav-link ${
								router.route == '/universities' ? 'active-nav' : ''
							}`}
							title='View all states in Australia'>
							States <BsChevronLeft className='icon ml-2' />
						</a>
						<div className='dropdown-content'>
							{props.states.map((row) => (
								<li key={row.id} className='dropdown-item py-2'>
									<Link legacyBehavior href={`/states/${row.slug}`}>
										<a title={`View universities in ${row.name}`}>
											<span className='dropdown-link'>{row.name}</span>
										</a>
									</Link>
								</li>
							))}
							<hr className='my-0'></hr>
							<li className='dropdown-item'>
								<Link legacyBehavior href='/universities'>
									<a title='View all universities Australia'>
										<span className='dropdown-link font-weight-bold'>
											View all Universities
										</span>
									</a>
								</Link>
							</li>
						</div>
					</div>
					<li
						className={`nav-item ${
							router.route == '/blog' ? 'active-nav' : ''
						}`}>
						<Link legacyBehavior href='/blog'>
							<a title='View all blogs and course advices'>Blogs</a>
						</Link>
					</li>
					<li
						className={`nav-item ${
							router.route == '/agents' ? 'active-nav' : ''
						}`}>
						<Link legacyBehavior href='/agents'>
							<a title='View all agents'>Agents</a>
						</Link>
					</li>
					{/* <li
						className={`nav-item ${
							router.route == "/about" ? "active-nav" : ""
						}`}
					>
						<Link legacyBehavior href="/about">
							<a title="About SemesterOne">About</a>
						</Link>
					</li>
					<li
						className={`nav-item ${
							router.route == "/contact" ? "active-nav" : ""
						}`}
					>
						<Link legacyBehavior href="/contact">
							<a title="Contact SemesterOne">Contact</a>
						</Link>
					</li> */}
				</ul>
			</div>
			<div className={`p-2 rnav ${props.mt}`}>
				{isLoading ? (
					<div>
						<Skeleton height={30} width={60} />
						<Skeleton className='ml-3' height={30} width={60} />
					</div>
				) : (
					<>
						{isAuth ? (
							<div className='auth-bar'>
								<style jsx>
									{`
										.auth-bar {
											display: flex;
											gap: 0.7rem;
											align-items: center;
										}
										img {
											height: 20px;
										}
										a {
											text-decoration: none;
											cursor: pointer;
										}

										span {
											cursor: pointer;
										}

										img {
											width: 40px;
											height: 40px;
											border-radius: 50%;
										}
									`}
								</style>
								{/* <Link legacyBehavior href="/dashboard/saved">
									<span className="mr-2">
										<img src="/images/saved.png" alt="saved" />
									</span>
								</Link>

								<Link legacyBehavior href="/">
									<span className="mr-2">
										<img src="/images/notification.png" alt="notification" />
									</span>
								</Link> */}

								<div className='profile-image'>
									<span
										style={{ display: 'block' }}
										onClick={() => setPopup(!popup)}
										ref={popupRef}>
										<img src='/images/student1.jpg' alt='profile-icon' />
									</span>

									{popup ? (
										<div className='popup'>
											<ul>
												<li>
													{' '}
													<Link legacyBehavior href='/dashboard/profile'>
														<span className='mr-2'>Profile</span>
													</Link>
												</li>
												<li>
													{' '}
													<Link legacyBehavior href='/dashboard/saved'>
														<span className='mr-2'>Saved</span>
													</Link>
												</li>
												<li>
													{' '}
													<Link legacyBehavior href='/dashboard'>
														<span className='mr-2'>Dashboard</span>
													</Link>
												</li>
												<li>
													{' '}
													<a href='/' onClick={logoutUser} className='ml-2'>
														<span className='mr-2'>Logout</span>
													</a>
												</li>
											</ul>
										</div>
									) : null}
								</div>
							</div>
						) : (
							<div className='auth-btns'>
								<Link legacyBehavior href='/login/'>
									<a className='mr-2 auth'>Login</a>
								</Link>
								<span>or</span>
								<Link legacyBehavior href='/register/student/'>
									<a className='ml-2 auth'>Register</a>
								</Link>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
};

const Header = () => {
	const [states, setStates] = useState([]);
	const [isSidebar, setisSidebar] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const changeSidebar = () => {
		if (isSidebar == true) {
			setisSidebar(false);
		} else {
			setisSidebar(true);
		}
	};

	const fetchStates = async () => {
		try {
			setisLoading(true);
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/states/`);
			const states_res = await res.json();
			setStates(states_res);
			setisLoading(false);
		} catch (error) {
			setisLoading(false);
			console.log(error);
		}
	};
	useEffect(() => {
		fetchStates();
	}, []);
	return (
		<nav>
			<div className='d-flex justify-content-between header'>
				<Container>
					<div className='d-flex justify-content-between align-items-center'>
						<div className='p-2 logo'>
							<Link legacyBehavior href='/'>
								<img
									src='/images/semesterone-logo.png'
									height='auto'
									width='80px'
									alt='semesterOne Logo'
									title='SemesterOne'
								/>
							</Link>
						</div>
						<Navbar states={states} flex='' />
						<div className='p-2 menu-btn'>
							<FiMenu onClick={changeSidebar} size='25px' className='icon' />
						</div>
					</div>
				</Container>
			</div>
			{isSidebar && (
				<Sidebar
					sidebar={
						<div className='sidebar'>
							<Navbar states={states} flex='flex-column' mt='mt-auto' />
						</div>
					}
					open={isSidebar}
					children={''}
					onSetOpen={() => changeSidebar()}
					pullRight={true}
					styles={{
						sidebar: { background: 'white', maxWidth: '320px', width: '100%' },
					}}></Sidebar>
			)}
		</nav>
	);
};

export default Header;
