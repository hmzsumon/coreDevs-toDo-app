import axios from 'axios';
import {
	ALL_SUBSCRIPTION_FAIL,
	ALL_SUBSCRIPTION_REQUEST,
	ALL_SUBSCRIPTION_SUCCESS,
	NEW_SUBSCRIPTION_REQUEST,
	NEW_SUBSCRIPTION_SUCCESS,
	NEW_SUBSCRIPTION_FAIL,
	UPDATE_SUBSCRIPTION_REQUEST,
	UPDATE_SUBSCRIPTION_SUCCESS,
	UPDATE_SUBSCRIPTION_FAIL,
	DELETE_SUBSCRIPTION_REQUEST,
	DELETE_SUBSCRIPTION_SUCCESS,
	DELETE_SUBSCRIPTION_FAIL,
	CLEAR_ERRORS,
	SUBSCRIPTION_DETAILS_REQUEST,
	SUBSCRIPTION_DETAILS_SUCCESS,
	SUBSCRIPTION_DETAILS_FAIL,
} from '../constants/subscriptionConstants';

// Get All Suvscriptions
export const getSubscriptions = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_SUBSCRIPTION_REQUEST });
		const { data } = await axios.get(`/api/v1/subscriptions`);

		dispatch({
			type: ALL_SUBSCRIPTION_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_SUBSCRIPTION_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Create new Subscription
export const createSubscription = (subscriptionData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_SUBSCRIPTION_REQUEST });

		const config = {
			headers: { 'Content-Type': 'application/json' },
		};

		const { data } = await axios.post(
			`/api/v1/admin/subscription/new`,
			subscriptionData,
			config
		);

		dispatch({
			type: NEW_SUBSCRIPTION_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: NEW_SUBSCRIPTION_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Update Subscription
export const updateSubscription =
	(id, subscriptionData) => async (dispatch) => {
		try {
			dispatch({ type: UPDATE_SUBSCRIPTION_REQUEST });

			const config = {
				headers: { 'Content-Type': 'application/json' },
			};

			const { data } = await axios.put(
				`/api/v1/admin/subscription/${id}`,
				subscriptionData,
				config
			);

			dispatch({
				type: UPDATE_SUBSCRIPTION_SUCCESS,
				payload: data.success,
			});
		} catch (error) {
			dispatch({
				type: UPDATE_SUBSCRIPTION_FAIL,
				payload: error.response.data.message,
			});
		}
	};

// Delete Subscription
export const deleteSubscription = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_SUBSCRIPTION_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/subscription/${id}`);

		dispatch({
			type: DELETE_SUBSCRIPTION_SUCCESS,
			payload: data.success,
		});
		// console.log('the data', data);
	} catch (error) {
		dispatch({
			type: DELETE_SUBSCRIPTION_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get  Details
export const getSubscriptionDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: SUBSCRIPTION_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/subscription/${id}`);

		dispatch({
			type: SUBSCRIPTION_DETAILS_SUCCESS,
			payload: data.subscription,
		});
	} catch (error) {
		dispatch({
			type: SUBSCRIPTION_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
