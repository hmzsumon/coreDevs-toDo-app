/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { clearErrors, createNote, getAllNotes } from '../../actions/noteAction';
import { NEW_NOTE_RESET } from '../../constants/noteConstants';
import { useHistory } from 'react-router-dom';

const CreateNote = () => {
	const dispatch = useDispatch();
	const alert = useAlert();

	let history = useHistory();

	// const { noteLimit = 10 } = userPackage;

	const { loading, error, success } = useSelector((state) => state.newNote);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState(new Date().toLocaleDateString());

	const createNoteSubmitHandler = (e) => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set('title', title);
		myForm.set('description', description);
		myForm.set('date', date);

		dispatch(createNote(myForm));

		// for (let key of myForm.entries()) {
		// 	console.log(key[0] + ', ' + key[1]);
		// }
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			alert.success('Note created successfully');
			dispatch(getAllNotes());
			dispatch({ type: NEW_NOTE_RESET });
		}
	}, [dispatch, alert, error, history, success]);

	return (
		<>
			<div className='flex flex-col items-center justify-center h-auto '>
				<div className='w-full max-w-md p-8 space-y-8 bg-white rounded shadow'>
					<div className=' space-y-7'>
						<h2 className='text-2xl font-extrabold text-center text-gray-800 md:text-3xl'>
							Create New Note
						</h2>
						{/* <div>
							<p>Your Not Limit: {noteLimit}</p>
							<p> remaining {noteLimit - notes.length}</p>
						</div> */}
					</div>
					<form className='mt-8 space-y-6' onSubmit={createNoteSubmitHandler}>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Title
								</label>
								<input
									name='Title'
									type='text'
									required
									className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Note Title'
									onChange={(e) => setTitle(e.target.value)}
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
								<label htmlFor='email-address' className='sr-only'>
									Date
								</label>
								<input
									name='Date'
									type='date'
									value={date}
									required
									className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									onChange={(e) => setDate(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								// disabled={noteLimit === notes.length}
							>
								{loading ? (
									<div className='w-6 h-6 border-4 border-white border-dashed rounded-full spin-slow animate-spin-slow'></div>
								) : (
									'Create Note'
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default CreateNote;
