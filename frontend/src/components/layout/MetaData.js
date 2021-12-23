import React from 'react';
import Helmet from 'react-helmet';

const MetaData = ({ title }) => {
	return (
		<Helmet>
			<title> TO Do APP || {title}</title>
		</Helmet>
	);
};

export default MetaData;
