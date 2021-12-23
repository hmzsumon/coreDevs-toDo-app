import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import NavbarAdmin from './NavbarAdmin.js';
import FooterAdmin from './FooterAdmin';

import { useAlert } from 'react-alert';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
	clearErrors,
	getSubscriptions,
	deleteSubscription,
} from '../../actions/subscriptionAction';
import Loader from '../layout/Loader/Loader';

import { DELETE_SUBSCRIPTION_RESET } from '../../constants/subscriptionConstants';

const SubscriptionList = () => {
	const dispatch = useDispatch();

	const alert = useAlert();
	const history = useHistory();

	const { error, loading, subscriptions } = useSelector(
		(state) => state.subscriptions
	);

	const { deleteError, isDeleted } = useSelector(
		(state) => state.deleteScription
	);

	// product delete handler
	const deleteProductHandler = (id) => {
		if (window.confirm('Are you sure to delete?')) {
			dispatch(deleteSubscription(id));
		}
		if (isDeleted) {
			alert.success('Subscription Deleted Successfully');
			// history.push('/admin/dashboard');
			dispatch({ type: DELETE_SUBSCRIPTION_RESET });
		}
	};

	useEffect(() => {
		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}

		dispatch(getSubscriptions());
	}, [dispatch, deleteError, error, isDeleted, history, alert]);

	// icons for the sidebar
	const productsIcon = (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='w-5 h-5 mr-2 text-sm opacity-75'
			viewBox='0 0 20 20'
			fill='currentColor'
		>
			<path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' />
		</svg>
	);
	return (
		<div className='w-screen h-screen md:flex'>
			<div className='bg-red-500 md:w-64'>
				<Sidebar />
			</div>
			<div className=' md:flex-1'>
				<NavbarAdmin title={'Products'} icon={productsIcon} />
				<div className='px-1 mt-10 min-h-auto'>
					{loading ? (
						<Loader />
					) : (
						<>
							<table className='block min-w-full border-collapse md:table'>
								<thead className='block md:table-header-group'>
									<tr className='absolute block border border-grey-500 md:border-none md:table-row -top-full md:top-auto -left-full md:left-auto md:relative '>
										<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
											Id
										</th>
										<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
											Title
										</th>
										<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
											Price
										</th>
										<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
											Note Limit
										</th>
										<th className='block p-2 font-bold text-left text-white bg-gray-600 md:text-center md:border md:border-grey-500 md:table-cell'>
											Actions
										</th>
									</tr>
								</thead>
								<tbody className='block md:table-row-group'>
									{subscriptions &&
										subscriptions.map((sub) => (
											<tr
												key={sub._id}
												className='block bg-gray-300 border border-grey-500 md:border-none md:table-row'
											>
												<td className='block px-1 py-2 text-left md:border md:border-grey-500 md:table-cell'>
													<span className='inline-block w-1/3 font-bold md:hidden'>
														Id
													</span>
													{sub._id}
												</td>
												<td className='block px-1 py-2 text-left md:border md:border-grey-500 md:table-cell'>
													<span className='inline-block w-1/3 font-bold md:hidden'>
														Title
													</span>
													{sub.title}
												</td>
												<td className='block p-2 text-left md:border md:border-grey-500 md:table-cell'>
													<span className='inline-block w-1/3 font-bold md:hidden'>
														Price
													</span>
													${sub.price}
												</td>
												<td className='block p-2 text-left md:border md:border-grey-500 md:table-cell'>
													<span className='inline-block w-1/3 font-bold md:hidden'>
														Note Limit
													</span>
													{sub.noteLimit}
												</td>
												<td className='block text-left md:text-center md:border md:border-grey-500 md:table-cell'>
													<span className='inline-block w-1/3 font-bold md:hidden'>
														Actions
													</span>
													<Link to={`/admin/update-subscription/${sub._id}`}>
														<button className='px-2 py-1 mr-1 font-bold text-white bg-blue-500 border border-blue-500 rounded hover:bg-blue-700'>
															Edit
														</button>
													</Link>
													<button
														className='px-2 py-1 font-bold text-white bg-red-500 border border-red-500 rounded hover:bg-red-700'
														onClick={() => deleteProductHandler(sub._id)}
													>
														Delete
													</button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</>
					)}
				</div>
				<FooterAdmin />
			</div>
		</div>
	);
};

export default SubscriptionList;
