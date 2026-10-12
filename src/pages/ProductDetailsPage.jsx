import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useParams,
} from "react-router";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function ProductDetailsPage() {
    const { id } =
        useParams();

    const { isAdmin } =
        useAuth();

    const [product, setProduct] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const loadProduct =
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const response =
                        await api.get(
                            `/api/products/${id}`
                        );

                    setProduct(
                        response.data
                    );
                } catch (error) {
                    setError(
                        error.response?.data
                            ?.message ||
                        "Unable to load product."
                    );
                } finally {
                    setLoading(false);
                }
            };

        loadProduct();
    }, [id]);

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: 300,
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    if (!product) {
        return (
            <Alert severity="warning">
                Product not found.
            </Alert>
        );
    }

    return (
        <Box>
            <Button
                component={Link}
                to="/products"
                startIcon={
                    <ArrowBackIcon />
                }
                sx={{ mb: 3 }}
            >
                Back to Products
            </Button>

            <Card>
                <CardContent
                    sx={{
                        p: {
                            xs: 3,
                            md: 4,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            gap: 2,
                            alignItems: {
                                xs: "flex-start",
                                md: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h4"
                                gutterBottom
                            >
                                {product.name}
                            </Typography>

                            <Chip
                                label={
                                    product.category
                                }
                                size="small"
                            />
                        </Box>

                        {isAdmin && (
                            <Button
                                component={Link}
                                to={`/products/${product.id}/edit`}
                                variant="contained"
                                startIcon={
                                    <EditOutlinedIcon />
                                }
                            >
                                Edit Product
                            </Button>
                        )}
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography
                        variant="h5"
                        sx={{
                            mb: 1,
                            fontWeight: 700,
                        }}
                    >
                        ₹
                        {Number(
                            product.price
                        ).toLocaleString(
                            "en-IN"
                        )}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{
                            lineHeight: 1.8,
                            maxWidth: 800,
                        }}
                    >
                        {product.description ||
                            "No description available."}
                    </Typography>

                    <Box sx={{ mt: 4 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Product ID
                        </Typography>

                        <Typography fontWeight={600}>
                            #{product.id}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}