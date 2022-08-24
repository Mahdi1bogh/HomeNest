import { DataGrid, GridCloseIcon } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserInfoContext from '../../contexts/userInfo';
import {
  Alert,
  Button,
  Container,
  IconButton,
  Snackbar,
  Stack,
} from '@mui/material';
import { green, purple, red } from '@mui/material/colors';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteSharp';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { axiosInstance } from '../../utils';
const columns = [
  { field: '_id', headerName: 'ID', width: 130 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'isAdmin', headerName: 'Admin', width: 130 },
];
const AdminUsersPage = () => {
  const [data, setData] = useState(null);
  const [Row, setRow] = useState({});
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [countUsers, setCountUsers] = useState(0);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(8);

  const { user } = useContext(UserInfoContext);

  useEffect(() => {
    let unsubscribed = false;
    const fetchData = async () => {
      try {
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${user.token}`;
        const { data: response } = await axiosInstance.get(
          `/users/All?page=${page + 1}`
        );

        if (!unsubscribed) {
          setData(response.users);
          setCountUsers(response.usersCount);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
    return () => {
      unsubscribed = true;
      console.log('cancelled');
    };
  }, [page, setLoading, user.token, setData, setCountUsers]);

  const handleEdit = async () => {
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.token}`;
    const response = await axiosInstance.patch(`/users/${Row?._id}`, {
      isAdmin: true,
    });
    if (response.status === 200) {
      setMessage('Updated Successfully');
      setSuccess(true);
    }
  };

  const handleDelete = async () => {
    try {
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${user.token}`;
      const res = await axiosInstance.delete(`/users/${Row?._id}`);
      if (res.status === 200) {
        setMessage('Deleted Successfully');
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
        {message}
      </Alert>
    </Snackbar>
  );
  if (data)
    return (
      <>
        {alert}
        <div style={{ height: 410, width: '100%' }}>
          <DataGrid
            getRowId={(row) => row._id}
            loading={loading}
            rows={data}
            rowCount={countUsers}
            columns={columns}
            pageSize={pageSize}
            pagination
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[8]}
            sx={{ height: '100%' }}
            onRowClick={({ row }) => {
              setRow(row);
              setShow(true);
            }}
          />
        </div>
        <Stack
          direction="row"
          spacing={3}
          sx={{ display: show ? 'flex' : 'none' }}
        >
          <p>
            {Row?._id}&nbsp;&nbsp;{Row.name}
          </p>

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
              edit ? <GridCloseIcon /> : <Edit sx={{ marginRight: '8px' }} />
            }
          >
            {edit ? 'Close' : 'Edit'}
          </Button>

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
        {edit && (
          <Stack direction={'row'}>
            <p>Make her/him an Admin ? </p>
            <IconButton
              onClick={handleEdit}
              sx={{ color: green[600] }}
              aria-label="check"
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              onClick={() => setEdit(false)}
              sx={{ color: red[600] }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        )}{' '}
      </>
    );
};

export default AdminUsersPage;
