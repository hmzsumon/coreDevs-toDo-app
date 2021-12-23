/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockClosedIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../layout//Loader/Loader';
import Navbar from '../../components/Header/Navbar';
import MetaData from '../layout/MetaData';

const Login = ({ history, location }) => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const { error, loading, isAuthenticated, user } = useSelector(
		(state) => state.user
	);

	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	const loginSubmit = (e) => {
		e.preventDefault();
		dispatch(login(loginEmail, loginPassword));
	};

	const redirect = location.search
		? location.search.split('=')[1]
		: '/dashboard';

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isAuthenticated) {
			if (user.role === 'admin') {
				history.push('/admin/dashboard');
			} else {
				history.push(redirect);
			}
		}
	}, [dispatch, error, alert, history, isAuthenticated, redirect, user]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={'Login'} />
					<Navbar />
					<div className='flex flex-col items-center justify-center h-screen px-4 bg-gray-100 sm:px-6 lg:px-8 '>
						<div className='w-full max-w-md p-8 space-y-8 bg-white rounded shadow'>
							<div>
								<h2 className='text-xl font-extrabold text-center text-gray-900 md:text-3xl'>
									Sign in to your account
								</h2>
							</div>
							<form className='mt-8 space-y-6' onSubmit={loginSubmit}>
								<input type='hidden' name='remember' defaultValue='true' />
								<div className='-space-y-px rounded-md shadow-sm'>
									<div>
										<label htmlFor='email-address' className='sr-only'>
											Email address
										</label>
										<input
											id='email-address'
											name='email'
											type='email'
											autoComplete='email'
											required
											className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
											value={loginEmail}
											onChange={(e) => setLoginEmail(e.target.value)}
											placeholder='Email address'
										/>
									</div>
									<div>
										<label htmlFor='password' className='sr-only'>
											Password
										</label>
										<input
											id='password'
											name='password'
											type='password'
											autoComplete='current-password'
											required
											className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
											value={loginPassword}
											onChange={(e) => setLoginPassword(e.target.value)}
											placeholder='Password'
										/>
									</div>
								</div>

								<div className='flex items-center justify-between'>
									<div className='flex items-center'>
										<input
											id='remember-me'
											name='remember-me'
											type='checkbox'
											className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
										/>
										<label
											htmlFor='remember-me'
											className='block ml-2 text-sm text-gray-900'
										>
											Remember me
										</label>
									</div>

									<div className='text-sm'>
										<Link
											to='/password/forgot'
											className='font-medium text-indigo-600 hover:text-indigo-500'
										>
											Forgot your password?
										</Link>
									</div>
								</div>

								<div>
									<button
										type='submit'
										className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
											<LockClosedIcon
												className='w-5 h-5 text-indigo-500 group-hover:text-indigo-400'
												aria-hidden='true'
											/>
										</span>
										Sign in
									</button>
									<p className='mt-2 text-center'>
										Don’t have an account?{' '}
										<Link
											to='/register'
											className='text-indigo-600 hover:text-indigo-500'
										>
											Create an account
										</Link>
									</p>
								</div>
							</form>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Login;
