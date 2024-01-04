
import React from "react";
import { FaUniversity } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import { GiChart } from "react-icons/gi";
import Link from "next/link";
import { RiBookletLine } from "react-icons/ri";
import { AiOutlineMail, AiOutlinePhone, AiOutlinePushpin } from "react-icons/ai";

// import Moment from "react-moment";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from 'react-redux';

export const FeatureCard = ({ feature }) => {
	return (
		<div className='feature-card'>
			<span className='top-icon'>
				<FaUniversity size='40px' className='icon' />
			</span>
			<h3 className='mt-4'>{feature.title}</h3>
			<p>{feature.description}</p>
			{/* <button>
				Read More <BsArrowRight className="ml-4" size="20px" />
			</button> */}
		</div>
	);
};

export const UniversitiesCard = (props) => {
	return (
		<div className='universities-card' key={props.id}>
			<div className='image-rating'>
				<div className='image'>
					<Link legacyBehavior href={`/universities/${props.slug}`}>
						<img
							src={props.logo}
							width='auto'
							height='280px'
							alt={`${props.name} Logo`}
							title={`${props.name}`}
						/>
					</Link>
				</div>
				<div className='name-rating'>
					<div className='title'>
						<Link legacyBehavior href={`/universities/${props.slug}`}>
							<a title={`Read about ${props.name}`}>
								<h2>{props.name}</h2>
							</a>
						</Link>
					</div>
					{props.rating && props.rating.total > 0 && (
						<div className='rating'>
							<ReactStars
								count={5}
								value={props.rating.total / props.rating.count}
								size={20}
								edit={false}
								activeColor='#FFB300'
							/>
							<span className='ml-3'>
								{props.rating.total / props.rating.count} ({props.rating.count})
							</span>
						</div>
					)}
				</div>
			</div>

			<div className='body'>
				<div className='divider'></div>
				<div className='ranking'>
					<div className='box1 '>
						<GiChart className='icon' size='40px' />
						<div className='text '>
							<p>AU Ranking</p>
							<span>{props.au_ranking}</span>
						</div>
					</div>
					<div className='box2 ml-auto '>
						<GiChart className='icon' size='40px' />
						<div className='text '>
							<p>QS Ranking</p>
							<span>{props.qs_ranking}</span>
						</div>
					</div>
				</div>
				{props.course_type_count &&
				Object.keys(props.course_type_count).length > 0
					? Object.keys(props.course_type_count).map((c, i) => {
							return (
								<Link
									legacyBehavior
									href={`/universities/${
										props.slug
									}/courses/${c.toLowerCase()}`}
									key={i}
								>
									<a title={`${c} courses in ${props.name}`}>
										<p className='mt-4 list cursor-pointer'>
											<i className='bi bi-journals'></i> {c + ' '}
											courses: <span>{props.course_type_count[c]}</span>
										</p>
									</a>
								</Link>
							);
					  })
					: ''}
				{props.fav_count > 0 && (
					<p className='list'>
						<i className='bi bi-star'></i> Favourite:{' '}
						<span>{props.fav_count}</span>
					</p>
				)}
			</div>
		</div>
	);
};

