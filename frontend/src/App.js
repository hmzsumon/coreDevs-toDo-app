import { useEffect } from 'react';

import Home from './components/Home/Home';
import Login from './components/User/Login';
import Register from './components/User/Register';
import ProtectedRoute from './components/Route/ProtectedRoute';
import Profile from './components/User/Profile';
import store from './store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Admin from './components/Admin/Dashboard';

import { loadUser } from './actions/userAction';

import Checkout from './components/Cart/Checkout';
import ForgotPassword from './components/User/ForgetPassword';
import ResetPassword from './components/User/ResetPassword';
import UpdatePassword from './components/User/UpdatePassword';
import UpdateProfile from './components/User/UpdateProfile';
import UsersList from './components/Admin/UserList';
import UpdateUser from './components/Admin/UpdateUser';
import Dashboard from './components/User/Dashboard';
import UpdateNote from './components/User/UpdateNote';
import CreateSubscription from './components/Admin/CerateSubscription';
import SubscriptionList from './components/Admin/SubscriptionList';
import UpdateSubscription from './components/Admin/UpdateSubscription';

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<ProtectedRoute exact path='/account' component={Profile} />
				<ProtectedRoute exact path='/dashboard' component={Dashboard} />
				<ProtectedRoute exact path='/checkout/:id' component={Checkout} />
				<ProtectedRoute exact path='/me/update' component={UpdateProfile} />

				<ProtectedRoute
					exact
					path='/password/update'
					component={UpdatePassword}
				/>

				<Route exact path='/password/forgot' component={ForgotPassword} />
				<Route exact path='/password/reset/:token' component={ResetPassword} />

				<ProtectedRoute
					exact
					isAdmin={true}
					path='/admin/dashboard'
					component={Admin}
				/>
				<ProtectedRoute
					exact
					path='/admin/subscriptions'
					isAdmin={true}
					component={SubscriptionList}
				/>
				<ProtectedRoute
					exact
					path='/admin/create-subscription'
					isAdmin={true}
					component={CreateSubscription}
				/>
				<ProtectedRoute
					exact
					path='/admin/update-subscription/:id'
					isAdmin={true}
					component={UpdateSubscription}
				/>

				<ProtectedRoute exact path='/update/:id' component={UpdateNote} />
				<ProtectedRoute
					exact
					path='/admin/users'
					isAdmin={true}
					component={UsersList}
				/>
				<ProtectedRoute
					exact
					path='/admin/user/:id'
					isAdmin={true}
					component={UpdateUser}
				/>
			</Switch>
		</Router>
	);
}

export default App;
