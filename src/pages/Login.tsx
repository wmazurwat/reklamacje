import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { auth, db } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

interface MyFormValues {
  firstName: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // navigate("/")
        const { email, displayName, photoURL, uid } = user;
        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document!");
            await setDoc(doc(db, "users", uid), {
              id: user.uid,
              admin: false,
              email,
              displayName,
              photoURL,
            });
            console.log("Document written with ID: ");
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        // ...
      } else {
        console.log("not logged in");
      }
    });
  }, []);

  const onLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        alert("Zalogowano");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <h3>
        Aplikacja HUB służy do konwersji sygnału audio z serwera youtube.com do
        pliku mp3. Aby skorzystać z usługi zaloguj się najpierw korzystając z
        konta Google klikając poniżej przycisk Zaloguj z użyciem konta Google
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <Button color="primary" variant="contained" onClick={onLogin}>
          Zaloguj z użyciem konta Google
        </Button>
      </form>
    </div>
  );
};

export default Login;
