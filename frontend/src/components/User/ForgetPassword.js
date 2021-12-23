import React, { Fragment, useState, useEffect } from 'react';

import Navbar from '../Header/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import ButtonLoader from '../layout/ButtonLoader';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const { error, message, loading } = useSelector(
		(state) => state.forgotPassword
	);

	const [email, setEmail] = useState('');

	const forgotPasswordSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set('email', email);
		dispatch(forgotPassword(myForm));
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (message) {
			alert.success(message);
		}
	}, [dispatch, error, alert, message]);

	return (
		<>
			<MetaData title={'Reset Password'} />
			<Navbar />

			<div className='flex flex-col items-center justify-center h-screen px-4 py-10 bg-gray-100 sm:px-6 lg:px-8 '>
				<div className='w-full max-w-md p-8 space-y-8 bg-white rounded shadow'>
					<div>
						<h2 className='text-2xl font-extrabold text-center text-gray-900 md:text-3xl'>
							Forgot Password
						</h2>
					</div>
					<form
						className='mt-8 space-y-6'
						encType='multipart/form-data'
						onSubmit={forgotPasswordSubmit}
					>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email address
								</label>
								<input
									name='email'
									type='email'
									required
									className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Email address'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						<div>
							{loading ? (
								<ButtonLoader bgColor={'bg-green-500'} />
							) : (
								<button
									type='submit'
									className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
									Send Password Reset Link
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
