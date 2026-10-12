import { useState } from "react";

import {
    Link,
    useNavigate,
} from "react-router";

import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    TextField,
    Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
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
            const response = await api.post(
                "/api/auth/login",
                form
            );

            login(response.data);

            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Invalid username or password."
            );
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
            <Container maxWidth="xs">

                <Card>
                    <CardContent sx={{ p: 4 }}>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                sx={{
                                    backgroundColor:
                                        "#2563eb",
                                    mb: 2,
                                }}
                            >
                                <LockOutlinedIcon />
                            </Avatar>

                            <Typography variant="h5">
                                Welcome back
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{
                                    mt: 0.5,
                                    mb: 3,
                                    textAlign: "center",
                                }}
                            >
                                Sign in to your inventory
                                dashboard
                            </Typography>
                        </Box>

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
                                label="Password"
                                name="password"
                                type="password"
                                margin="normal"
                                value={form.password}
                                onChange={handleChange}
                                disabled={loading}
                            />

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ mt: 2 }}
                                disabled={loading}
                            >
                                {loading
                                    ? "Signing in..."
                                    : "Sign in"}
                            </Button>
                        </Box>

                        <Divider sx={{ my: 3 }}>
                            New here?
                        </Divider>

                        <Button
                            fullWidth
                            component={Link}
                            to="/register"
                            variant="outlined"
                        >
                            Create an account
                        </Button>

                    </CardContent>
                </Card>

            </Container>
        </Box>
    );
}