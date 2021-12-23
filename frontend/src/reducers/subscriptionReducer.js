import {
	ALL_SUBSCRIPTION_FAIL,
	ALL_SUBSCRIPTION_REQUEST,
	ALL_SUBSCRIPTION_SUCCESS,
	NEW_SUBSCRIPTION_REQUEST,
	NEW_SUBSCRIPTION_SUCCESS,
	NEW_SUBSCRIPTION_FAIL,
	NEW_SUBSCRIPTION_RESET,
	UPDATE_SUBSCRIPTION_REQUEST,
	UPDATE_SUBSCRIPTION_SUCCESS,
	UPDATE_SUBSCRIPTION_FAIL,
	UPDATE_SUBSCRIPTION_RESET,
	DELETE_SUBSCRIPTION_REQUEST,
	DELETE_SUBSCRIPTION_SUCCESS,
	DELETE_SUBSCRIPTION_FAIL,
	DELETE_SUBSCRIPTION_RESET,
	SUBSCRIPTION_DETAILS_REQUEST,
	SUBSCRIPTION_DETAILS_FAIL,
	SUBSCRIPTION_DETAILS_SUCCESS,
	CLEAR_ERRORS,
	SUBSCRIPTION_DELETES_RESET,
} from '../constants/subscriptionConstants';

export const subscriptionsReducer = (state = { subscriptions: [] }, action) => {
	switch (action.type) {
		case ALL_SUBSCRIPTION_REQUEST:
			return {
				loading: true,
				subscriptions: [],
			};
		case ALL_SUBSCRIPTION_SUCCESS:
			return {
				loading: false,
				subscriptions: action.payload.subscriptions,
			};

		case ALL_SUBSCRIPTION_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// new product reducer
export const newSubscription = (state = { subscription: {} }, action) => {
	switch (action.type) {
		case NEW_SUBSCRIPTION_REQUEST:
			return {
				...state,
				loading: true,
			};
		case NEW_SUBSCRIPTION_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
				subscription: action.payload.subscription,
			};
		case NEW_SUBSCRIPTION_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NEW_SUBSCRIPTION_RESET:
			return {
				...state,
				success: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// update product reducer
export const subscriptionReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_SUBSCRIPTION_REQUEST:
			return {
				...state,
				loading: true,
			};

		case UPDATE_SUBSCRIPTION_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};
		case UPDATE_SUBSCRIPTION_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case UPDATE_SUBSCRIPTION_RESET:
			return {
				...state,
				isUpdated: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// delete product reducer
export const subscriptionDeletesReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_SUBSCRIPTION_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_SUBSCRIPTION_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};
		case DELETE_SUBSCRIPTION_FAIL:
			return {
				...state,
				loading: false,
				deleteError: action.payload,
			};
		case DELETE_SUBSCRIPTION_RESET:
			return {
				...state,
				isDeleted: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

// product details reducer
export const subscriptionDetailsReducer = (
	state = { subscription: {} },
	action
) => {
	switch (action.type) {
		case SUBSCRIPTION_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
		case SUBSCRIPTION_DETAILS_SUCCESS:
			return {
				loading: false,
				subscription: action.payload,
			};
		case SUBSCRIPTION_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		case SUBSCRIPTION_DELETES_RESET:
			return {};
		default:
			return state;
	}
};
