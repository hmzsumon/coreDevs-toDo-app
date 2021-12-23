import React, { Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const UserOptions = () => {
	const { user, loading, isAuthenticated } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const alert = useAlert();
	const history = useHistory();

	function logoutUser() {
		dispatch(logout());
		alert.success('Logout Successfully');
		history.push('/');
	}

	useEffect(() => {
		if (isAuthenticated === false) {
			history.push('/login');
		}
	}, [history, isAuthenticated]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					{/* Profile dropdown */}
					<Menu as='div' className='relative z-10 ml-3'>
						<div>
							<Menu.Button className='flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
								<span className='sr-only'>Open user menu</span>
								<img
									className='w-8 h-8 rounded-full'
									src={user.avatar.url ? user.avatar.url : '/Profile.png'}
									alt={user.name}
								/>
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter='transition ease-out duration-100'
							enterFrom='transform opacity-0 scale-95'
							enterTo='transform opacity-100 scale-100'
							leave='transition ease-in duration-75'
							leaveFrom='transform opacity-100 scale-100'
							leaveTo='transform opacity-0 scale-95'
						>
							<Menu.Items className='absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
								<Menu.Item>
									{({ active }) => (
										<Link
											to='/account'
											className={classNames(
												active ? 'bg-gray-100' : '',
												'block px-4 py-2 text-sm text-gray-700'
											)}
										>
											Your Profile
										</Link>
									)}
								</Menu.Item>
								{user.role === 'admin' ? (
									<Menu.Item>
										{({ active }) => (
											<Link
												to='/admin/dashboard'
												className={classNames(
													active ? 'bg-gray-100' : '',
													'block px-4 py-2 text-sm text-gray-700'
												)}
											>
												Dashboard
											</Link>
										)}
									</Menu.Item>
								) : null}
								<Menu.Item>
									{({ active }) => (
										<Link
											to='/setting'
											className={classNames(
												active ? 'bg-gray-100' : '',
												'block px-4 py-2 text-sm text-gray-700'
											)}
										>
											Settings
										</Link>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<Link
											to='/cart'
											className={classNames(
												active ? 'bg-gray-100' : '',
												'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
											)}
										>
											Your Cart
										</Link>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<div
											className={classNames(
												active ? 'bg-gray-100' : '',
												'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
											)}
											onClick={() => logoutUser()}
										>
											Sign out
										</div>
									)}
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</Menu>
				</>
			)}
		</>
	);
};

export default UserOptions;
