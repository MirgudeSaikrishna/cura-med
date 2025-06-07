import React from 'react';
import { useNavigate } from 'react-router-dom';
import medicineImg from '../assets/medicine.svg'; // Adjust the path if needed

const features = [
	{
		title: 'Find Providers',
		desc: 'Locate trusted medical providers near you with ease.',
		icon: (
			<svg
				className="h-10 w-10 text-blue-500 mb-2"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
		),
	},
	{
		title: 'Shop Products',
		desc: 'Browse products and contact medical providers securely.',
		icon: (
			<svg
				className="h-10 w-10 text-green-500 mb-2"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6h10v7"
				/>
			</svg>
		),
	},
	{
		title: 'Easy Registration',
		desc: 'Sign up as a patient or provider in just a few steps.',
		icon: (
			<svg
				className="h-10 w-10 text-purple-500 mb-2"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
				/>
			</svg>
		),
	},
	{
		title: 'Secure & Trusted',
		desc: 'Your data and transactions are protected at every step.',
		icon: (
			<svg
				className="h-10 w-10 text-teal-500 mb-2"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 11c1.657 0 3-1.343 3-3V5a3 3 0 10-6 0v3c0 1.657 1.343 3 3 3z"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"
				/>
			</svg>
		),
	},
];

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-white">
			{/* Hero Section */}
			<div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
				<div className="flex-1 text-center md:text-left">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
						Welcome to Cura-Med
					</h1>
					<p className="text-xl md:text-2xl text-gray-700 mb-8">
						Your complete healthcare companion. Discover providers, shop medical
						products, and manage your health—all in one place.
					</p>
					<button
						onClick={() => navigate('/home')}
						className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-xl font-semibold group"
					>
						<span className="mr-2">Get Started</span>
						<svg
							className="h-6 w-6 group-hover:translate-x-1 transition-transform"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</button>
				</div>
				<div className="flex-1 flex justify-center">
					<img
						src={medicineImg}
						alt="Healthcare illustration"
						className="rounded-3xl shadow-2xl w-full max-w-md object-cover bg-white p-4"
					/>
				</div>
			</div>

			{/* Features Section */}
			<div className="max-w-6xl mx-auto px-6 py-12">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
					Why Choose Cura-Med?
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					{features.map((feature, idx) => (
						<div
							key={idx}
							className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
						>
							{feature.icon}
							<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
							<p className="text-gray-600">{feature.desc}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;