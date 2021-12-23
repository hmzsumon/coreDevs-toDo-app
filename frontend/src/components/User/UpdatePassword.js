import React, { useState, useEffect } from 'react';

import Navbar from '../Header/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import ButtonLoader from '../layout/ButtonLoader';
import { useHistory } from 'react-router-dom';

const UpdatePassword = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const alert = useAlert();

	const { error, isUpdated, loading } = useSelector((state) => state.profile);

	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const updatePasswordSubmit = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set('oldPassword', oldPassword);
		myForm.set('newPassword', newPassword);
		myForm.set('confirmPassword', confirmPassword);

		dispatch(updatePassword(myForm));
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success('Profile Updated Successfully');

			history.push('/account');

			dispatch({
				type: UPDATE_PASSWORD_RESET,
			});
		}
	}, [dispatch, error, alert, history, isUpdated]);

	return (
		<>
			<Navbar />

			<div className='flex flex-col items-center justify-center h-screen px-4 py-10 bg-gray-100 sm:px-6 lg:px-8 '>
				<div className='w-full max-w-md p-8 space-y-8 bg-white rounded shadow'>
					<div>
						<h2 className='text-2xl font-extrabold text-center text-gray-900 md:text-3xl'>
							Update Password
						</h2>
					</div>
					<form
						className='mt-8 space-y-6'
						encType='multipart/form-data'
						onSubmit={updatePasswordSubmit}
					>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Old Password
								</label>
								<input
									name='password'
									type='password'
									required
									className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-t appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Old Password'
									value={oldPassword}
									onChange={(e) => setOldPassword(e.target.value)}
								/>
							</div>

							<div>
								<label htmlFor='email-address' className='sr-only'>
									New Password
								</label>
								<input
									name='password'
									type='password'
									required
									className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='New Password'
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</div>

							<div>
								<label htmlFor='email-address' className='sr-only'>
									Confirm Password
								</label>
								<input
									name='password'
									type='password'
									required
									className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-b appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Confirm Password'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
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
									Update Password
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default UpdatePassword;
