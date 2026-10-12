import { useState } from "react";

import {
    Link,
    useNavigate,
} from "react-router";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    TextField,
    Typography,
} from "@mui/material";

import api from "../api/client";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]:
            event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await api.post(
                "/api/users/register",
                form
            );

            navigate("/login");
        } catch (error) {
            const data =
                error.response?.data;

            if (
                data &&
                typeof data === "object"
            ) {
                const message =
                    Object.values(data)
                        .filter(
                            (value) =>
                                typeof value === "string"
                        )
                        .join(" ");

                setError(
                    message ||
                    "Registration failed."
                );
            } else {
                setError(
                    "Registration failed."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                background:
                    "linear-gradient(180deg, #eff6ff 0%, #f8fafc 45%, #f6f8fb 100%)",
                px: 2,
            }}
        >
            <Container maxWidth="sm">

                <Card>
                    <CardContent sx={{ p: 4 }}>

                        <Typography
                            variant="h4"
                            textAlign="center"
                        >
                            Create Account
                        </Typography>

                        <Typography
                            color="text.secondary"
                            textAlign="center"
                            sx={{
                                mt: 0.5,
                                mb: 3,
                            }}
                        >
                            Create your inventory account
                        </Typography>

                        {error && (
                            <Alert
                                severity="error"
                                sx={{ mb: 2 }}
                            >
                                {error}
                            </Alert>
                        )}

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                fullWidth
                                required
                                label="Username"
                                name="username"
                                margin="normal"
                                value={form.username}
                                onChange={handleChange}
                                disabled={loading}
                            />

                            <TextField
                                fullWidth
                                required
                                label="Email"
                                name="email"
                                type="email"
                                margin="normal"
                                value={form.email}
                                onChange={handleChange}
                                disabled={loading}
                            />

                            <TextField
                                fullWidth
                                required
                                label="Password"
                                name="password"
                                type="password"
                                margin="normal"
                                value={form.password}
                                onChange={handleChange}
                                disabled={loading}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{ mt: 2 }}
                                disabled={loading}
                            >
                                {loading
                                    ? "Creating..."
                                    : "Create account"}
                            </Button>
                        </Box>

                        <Divider sx={{ my: 3 }}>
                            Already registered?
                        </Divider>

                        <Button
                            fullWidth
                            component={Link}
                            to="/login"
                            variant="outlined"
                        >
                            Sign in
                        </Button>

                    </CardContent>
                </Card>

            </Container>
        </Box>
    );
}