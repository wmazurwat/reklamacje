import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  Avatar,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";


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
                <TableCell align="center">Nazwa</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow
                  key={u.displayName}
                  //sx={{ "&:last-child td, &:last-child th": { border: 0 } }}????????
                >
                  <TableCell> <Avatar  src={u.photoURL} /></TableCell> 
                  <TableCell align="center">{u.displayName}</TableCell>
                  <TableCell align="center">{u.id}</TableCell>
                  <TableCell align="center">{u.email}</TableCell>
                  <TableCell align="center">{<Checkbox checked={u.admin} onChange={u.admin} />}</TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div> 
  );
};

export default Admin;
//FormControlLabel in Checkbox