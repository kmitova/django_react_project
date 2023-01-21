import React from "react";
import "./index.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/HomePage";
import Login from "./views/LoginPage";
import Register from "./views/RegisterPage";
import ProtectedPage from "./views/ProtectedPage";
import Books from "./views/Books";
import BookDetails from "./components/BookDetails";
import Users from "./views/Users";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route element={<ProtectedPage />} path="/protected" exact />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Home />} path="/" />
            <Route element={<Books />} path="/books" />
            <Route element={<Users />} path="/users" />
            <Route element={<BookDetails />} path="/book/:id"/>
            <Route element={<UserDetails />} path="/user/:id"/>
          </Routes>
        </AuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;