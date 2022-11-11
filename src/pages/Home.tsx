import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, IconButton, TextField } from "@mui/material";
import { getMp3, getVideoInfo } from "../api/api";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth, signOut } from "firebase/auth";

const validationSchema = yup.object({
  url: yup.string().required("URL is required"),
});

const Home = () => {
  const [info, setInfo] = useState({});
  const audio = useRef<HTMLAudioElement>(null);
  const [mp3, setMp3] = useState<Blob>();

  const formik = useFormik({
    initialValues: {
      url: "https://www.youtube.com/watch?v=6hkeM7-WgD8",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const mp3 = await getMp3(values.url);
      if (audio.current != undefined) {
        // @ts-ignore
        audio.current.src = URL.createObjectURL(mp3);
        audio.current.load();
      }
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
      <audio controls ref={audio}>
        Your browser does not support the audio element.
      </audio>
      <IconButton
        aria-label="delete"
        size="large"
        onClick={() => {
          signOut(auth);
          alert("Wylogowano");
          console.log("Wylogowano");
        }}
      >
        <LogoutIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default Home;
