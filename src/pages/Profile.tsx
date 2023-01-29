import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { padding, margin } from "@mui/system";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState<any>();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    shippingStreet: "",
    shippingCity: "",
    shippingPostalCode: "",
  });
  async function fetchUser() {
    const user = auth.currentUser;
    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      const data = docSnap.data();
      setUser(data);
    }
  }

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const docRef = doc(db, "users", user.userID);
      await setDoc(docRef, {
        ...user,
        ...formData,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="main">
      <h2> Informacje o użytkowniku</h2>
      <h3> Dane osobowe</h3>

      <FormControl fullWidth>
        <h3> Dane kontaktowe</h3>

        <TextField
          fullWidth
          margin="normal"
          id="phoneNumber"
          name="phoneNumber"
          label="Numer telefonu"
          defaultValue={user?.phoneNumber || ""}
          onChange={handleChange}
        />
        <h3> Dane wysyłkowe</h3>
        <TextField
          fullWidth
          margin="normal"
          id="shippingStreet"
          name="shippingStreet"
          label="Ulica"
          defaultValue={user?.shippingStreet || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="shippingCity"
          name="shippingCity"
          label="Miejscowość"
          defaultValue={user?.shippingCity || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="shippingPostalCode"
          name="shippingPostalCode"
          label="Kod pocztowy"
          defaultValue={user?.shippingPostalCode || ""}
          onChange={handleChange}
        />
        <Button
          size="large"
          color="primary"
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          sx={{ margin: "20px" }}
        >
          Wyślij zgłoszenie
        </Button>
      </FormControl>
    </div>
  );
}

export default Profile;
