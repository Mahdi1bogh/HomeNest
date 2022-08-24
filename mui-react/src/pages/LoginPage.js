import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Container, TextField } from '@mui/material';
import { postRequest } from '../utils';
import UserInfoContext from '../contexts/userInfo';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
const LoginPage = () => {
  const { user, setUser } = useContext(UserInfoContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      postRequest('/users/login', values)
        .then((res) => {
          setUser(res.data);
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          window.location.href = '/';
        })
        .catch((e) => console.log(e));
    },
  });
  return (
    <Container
      maxWidth="sm"
      sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{
          height: '400px',
          width: '100%',

          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="secondary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
