import {
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(firebaseAuth, googleProvider);
		// const credentials = GoogleAuthProvider.credentialFromResult(result);
		const user = result.user;

		const { displayName, email, photoURL, uid } = result.user;

		return {
			ok: true,
			//User info
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error) {
		console.log(error);
		const errorMessage = error.message;

		return {
			ok: false,
			errorMessage,
		};
	}
};

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
	try {
		const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password);
		const { uid, photoURL } = resp.user;

		await updateProfile(firebaseAuth.currentUser, { displayName });

		return {
			ok: true,
			uid,
			photoURL,
			email,
			displayName,
		};
	} catch (error) {
		// AQUI VAN LAS VALIDACIONES
		return {
			ok: false,
			errorMessage: error.message,
		};
	}
};

export const loginWithEmailPassword = async ({ email: emailRec, password }) => {
	//! signInWithEmailAndPassword
	try {
		const resp = await signInWithEmailAndPassword(firebaseAuth, emailRec, password);
		const { displayName, email: email, photoURL, uid } = resp.user;

		return {
			ok: true,
			uid,
			photoURL,
			email,
			displayName,
		};
	} catch (error) {
		console.log("SALIO MAL");
		return {
			ok: false,
			errorMessage: error.message,
		};
	}
};

export const logoutFirebase = async () => {
	return await firebaseAuth.signOut();
};
