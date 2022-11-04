import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  Avatar,
  Checkbox,
  CircularProgress,
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
  const [inProgress, setInProgress] = useState(false);

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

  const onSetAdmin = async (id: string, isAdmin: boolean) => {
    if(!inProgress) {
      setInProgress(true)
      const washingtonRef = doc(db, "users", id);
      await updateDoc(washingtonRef, {
        admin: !isAdmin,
      });
      await getUsers();
      setInProgress(false)
    }
  }
 
  return (
    
    <div className="App">
      <h1>Home</h1>
      <div>
       
        <TableContainer component={Paper} sx={{ minWidth: 450,width: '80%', m: 'auto'}}>
          <Table  aria-label="simple table" >
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
                  <TableCell align="center">{inProgress ? <CircularProgress size={25} /> : <Checkbox checked={u.admin} onChange={() => onSetAdmin(u.id, u.admin)} />}</TableCell> 
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