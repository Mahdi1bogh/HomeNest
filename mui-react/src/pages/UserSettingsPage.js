import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import * as yup from 'yup';
import { Container } from '@mui/system';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { red } from '@mui/material/colors';
import axios from 'axios';
import UserInfoContext from '../contexts/userInfo';
import { axiosInstance } from '../utils';
const validationSchema = yup.object({
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
});
const UserSettingsPage = () => {
  const { user, setUser } = useContext(UserInfoContext);
  const handleDelete = () => {
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.token}`;
    axiosInstance
      .delete('/users/me')
      .then(() => {
        setUser(null);
        localStorage.removeItem('userInfo');
        window.location.href = '/';
        alert('Deleted');
      })
      .catch((e) => console.log(e));
  };
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let obj = {};
      Object.keys(values).forEach(function (key, index) {
        if (values[key].length) {
          obj = { ...obj, [key]: values[key] };
        }
      });

      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${user.token}`;
      axiosInstance
        .patch(
          '/users/me',

          obj
        )
        .then((res) => {
          console.log(res);
          setUser(res.data);
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          window.location.href = '/';
        })
        .catch((e) => console.log(e));
    },
  });
  return (
    <Container sx={{ padding: '5em 0' }}>
      <Typography variant="h2" component="h4">
        Settings
      </Typography>
      <List
        sx={{
          marginTop: '20px',
          width: '100%',
          bgcolor: 'background.paper',
        }}
      >
        <ListItem sx={{ padding: ' 1.5em' }}>
          <ListItemText primary="Password" secondary="Update password" />
        </ListItem>
        <Divider component="li" />
        <ListItem sx={{ padding: ' 3em 1em' }}>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              width: '100%',

              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <TextField
              fullWidth
              id="oldPassword"
              name="oldPassword"
              label="Old Password"
              type="password"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="New Password"
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

            <Button
              color="secondary"
              variant="contained"
              sx={{ width: '140px', padding: '.7em 0', marginLeft: 'auto' }}
              type="submit"
            >
              Update
            </Button>
          </form>
        </ListItem>
      </List>

      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          marginTop: '3em',
        }}
      >
        <ListItem sx={{ padding: ' 1.5em' }}>
          <ListItemText primary="Delete" secondary="Delete profile" />
          <Button
            variant="contained"
            sx={{
              width: '140px',
              padding: '.7em 0',
              marginLeft: 'auto',
              backgroundColor: red[500],
              color: 'white',
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ListItem>
      </List>
    </Container>
  );
};

export default UserSettingsPage;
