import {
    useEffect,
    useState,
} from "react";

import {
    Alert,
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Chip,
} from "@mui/material";

import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function InventoryPage() {
    const { isAdmin } =
        useAuth();

    const [inventory, setInventory] =
        useState([]);

    const [quantity, setQuantity] =
        useState({});

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const loadInventory =
        async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await api.get(
                        "/api/inventory"
                    );

                setInventory(
                    response.data
                );
            } catch (error) {
                setError(
                    error.response?.data
                        ?.message ||
                    "Unable to load inventory."
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        loadInventory();
    }, []);

    const changeQuantity = (
        productId,
        value
    ) => {
        setQuantity({
            ...quantity,
            [productId]: value,
        });
    };

    const addStock = async (
        productId
    ) => {
        const value = Number(
            quantity[productId]
        );

        if (!value || value <= 0) {
            setError(
                "Enter a quantity greater than zero."
            );
            return;
        }

        try {
            setError("");

            await api.post(
                `/api/inventory/${productId}/add`,
                null,
                {
                    params: {
                        quantity: value,
                    },
                }
            );

            setQuantity({
                ...quantity,
                [productId]: "",
            });

            await loadInventory();
        } catch (error) {
            setError(
                error.response?.data
                    ?.message ||
                "Unable to add stock."
            );
        }
    };

    const removeStock = async (
        productId
    ) => {
        const value = Number(
            quantity[productId]
        );

        if (!value || value <= 0) {
            setError(
                "Enter a quantity greater than zero."
            );
            return;
        }

        try {
            setError("");

            await api.post(
                `/api/inventory/${productId}/remove`,
                null,
                {
                    params: {
                        quantity: value,
                    },
                }
            );

            setQuantity({
                ...quantity,
                [productId]: "",
            });

            await loadInventory();
        } catch (error) {
            setError(
                error.response?.data
                    ?.message ||
                "Unable to remove stock."
            );
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4">
                    Inventory
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    Monitor and manage product
                    stock levels
                </Typography>
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
                }}
            >
                <Box
                    sx={{
                        overflowX: "auto",
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Product ID
                                </TableCell>

                                <TableCell>
                                    Quantity
                                </TableCell>

                                <TableCell>
                                    Status
                                </TableCell>

                                {isAdmin && (
                                    <TableCell>
                                        Stock Operations
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {inventory.length ===
                            0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={
                                            isAdmin
                                                ? 4
                                                : 3
                                        }
                                        align="center"
                                        sx={{ py: 6 }}
                                    >
                                        <Typography
                                            color="text.secondary"
                                        >
                                            {loading
                                                ? "Loading inventory..."
                                                : "No inventory records found."}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                inventory.map(
                                    (item) => (
                                        <TableRow
                                            key={item.id}
                                            hover
                                        >
                                            <TableCell>
                                                #
                                                {
                                                    item.productId
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Typography fontWeight={600}>
                                                    {
                                                        item.quantity
                                                    }
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Chip
                                                    label={
                                                        item.status
                                                    }
                                                    size="small"
                                                    color={
                                                        item.status ===
                                                        "IN STOCK"
                                                            ? "success"
                                                            : item.status ===
                                                            "LOW STOCK"
                                                                ? "warning"
                                                                : "error"
                                                    }
                                                />
                                            </TableCell>

                                            {isAdmin && (
                                                <TableCell>
                                                    <Box
                                                        sx={{
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 1,
                                                            flexWrap:
                                                                "wrap",
                                                        }}
                                                    >
                                                        <TextField
                                                            type="number"
                                                            size="small"
                                                            label="Qty"
                                                            value={
                                                                quantity[
                                                                    item.productId
                                                                    ] || ""
                                                            }
                                                            onChange={(
                                                                event
                                                            ) =>
                                                                changeQuantity(
                                                                    item.productId,
                                                                    event.target.value
                                                                )
                                                            }
                                                            inputProps={{
                                                                min: 1,
                                                            }}
                                                            sx={{
                                                                width: 100,
                                                            }}
                                                        />

                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            onClick={() =>
                                                                addStock(
                                                                    item.productId
                                                                )
                                                            }
                                                        >
                                                            Add
                                                        </Button>

                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            size="small"
                                                            onClick={() =>
                                                                removeStock(
                                                                    item.productId
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Box>
                                                </TableCell>
                                            )}
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