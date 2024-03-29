import React from "react";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import {
	checkingAunthentication,
	startGoogleSignIn,
	startLoginWithEmailPassword,
} from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

const formData = {
	email: "",
	password: "",
};

export const LoginPage = () => {
	const { status, errorMessage } = useSelector((state) => state.auth);

	const { email, password, onInputChange } = useForm(formData);

	const isAunthenticating = useMemo(() => status === "checking", [status]);

	const dispatch = useDispatch();

	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(startLoginWithEmailPassword({ email, password }));
	};

	const onGoogleSignInt = () => {
		console.log("OnGoogle");
		dispatch(startGoogleSignIn());
	};

	return (
		<AuthLayout title="Login">
			<form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="correo"
							type="email"
							placeholder="correo@google.com"
							fullWidth
							autoComplete="username"
							name="email"
							value={email}
							onChange={onInputChange}
						></TextField>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label="contraseña"
							type="password"
							placeholder="Contraseña"
							fullWidth
							autoComplete="current-password"
							name="password"
							value={password}
							onChange={onInputChange}
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

						<Grid item xs={12} sm={6} sx={{ mt: 2 }}>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								disabled={isAunthenticating}
							>
								Login
							</Button>
						</Grid>

						<Grid item xs={12} sm={6} sx={{ mt: 2 }}>
							<Button
								variant="contained"
								fullWidth
								onClick={onGoogleSignInt}
								disabled={isAunthenticating}
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>

					<Grid container direction="row" justifyContent="end">
						<Link component={RouterLink} color="inherit" to="/auth/register">
							Crear una cuenta
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
