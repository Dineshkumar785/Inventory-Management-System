import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router";

import { AuthProvider } from "./context/AuthContext";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductFormPage from "./pages/ProductFormPage";
import InventoryPage from "./pages/InventoryPage";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>

                    {/* Public routes */}
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    />

                    {/* Protected application routes */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            path="/dashboard"
                            element={<DashboardPage />}
                        />

                        <Route
                            path="/products"
                            element={<ProductsPage />}
                        />

                        <Route
                            path="/products/new"
                            element={<ProductFormPage />}
                        />

                        <Route
                            path="/products/:id"
                            element={<ProductDetailsPage />}
                        />

                        <Route
                            path="/products/:id/edit"
                            element={<ProductFormPage />}
                        />

                        <Route
                            path="/inventory"
                            element={<InventoryPage />}
                        />
                    </Route>

                    {/* Unknown route */}
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        }
                    />

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}