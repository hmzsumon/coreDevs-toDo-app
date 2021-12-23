import React from 'react';

import UserOptions from '../Header/UserOptions.js';
import { Link } from 'react-router-dom';

export default function NavbarAdmin({ title, icon }) {
	return (
		<>
			<nav className=' md:flex md:justify-between items-center px-10 py-5 bg-white shadow hidden'>
				<ul className='flex items-center'>
					<li
						className={`items-center uppercase font-medium cursor-pointer ${
							window.location.pathname === '/admin/dashboard'
								? 'text-pink-500 hover:text-pink-600'
								: 'text-gray-700'
						}`}
					>
						<Link to='/admin/dashboard'>Dashboard</Link>
					</li>
					{title ? (
						<li className='items-center ml-5'>
							<Link
								className='flex items-center text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block'
								to='/admin/products'
							>
								{icon}
								{title}
							</Link>
						</li>
					) : null}
				</ul>
				<div>
					<UserOptions />
				</div>
			</nav>
		</>
	);
}
