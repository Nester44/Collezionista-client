import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../app/auth/login/Login";
import Home from "../../app/home/Home";
import routes from "../../shared/constants/routes";
import Registration from "../../app/auth/registration/Registration";
import Profile from "../../app/profile/Profile";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.HOME} element={<Home />} />
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.REGISTRATION} element={<Registration />} />
      <Route path={routes.USER + ":userId"} element={<Profile />} />
    </Routes>
  );
}