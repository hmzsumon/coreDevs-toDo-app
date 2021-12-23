import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Header/Navbar';

const Orders = () => {
	return (
		<>
			<Navbar />
			<div className='flex flex-col items-center justify-center h-96'>
				<h1 className='mb-3 text-3xl font-medium text-gray-800 capitalize'>
					this page not cooked yet
				</h1>
				<Link to='/' className='text-blue-500'>
					<h1 className='capitalize text-md'> &#8592; go back to home</h1>
				</Link>
			</div>
		</>
	);
};

export default Orders;
