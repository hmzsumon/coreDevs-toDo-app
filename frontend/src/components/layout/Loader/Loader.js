import React from 'react';

const Loader = () => {
	return (
		<div>
			<div className='flex items-center h-screen justify-center '>
				<div className='w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin'></div>
			</div>
		</div>
	);
};

export default Loader;
