import { Admin } from "./Admin/AdminFlight";
import { AdminStay } from "./Admin/AdminStay";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
// import { HomePage } from "./HomePage";
import { AdminDashboard } from "./Admin/AdminDashboard";
import { AdminProducts } from "./Admin/AdminProducts";
import { AllHotels } from "./Admin/AllHotels";
import { AdminUsers } from "./Admin/AdminUsers";
import { Destination } from "./ThingsTodo/Destination";
import HomePage from "./HomePage";
import { Login } from "./Login";
import { Register } from "./Register";
import StayData from "./Stay/StayData";
import CheckoutPage from "./CheckoutPage";
import FlightData from "./Flights/FlightData";
import { AdminCatalog } from "./Admin/AdminCatalog";

const AdminRoute = ({ children }) => {
  const { isAuth, activeUser } = useSelector((store) => store.LoginReducer);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (activeUser?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/adminflight"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/adminstay"
          element={
            <AdminRoute>
              <AdminStay />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/flights"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin/hotels"
          element={
            <AdminRoute>
              <AllHotels />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route path="/admin/cars" element={<AdminRoute><AdminCatalog endpoint="cars" title="Cars" fields={[{ name: "name", label: "Car name" }, { name: "type", label: "Type" }, { name: "price", label: "Price" }, { name: "image", label: "Image URL", required: false }]} /></AdminRoute>} />
        <Route path="/admin/packages" element={<AdminRoute><AdminCatalog endpoint="packages" title="Packages" fields={[{ name: "name", label: "Package name" }, { name: "description", label: "Description" }, { name: "price", label: "Price" }, { name: "image", label: "Image URL", required: false }]} /></AdminRoute>} />
        <Route path="/admin/things" element={<AdminRoute><AdminCatalog endpoint="Things_todo" title="Things to Do" fields={[{ name: "title", label: "Title" }, { name: "place", label: "Place" }, { name: "price", label: "Price" }, { name: "rating", label: "Rating" }, { name: "image", label: "Image URL", required: false }]} /></AdminRoute>} />
        <Route path="/ThingsToDo" element={<Destination />} />
        <Route path="/stay" element={<StayData />} />
        <Route path="/flight" element={<FlightData />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
};

// add