import React, { useState } from "react";
import { Grid, TextField, FormControl, Button } from "@mui/material";
import { Container } from "@mui/system";
import { loginAsync } from "./loginSlice";
import { useDispatch } from "react-redux";
import { ACCESS_TOKEN } from "../../../constants/constants";
import { loginRequest } from "./loginAPI";
import { toast } from "react-toastify";

export default function LoginForm() {
    const dispatch = useDispatch();
    const defaultValues = {
        email: "",
        password: "",
    };
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginAsync(formValues));

        loginRequest(formValues)
            .then((response) => {
                localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
            })
            .catch((error) => {
                toast.error(
                    (error && error.message) ||
                        "Oops! Something went wrong. Please try again!"
                );
            });
    };

    return (
        <Container style={{ marginTop: "10px", align: "center" }}>
            <FormControl style={{ width: "100%", align: "center" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="email-input"
                            name="email"
                            label="Email"
                            type="text"
                            value={formValues.email}
                            onChange={handleInputChange}
                            style={{ width: "100%" }}
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <TextField
                        id="password-input"
                        name="password"
                        label="Password"
                        type="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        style={{ width: "100%", margin: "20px 0" }}
                    />
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </FormControl>
        </Container>
    );
}
