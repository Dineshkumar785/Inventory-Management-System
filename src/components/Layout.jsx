import { useState } from "react";

import {
    AppBar,
    Box,
    Button,
    Chip,
    Container,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CloseIcon from "@mui/icons-material/Close";

import {
    Link,
    NavLink,
    Outlet,
    useNavigate,
} from "react-router";

import { useAuth } from "../context/AuthContext";

const navItems = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: <DashboardIcon fontSize="small" />,
    },
    {
        label: "Products",
        path: "/products",
        icon: <ShoppingBagIcon fontSize="small" />,
    },
    {
        label: "Inventory",
        path: "/inventory",
        icon: <Inventory2Icon fontSize="small" />,
    },
];

export default function Layout() {
    const navigate = useNavigate();

    const theme = useTheme();

    const isMobile = useMediaQuery(
        theme.breakpoints.down("md")
    );

    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const {
        username,
        role,
        logout,
    } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: "#ffffff",
                    color: "#0f172a",
                    borderBottom:
                        "1px solid #e5e7eb",
                }}
            >
                <Container maxWidth="xl">

                    <Toolbar
                        sx={{
                            minHeight: 70,
                            px: {
                                xs: 0,
                                sm: 1,
                            },
                        }}
                    >

                        <Typography
                            component={Link}
                            to="/dashboard"
                            variant="h6"
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                                fontWeight: 700,
                                mr: 3,
                                flexGrow: {
                                    xs: 1,
                                    md: 0,
                                },
                            }}
                        >
                            Inventory
                            <span
                                style={{
                                    color: "#2563eb",
                                }}
                            >
                Hub
              </span>
                        </Typography>

                        {!isMobile && (
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    flexGrow: 1,
                                }}
                            >
                                {navItems.map((item) => (
                                    <Button
                                        key={item.path}
                                        component={NavLink}
                                        to={item.path}
                                        startIcon={item.icon}
                                        sx={{
                                            color: "#64748b",

                                            "&.active": {
                                                color: "#2563eb",
                                                backgroundColor:
                                                    "#eff6ff",
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>
                        )}

                        {!isMobile && (
                            <>
                                <Chip
                                    label={`${username} • ${role}`}
                                    size="small"
                                    sx={{
                                        mr: 1,
                                        backgroundColor:
                                            role === "ADMIN"
                                                ? "#dbeafe"
                                                : "#f1f5f9",
                                        color:
                                            role === "ADMIN"
                                                ? "#1d4ed8"
                                                : "#475569",
                                        fontWeight: 600,
                                    }}
                                />

                                <Button
                                    color="inherit"
                                    startIcon={<LogoutIcon />}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        )}

                        {isMobile && (
                            <IconButton
                                onClick={() =>
                                    setDrawerOpen(true)
                                }
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        )}

                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={closeDrawer}
            >
                <Box
                    sx={{
                        width: 270,
                        p: 2,
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography variant="h6">
                            Menu
                        </Typography>

                        <IconButton
                            onClick={closeDrawer}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Chip
                        label={`${username} • ${role}`}
                        sx={{ mb: 2 }}
                    />

                    <List>

                        {navItems.map((item) => (
                            <ListItemButton
                                key={item.path}
                                component={NavLink}
                                to={item.path}
                                onClick={closeDrawer}
                            >
                                {item.icon}

                                <ListItemText
                                    primary={item.label}
                                    sx={{ ml: 1 }}
                                />
                            </ListItemButton>
                        ))}

                        <ListItemButton
                            onClick={handleLogout}
                        >
                            <LogoutIcon />

                            <ListItemText
                                primary="Logout"
                                sx={{ ml: 1 }}
                            />
                        </ListItemButton>

                    </List>
                </Box>
            </Drawer>

            <Box
                sx={{
                    py: {
                        xs: 3,
                        md: 4,
                    },
                }}
            >
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </Box>
        </>
    );
}