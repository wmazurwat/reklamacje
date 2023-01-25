import { getAuth, signOut } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  auth.onAuthStateChanged((user) => {
    if (user) {
    } else {
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    }
  });
  return (
    <AppBar position="static">
      <Toolbar>
        <Button>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{}}
            onClick={() => {
              navigate("/profile");
            }}
          ></Avatar>
        </Button>
        <Button
          sx={{ flex: 1, justifyContent: "flex-end" }}
          onClick={() => {
            signOut(auth);
          }}
          color="inherit"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
