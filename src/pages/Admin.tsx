import React, { useEffect, useState } from 'react';

import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


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

        </div>)}
    </div>
  );
}

export default Admin;
