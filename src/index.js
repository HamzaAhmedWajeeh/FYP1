import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Patient from "layouts/Patient/Patient";
import DoctorLayout from "layouts/Doctor/DoctorLayout";
import EmployeeLayout from "layouts/Employee/EmployeeLayout";
import SuperLayout from "layouts/Super/SuperLayout";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/rtl/*" element={<RTLLayout />} />
          <Route path="/patient/*" element={<Patient />} />
          <Route path="/doctor/*" element={<DoctorLayout />} />
          <Route path="/employee/*" element={<EmployeeLayout />} />
          <Route path="/super/*" element={<SuperLayout />} />
          <Route
            path="*"
            element={<Navigate to="/admin/Login" replace />}
          />
        </Routes>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);