import React from 'react';
import { useHistory } from 'react-router-dom';

const SubscriptionCard = ({ subscription }) => {
	const history = useHistory();
	const checkoutHandler = (id) => {
		history.push(`/login?redirect=checkout/${id}`);
	};
	return (
		<div>
			<div className='flex flex-col p-6 space-y-4 bg-white rounded-md'>
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
				<button
					className='py-2 font-medium text-gray-800 bg-green-500 rounded-md text-md px-7'
					onClick={() => checkoutHandler(subscription._id)}
				>
					{subscription.title}
				</button>
			</div>
		</div>
	);
};

export default SubscriptionCard;
