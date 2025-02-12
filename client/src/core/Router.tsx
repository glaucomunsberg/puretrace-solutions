import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./ThemeProvider";
import PageAnalytics from "../pages/PageAnalytics";

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageAnalytics />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;
