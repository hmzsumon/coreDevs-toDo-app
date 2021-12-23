import React from 'react';
import { Link } from 'react-router-dom';

import NotificationDropdown from './NotificationDropdown.js';
import UserOptions from '../Header/UserOptions.js';

export default function Sidebar() {
	const [collapseShow, setCollapseShow] = React.useState('hidden');
	return (
		<>
			<nav className='relative z-10 flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-xl md:bg-green-900 md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64'>
				<div className='flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap'>
					{/* Toggler */}
					<button
						className='px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden'
						type='button'
						onClick={() => setCollapseShow('bg-green-900 m-2 py-3 px-6')}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-6 h-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 6h16M4 12h16M4 18h16'
							/>
						</svg>
					</button>
					{/* Brand */}
					<Link
						className='inline-block p-4 px-0 mr-0 text-lg font-bold text-left text-gray-600 uppercase md:block md:pb-2 md:text-white whitespace-nowrap'
						to='/'
					>
						To-Do App
					</Link>
					{/* User */}
					<ul className='flex flex-wrap items-center list-none md:hidden'>
						<li className='relative inline-block'>
							<NotificationDropdown />
						</li>
						<li className='relative inline-block'>
							<UserOptions />
						</li>
					</ul>
					{/* Collapse */}
					<div
						className={
							'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
							collapseShow
						}
					>
						{/* Collapse header */}
						<div className='block pb-4 mb-4 border-b border-solid md:min-w-full md:hidden border-blueGray-200'>
							<div className='flex flex-wrap'>
								<div className='w-6/12'>
									<Link
										className='inline-block p-4 px-0 mr-0 text-sm font-bold text-left text-white uppercase md:block md:pb-2 whitespace-nowrap'
										to='/'
									>
										To-Do App
									</Link>
								</div>
								<div className='flex justify-end w-6/12'>
									<button
										type='button'
										className='px-3 py-1 text-xl leading-none text-red-500 bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden'
										onClick={() => setCollapseShow('hidden')}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='w-6 h-6'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>

						{/* Navigation */}
						<ul className='flex flex-col list-none md:flex-col md:min-w-full'>
							<li className='items-center'>
								<Link
									className={`flex items-center ${
										window.location.pathname === '/admin/subscriptions'
											? 'text-pink-500 hover:text-pink-600'
											: 'text-white'
									}  text-xs uppercase py-3 font-bold block`}
									to='/admin/subscriptions'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-5 h-5 mr-2 text-sm opacity-75'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' />
									</svg>
									Manage Subscriptipons
								</Link>
							</li>

							<li className='items-center ml-2'>
								<Link
									className={`flex items-center ${
										window.location.pathname === '/admin/create-subscriptio'
											? 'text-pink-500 hover:text-pink-600'
											: 'text-white'
									} text-xs uppercase py-3 font-bold block`}
									to='/admin/create-subscription'
								>
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
									Add Subscription
								</Link>
							</li>
							<li className='items-center ml-2'>
								<Link
									className={`flex items-center ${
										window.location.pathname === '/admin/subscriptions'
											? 'text-pink-500 hover:text-pink-600'
											: 'text-white'
									} text-xs uppercase py-3 font-bold block`}
									to='/admin/subscriptions'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-5 h-5 mr-2 text-sm text-blueGray-400'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
									</svg>
									Edit Subscription
								</Link>
							</li>
						</ul>
						<br />
						<hr />
						<br />

						<ul className='flex flex-col list-none md:flex-col md:min-w-full'>
							<li className='items-center'>
								<Link
									className={`flex items-center ${
										window.location.pathname === '/admin/users'
											? 'text-pink-500 hover:text-pink-600'
											: 'text-white'
									}  text-xs uppercase py-3 font-bold block`}
									to='/admin/users'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-5 h-5 mr-2 text-sm opacity-75'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
										/>
									</svg>
									All Users
								</Link>
							</li>

							<li className='items-center ml-2'>
								<Link
									className={`flex items-center ${
										window.location.pathname === '/admin/update'
											? 'text-pink-500 hover:text-pink-600'
											: 'text-white'
									} text-xs uppercase py-3 font-bold block`}
									to='/admin/users'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='w-5 h-5 mr-2 text-sm text-blueGray-400'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
									</svg>
									Edit User
								</Link>
							</li>
						</ul>
						{/* Divider */}
						{/* <hr className='my-4 md:min-w-full' /> */}
						{/* Heading */}
					</div>
				</div>
			</nav>
		</>
	);
}
