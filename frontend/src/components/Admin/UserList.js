import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import NavbarAdmin from './NavbarAdmin.js';
import FooterAdmin from './FooterAdmin';

import { useAlert } from 'react-alert';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Loader from '../layout/Loader/Loader';

import { DELETE_USER_RESET } from '../../constants/userConstants';
import { clearErrors, getAllUsers, deleteUser } from '../../actions/userAction';

const UserList = () => {
	const dispatch = useDispatch();

	const alert = useAlert();
	const history = useHistory();

	const { error, loading, users } = useSelector((state) => state.allUsers);

	const {
		error: deleteError,
		isDeleted,
		message,
	} = useSelector((state) => state.profile);

	// const { deleteError, isDeleted } = useSelector(
	// 	(state) => state.deleteProduct
	// );

	const deleteUserHandler = (id) => {
		dispatch(deleteUser(id));
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			alert.success(message);
			history.push('/admin/users');
			dispatch({ type: DELETE_USER_RESET });
		}

		dispatch(getAllUsers());
	}, [dispatch, alert, error, deleteError, history, isDeleted, message]);

	// icons for the sidebar
	const productsIcon = (
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
	);
	return (
		<div className='w-screen h-screen md:flex'>
			<div className='bg-red-500 md:w-64'>
				<Sidebar />
			</div>
			<div className=' md:flex-1'>
				<NavbarAdmin title={'All Users'} icon={productsIcon} />
				<div className='px-1 mt-10 min-h-auto'>
					{loading ? (
						<Loader />
					) : (
						<>
							<table className='block min-w-full border-collapse md:table'>
								<thead className='block md:table-header-group'>
									<tr className='absolute block border border-grey-500 md:border-none md:table-row -top-full md:top-auto -left-full md:left-auto md:relative '>
										<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
											Id
										</th>
										<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
											Name
										</th>
										<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
											Email
										</th>
										<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
											Stock
										</th>
										<th className='block p-2 font-bold text-left text-white bg-gray-600 md:text-center md:border md:border-grey-500 md:table-cell'>
											Actions
										</th>
									</tr>
								</thead>
								<tbody className='block md:table-row-group'>
									{users &&
										users.map((user) => (
											<tr
												key={user._id}
												className='block bg-gray-300 border border-grey-500 md:border-none md:table-row'
											>
												<td className='block px-1 py-2 text-left md:border md:border-grey-500 md:table-cell'>
													<span className='inline-block w-1/3 font-bold md:hidden'>
														Id
													</span>
													{user._id}
												</td>
												<td className='block px-1 py-2 text-left md:border md:border-grey-500 md:table-cell'>
													<span className='inline-block w-1/3 font-bold md:hidden'>
														Name
													</span>
													{user.name}
												</td>
												<td className='block p-2 text-left md:border md:border-grey-500 md:table-cell'>
													<span className='inline-block w-1/3 font-bold md:hidden'>
														Email
													</span>
													{user.email}
												</td>
												<td className='block p-2 text-left md:border md:border-grey-500 md:table-cell'>
													<span className='inline-block w-1/3 font-bold md:hidden'>
														Role
													</span>
													{user.role}
												</td>
												<td className='block text-left md:text-center md:border md:border-grey-500 md:table-cell'>
													<span className='inline-block w-1/3 font-bold md:hidden'>
														Actions
													</span>
													<Link to={`/admin/user/${user._id}`}>
														<button className='px-2 py-1 mr-1 font-bold text-white bg-blue-500 border border-blue-500 rounded hover:bg-blue-700'>
															Edit
														</button>
													</Link>
													<button
														className='px-2 py-1 font-bold text-white bg-red-500 border border-red-500 rounded hover:bg-red-700'
														onClick={() => deleteUserHandler(user._id)}
													>
														Delete
													</button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</>
					)}
				</div>
				<FooterAdmin />
			</div>
		</div>
	);
};

export default UserList;
