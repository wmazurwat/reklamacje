import { useForm, SubmitHandler } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  FormControl,
} from "@mui/material";
import { useLocation } from "react-router-dom";

// --------------------------------------------- on Submit
// try {
//   const docRef = doc(db, "complaints", uid);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//   } else {
//     await setDoc(doc(db, "complaints", uid), {
//       userID: user.uid,
//       email,
//       displayName,
//       photoURL,
//       phoneNumber,
//     });
//   }
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

const Review = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const { state } = useLocation();
  const [user, setUser] = useState<any>();
  const [isAdmin, setIsAdmin] = useState();
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
  console.log(state);
  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "complaints"));
    const temp: any = [];
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setComplaints(temp);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="review">
      <h1>Reklamacja o numerze ID: </h1>
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
                <TableCell align="center">ID urządzenia</TableCell>
                <TableCell align="center">Opis zgłoszenia</TableCell>
                <TableCell align="center">status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.map((c) => (
                <TableRow key={c.complaintID}>
                  <TableCell align="center">{c.complaintID}</TableCell>
                  <TableCell align="center">{c.date.toString()}</TableCell>
                  <TableCell align="center">{c.deviceID}</TableCell>
                  <TableCell align="center">{c.description}</TableCell>
                  <TableCell align="center">{c.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        {" "}
        {isAdmin ? (
          <FormControl fullWidth margin="dense">
            <TextField
              fullWidth
              margin="normal"
              id="comment"
              name="comment"
              label="Komentarz do reklamacji"
              //autoWidth="true"
              //onChange={handleChange}
            />
          </FormControl>
        ) : (
          false
        )}
      </div>
      {isAdmin ? (
        <div>
          <Button
            size="large"
            color="primary"
            variant="contained"
            type="submit"
            //onClick={handleSubmit}
            sx={{ margin: "20px" }}
          >
            Zaakceptuj
          </Button>
          <Button
            size="large"
            color="primary"
            variant="contained"
            type="submit"
            //onClick={handleSubmit}
            sx={{ margin: "20px" }}
          >
            Odrzuć
          </Button>
        </div>
      ) : (
        <div>
          <Button
            size="large"
            color="primary"
            variant="contained"
            type="submit"
            //onClick={handleSubmit}
            sx={{ margin: "20px" }}
          >
            Usuń reklamację
          </Button>
        </div>
      )}
    </div>
  );
};

export default Review;
