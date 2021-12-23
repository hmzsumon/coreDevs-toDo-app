/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import SubscriptionCard from './SubscriptionCard';

import {
	clearErrors,
	getSubscriptions,
} from '../../actions/subscriptionAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import Navbar from '../../components/Header/Navbar';

import MetaData from '../layout/MetaData';

const Home = ({ match }) => {
	const dispatch = useDispatch();

	const { loading, error, subscriptions } = useSelector(
		(state) => state.subscriptions
	);

	useEffect(() => {
		if (error) {
			console.log(error);
			dispatch(clearErrors());
		}
		dispatch(getSubscriptions());
	}, [dispatch, error]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div>
					<MetaData title={'Home'} />
					<Navbar />
					<h1 className='my-16 text-3xl font-bold text-center text-gray-800 '>
						Welcome To Our TO-DO App
					</h1>
					<div className='grid grid-cols-1 gap-8 px-10 py-10 md:grid-cols-3 '>
						{subscriptions &&
							subscriptions.map((subscription) => (
								<SubscriptionCard
									subscription={subscription}
									key={subscription._id}
								/>
							))}
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
