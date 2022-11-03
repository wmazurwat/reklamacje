import React, { useEffect, useState } from 'react';

import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const Admin = ()  => {
  const [users, setUsers] = useState<any[]>([])
  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const temp: any = []
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      temp.push(doc.data())
    });
    setUsers(temp)
    console.log(temp)
  }
  useEffect(() => {
    getUsers()
  }, [])
  return (
    <div className="App">
       <h1>Home</h1>
       {users.map(u => <div>
        <h1>{u.displayName}</h1>
        <h1>{u.email}</h1>
        <img alt={u.displayName} src={u.photoURL} />
        </div>)}
        <div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
         
        {users.map(u => (
            <TableRow
              key={u.displayName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {u.photoURL}
              </TableCell>
              <TableCell align="right">{u.displayName}</TableCell>
              <TableCell align="right">{u.id}</TableCell>
              <TableCell align="right">{u.email}</TableCell>
              <TableCell align="right">{u.admin}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
        </div>
    </div>
  );
}

export default Admin;
