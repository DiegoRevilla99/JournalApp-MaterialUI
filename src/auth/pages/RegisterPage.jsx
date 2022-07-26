import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailPassword } from "../../store/auth";
import { useMemo } from "react";

const formData = {
	email: "",
	password: "",
	displayName: "",
};

const formValidations = {
	email: [(value) => value.includes("@"), "El correo debe de tener un @"],
	password: [(value) => value.length >= 6, "El password debe de tener mas de 6 letras"],
	displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
	const dispatch = useDispatch();

	const [formSubmited, setFormSubmited] = useState(false);

	const { status, errorMessage } = useSelector((state) => state.auth);
	const isCheckingAuthentication = useMemo(() => status === "checking", [status]);

	const {
		displayName,
		email,
		password,
		onInputChange,
		formState,
		isFormValid,
		emailValid,
		passwordValid,
		displayNameValid,
	} = useForm(formData, formValidations);

	// console.log(displayNameValid);

	const onSubmit = (event) => {
		event.preventDefault();
		setFormSubmited(true);
		if (!isFormValid) return;
		dispatch(startCreatingUserWithEmailPassword(formState));
	};

	return (
		<AuthLayout title="Crear cuenta">
			<form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Nombre completo"
							type="text"
							placeholder="Tu nombre"
							fullWidth
							autoComplete="username"
							name="displayName"
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && formSubmited}
							helperText={displayNameValid}
						></TextField>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Correo"
							type="email"
							placeholder="correo@google.com"
							fullWidth
							autoComplete="email"
							name="email"
							value={email}
							onChange={onInputChange}
							error={!!emailValid && formSubmited}
							helperText={emailValid}
						></TextField>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="Contraseña"
							type="password"
							placeholder="Contraseña"
							fullWidth
							autoComplete="current-password"
							name="password"
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && formSubmited}
							helperText={passwordValid}
						></TextField>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2 }}>
						<Grid
							item
							xs={12}
							sm={12}
							sx={{ mt: 2 }}
							display={!!errorMessage ? "" : "none"}
						>
							<Alert severity="error">{errorMessage}</Alert>
						</Grid>

						<Grid item xs={12} sm={12} sx={{ mt: 2 }}>
							<Button
								variant="contained"
								fullWidth
								type="submit"
								disabled={isCheckingAuthentication}
							>
								Crear cuenta
							</Button>
						</Grid>
					</Grid>

					<Grid container direction="row" justifyContent="end">
						<Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
						<Link component={RouterLink} color="inherit" to="/auth/login">
							Ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