export const BlogCard = (props) => {
	return (
		<div className='blog-card'>
			<div className='img'>
				<Link legacyBehavior href={`/blog/post/${props.slug}`}>
					<img
						src={props.image}
						width='auto'
						height='280px'
						alt={`${props.title} banner`}
						title={`${props.title}`}
					/>
				</Link>
			</div>
			<div className='body'>
				<div className='title'>
					<Link legacyBehavior href={`/blog/post/${props.slug}`}>
						<a title={`${props.title}`}>
							<h3>{props.title}</h3>
						</a>
					</Link>
				</div>
				<div className='box1 mt-3 '>
					<img
						src='/images/user.png'
						width='50px'
						heigh='auto'
						title={`${props.author}`}
						alt={`${props.author} Avatar`}
					/>
					<div className='text '>
						<p>{props.author}</p>
						<span>
							{/* <Moment format="D MMM YYYY" withTitle>
								{props.date}
							</Moment> */}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
export const AgentsCard = (props) => {
	const { isAuth, isLoading } = useSelector((state) => state.AuthReducer);
	const emailAddress = props.email.split('@').pop();
	return (
		<div className="blog-card">
			<div className="img">
				<img
					src={props.logo}
					width="auto"
					height="180px"
					title={`${props.name}`}
					alt={`${props.name}`}
				/>
			</div>
			<div className="body">
				<div className="box1 mt-3 ">
					<img
						src={props.profile}
						width='50px'
						heigh='50px'
						title={`${props.name}`}
						alt={`${props.name}`}
					/>
					<div className='text '>
						<h4>{props.fname + " " + props.lname}</h4>
						<span></span>
					</div>
				</div>
				<p className="mt-4 title">
					<a title={`${props.name}`}>{props.name}</a>
				</p>
				{props.address && (
					<p className="mt-4">
						<AiOutlinePushpin /> {props.address}
					</p>
				)}
				{props.email && (
					<p className='text-nowrap'>
						<AiOutlineMail /> {isAuth ? props.email : `xxxxxx@${emailAddress}`}
					</p>
				)}
				{props.phone && (
					<p className='text-nowrap'>
						<AiOutlinePhone />{' '}
						{isAuth ? props.phone : props.phone.slice(0, 3) + 'xxxxxxx'}
					</p>
				)}
			</div>
		</div>
	);
};

export const CommentCard = (props) => {
	return (
		<div className={`coment-box ${props.className}`}>
			<div className='detail'>
				<h5>{props.name}</h5>
				<p>{props.body}</p>
			</div>
			<img
				title={`${props.name}`}
				alt={`${props.name} avatar`}
				src={props.img}
				width='100px'
				height='100px'
			/>
		</div>
	);
};

export const CourseCard = (props) => {
	return (
		<div className='course-card'>
			<div style={{ display: 'flex' }}>
				<div className='image'>
					<Link
						legacyBehavior
						href={`/universities/${props.university_slug}/course/${props.slug}`}
					>
						<a title={`${props.university_name}`}>
							<img
								src={props.university_logo}
								title={`${props.university_name}`}
								alt={`${props.university_name} logo`}
							/>
						</a>
					</Link>
				</div>
				<div className='course-title'>
					<Link
						legacyBehavior
						title={`${props.name} in ${props.university_name}`}
						href={`/universities/${props.university_slug}/course/${props.slug}`}
					>
						<a title={`${props.name} in ${props.university_name}`}>
							<h2 className='mt-3'>{props.name}</h2>
						</a>
					</Link>
					<Link
						legacyBehavior
						title={`${props.university_name}`}
						href={`/universities/${props.university_slug}`}
					>
						<a title={`${props.name} in ${props.university_name}`}>
							<h3 className='univesity-name'>{props.university_name}</h3>
						</a>
					</Link>
				</div>
			</div>
			<div className='detail'>
				<div className='divider'></div>
				<div className='row stat'>
					<div className='col-12'>
						<p>Discipline</p>
						<span>{props.discipline}</span>
					</div>
					<div className='col-6'>
						<p>Study Level</p>
						<span>{props.course_type}</span>
					</div>
					<div className='col-6'>
						<p>Cricos</p>
						<span>{props.cricos_code}</span>
					</div>
					<div className='col-6'>
						<p>Duration</p>
						<span>{props.duration}</span>
					</div>
					<div className='col-6'>
						<p>Study mode</p>
						<span>{props.study_mode}</span>
					</div>
					{props.fee && (
						<div className='col-6'>
							<p>Fee*</p>
							<span>{props.fee}</span>
						</div>
					)}
				</div>
				<div className='divider'></div>
				<div className='row'>
					<div className='col-1'></div>
					<div className='col-5'>
						<div className='footer-btn'>
							<Link
								legacyBehavior
								href={`/universities/${props.university_slug}/course/${props.slug}`}
							>
								<a title={`${props.name} in ${props.university_name}`}>View</a>
							</Link>
						</div>
					</div>
					<div className='col-5'>
						<div className='footer-btn rbtn'>
							<Link
								legacyBehavior
								href={`/universities/${props.university_slug}/course/${props.slug}`}
							>
								<a
									className='save-a'
									title={`${props.name} in ${props.university_name}`}
								>
									<span className='save'>Save</span>
								</a>
							</Link>
						</div>
					</div>
					<div className='col-1'></div>
				</div>
			</div>
		</div>
	);
};

export const StatesCard = (props) => {
	return (
		<div className='states-card'>
			<Link legacyBehavior href={`/states/${props.slug}`}>
				<img
					src={props.banner}
					width='auto'
					height='280px'
					alt={`${props.name} Logo`}
					title={`${props.name}`}
				/>
			</Link>
			<div className='body'>
				<div className='title'>
					<Link
						legacyBehavior
						href={`/states/${props.slug}`}
						title={`View information and universities in ${props.name}`}
					>
						<h2 title={`View information and universities in ${props.name}`}>
							{props.name}
						</h2>
					</Link>
				</div>
			</div>
		</div>
	);
};
