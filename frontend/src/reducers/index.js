import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
	newNoteReducer,
	noteDeletesReducer,
	noteDetailsReducer,
	notesReducer,
	updateNoteReducer,
} from './noteReducer';

import {
	newSubscription,
	subscriptionDeletesReducer,
	subscriptionDetailsReducer,
	subscriptionsReducer,
	subscriptionReducer,
} from './subscriptionReducer';
import {
	allUsersReducer,
	forgotPasswordReducer,
	loadUserReducer,
	profileReducer,
	userDetailsReducer,
	userReducer,
} from './userReducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
};

const rootReducer = combineReducers({
	subscriptions: subscriptionsReducer,
	subscription: subscriptionReducer,
	subscriptionDetails: subscriptionDetailsReducer,
	newsubScription: newSubscription,
	deleteScription: subscriptionDeletesReducer,
	updateSubscription: subscriptionReducer,

	profile: profileReducer,
	forgotPassword: forgotPasswordReducer,
	user: userReducer,
	loadUser: loadUserReducer,
	allUsers: allUsersReducer,
	userDetails: userDetailsReducer,

	notes: notesReducer,
	newNote: newNoteReducer,
	deleteNote: noteDeletesReducer,
	note: noteDetailsReducer,
	updateNote: updateNoteReducer,
});

export default persistReducer(persistConfig, rootReducer);
