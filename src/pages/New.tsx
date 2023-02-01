import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { getStorage } from "firebase/storage";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { padding } from "@mui/system";
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

function New() {
  const [supportedDevices, setSupportedDevices] = useState([]);
  const [user, setUser] = useState<any>();
  const navigate = useNavigate();

  const [claim, setClaim] = useState({
    brand: "",
    model: "",
    description: "",
    serialNumber: "",
  });
  async function fetchUser() {
    console.log("newcomplanits fetching... ");
    const user = auth.currentUser;

    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      const data = docSnap.data();
      setUser(data);
    }
  }
  const fetchDevices = async () => {
    const querySnapshot = await getDocs(collection(db, "supportedDevices"));
    console.log("newcomplanits: fetchDevices");
    const temp: any = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      temp.push(doc.data());
    });
    setSupportedDevices(temp);
  };
  const handleChange = (event: any) => {
    setClaim({
      ...claim,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    fetchUser();
    fetchDevices();
  }, []);

  const handleSubmit = async (event: any) => {
    console.log("hs");

    event.preventDefault();
    try {
      await addDoc(collection(db, "complaints"), {
        name: user.displayName,
        email: user.email,
        brand: claim.brand,
        phone: user.phoneNumber,
        model: claim.model,
        description: claim.description,
        userID: user.userID,
        serialNumber: claim.serialNumber,
        date: serverTimestamp(),
        status: "Oczekująca",
      });
      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const selectedBrand: any = supportedDevices.find(
    (x: any) => x.brand === claim.brand
  );
  const models: any[] = selectedBrand ? selectedBrand.models : [];

  return (
    <div className="main">
      <h2> Nowa reklamacja</h2>
      <FormControl fullWidth>
        <InputLabel id="brand">Marka</InputLabel>
        <Select
          //margin="auto"
          labelId="brand"
          id="brand"
          value={claim.brand}
          label="Marka"
          name="brand"
          onChange={handleChange}
        >
          {supportedDevices.map((x: any) => (
            <MenuItem key={x.brand} value={x.brand}>
              {x.brand}
            </MenuItem>
          ))}
        </Select>
        {claim.brand ? (
          <Select
            //margin="20"
            labelId="model"
            id="model"
            value={claim.model}
            label="Model"
            name="model"
            onChange={handleChange}
          >
            {models.map((x: any) => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
        ) : null}
        <TextField
          fullWidth
          margin="normal"
          id="serialNumber"
          name="serialNumber"
          label="Numer seryjny"
          //autoWidth="true"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="description"
          name="description"
          label="Opis problemu"
          //autoWidth="true"
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

export default New;
