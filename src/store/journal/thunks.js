import { doc, collection, setDoc, deleteDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import {
	addNewEmpyNote,
	setActiveNote,
	savingNewNote,
	setNotes,
	setSaving,
	updateNote,
	setPhotosToActiveNote,
	deleteNoteById,
} from "./journalSlice";

export const startNewNote = () => {
	return async (dispatch, getState) => {
		dispatch(savingNewNote());

		const { uid } = getState().auth;

		const newNote = {
			title: "",
			body: "",
			date: new Date().getTime(),
		};

		const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
		const setDocResp = await setDoc(newDoc, newNote);

		newNote.id = newDoc.id;

		dispatch(addNewEmpyNote(newNote));
		dispatch(setActiveNote(newNote));

		//dispatch
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		if (!uid) throw new Error("El UID del usuario no existe");

		const notes = await loadNotes(uid);

		dispatch(setNotes(notes));
	};
};

export const startSaveNote = () => {
	return async (dispatch, getState) => {
		dispatch(setSaving());
		const { uid } = getState().auth;
		const { active: note } = getState().journal;

		const noteToFirestore = { ...note };
		delete noteToFirestore.id;

		const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
		await setDoc(docRef, noteToFirestore, { merge: true });
		dispatch(updateNote(note));
	};
};

export const startUploadingFiles = (files = []) => {
	return async (dispatch) => {
		dispatch(setSaving());

		const fileUploadPromises = [];
		for (const file of files) {
			fileUploadPromises.push(fileUpload(file));
		}

		const photosUrls = await Promise.all(fileUploadPromises);

		dispatch(setPhotosToActiveNote(photosUrls));
	};
};

export const startDeletingNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const { active: note } = getState().journal;

		const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
		await deleteDoc(docRef);

		dispatch(deleteNoteById(note.id));
	};
};
