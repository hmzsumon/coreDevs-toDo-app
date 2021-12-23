import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData';
import FooterAdmin from './FooterAdmin';
import NavbarAdmin from './NavbarAdmin';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions } from '../../actions/subscriptionAction';

import { getAllUsers } from '../../actions/userAction';

const EditProduct = () => {
	const dispatch = useDispatch();
	const { subscriptions } = useSelector((state) => state.subscriptions);
	const { users } = useSelector((state) => state.allUsers);

	useEffect(() => {
		dispatch(getSubscriptions());
		dispatch(getAllUsers());
	}, [dispatch]);

	return (
		<>
			<MetaData title={'Admin Dashboard'} />
			<div className='w-screen h-screen bg-gray-100 md:flex'>
				<div className='bg-red-500 md:w-64'>
					<Sidebar />
				</div>
				<div className=' md:flex-1'>
					<NavbarAdmin />

					<div className='px-1 mt-10 h-96 md:flex min-h-auto'>
						<div className='w-full px-4 lg:w-6/12 xl:w-3/12'>
							<div className='relative flex flex-col min-w-0 mb-6 break-words bg-white rounded shadow-lg xl:mb-0'>
								<div className='flex-auto p-4'>
									<div className='flex flex-wrap'>
										<div className='relative flex-1 flex-grow w-full max-w-full pr-4'>
											<h5 className='text-xs font-bold uppercase text-blueGray-400'>
												Subscriptions
											</h5>
											<span className='text-xl font-semibold text-blueGray-700'></span>
										</div>
										<div className='relative flex-initial w-auto pl-4'>
											<div className='inline-flex items-center justify-center w-12 h-12 p-3 text-center text-white bg-red-500 rounded-full shadow-lg'>
												<i className='far fa-chart-bar'></i>
											</div>
										</div>
									</div>
									<p className='mt-4 text-sm text-blueGray-400'>
										{subscriptions ? subscriptions.length : 0} Subscriptions{' '}
									</p>
									<p>
										<span className='whitespace-nowrap'>Since last month</span>
									</p>
								</div>
							</div>
						</div>

						<div className='w-full px-4 lg:w-6/12 xl:w-3/12'>
							<div className='relative flex flex-col min-w-0 mb-6 break-words bg-white rounded shadow-lg xl:mb-0'>
								<div className='flex-auto p-4'>
									<div className='flex flex-wrap'>
										<div className='relative flex-1 flex-grow w-full max-w-full pr-4'>
											<h5 className='text-xs font-bold uppercase text-blueGray-400'>
												Users
											</h5>
											<span className='text-xl font-semibold text-blueGray-700'></span>
										</div>
										<div className='relative flex-initial w-auto pl-4'>
											<div className='inline-flex items-center justify-center w-12 h-12 p-3 text-center text-white bg-green-500 rounded-full shadow-lg'>
												<i className='far fa-chart-bar'></i>
											</div>
										</div>
									</div>
									<div className='mt-4 text-sm text-blueGray-400'>
										<p>{users ? users.length : 0} Users </p>
										<span className='whitespace-nowrap'>Since last month</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<FooterAdmin />
				</div>
			</div>
		</>
	);
};

export default EditProduct;
