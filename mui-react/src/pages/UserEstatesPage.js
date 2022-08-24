import React, { useContext, useEffect, useState } from 'react';

import { DataGrid, GridAddIcon } from '@mui/x-data-grid';
import UserInfoContext from '../contexts/userInfo';
import axios from 'axios';
import {
  Alert,
  Button,
  Fab,
  FormControl,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  ListSubheader,
  NativeSelect,
  Snackbar,
  SnackbarContent,
  Stack,
  TextField,
} from '@mui/material';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Container } from '@mui/system';

import FileBase64 from 'react-file-base64';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Edit from '@mui/icons-material/Edit';
import { blue, purple, red } from '@mui/material/colors';
import EstateForm from '../components/EstateForm';
import { axiosInstance } from '../utils';

const columns = [
  { field: '_id', headerName: 'ID', width: 130 },
  { field: 'title', headerName: 'Title', width: 500 },
  { field: 'purpose', headerName: 'Purpose', width: 130 },
  {
    field: 'createdAt',
    headerName: 'createdAt',
    type: 'string',
    width: 200,
  },
  {
    field: 'updatedAt',
    headerName: 'updatedAt',
    type: 'string',
    width: 200,
  },
];

const UserEstatesPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Row, setRow] = useState({ title: '', purpose: '' });
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imgs, setImgs] = useState(null);
  const [countProperties, setCountProperties] = useState(0);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(6);
  const { user } = useContext(UserInfoContext);
  const url =
    user && user.user.isAdmin
      ? `/estates?page=${page + 1}`
      : `/users/me/estates`;
  useEffect(() => {
    let unsubscribed = false;
    const fetchData = async () => {
      try {
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${user.token}`;
        const { data: response } = await axiosInstance.get(url);
        if (!unsubscribed) {
          user?.user?.isAdmin ? setData(response.estates) : setData(response);
          setCountProperties(response.countProperties);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
    return () => {
      unsubscribed = true;
    };
  }, [success, loading, user.token, page]);
  React.useEffect(() => {
    setCountProperties((prevRowCountState) =>
      countProperties !== undefined ? countProperties : prevRowCountState
    );
  }, [countProperties, setCountProperties]);
  //title:String,city:select ,purpose:select ,propertyType :select,price:number,rooms:select,baths:select,surface:number
  const validationSchema = yup.object({
    title: yup.string('Enter your title'),
  });

  const formik = useFormik({
    initialValues: {
      title: 'foobar@example.com',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSubmit = async () => {
    let newState = {
      ...Row,
      images: imgs?.map((img, index) => {
        if (img !== Row.images[index]) {
          return img;
        }
        return Row.images[index];
      }),
    };
    setRow(newState);
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.token}`;
    const response = await axiosInstance.patch('/estates/' + Row._id, Row);
  };
  const handleDelete = async () => {
    const deleteUrl = user?.user?.isAdmin ? '/estates/admin/' : '/estates/';
    try {
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${user.token}`;
      const res = await axiosInstance.delete(deleteUrl + Row._id);
      if ((res.data.message = 'deleted successfully')) {
        setSuccess(true);
        setShow(false);
        setDel(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const action = (
    <Button
      variant="contained"
      sx={{
        maxHeight: '60px',
        backgroundColor: red[500],
        color: 'white',
        width: '150px',
        '&.MuiButton-root:hover': {
          backgroundColor: red[500],
        },
      }}
      onClick={handleDelete}
    >
      YES
    </Button>
  );
  const alert = (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={success}
      autoHideDuration={1500}
      onClose={success}
    >
      <Alert
        onClose={() => setSuccess(false)}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Deleted Successfully
      </Alert>
    </Snackbar>
  );

  if (data)
    return (
      <>
        {alert}
        <div style={{ height: 410, width: '100%', position: 'relative' }}>
          <DataGrid
            getRowId={(row) => row._id}
            loading={loading}
            rows={data}
            rowCount={countProperties || data.length}
            columns={columns}
            pageSize={pageSize}
            pagination
            paginationMode={user?.user?.isAdmin ? 'server' : 'client'}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[6]}
            sx={{ height: '100%' }}
            onRowClick={({ row }) => {
              setRow(row);
              setShow(true);
              setImgs(row.images);
              if (createForm) {
                setCreateForm(false);
              }
            }}
          />
          {!user?.user?.isAdmin && (
            <Fab
              // color={}

              aria-label="add"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                backgroundColor: blue[600],
                color: 'white',
              }}
              onClick={() => {
                setCreateForm(!createForm);
                if (show === true) {
                  setShow(false);
                }
              }}
            >
              <GridAddIcon />
            </Fab>
          )}
        </div>
        <Box sx={{ display: createForm ? 'flex' : 'none' }}>
          <EstateForm />
        </Box>

        <Stack
          direction="row"
          spacing={3}
          sx={{ display: show ? 'flex' : 'none' }}
        >
          <p>{Row.title}</p>

          {!user?.user?.isAdmin && (
            <Button
              variant="contained"
              sx={{
                width: '150px',
                maxHeight: '60px',
                backgroundColor: purple[500],
                color: 'white',
                '&.MuiButton-root:hover': {
                  backgroundColor: purple[400],
                },
              }}
              onClick={() => {
                setEdit(!edit);
              }}
              startIcon={
                edit ? <CloseIcon /> : <Edit sx={{ marginRight: '8px' }} />
              }
            >
              {edit ? 'Close' : 'Edit'}
            </Button>
          )}
          <Button
            variant="contained"
            sx={{
              maxHeight: '60px',
              backgroundColor: red[500],
              color: 'white',
              width: '150px',
              '&.MuiButton-root:hover': {
                backgroundColor: red[500],
              },
            }}
            onClick={() => setDel(true)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={del}
            onClose={() => setDel(false)}
            message="Are You Sure ?"
            action={action}
          />
        </Stack>
        <Box sx={{ marginTop: '20px', display: edit ? 'block' : 'none' }}>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: 'secondary.dark',
              marginBottom: '20px',
              '&.MuiButton-root:hover': {
                backgroundColor: 'secondary.dark',
              },
            }}
          >
            Submit Changes
          </Button>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item md={6} sm={12}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={Row.title}
                onChange={(e) =>
                  setRow({ ...Row, [e.target.name]: e.target.value })
                }
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField
                name="rooms"
                id="rooms"
                label="Rooms"
                type="Number"
                value={Row.rooms}
                onChange={(e) =>
                  setRow({ ...Row, [e.target.name]: Number(e.target.value) })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField
                name="baths"
                id="baths"
                label="Baths"
                type="number"
                value={Row.baths}
                onChange={(e) =>
                  setRow({ ...Row, [e.target.name]: Number(e.target.value) })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Property Type
                </InputLabel>
                <NativeSelect
                  onChange={(e) =>
                    setRow({ ...Row, [e.target.name]: e.target.value })
                  }
                  inputProps={{
                    name: 'propertyType',
                    id: 'uncontrolled-native',
                  }}
                >
                  {['Land', 'Beach', 'Apartment', 'House', 'Studio'].map(
                    (item, idx) => (
                      <option
                        key={item + idx}
                        value={item}
                        selected={Row.propertyType === item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item md={6} sm={12}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Rent Frequency
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: 'rentFrequency',
                    id: 'uncontrolled-native',
                  }}
                >
                  {[
                    { name: 'Daily', value: 'daily' },
                    { name: 'Weekly', value: 'weekly' },
                    { name: 'Monthly', value: 'monthly' },
                    { name: 'Yearly', value: 'yearly' },
                  ].map((item, index) => (
                    <option
                      selected={Row.rentFrequency === item.value}
                      key={item.name + index}
                      value={item.value}
                    >
                      {item.name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item md={6} sm={12}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  City
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: 'city',
                    id: 'uncontrolled-native',
                  }}
                  onChange={(e) =>
                    setRow({ ...Row, [e.target.name]: e.target.value })
                  }
                >
                  {[
                    'Tataouine',
                    'Kebili',
                    'Medenine',
                    'Kasserine',
                    'Gafsa',
                    'Sfax',
                    'Sidi Bouzid',
                    'Gabes',
                    'Kairouan',
                    'Tozeur',
                    'Kef',
                    'Siliana',
                    'Bizerte',
                    'Beja',
                    'Jendouba',
                    'Mahdia',
                    'Nabeul',
                    'Zaghouane',
                    'Sousse',
                    'Mannouba',
                    'Monastir',
                    'Ben Arous',
                    'Ariana',
                    'Tunis',
                  ].map((item, index) => (
                    <option
                      selected={Row.city === item}
                      key={item + index}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item md={6} sm={12}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Purpose
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: 'purpose',
                    id: 'uncontrolled-native',
                  }}
                  onChange={(e) =>
                    setRow({ ...Row, [e.target.name]: e.target.value })
                  }
                >
                  <option
                    selected={Row.purpose === 'for-rent'}
                    value={'for-rent'}
                  >
                    For Rent
                  </option>
                  <option
                    selected={Row.purpose === 'for-sale'}
                    value={'for-sale'}
                  >
                    For Sale
                  </option>
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
          <Stack
            spacing={5}
            direction={{ xs: 'column-reverse', md: 'row' }}
            justifyContent="center"
          >
            <ImageList sx={{ width: { xs: '100%', md: 600 }, height: '100%' }}>
              <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">Images</ListSubheader>
              </ImageListItem>
              {Row?.images?.map((item, index) => (
                <ImageListItem key={item}>
                  <img src={`${imgs[index]}`} alt={item} loading="lazy" />
                  <ImageListItemBar
                    actionIcon={
                      <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                        <FileBase64
                          multiple={false}
                          onDone={({ base64 }, index) => {
                            let newState = imgs?.map((img) => {
                              if (img === item) {
                                return base64;
                              }
                              return img;
                            });
                            setImgs(newState);
                          }}
                        />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Box sx={{ width: { xs: '100%', md: '400px' }, height: '450px' }}>
              <p>Main Image</p>
              <FileBase64
                multiple={false}
                onDone={({ base64 }) => setRow({ ...Row, image: base64 })}
              />

              <img
                src={Row?.image}
                alt={Row?.image}
                height="100%"
                width="100%"
              />
            </Box>
          </Stack>
        </Box>
      </>
    );
};

export default UserEstatesPage;
