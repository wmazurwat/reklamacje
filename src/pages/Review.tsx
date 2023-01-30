import { useForm, SubmitHandler } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  FormControl,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const Review = () => {
  const { state } = useLocation() as any;
  console.log(state);
  const [formData, setFormData] = useState({
    newComment: "",
  });
  const handleChange = (event: any) => {
    setFormData({
      newComment: event.target.value,
    });
  };
  const updateComplaint = async (event: any, status: string) => {
    event.preventDefault();
    try {
      const docRef = doc(db, "complaints", state.id);
      setDoc(
        docRef,
        {
          comments: state.comments
            ? [...state.comments, formData.newComment]
            : [formData.newComment],
          status,
        },
        { merge: true }
      );
      console.log("s");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="review">
      <h1>Reklamacja o numerze ID: {state.id}</h1>
      <h2>Data: {new Date(state.date.seconds * 1000).toDateString()}</h2>
      <h2>Marka: {state.brand}</h2>
      <h2>Model: {state.model}</h2>
      <h2>Opis problemu: {state.description}</h2>

      {/* <div>
        {Object.entries(state).map(([k, v], i) => (
          <p key={k}>{k}</p>
        ))}
      </div> */}
      <div>
        {state.comments?.map((x: any, i: number) => (
          <p key={i}>Komentarz: {x as string}</p>
        ))}
        {state.isAdmin ? (
          <FormControl fullWidth margin="dense">
            <TextField
              fullWidth
              margin="normal"
              id="comment"
              name="comment"
              label="Komentarz do reklamacji"
              onChange={handleChange}
            />
          </FormControl>
        ) : (
          false
        )}
      </div>
      {state.isAdmin ? (
        <div>
          <Button
            size="large"
            color="primary"
            variant="contained"
            type="submit"
            onClick={(e) => updateComplaint(e, "Accepted")}
            sx={{ margin: "20px" }}
          >
            Zaakceptuj
          </Button>
          <Button
            size="large"
            color="primary"
            variant="contained"
            type="submit"
            onClick={(e) => updateComplaint(e, "Declined")}
            sx={{ margin: "20px" }}
          >
            Odrzuć
          </Button>
        </div>
      ) : (
        <div>
          <Button
            size="large"
            color="primary"
            variant="contained"
            type="submit"
            onClick={(e) => updateComplaint(e, "Canceled")}
            sx={{ margin: "20px" }}
          >
            Usuń reklamację
          </Button>
        </div>
      )}
    </div>
  );
};

export default Review;
