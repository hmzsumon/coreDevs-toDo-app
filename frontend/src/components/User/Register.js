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
					<div className='flex flex-col w-full max-w-md mt-5 space-y-5 '>
						<span className='flex items-center justify-center space-x-2'>
							<span className='w-40 h-px bg-gray-400'></span>
							<span className='font-normal text-gray-500'>or</span>
							<span className='w-40 h-px bg-gray-400'></span>
						</span>
						<div className='flex flex-col space-y-4'>
							<a
								href='#'
								className='flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none'
							>
								<span>
									<svg
										className='w-5 h-5 text-gray-800 fill-current group-hover:text-white'
										viewBox='0 0 16 16'
										version='1.1'
										aria-hidden='true'
									>
										<path
											fillRule='evenodd'
											d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'
										></path>
									</svg>
								</span>
								<span className='text-sm font-medium text-gray-800 group-hover:text-white'>
									Github
								</span>
							</a>
							<a
								href='#'
								className='flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none'
							>
								<span>
									<svg
										className='text-blue-500 group-hover:text-white'
										width='20'
										height='20'
										fill='currentColor'
									>
										<path d='M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84'></path>
									</svg>
								</span>
								<span className='text-sm font-medium text-blue-500 group-hover:text-white'>
									Twitter
								</span>
							</a>
						</div>
					</div>
				</div>
			</>
		</>
	);
};

export default Register;
