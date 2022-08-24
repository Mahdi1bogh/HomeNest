import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Container, TextField } from '@mui/material';
import UserInfoContext from '../contexts/userInfo';
import { postRequest } from '../utils';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});
const RegisterPage = () => {
  const { user, setUser } = useContext(UserInfoContext);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      postRequest('/users/register', {
        email: values.email,
        name: values.name,
        password: values.password,
        contact: { phone: values.phone },
      })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          window.location.href = '/';
        })
        .catch((e) => console.log(e));
    },
  });
  console.log('Values ', formik.values);
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
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <Button color="secondary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default RegisterPage;
