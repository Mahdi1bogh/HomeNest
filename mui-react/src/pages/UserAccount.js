import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import UserInfoContext from '../contexts/userInfo';
import { axiosInstance, postRequest } from '../utils';
import axios from 'axios';
import { Box } from '@mui/system';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length'),

  oldPassword: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()

    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});
const UserAccount = () => {
  const { user, setUser } = useContext(UserInfoContext);

  const formik = useFormik({
    initialValues: {
      name: user.user.name,
      email: user.user.email,
      phone: user.user.contact.phone,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${user.token}`;
      axiosInstance
        .patch('/users/me', values)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => console.log(e));
    },
  });

  const handleSubmit = () => {
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.token}`;
    axiosInstance
      .patch('/users/me', {
        name: formik.values.name,
        email: formik.values.email,
        contact: { phone: formik.values.phone },
      })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        window.location.href = '/';
      })
      .catch((e) => console.log(e));
  };
  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '5em 0',
      }}
    >
      <Typography variant="h2" component="h4">
        Account
      </Typography>

      <List
        sx={{
          marginTop: '20px',
          width: '100%',
          bgcolor: 'background.paper',
        }}
      >
        <ListItem sx={{ padding: ' 1.5em' }}>
          <ListItemText
            primary="Profile"
            secondary="The information can be edited"
          />
        </ListItem>
        <Divider component="li" />
        <ListItem sx={{ padding: ' 3em 1em' }}>
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
              id="phone"
              name="phone"
              label="Phone"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <Button
              color="secondary"
              variant="contained"
              sx={{
                width: '140px',
                marginLeft: 'auto',
              }}
              type="submit"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </form>
        </ListItem>
      </List>
    </Container>
  );
};

export default UserAccount;
