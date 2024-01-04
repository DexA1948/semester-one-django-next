import React from 'react';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { AgentsCard } from '../../components/home/cards';
import { Container } from 'react-bootstrap-v5';

export default function Agents({ agents }) {
	return (
		<div className='index'>
			<Head>
				<title>Agents | SemesterOne</title>
				<meta
					name='description'
					content='List of all the universities and their coursers in Australia. There are 43 universities in Australia. Take a look today! - SemesterOne'
				/>
				<meta
					data-rh='true'
					property='og:title'
					content='List of universities in Australia | SemesterOne'
				/>
				<meta
					data-rh='true'
					property='og:description'
					content='List of all the universities and their coursers in Australia. There are 43 universities in Australia. Take a look today! - SemesterOne'
				/>
				<link
					rel='canonical'
					href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/agents/`}
				></link>
			</Head>
			<Header />
			<Container>
				<main className='home'>
					<div className='universities-sec mt-5'>
						<div className='top-heading'>
							<h2>Agents</h2>
						</div>
						<div className='row mt-3'>
							{agents.map((row) => (
								<div key={row.id} className='col-lg-4 col-md-6 mt-4'>
									<AgentsCard
										profile={row.user.avatar || "/images/user.png"}
										fname={row.user.first_name || 'No'}
										lname={row.user.last_name || 'Name'}
										phone={row.phone_number || ''}
										name={row.agency !== null ? row.agency.name : ""}
										logo={row.agency !== null ? row.agency.logo : ""}
										address={row.address || ''}
										email={row.email || ''}
									/>
								</div>
							))}
						</div>
					</div>
				</main>
			</Container>
			<Footer />
		</div>
	);
}

export async function getServerSideProps({ req, res }) {
	const resAgentProfile = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/agent_profile/`
	);
	const agents = await resAgentProfile.json();
	// res.setHeader(
	// 	"Cache-Control",
	// 	"public, s-maxage=10, stale-while-revalidate=59"
	// );
	return {
		props: { agents }, // will be passed to the page component as props
	};
}
