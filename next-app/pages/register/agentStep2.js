import React, { useState } from "react";
import Head from "next/head";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Container, Alert } from "react-bootstrap-v5";
import axios from "axios";
import { Store } from "react-notifications-component";
import Select from "react-select";

const AgentStep2 = ({
	first_name,
	setFirst_name,
	last_name,
	setLast_name,
	country_of_residence,
	setCountry_of_residence,
	mobile_number,
	setMobile_number,
	address,
	setAddress,
	type,
	setType,
	selectedAgency,
	setSelectedAgency,
	profile_image,
	selectedProfileImage,
	countries,
	isLoading,
	agentProfileReg,
	agencyOptions,
	setAgency_id,
	agency_id,
}) => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (first_name === "") {
			Store.addNotification({
				message: "Please enter first name!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else if (last_name === "") {
			Store.addNotification({
				message: "Please enter last name!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else if (country_of_residence === "") {
			Store.addNotification({
				message: "Please select country!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else if (mobile_number === "") {
			Store.addNotification({
				message: "Please enter mobile number!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else if (type === "") {
			Store.addNotification({
				message: "Please select agency type!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else if (agency_id === "") {
			Store.addNotification({
				message: "Please select agency!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else {
			agentProfileReg();
		}
	};
	const agentTypes = [
		{
			id: "1",
			label: "Education",
			slug: "1",
		},
		{
			id: "2",
			label: "Migration",
			slug: "2",
		},
		{
			id: "3",
			label: "Both",
			slug: "3",
		},
	];

	const customStyles = {
		control: (base) => ({
			...base,
			height: 46,
			minHeight: 35,
		}),
	};

	// const onFileChange = (event) => {
	// 	debugger;
	// 	// Update the state file
	// 	selectedProfileImage(event.target.files[0]);
	// };
	return (
		<form onSubmit={handleSubmit}>
			<div className="input-area mt-4">
				<input
					type="text"
					placeholder="First name"
					id="first_name"
					value={first_name}
					onChange={(e) => setFirst_name(e.target.value)}
				/>
			</div>
			<div className="input-area mt-4">
				<input
					type="text"
					placeholder="Last name"
					id="last_name"
					value={last_name}
					onChange={(e) => setLast_name(e.target.value)}
				/>
			</div>
			<div className="input-area mt-4 select-fields">
				<Select
					className="w-100"
					options={countries}
					isClearable
					placeholder="Select country residence"
					onChange={(e) => setCountry_of_residence(e)}
					styles={customStyles}
				/>
			</div>
			<div className="input-area mt-4">
				<input
					type="text"
					placeholder="Mobile number"
					id="mobile_number"
					value={mobile_number}
					onChange={(e) => setMobile_number(e.target.value)}
				/>
			</div>
			<div className="input-area mt-4">
				<input
					type="text"
					placeholder="Address"
					id="address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
			</div>
			{/* <div className="input-area mt-4">
				<label>Profile Picture</label>
				<input
					type="file"
					placeholder="Profile image"
					label="Profile Avatar"
					id="profile_image"
					onChange={onFileChange}
				/>
			</div> */}
			<div className="input-area mt-4 select-fields">
				<Select
					className="w-100"
					options={agentTypes}
					isClearable
					placeholder="Select agent type"
					onChange={(e) => setType(e)}
					styles={customStyles}
				/>
			</div>
			<div className="input-area mt-4 select-fields">
				<Select
					className="w-100"
					options={agencyOptions}
					isClearable
					placeholder="Select agency"
					onChange={(e) => setAgency_id(e)}
					styles={customStyles}
				/>
			</div>
			{isLoading ? (
				<button type="submit" disabled className="disabled submit-btn mt-4">
					<span className="spinner-border spinner-border-sm"></span>
				</button>
			) : (
				<button type="submit" className="submit-btn mt-4">
					Register
				</button>
			)}
		</form>
	);
};

export default AgentStep2;
