import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserOptions from './UserOptions';

const navigation = [
	{ name: 'Home', href: '/', current: false },
	{ name: 'Dashboard', href: '/dashboard', current: false },
	{ name: 'Admin', href: '/admin/dashboard', current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
	const { isAuthenticated, user } = useSelector((state) => state.user);

	return (
		<Disclosure as='nav' className='bg-gray-800'>
			{({ open }) => (
				<>
					<div className='px-2 mx-auto max-w-7xl sm:px-6 lg:px-8'>
						<div className='relative flex items-center justify-between h-16'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XIcon className='block w-6 h-6' aria-hidden='true' />
									) : (
										<MenuIcon className='block w-6 h-6' aria-hidden='true' />
									)}
								</Disclosure.Button>
							</div>
							<div className='flex items-center justify-center flex-1 sm:items-stretch sm:justify-between '>
								<div className='flex items-center flex-shrink-0'>
									<Link
										to='/'
										className='mr-8 font-mono text-2xl font-bold text-white cursor-pointer md:text-3xl'
									>
										To-Do App
									</Link>
								</div>
								<div className='hidden sm:block sm:ml-6 '>
									<div className='flex space-x-4 '>
										{navigation.map((item) => (
											<Link
												key={item.name}
												to={item.href}
												className={classNames(
													item.current
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'px-3 py-2 rounded-md text-sm font-medium'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>
							<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								{isAuthenticated ? (
									<UserOptions user={user} />
								) : (
									<Link
										to='/login'
										className='px-4 py-1 font-bold text-white bg-green-500 rounded'
									>
										Login{' '}
									</Link>
								)}
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1'>
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as='a'
									href={item.href}
									className={classNames(
										item.current
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block px-3 py-2 rounded-md text-base font-medium'
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
