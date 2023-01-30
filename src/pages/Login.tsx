import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { Button } from "@mui/material";
import { auth, db } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
        const { email, displayName, photoURL, uid, phoneNumber } = user;
        try {
          const docRef = doc(db, "users", uid);
          console.log("login: fetchusers");
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
          } else {
            console.log("loginnowy: fetchusers");
            await setDoc(doc(db, "users", uid), {
              userID: user.uid,
              email,
              displayName,
              photoURL,
              phoneNumber,
            });
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
        navigate("/");
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
      });
  };

  return (
    <div className="main">
      <h1>Logowanie</h1>
      <h3>
        Wewnętrzna aplikacja GeoTechnology do składania reklamacji smartfonów
      </h3>
      <p>
        Aby skorzystać z usługi zaloguj się najpierw korzystając z konta Google
        klikając poniżej przycisk Zaloguj z użyciem konta Google
      </p>
      <form onSubmit={formik.handleSubmit}>
        <Button color="primary" variant="contained" onClick={onLogin}>
          Zaloguj z użyciem konta Google
        </Button>
      </form>
    </div>
  );
};

export default Login;
