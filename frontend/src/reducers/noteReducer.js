import {
	ALL_NOTE_FAIL,
	ALL_NOTE_REQUEST,
	ALL_NOTE_SUCCESS,
	ADMIN_NOTE_REQUEST,
	ADMIN_NOTE_SUCCESS,
	ADMIN_NOTE_FAIL,
	NEW_NOTE_REQUEST,
	NEW_NOTE_SUCCESS,
	NEW_NOTE_FAIL,
	NEW_NOTE_RESET,
	UPDATE_NOTE_REQUEST,
	UPDATE_NOTE_SUCCESS,
	UPDATE_NOTE_FAIL,
	UPDATE_NOTE_RESET,
	DELETE_NOTE_REQUEST,
	DELETE_NOTE_SUCCESS,
	DELETE_NOTE_FAIL,
	DELETE_NOTE_RESET,
	NOTE_DETAILS_REQUEST,
	NOTE_DETAILS_FAIL,
	NOTE_DETAILS_SUCCESS,
	CLEAR_ERRORS,
	NOTE_DELETES_RESET,
} from '../constants/noteConstants';

export const notesReducer = (state = { notes: [] }, action) => {
	switch (action.type) {
		case ALL_NOTE_REQUEST:
			return {
				loading: true,
				notes: [],
			};
		case ALL_NOTE_SUCCESS:
			return {
				loading: false,
				notes: action.payload.notes,
				totalNotes: action.payload.totalNotes,
			};

		case ALL_NOTE_FAIL:
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

// admin NOTE reducer
export const adminNotesReducer = (state = { adminNotes: [] }, action) => {
	switch (action.type) {
		case ADMIN_NOTE_REQUEST:
			return {
				loading: true,
				adminNOTEs: [],
				error: null,
			};
		case ADMIN_NOTE_SUCCESS:
			return {
				loading: false,
				adminNOTEs: action.payload,
				error: null,
				NOTEsCount: action.payload.NOTEsCount,
			};
		case ADMIN_NOTE_FAIL:
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
// new note reducer
export const newNoteReducer = (state = { NOTE: {} }, action) => {
	switch (action.type) {
		case NEW_NOTE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case NEW_NOTE_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
				note: action.payload.note,
			};
		case NEW_NOTE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NEW_NOTE_RESET:
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

// update note reducer
export const updateNoteReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_NOTE_REQUEST:
			return {
				...state,
				loading: true,
			};

		case UPDATE_NOTE_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};
		case UPDATE_NOTE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case UPDATE_NOTE_RESET:
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

// delete NOTE reducer
export const noteDeletesReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_NOTE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_NOTE_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};
		case DELETE_NOTE_FAIL:
			return {
				...state,
				loading: false,
				deleteError: action.payload,
			};
		case DELETE_NOTE_RESET:
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

// NOTE details reducer
export const noteDetailsReducer = (state = { note: {} }, action) => {
	switch (action.type) {
		case NOTE_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
		case NOTE_DETAILS_SUCCESS:
			return {
				loading: false,
				note: action.payload,
			};
		case NOTE_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		case NOTE_DELETES_RESET:
			return {};
		default:
			return state;
	}
};
