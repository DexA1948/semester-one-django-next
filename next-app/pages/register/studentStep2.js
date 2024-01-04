import React, { useState } from "react";
import Head from "next/head";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Container, Alert } from "react-bootstrap-v5";
import axios from "axios";
import { Store } from "react-notifications-component";
import Select from "react-select";

const StudentStep2 = ({
	first_name,
	setFirst_name,
	last_name,
	setLast_name,
	country_of_residence,
	setCountry_of_residence,
	mobile_number,
	setMobile_number,
	study_destination,
	setStudy_destination,
	study_level,
	setStudy_level,
	countries,
	studyLevels,
	studentReg,
	universities,
	setUnivesities,
	disciplines,
	setDisciplines,
	isLoading,
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
		} else if (disciplines === "") {
			Store.addNotification({
				message: "Please select a discipline!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else if (study_level === "") {
			Store.addNotification({
				message: "Please select study level!",
				type: "danger",
				insert: "top",
				container: "top-right",
				dismiss: {
					duration: 3000,
					onScreen: true,
				},
			});
		} else {
			studentReg();
		}
	};
	const studyDestinations = [
		{
			id: "AU",
			label: "Australia",
			slug: "australia",
		},
	];

	const customStyles = {
		control: (base) => ({
			...base,
			height: 46,
			minHeight: 35,
		}),
	};

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
			<div className="input-area mt-4">
				<input
					type="text"
					required
					placeholder="Mobile number"
					id="mobile_number"
					value={mobile_number}
					onChange={(e) => setMobile_number(e.target.value)}
				/>
			</div>
			<div className="input-area mt-4 select-fields">
				<Select
					className="w-100"
					options={countries}
					isClearable
					placeholder="Select country of residence"
					onChange={(e) => setCountry_of_residence(e)}
					styles={customStyles}
				/>
			</div>
			{/* <div className="input-area mt-4 select-fields">
				<Select
					className="w-100"
					options={countries}
					isClearable
					placeholder="Select study destination"
					onChange={(e) => setStudy_destination(e)}
					styles={customStyles}
				/>
			</div> */}
			<div className="input-area mt-4 select-fields">
				<Select
					className="w-100"
					options={studyLevels}
					isClearable
					placeholder="Select study level"
					onChange={(e) => setStudy_level(e)}
					styles={customStyles}
				/>
			</div>
			<div className="input-area mt-4 select-fields">
				<Select
					className="w-100"
					options={disciplines}
					isClearable
					placeholder="Select discipline"
					onChange={(e) => setDisciplines(e)}
					styles={customStyles}
				/>
			</div>
			<div className="input-area mt-4 select-fields">
				<Select
					className="w-100"
					options={universities}
					isClearable
					placeholder="Select university"
					onChange={(e) => setUnivesities(e)}
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

export default StudentStep2;
