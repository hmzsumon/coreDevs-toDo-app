import React, { useEffect, useState } from 'react';
import FooterAdmin from './FooterAdmin';
import NavbarAdmin from './NavbarAdmin';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import {
	clearErrors,
	getSubscriptionDetails,
	updateSubscription,
} from '../../actions/subscriptionAction';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { UPDATE_SUBSCRIPTION_RESET } from '../../constants/subscriptionConstants';

const UpdateSubscription = () => {
	const match = useRouteMatch();
	const history = useHistory();

	const dispatch = useDispatch();
	const alert = useAlert();

	const { error, subscription } = useSelector(
		(state) => state.subscriptionDetails
	);
	const {
		loading,
		error: updateError,
		isUpdated,
	} = useSelector((state) => state.updateSubscription);

	const [title, setTitle] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [noteLimit, setNoteLimit] = useState(0);

	const categories = ['Free', 'Paid'];

	// product id
	const subId = match.params.id;

	// update Product Handler
	const updateSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set('title', title);
		myForm.set('price', price);
		myForm.set('description', description);
		myForm.set('category', category);
		myForm.set('noteLimit', noteLimit);

		dispatch(updateSubscription(subId, myForm));
	};

	// icon for the upload button
	const icon = (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='w-5 h-5 mr-2 text-sm text-blueGray-400'
			viewBox='0 0 20 20'
			fill='currentColor'
		>
			<path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
		</svg>
	);

	useEffect(() => {
		if (subscription && subscription._id !== subId) {
			dispatch(getSubscriptionDetails(subId));
		} else {
			setTitle(subscription.title);
			setDescription(subscription.description);
			setPrice(subscription.price);
			setCategory(subscription.category);
			setNoteLimit(subscription.noteLimit);
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			alert.error(updateError);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success('Subscription Updated Successfully');
			history.push('/admin/subscriptions');
			dispatch({ type: UPDATE_SUBSCRIPTION_RESET });
		}
	}, [
		error,
		updateError,
		isUpdated,
		dispatch,
		alert,
		history,
		subId,
		subscription,
	]);

	return (
		<div className='w-screen h-screen md:flex'>
			<div className='bg-red-500 md:w-64'>
				<Sidebar />
			</div>
			<div className=' md:flex-1'>
				<NavbarAdmin title={'Edit Product'} icon={icon} />
				<div className='flex items-center justify-center px-1 mt-10 min-h-auto'>
					<div className='w-full max-w-md p-8 space-y-8 bg-white rounded shadow'>
						<div>
							<h2 className='text-2xl font-extrabold text-center text-gray-700 md:text-3xl'>
								Update Subscription
							</h2>
						</div>
						<form
							className='mt-8 space-y-6'
							encType='multipart/form-data'
							onSubmit={updateSubmitHandler}
						>
							<input type='hidden' name='remember' defaultValue='true' />
							<div className='-space-y-px rounded-md shadow-sm'>
								<div>
									<label htmlFor='email-address' className='sr-only'>
										Title
									</label>
									<input
										name='name'
										type='text'
										value={title}
										required
										className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='Product Name'
										onChange={(e) => setTitle(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor='email-address' className='sr-only'>
										Price
									</label>
									<input
										name='price'
										type='number'
										value={price}
										required
										className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='Price'
										onChange={(e) => setPrice(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor='email-address' className='sr-only'>
										Note Limit
									</label>
									<input
										name='Stock'
										type='number'
										value={noteLimit}
										required
										className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='Stock'
										onChange={(e) => setNoteLimit(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor='email-address' className='sr-only'>
										Description
									</label>
									<textarea
										className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='Product Description'
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										cols='30'
										rows='1'
									></textarea>
								</div>
								<div>
									<select
										className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										value={category}
										onChange={(e) => setCategory(e.target.value)}
									>
										<option value=''>Choose Category</option>
										{categories.map((cate) => (
											<option key={cate} value={cate}>
												{cate}
											</option>
										))}
									</select>
								</div>
							</div>

							<div>
								<button
									type='submit'
									className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
									{loading ? (
										<div className='w-6 h-6 border-4 border-white border-dashed rounded-full spin-slow animate-spin-slow'></div>
									) : (
										'Create Product'
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
				<FooterAdmin />
			</div>
		</div>
	);
};

export default UpdateSubscription;
