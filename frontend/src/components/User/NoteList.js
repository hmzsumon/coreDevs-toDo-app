import React from 'react';
import { Link } from 'react-router-dom';

const NoteList = ({ notes, deleteNoteHandler }) => {
	return (
		<div>
			{notes && notes.length === 0 ? (
				<div className='flex items-center justify-center h-80'>
					<h1 className='text-3xl font-bold text-gray-800'>
						You Have no any note please create not!
					</h1>
				</div>
			) : (
				<table className='block min-w-full border-collapse md:table'>
					<thead className='block md:table-header-group'>
						<tr className='absolute block border border-grey-500 md:border-none md:table-row -top-full md:top-auto -left-full md:left-auto md:relative '>
							<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
								Title
							</th>
							<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
								Description
							</th>
							<th className='block p-2 font-bold text-left text-white bg-gray-600 md:border md:border-grey-500 md:table-cell'>
								Date
							</th>
							<th className='block p-2 font-bold text-left text-white bg-gray-600 md:text-center md:border md:border-grey-500 md:table-cell'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='block md:table-row-group'>
						{notes &&
							notes.map((note) => (
								<tr
									key={note._id}
									className='block bg-gray-300 border border-grey-500 md:border-none md:table-row'
								>
									<td className='block px-1 py-2 text-left md:border md:border-grey-500 md:table-cell'>
										<span className='inline-block w-1/3 font-bold md:hidden'>
											Title
										</span>
										{note.title}
									</td>
									<td className='block px-1 py-2 text-left md:border md:border-grey-500 md:table-cell'>
										<span className='inline-block w-1/3 font-bold md:hidden'>
											Description
										</span>
										{note.description}
									</td>
									<td className='block p-2 text-left md:border md:border-grey-500 md:table-cell'>
										<span className='inline-block w-1/3 font-bold md:hidden'>
											Date
										</span>
										{new Date(note.date).toLocaleDateString()}
									</td>
									<td className='block text-left md:text-center md:border md:border-grey-500 md:table-cell'>
										<span className='inline-block w-1/3 font-bold md:hidden'>
											Actions
										</span>
										<Link to={`/update/${note._id}`}>
											<button className='px-2 py-1 mr-1 font-bold text-white bg-blue-500 border border-blue-500 rounded hover:bg-blue-700'>
												Edit
											</button>
										</Link>
										<button
											className='px-2 py-1 font-bold text-white bg-red-500 border border-red-500 rounded hover:bg-red-700'
											onClick={() => deleteNoteHandler(note._id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default NoteList;
