import React, { useEffect, useState } from 'react';
import Navbar from '../Header/Navbar';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, getAllNotes } from '../../actions/noteAction';
import NoteList from './NoteList';
import CreateNote from './CreateNote';
import { DELETE_NOTE_RESET } from '../../constants/noteConstants';
import Loader from '../layout/Loader/Loader';

const Dashboard = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const [userPackLimit, setUserPackLimit] = useState(0);

	useEffect(() => {
		let userPackage = localStorage.getItem('noteLimit');
		userPackage = JSON.parse(userPackage);
		setUserPackLimit(userPackage);
	}, []);

	// console.log(userPackLimit);

	const { loading, notes } = useSelector((state) => state.notes);

	const { deleteError, isDeleted } = useSelector((state) => state.deleteNote);

	const deleteNoteHandler = (id) => {
		if (window.confirm('Are you sure to delete?')) {
			dispatch(deleteNote(id));
		}
		if (isDeleted) {
			alert.success('Product Deleted Successfully');
		}
	};

	useEffect(() => {
		if (isDeleted) {
			dispatch({ type: DELETE_NOTE_RESET });
		}
		dispatch(getAllNotes());
	}, [dispatch, isDeleted, deleteError, alert]);

	return (
		<div>
			<Navbar />
			{loading ? (
				<Loader />
			) : (
				<div>
					<div className='grid grid-cols-1 px-6 py-10 space-x-6 md:grid-cols-3 '>
						<div className='col-span-2'>
							<NoteList notes={notes} deleteNoteHandler={deleteNoteHandler} />
						</div>
						<div className='col-span-1'>
							<CreateNote userPackLimit={userPackLimit} notes={notes} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
