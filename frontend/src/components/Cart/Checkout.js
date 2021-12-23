/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Header/Navbar';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import PayPalButton from './PayPalButton';
import {
	clearErrors,
	getSubscriptionDetails,
} from '../../actions/subscriptionAction';

const Checkout = () => {
	const history = useHistory();
	const match = useRouteMatch();
	const subscriptionId = match.params.id;

	const dispatch = useDispatch();

	const { loading, error, subscription } = useSelector(
		(state) => state.subscriptionDetails
	);

	const [subPackage, setSubPackage] = useState({
		noteLimit: 0,
		category: '',
	});

	useEffect(() => {
		if (error) {
			console.log(error);
			dispatch(clearErrors());
		}

		dispatch(getSubscriptionDetails(subscriptionId));
	}, [dispatch, error, subscriptionId]);

	useEffect(() => {
		if (subscription) {
			setSubPackage({
				noteLimit: subscription.noteLimit,
				category: subscription.category,
			});
			localStorage.setItem('subPackage', JSON.stringify(subPackage));
		}
	}, [subscription]);

	return (
		<>
			<Navbar />
			{loading ? (
				<Loader />
			) : (
				<div className='flex flex-col items-center justify-center h-96'>
					{subscription && (
						<div className='flex flex-col items-center justify-center p-6 space-y-4 bg-white rounded-md'>
							<h2 className='text-2xl font-medium text-center text-gray-800'>
								{subscription.title}
							</h2>
							<div className='space-y-8 '>
								<p className='text-center text-gray-700'>
									{subscription.description}
								</p>
								<div className='flex justify-around'>
									<p className='font-medium text-center text-gray-700'>
										Notes Limit: {subscription.noteLimit}
									</p>
									<p className='font-medium text-center text-gray-700'>
										{' '}
										Price: ${subscription.price}
									</p>
								</div>
							</div>
							{subscription.category === 'Free' ? (
								<Link to='/dashboard'>
									<button className='py-2 font-medium text-gray-800 bg-green-500 rounded-md text-md px-7'>
										Click Me & Go to Dashboard
									</button>
								</Link>
							) : (
								<PayPalButton
									totalAmount={subscription.price}
									history={history}
								/>
							)}
						</div>
					)}
					<Link to='/' className='mt-10 text-blue-500'>
						<h1 className='capitalize text-md'> &#8592; go back to home</h1>
					</Link>
				</div>
			)}
		</>
	);
};

export default Checkout;
