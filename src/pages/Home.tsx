import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import {
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Margin } from "@mui/icons-material";

const ARCHIVE_STATUS = ["Canceled", "Declined", "Accepted", "Resolved", "Set"];
const ACTIVE_STATUS = ["Pending"];

function Home() {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState();
  const [user, setUser] = useState<any>();
  const [isArchive, setIsArchive] = useState<boolean>(false);

  const [complaints, setComplaints] = useState<any[]>([]);
  const fetchComplaints = async () => {
    const querySnapshot = await getDocs(collection(db, "complaints"));
    const temp: any = [];
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
    setComplaints(temp);
  };

  const navigateToSelected = (id: string) => {
    navigate("/review", {
      state: { ...complaints.find((x) => x.id === id), ...user },
    });
  };
  async function fetchUser() {
    const user = auth.currentUser;

    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      const data = docSnap.data();
      setUser(data);
      setIsAdmin(data?.isAdmin);
    }
  }
  auth.onAuthStateChanged((_user) => {
    if (!user && _user) {
      fetchUser();
    } else {
    }
  });
  useEffect(() => {
    fetchUser();
    fetchComplaints();
  }, []);
  return (
    <div className="container">
      <h1>Lista reklamacji </h1>
      <Switch checked={isArchive} onChange={() => setIsArchive(!isArchive)} />
      {!isAdmin ? (
        <Button
          variant="contained"
          sx={{
            flex: 1,
            justifyContent: "flex-start",
            marginLeft: "-70%",
            marginBottom: "20px",
          }}
          onClick={() => {
            navigate("/new");
          }}
        >
          Add
        </Button>
      ) : null}
      <div>
        <TableContainer
          component={Paper}
          sx={{ minWidth: 450, width: "80%", m: "auto" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID zgłoszenia</TableCell>
                <TableCell align="center">Data</TableCell>
                <TableCell align="center">Urzadzenie</TableCell>
                <TableCell align="center">Opis</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints
                .filter((x) => (isAdmin ? true : x.userID === user?.userID))
                .filter((x) =>
                  isArchive
                    ? ARCHIVE_STATUS.includes(x.status)
                    : ACTIVE_STATUS.includes(x.status)
                )
                .map((c) => (
                  <TableRow key={c.id} onClick={() => navigateToSelected(c.id)}>
                    <TableCell align="center">{c.id}</TableCell>
                    <TableCell align="center">
                      {new Date(c.date.seconds * 1000).toDateString()}
                    </TableCell>
                    <TableCell align="center">
                      {c.brand + " " + c.model}
                    </TableCell>
                    <TableCell align="center">{c.description}</TableCell>
                    <TableCell align="center">{c.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Home;
