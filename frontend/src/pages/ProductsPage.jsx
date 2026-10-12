import {
    useEffect,
    useState,
} from "react";

import { Link } from "react-router";

import {
    Alert,
    Box,
    Button,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function ProductsPage() {
    const { isAdmin } =
        useAuth();

    const [products, setProducts] =
        useState([]);

    const [name, setName] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const loadProducts = async (
        searchName = name,
        searchCategory = category
    ) => {
        try {
            setLoading(true);
            setError("");

            const response =
                await api.get(
                    "/api/products/search",
                    {
                        params: {
                            name:
                                searchName || undefined,
                            category:
                                searchCategory ||
                                undefined,
                        },
                    }
                );

            setProducts(
                response.data
            );
        } catch (error) {
            setError(
                error.response?.data
                    ?.message ||
                "Unable to load products."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts("", "");
    }, []);

    const handleSearch = (
        event
    ) => {
        event.preventDefault();

        loadProducts(
            name,
            category
        );
    };

    const handleClear = () => {
        setName("");
        setCategory("");

        loadProducts(
            "",
            ""
        );
    };

    const handleDelete = async (
        id
    ) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this product?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await api.delete(
                `/api/products/${id}`
            );

            await loadProducts(
                name,
                category
            );
        } catch (error) {
            setError(
                error.response?.data
                    ?.message ||
                "Unable to delete product."
            );
        }
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: {
                        xs: "flex-start",
                        md: "center",
                    },
                    flexDirection: {
                        xs: "column",
                        md: "row",
                    },
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box>
                    <Typography variant="h4">
                        Products
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Manage and search your
                        product catalog
                    </Typography>
                </Box>

                {isAdmin && (
                    <Button
                        component={Link}
                        to="/products/new"
                        variant="contained"
                        startIcon={
                            <AddIcon />
                        }
                    >
                        Add Product
                    </Button>
                )}
            </Box>

            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                    onClose={() =>
                        setError("")
                    }
                >
                    {error}
                </Alert>
            )}

            <Paper
                sx={{
                    overflow: "hidden",
                    mb: 3,
                }}
            >
                <Box
                    component="form"
                    onSubmit={
                        handleSearch
                    }
                    sx={{
                        p: 2,
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        label="Product name"
                        value={name}
                        onChange={(event) =>
                            setName(
                                event.target.value
                            )
                        }
                        sx={{
                            minWidth: {
                                xs: "100%",
                                sm: 220,
                            },
                        }}
                    />

                    <TextField
                        label="Category"
                        value={category}
                        onChange={(event) =>
                            setCategory(
                                event.target.value
                            )
                        }
                        sx={{
                            minWidth: {
                                xs: "100%",
                                sm: 200,
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        variant="outlined"
                        startIcon={
                            <SearchIcon />
                        }
                        disabled={loading}
                    >
                        {loading
                            ? "Searching..."
                            : "Search"}
                    </Button>

                    {(name ||
                        category) && (
                        <Button
                            type="button"
                            variant="text"
                            onClick={
                                handleClear
                            }
                        >
                            Clear
                        </Button>
                    )}
                </Box>
            </Paper>

            <Paper
                sx={{
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        px: 2,
                        py: 1.5,
                        borderBottom:
                            "1px solid #e5e7eb",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                    >
                        {products.length}{" "}
                        {products.length === 1
                            ? "product"
                            : "products"}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        overflowX: "auto",
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    ID
                                </TableCell>

                                <TableCell>
                                    Product
                                </TableCell>

                                <TableCell>
                                    Category
                                </TableCell>

                                <TableCell>
                                    Price
                                </TableCell>

                                <TableCell align="right">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {products.length ===
                            0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        align="center"
                                        sx={{
                                            py: 6,
                                        }}
                                    >
                                        <Typography
                                            color="text.secondary"
                                        >
                                            No products
                                            found.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map(
                                    (product) => (
                                        <TableRow
                                            key={
                                                product.id
                                            }
                                            hover
                                        >
                                            <TableCell>
                                                #
                                                {
                                                    product.id
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Typography
                                                    fontWeight={
                                                        600
                                                    }
                                                >
                                                    {
                                                        product.name
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        maxWidth: 350,
                                                        whiteSpace:
                                                            "nowrap",
                                                        overflow:
                                                            "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                    }}
                                                >
                                                    {product.description ||
                                                        "No description"}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Chip
                                                    label={
                                                        product.category
                                                    }
                                                    size="small"
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <Typography fontWeight={600}>
                                                    ₹
                                                    {Number(
                                                        product.price
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </Typography>
                                            </TableCell>

                                            <TableCell align="right">
                                                <Button
                                                    component={
                                                        Link
                                                    }
                                                    to={`/products/${product.id}`}
                                                    size="small"
                                                    startIcon={
                                                        <VisibilityOutlinedIcon />
                                                    }
                                                    sx={{
                                                        mr: 1,
                                                    }}
                                                >
                                                    View
                                                </Button>

                                                {isAdmin && (
                                                    <>
                                                        <Button
                                                            component={
                                                                Link
                                                            }
                                                            to={`/products/${product.id}/edit`}
                                                            size="small"
                                                            startIcon={
                                                                <EditOutlinedIcon />
                                                            }
                                                            sx={{
                                                                mr: 1,
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>

                                                        <Button
                                                            color="error"
                                                            size="small"
                                                            startIcon={
                                                                <DeleteOutlinedIcon />
                                                            }
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </Paper>
        </Box>
    );
}