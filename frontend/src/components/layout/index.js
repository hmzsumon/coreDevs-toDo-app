import React, { useEffect } from 'react';
import Navbar from '../Header/Navbar';
import NavbarAdmin from '../Admin/NavbarAdmin';

const Layout = ({ children, location }) => {
	const [admin, setAdmin] = React.useState(false);
	useEffect(() => {
		if (location.pathname === '/admin') {
			setAdmin(true);
		}
	}, [location]);
	return (
		<div>
			{admin ? <NavbarAdmin /> : <Navbar />}
			{children}
		</div>
	);
};

export default Layout;
