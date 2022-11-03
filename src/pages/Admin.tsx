import React, { useEffect, useState } from "react";

import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Image } from "@mui/icons-material";

const Admin = () => {
  const [users, setUsers] = useState<any[]>([]);
  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const temp: any = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      temp.push(doc.data());
    });
    setUsers(temp);
    console.log(temp);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="App">
      <h1>Home</h1>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650,width: '90%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell align="right">Nazwa</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow
                  key={u.displayName}
                  //sx={{ "&:last-child td, &:last-child th": { border: 0 } }}????????
                >
                  
                  <TableCell> <img src={u.photoURL} /></TableCell>  
                  <TableCell align="right">{u.displayName}</TableCell>
                  <TableCell align="right">{u.id}</TableCell>
                  <TableCell align="right">{u.email}</TableCell>
                  <TableCell align="right">{u.admin}</TableCell>  
                  <FormControlLabel control={<Checkbox  />} label="Admin" />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div> //popwawa błędu i wielkości zdjęc, mapowianie boolenowych wartości na checkboxa??????"""?>>??????"
  );
};

export default Admin;
