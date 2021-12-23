import React from 'react';

const FooterAdmin = () => {
	return (
		<footer className='text-center mt-10'>
			<div className=''>
				<hr className='mb-4 border-b-1 border-blueGray-200' />
				<div className='flex flex-wrap items-center md:justify-between justify-center'>
					<div className='w-full '>
						<div className='text-sm text-blueGray-500 font-semibold py-1'>
							Copyright &copy; {new Date().getFullYear()}{' '}
							<a
								href='https://www.creative-tim.com'
								className='text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold '
							>
								Zakaria
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterAdmin;
