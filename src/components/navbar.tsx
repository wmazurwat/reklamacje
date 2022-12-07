import { IconButton } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  return (
    <div className="">
      <Link to="/login">login</Link>
      <Link to="/">Home</Link>
      <Link to="/admin">Admin</Link>
      <IconButton
        aria-label="delete"
        size="large"
        onClick={() => {
          const auth = getAuth();
          signOut(auth);
          alert("Wylogowano");
          console.log("Wylogowano");
        }}
      >
        <LogoutIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default Navbar;
