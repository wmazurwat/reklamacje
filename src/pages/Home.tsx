import React from 'react';
import {
  useFormik,
} from 'formik';
import * as yup from 'yup';

import { Button, TextField } from '@mui/material';

interface MyFormValues {
  firstName: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Home = ()  => {
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="App">
       <h1>Home</h1>
       <h2>Wpisz poniżej adres URL linku platformy youtube.com który chcesz przekształcić na plik audio z rozszeżeniem .mp3, a następnie kliknij przycisk POBIERZ</h2>
       <form onSubmit={formik.handleSubmit}>
        <TextField
          //fullWidth
          id="email"
          name="email"
          label="Adres URL youtube.com"
          //value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button color="primary" variant="contained" type="submit">
          Pobierz
        </Button>
      </form>
    </div>
  );
}

export default Home;
