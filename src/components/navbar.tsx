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
  const [userData, setUserData] = useState<any>();

  const navigate = useNavigate();
  const location = useLocation();
  async function fetchUser() {
    const user = auth.currentUser;

    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      console.log("navbar: fetchuser");
      const docSnap = await getDoc(userRef);
      const data = docSnap.data();
      setUserData(data);
    }
  }
  auth.onAuthStateChanged((user) => {
    console.log("onAuthStateChanged: fetchuser");
    if (user && !userData) {
      fetchUser();
    } else {
      if (location.pathname !== "/login" && !user) {
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
            src={userData?.photoURL || "/static/images/avatar/1.jpg"}
            sx={{}}
            onClick={() => {
              navigate("/profile");
            }}
          ></Avatar>
        </Button>
        <Typography
          onClick={() => {
            navigate("/");
          }}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Aplikacja do reklamcji smartfonów
        </Typography>
        <Button
          onClick={() => {
            signOut(auth);
          }}
          color="inherit"
        >
          Wyloguj się
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
