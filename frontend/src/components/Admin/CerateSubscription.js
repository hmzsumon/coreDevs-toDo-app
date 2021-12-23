import React from 'react';
import FooterAdmin from './FooterAdmin';
import NavbarAdmin from './NavbarAdmin';
import Form from './Form';
import Sidebar from './Sidebar';

const CreateSubscription = () => {
	const icon = (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='w-5 h-5 mr-2 text-sm text-blueGray-400'
			viewBox='0 0 20 20'
			fill='currentColor'
		>
			<path
				fillRule='evenodd'
				d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
				clipRule='evenodd'
			/>
		</svg>
	);
	return (
		<div className='w-screen h-screen md:flex'>
			<div className='bg-red-500 md:w-64'>
				<Sidebar />
			</div>
			<div className=' md:flex-1'>
				<NavbarAdmin title={'Create Product'} icon={icon} />
				<div className='px-1 min-h-auto'>
					<Form />
				</div>
				<FooterAdmin />
			</div>
		</div>
	);
};

export default CreateSubscription;
