/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
// import Loader from '../layout/Loader/Loader';
import {
	clearErrors,
	createSubscription,
} from '../../actions/subscriptionAction';

import { useHistory } from 'react-router-dom';
import { NEW_SUBSCRIPTION_RESET } from '../../constants/subscriptionConstants';

const ProductForm = () => {
	const dispatch = useDispatch();
	const alert = useAlert();

	let history = useHistory();

	const { loading, error, success } = useSelector(
		(state) => state.newsubScription
	);

	const [title, setTitle] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [noteLimit, setNoteLimit] = useState(0);

	const categories = ['Free', 'Paid'];

	const createSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set('title', title);
		myForm.set('price', price);
		myForm.set('description', description);
		myForm.set('category', category);
		myForm.set('noteLimit', noteLimit);

		dispatch(createSubscription(myForm));

		// for (let key of myForm.entries()) {
		// 	console.log(key[0] + ', ' + key[1]);
		// }
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			console.log(error);
			dispatch(clearErrors());
		}

		if (success) {
			alert.success('Product Created Successfully');
			history.push('/admin/subscriptions');
			dispatch({ type: NEW_SUBSCRIPTION_RESET });
		}
	}, [dispatch, alert, error, history, success]);

	return (
		<>
			<div className='flex flex-col items-center justify-center h-auto px-4 py-10 bg-gray-100 sm:px-6 lg:px-8 '>
				<div className='w-full max-w-md p-8 space-y-8 bg-white rounded shadow'>
					<div>
						<h2 className='text-2xl font-extrabold text-center text-gray-900 md:text-3xl'>
							Create Subscription
						</h2>
					</div>
					<form
						className='mt-8 space-y-6'
						encType='multipart/form-data'
						onSubmit={createSubmitHandler}
					>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Title
								</label>
								<input
									name='title'
									type='text'
									required
									className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Title'
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
									name='Note Limit'
									type='number'
									required
									className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Note Limit'
									onChange={(e) => setNoteLimit(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Description
								</label>
								<textarea
									className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Description'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									cols='30'
									rows='1'
								></textarea>
							</div>
							<div>
								<select
									className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
		</>
	);
};

export default ProductForm;
