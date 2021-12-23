import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData.js';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Header/Navbar';
const Profile = ({ history }) => {
	const { user, loading, isAuthenticated } = useSelector((state) => state.user);

	useEffect(() => {
		if (isAuthenticated === false) {
			history.push('/login');
		}
	}, [history, isAuthenticated]);
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={`${user.name}'s Profile`} />
					<Navbar />
					<div className='p-2  flex flex-col md:flex-row md:justify-evenly items-center h-screen'>
						<div className='flex flex-col md:justify-evenly h-full'>
							<h1 className='my-8 text-center md:text-2xl font-medium'>
								{user.name}'s Profile
							</h1>
							<img
								src={user.avatar.url}
								alt={user.name}
								className='md:w-full'
							/>
							<Link
								to='/me/update'
								className=' bg-green-500 w-full hover:bg-green-700 py-2 block rounded my-10 text-center text-white font-medium'
							>
								Edit Profile
							</Link>
						</div>
						<div className='flex flex-col md:justify-evenly h-full'>
							<div className='flex justify-between md:flex-col '>
								<h4 className='font-medium md:text-2xl mr-1'>Full Name</h4>
								<p className='font-light md:text-2xl'>{user.name}</p>
							</div>
							<div className='flex justify-between md:flex-col '>
								<h4 className='font-medium md:text-2xl mr-2'>Email</h4>
								<p className='font-light md:text-2xl'>{user.email}</p>
							</div>
							<div className='flex justify-between md:flex-col '>
								<h4 className='font-medium md:text-2xl mr-2'>Joined On</h4>
								<p className='font-light md:text-2xl'>
									{String(user.createdAt).substr(0, 10)}
								</p>
							</div>

							<div className='flex flex-col justify-center items-center mt-5'>
								<Link
									to='/orders'
									className='bg-gray-700 text-white max-w-md w-full text-center font-medium mb-3 py-1'
								>
									My Orders
								</Link>
								<Link
									to='/password/update'
									className='bg-gray-700 text-white max-w-md w-full text-center font-medium py-1'
								>
									Change Password
								</Link>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Profile;
