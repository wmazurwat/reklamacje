import React, { useState } from 'react';
import {
  useFormik,
} from 'formik';
import * as yup from 'yup';

import { Button, TextField } from '@mui/material';
import { getVideogInfo } from '../api/api';

interface MyFormValues {
  firstName: string;
}

const validationSchema = yup.object({
  url: yup
    .string()
    .required('Email is required'),
});

const Home = ()  => {
  const [info, setInfo] = useState({});
  const formik = useFormik({
    initialValues: {
      url: 'https://www.youtube.com/watch?v=dzxRcdmZubc',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values.url)
      const info = await getVideogInfo(values.url)
      console.log(info)
      setInfo(info)
    },
  });

  return (
    <div className='container'>
       <h1>Home</h1>
       <h2>Wpisz poniżej adres URL linku platformy youtube.com który chcesz przekształcić na plik audio z rozszeżeniem .mp3, a następnie kliknij przycisk POBIERZ</h2>
       <form onSubmit={formik.handleSubmit}>
        <TextField
          //fullWidth
          id="url"
          name="url"
          label="Adres URL youtube.com"
          value={formik.values.url}
          onChange={formik.handleChange}
        />
        <Button color="primary" variant="contained" type="submit">
          Pobierz
        </Button>
      </form>
    </div>
  );
}

export default Home;
