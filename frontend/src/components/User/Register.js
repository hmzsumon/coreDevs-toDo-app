/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, register } from '../../actions/userAction';
import { useAlert } from 'react-alert';

import Navbar from '../../components/Header/Navbar';
import ButtonLoader from '../../components/layout/ButtonLoader';

const Register = ({ history, location }) => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const { error, loading, isAuthenticated } = useSelector(
		(state) => state.user
	);

	const [avatar, setAvatar] = useState('/Profile.png');
	const [avatarPreview, setAvatarPreview] = useState('/Profile.png');
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const { name, email, password, confirmPassword } = user;
	const registerSubmit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert.error('Password does not match');
			return;
		}

		const myForm = new FormData();

		myForm.set('name', name);
		myForm.set('email', email);
		myForm.set('password', password);
		myForm.set('avatar', avatar);

		// for (let x of myForm.entries()) {
		// 	console.log(x);
		// }
		dispatch(register(myForm));
	};

	const registerDataChange = (e) => {
		if (e.target.name === 'avatar') {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};

			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (isAuthenticated) {
			alert.success('You are registered successfully');
			history.push('/login');
		}
	}, [dispatch, error, alert, history, isAuthenticated]);

	return (
		<>
			<>
				<Navbar />
				<div className='flex flex-col items-center justify-center h-auto px-4 py-10 bg-gray-100 sm:px-6 lg:px-8 '>
					<div className='w-full max-w-md p-8 space-y-8 bg-white rounded shadow'>
						<div>
							<h2 className='text-2xl font-extrabold text-center text-gray-900 md:text-3xl'>
								Create your account
							</h2>
						</div>
						<form
							className='mt-8 space-y-6'
							encType='multipart/form-data'
							onSubmit={registerSubmit}
						>
							<input type='hidden' name='remember' defaultValue='true' />
							<div className='-space-y-px rounded-md shadow-sm'>
								<div>
									<label htmlFor='email-address' className='sr-only'>
										Name
									</label>
									<input
										name='name'
										type='name'
										required
										className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='Enter Name'
										onChange={registerDataChange}
									/>
								</div>
								<div>
									<label htmlFor='email-address' className='sr-only'>
										Email address
									</label>
									<input
										name='email'
										type='email'
										required
										className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='Email address'
										onChange={registerDataChange}
									/>
								</div>
								<div>
									<label htmlFor='password' className='sr-only'>
										Password
									</label>
									<input
										name='password'
										type='password'
										required
										className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='Password'
										onChange={registerDataChange}
									/>
								</div>
								<div>
									<label htmlFor='password' className='sr-only'>
										Password
									</label>
									<input
										name='confirmPassword'
										type='password'
										required
										className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='Confirm Password'
										onChange={registerDataChange}
									/>
								</div>
							</div>
							<div className='flex items-center justify-around'>
								<img
									src={avatarPreview}
									alt='Avatar Preview'
									className='w-10 h-10 rounded-full nline-block ring-2 ring-white'
								/>

								<div className='flex items-center justify-center bg-grey-lighter'>
									<label className='flex items-center w-48 px-1 py-2 tracking-wide text-blue-500 uppercase bg-white border rounded-lg shadow-lg cursor-pointer sm:w-52 justify-evenly border-blue hover:bg-blue-500 hover:text-white'>
										<svg
											className='w-8 h-8'
											fill='currentColor'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 20 20'
										>
											<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
										</svg>
										<p className='text-base leading-normal'>Select a file</p>
										<input
											type='file'
											name='avatar'
											value=''
											accept='image/*'
											onChange={registerDataChange}
											className='hidden'
										/>
									</label>
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
										Create your account
									</button>
								)}

								<p className='mt-2 text-center'>
									Already have an account?{' '}
									<Link
										to='/login'
										className='text-indigo-600 hover:text-indigo-500'
									>
										Login
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</>
		</>
	);
};

export default Register;
