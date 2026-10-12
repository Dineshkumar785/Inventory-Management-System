import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

import api from "../api/client";

export default function ProductFormPage() {
    const navigate =
        useNavigate();

    const { id } =
        useParams();

    const isEdit =
        Boolean(id);

    const [form, setForm] =
        useState({
            name: "",
            category: "",
            price: "",
            description: "",
        });

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        if (!isEdit) {
            return;
        }

        const loadProduct =
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const response =
                        await api.get(
                            `/api/products/${id}`
                        );

                    setForm({
                        name:
                            response.data.name ??
                            "",
                        category:
                            response.data.category ??
                            "",
                        price:
                            response.data.price ??
                            "",
                        description:
                            response.data.description ??
                            "",
                    });
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
    }, [id, isEdit]);

    const handleChange = (
        event
    ) => {
        setForm({
            ...form,
            [event.target.name]:
            event.target.value,
        });
    };

    const handleSubmit = async (
        event
    ) => {
        event.preventDefault();

        setError("");

        if (!form.name.trim()) {
            setError(
                "Product name is required."
            );
            return;
        }

        if (!form.category.trim()) {
            setError(
                "Category is required."
            );
            return;
        }

        if (
            form.price === "" ||
            Number.isNaN(
                Number(form.price)
            ) ||
            Number(form.price) < 0
        ) {
            setError(
                "Please enter a valid non-negative price."
            );
            return;
        }

        try {
            setLoading(true);

            const payload = {
                name:
                    form.name.trim(),

                category:
                    form.category.trim(),

                price:
                    Number(form.price),

                description:
                    form.description.trim(),
            };

            if (isEdit) {
                await api.put(
                    `/api/products/${id}`,
                    payload
                );
            } else {
                await api.post(
                    "/api/products",
                    payload
                );
            }

            navigate("/products");
        } catch (error) {
            const data =
                error.response?.data;

            if (
                data &&
                typeof data === "object"
            ) {
                const messages =
                    Object.values(data)
                        .filter(
                            (value) =>
                                typeof value ===
                                "string"
                        )
                        .join(" ");

                setError(
                    messages ||
                    "Unable to save product."
                );
            } else {
                setError(
                    "Unable to save product."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: {
                    xs: 1,
                    md: 2,
                },
            }}
        >
            <Button
                component={Link}
                to="/products"
                startIcon={
                    <ArrowBackIcon />
                }
                sx={{ mb: 2 }}
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
                    <Typography
                        variant="h4"
                        gutterBottom
                    >
                        {isEdit
                            ? "Edit Product"
                            : "Add Product"}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        {isEdit
                            ? "Update the product information below."
                            : "Add a new product to your catalog."}
                    </Typography>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{ mb: 3 }}
                            onClose={() =>
                                setError("")
                            }
                        >
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={
                            handleSubmit
                        }
                    >
                        <TextField
                            fullWidth
                            required
                            label="Product Name"
                            name="name"
                            margin="normal"
                            value={form.name}
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                        />

                        <TextField
                            fullWidth
                            required
                            label="Category"
                            name="category"
                            margin="normal"
                            value={
                                form.category
                            }
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                        />

                        <TextField
                            fullWidth
                            required
                            label="Price"
                            name="price"
                            type="number"
                            margin="normal"
                            value={
                                form.price
                            }
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                            inputProps={{
                                min: 0,
                                step: "0.01",
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            margin="normal"
                            value={
                                form.description
                            }
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                            placeholder="Enter a short product description"
                        />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent:
                                    "flex-end",
                                gap: 2,
                                mt: 3,
                            }}
                        >
                            <Button
                                component={Link}
                                to="/products"
                                variant="outlined"
                                disabled={loading}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={
                                    <SaveIcon />
                                }
                                disabled={loading}
                            >
                                {loading
                                    ? "Saving..."
                                    : isEdit
                                        ? "Update Product"
                                        : "Save Product"}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}