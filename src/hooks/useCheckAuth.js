import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { firebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
	const { status } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, async (user) => {
			if (!user) return dispatch(logout());
			const { uid, email, displayName, photoURL } = user;
			dispatch(login({ uid, email, displayName, photoURL }));
			dispatch(startLoadingNotes());
		});
	}, []);

	return {
		status,
	};
};
