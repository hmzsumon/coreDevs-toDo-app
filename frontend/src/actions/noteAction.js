import axios from 'axios';
import {
	ADMIN_NOTE_FAIL,
	ADMIN_NOTE_REQUEST,
	ADMIN_NOTE_SUCCESS,
	ALL_NOTE_FAIL,
	ALL_NOTE_REQUEST,
	ALL_NOTE_SUCCESS,
	NEW_NOTE_REQUEST,
	NEW_NOTE_SUCCESS,
	NEW_NOTE_FAIL,
	UPDATE_NOTE_REQUEST,
	UPDATE_NOTE_SUCCESS,
	UPDATE_NOTE_FAIL,
	DELETE_NOTE_REQUEST,
	DELETE_NOTE_SUCCESS,
	DELETE_NOTE_FAIL,
	CLEAR_ERRORS,
	NOTE_DETAILS_REQUEST,
	NOTE_DETAILS_SUCCESS,
	NOTE_DETAILS_FAIL,
} from '../constants/noteConstants';

// Get All notes
export const getAllNotes = () => async (dispatch) => {
	dispatch({ type: ALL_NOTE_REQUEST });
	try {
		const res = await axios.get(`api/v1/notes/me`);
		// console.log(res.data);
		dispatch({ type: ALL_NOTE_SUCCESS, payload: res.data });
	} catch (error) {
		dispatch({ type: ALL_NOTE_FAIL, payload: error.response.data.error });
	}
};

// Get All notes For Admin
export const getAdminNotes = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_NOTE_REQUEST });

		const { data } = await axios.get('/api/v1/admin/NOTEs');

		// console.log('the data', data);

		dispatch({
			type: ADMIN_NOTE_SUCCESS,
			payload: data.adminNOTEs,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_NOTE_FAIL,
			payload: error.response.data.message,
		});
	}
};
// Create Note
export const createNote = (noteData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_NOTE_REQUEST });

		const config = {
			headers: { 'Content-Type': 'application/json' },
		};

		const { data } = await axios.post(`/api/v1/note/new`, noteData, config);

		dispatch({
			type: NEW_NOTE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: NEW_NOTE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Update NOTE
export const updateNote = (id, noteData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_NOTE_REQUEST });

		const config = {
			headers: { 'Content-Type': 'application/json' },
		};

		const { data } = await axios.put(`/api/v1/notes/${id}`, noteData, config);

		dispatch({
			type: UPDATE_NOTE_SUCCESS,
			payload: data.success,
		});
		console.log(data.success);
	} catch (error) {
		dispatch({
			type: UPDATE_NOTE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Delete NOTE
export const deleteNote = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_NOTE_REQUEST });

		const { data } = await axios.delete(`/api/v1/notes/${id}`);

		dispatch({
			type: DELETE_NOTE_SUCCESS,
			payload: data.success,
		});
		// console.log('the data', data);
	} catch (error) {
		dispatch({
			type: DELETE_NOTE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get NOTEs Details
export const getNoteDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: NOTE_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/notes/${id}`);

		dispatch({
			type: NOTE_DETAILS_SUCCESS,
			payload: data.note,
		});
	} catch (error) {
		dispatch({
			type: NOTE_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
