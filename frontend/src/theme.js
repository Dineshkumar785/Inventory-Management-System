import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#2563eb",
        },

        secondary: {
            main: "#64748b",
        },

        background: {
            default: "#f6f8fb",
            paper: "#ffffff",
        },
    },

    shape: {
        borderRadius: 12,
    },

    typography: {
        fontFamily: "Inter, Roboto, Arial, sans-serif",

        h4: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
        },

        h5: {
            fontWeight: 700,
        },

        h6: {
            fontWeight: 600,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },

            styleOverrides: {
                root: {
                    borderRadius: 10,
                    paddingLeft: 16,
                    paddingRight: 16,
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    border: "1px solid #e5e7eb",
                    boxShadow:
                        "0 4px 18px rgba(15, 23, 42, 0.05)",
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    border: "1px solid #e5e7eb",
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                size: "small",
            },
        },

        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 700,
                    backgroundColor: "#f8fafc",
                },
            },
        },
    },
});

export default theme;