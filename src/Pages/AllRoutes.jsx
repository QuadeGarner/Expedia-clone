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
        <Route path="/ThingsToDo" element={<Destination />} />
        <Route path="/stay" element={<StayData />} />
        <Route path="/flight" element={<FlightData />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
};

// add