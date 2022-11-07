import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Button, IconButton, TextField } from "@mui/material";
import { getVideogInfo } from "../api/api";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth, signOut } from "firebase/auth";
interface MyFormValues {
  firstName: string;
}

const validationSchema = yup.object({
  url: yup.string().required("Email is required"),
});

const Home = () => {
  const [info, setInfo] = useState({});
  const formik = useFormik({
    initialValues: {
      url: "https://www.youtube.com/watch?v=dzxRcdmZubc",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values.url);
      const info = await getVideogInfo(values.url);
      console.log(info);
      setInfo(info);
    },
  });

  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });

  return (
    <div className="container">
      <h1>Home</h1>
      <h2>
        Wpisz poniżej adres URL linku platformy youtube.com który chcesz
        przekształcić na plik audio z rozszeżeniem .mp3, a następnie kliknij
        przycisk POBIERZ
      </h2>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="url"
            name="url"
            label="Adres URL youtube.com"
            value={formik.values.url}
            onChange={formik.handleChange}
          />
          <Button
            size="large"
            color="primary"
            variant="contained"
            type="submit"
          >
            Pobierz
          </Button>
        </form>
      </div>

      <IconButton aria-label="delete" size="large">
        <LogoutIcon
          fontSize="large"
          onClick={() => {
            signOut(auth);
            alert("Wylogowano");
            console.log("Wylogowano");
          }}
        />
      </IconButton>
    </div>
  );
};

export default Home;
