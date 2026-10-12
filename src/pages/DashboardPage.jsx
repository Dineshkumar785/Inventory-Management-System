import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import api from "../api/client";

function StatCard({
                      title,
                      value,
                      subtitle,
                      icon,
                  }) {
    return (
        <Card>
            <CardContent sx={{ p: 3 }}>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "flex-start",
                    }}
                >
                    <Box>
                        <Typography
                            color="text.secondary"
                            variant="body2"
                            fontWeight={600}
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                mt: 1,
                                fontWeight: 700,
                            }}
                        >
                            {value}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            {subtitle}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 3,
                            display: "grid",
                            placeItems: "center",
                            backgroundColor:
                                "#eff6ff",
                            color: "#2563eb",
                        }}
                    >
                        {icon}
                    </Box>
                </Box>

            </CardContent>
        </Card>
    );
}

export default function DashboardPage() {
    const [stats, setStats] = useState({
        products: 0,
        lowStock: 0,
        outOfStock: 0,
    });

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                setError("");

                const [
                    productsResponse,
                    inventoryResponse,
                ] = await Promise.all([
                    api.get("/api/products"),
                    api.get("/api/inventory"),
                ]);

                const products =
                    productsResponse.data;

                const inventory =
                    inventoryResponse.data;

                const inventoryMap =
                    new Map(
                        inventory.map((item) => [
                            item.productId,
                            item.quantity,
                        ])
                    );

                let lowStock = 0;
                let outOfStock = 0;

                products.forEach(
                    (product) => {
                        const quantity =
                            inventoryMap.get(
                                product.id
                            ) ?? 0;

                        if (quantity === 0) {
                            outOfStock++;
                        } else if (
                            quantity <= 10
                        ) {
                            lowStock++;
                        }
                    }
                );

                setStats({
                    products:
                    products.length,
                    lowStock,
                    outOfStock,
                });
            } catch {
                setError(
                    "Unable to load dashboard data."
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4">
                    Dashboard
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    Overview of your inventory
                    and products
                </Typography>
            </Box>

            {error && (
                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                >
                    {error}
                </Alert>
            )}

            <Grid
                container
                spacing={3}
            >
                <Grid
                    size={{
                        xs: 12,
                        md: 4,
                    }}
                >
                    <StatCard
                        title="Total Products"
                        value={
                            loading
                                ? "—"
                                : stats.products
                        }
                        subtitle="Products in catalog"
                        icon={
                            <Inventory2Icon />
                        }
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 4,
                    }}
                >
                    <StatCard
                        title="Low Stock"
                        value={
                            loading
                                ? "—"
                                : stats.lowStock
                        }
                        subtitle="Products needing attention"
                        icon={
                            <ProductionQuantityLimitsIcon />
                        }
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 4,
                    }}
                >
                    <StatCard
                        title="Out of Stock"
                        value={
                            loading
                                ? "—"
                                : stats.outOfStock
                        }
                        subtitle="Currently unavailable"
                        icon={
                            <RemoveShoppingCartIcon />
                        }
                    />
                </Grid>
            </Grid>

            <Card sx={{ mt: 3 }}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6">
                        Inventory overview
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 1 }}
                    >
                        Use Products to manage
                        your catalog and Inventory
                        to manage stock levels.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}