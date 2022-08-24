import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Skeleton,
  Snackbar,
  Stack,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import UserInfoContext from '../contexts/userInfo';
import FileBase64 from 'react-file-base64';
const ImagePlaceHolder = ({ index, setestateData, estateData }) => (
  <Stack
    sx={{ height: '210px', border: '1px dashed black', cursor: 'pointer' }}
    justifyContent={'center'}
    alignItems="center"
  >
    <p>{`Put Image number ${index + 1} here`}</p>
    <FileBase64
      multiple={false}
      onDone={({ base64 }) => {
        let newState = {
          ...estateData,
          images: estateData?.images?.map((img, idx) => {
            if (idx === index) {
              return base64;
            }
            return img;
          }),
        };
        setestateData(newState);
      }}
    />
  </Stack>
);

const EstateForm = () => {
  const [estateData, setestateData] = useState({
    title: '',
    slug: '',
    purpose: '',
    description: '',
    price: 0,
    rooms: 0,
    baths: 0,
    surface: 0,
    image: '',
    city: '',
    propertyType: '',
    rentFrequency: '',
    furnishingStatus: '',
    images: ['', '', '', '', ''],
  });
  const { user } = useContext(UserInfoContext);
  console.log(estateData);
  const [open, setOpen] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${user.token}`;
      const data = await axiosInstance.post('/estates/', estateData);
      window.location.href = '/me/estates';
      setOpen(true);
      console.log('Response Data', data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Stack>
      <Button
        onClick={submitHandler}
        sx={{
          backgroundColor: 'secondary.dark',
          marginBottom: '20px',
          '&.MuiButton-root:hover': {
            backgroundColor: 'secondary.dark',
          },
        }}
      >
        Submit
      </Button>
      <Snackbar open={open} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ padding: '0 .6em' }}
      >
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={estateData.title}
            onChange={(e) =>
              setestateData({ ...estateData, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            id="slug"
            name="slug"
            label="Slug"
            value={estateData.slug}
            onChange={(e) =>
              setestateData({ ...estateData, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            value={estateData.price}
            onChange={(e) =>
              setestateData({
                ...estateData,
                [e.target.name]: Number(e.target.value),
              })
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            id="surface"
            name="surface"
            label="Surface"
            value={estateData.surface}
            onChange={(e) =>
              setestateData({
                ...estateData,
                [e.target.name]: Number(e.target.value),
              })
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="rooms"
            id="rooms"
            label="Rooms"
            type="Number"
            value={estateData.rooms}
            onChange={(e) =>
              setestateData({
                ...estateData,
                [e.target.name]: Number(e.target.value),
              })
            }
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="baths"
            id="baths"
            label="Baths"
            type="number"
            value={estateData.baths}
            onChange={(e) =>
              setestateData({
                ...estateData,
                [e.target.name]: Number(e.target.value),
              })
            }
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Property Type
            </InputLabel>
            <NativeSelect
              onChange={(e) =>
                setestateData({
                  ...estateData,
                  [e.target.name]: e.target.value,
                })
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
                    selected={estateData.propertyType === item}
                  >
                    {item}
                  </option>
                )
              )}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel variant="standard">Furnishing Status</InputLabel>
            <NativeSelect
              onChange={(e) =>
                setestateData({
                  ...estateData,
                  [e.target.name]: e.target.value,
                })
              }
              inputProps={{
                name: 'furnishingStatus',
              }}
            >
              {['Furnished', 'Unfurnished'].map((item, idx) => (
                <option key={item + idx} value={item}>
                  {item}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel variant="standard">Rent Frequency</InputLabel>
            <NativeSelect
              onChange={(e) =>
                setestateData({
                  ...estateData,
                  [e.target.name]: e.target.value,
                })
              }
              inputProps={{
                name: 'rentFrequency',
              }}
            >
              {[
                { name: 'Daily', value: 'daily' },
                { name: 'Weekly', value: 'weekly' },
                { name: 'Monthly', value: 'monthly' },
                { name: 'Yearly', value: 'yearly' },
              ].map((item, index) => (
                <option
                  selected={estateData.rentFrequency === item.value}
                  key={item.name + index}
                  value={item.value}
                >
                  {item.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
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
                setestateData({
                  ...estateData,
                  [e.target.name]: e.target.value,
                })
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
                  selected={estateData.city === item}
                  key={item + index}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
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
                setestateData({
                  ...estateData,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option
                selected={estateData.purpose === 'for-rent'}
                value={'for-rent'}
              >
                For Rent
              </option>
              <option
                selected={estateData.purpose === 'for-sale'}
                value={'for-sale'}
              >
                For Sale
              </option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <label>Description</label>
          <TextareaAutosize
            value={estateData.description}
            minRows={4}
            maxRows={6}
            placeholder="Make it meaningfull and clear :)"
            style={{ width: '100%' }}
            onChange={(e) =>
              setestateData({
                ...estateData,
                description: e.target.value,
              })
            }
          />
        </Grid>

        {estateData.images.map((item, index) =>
          item.length !== 0 ? (
            <Grid item xs={12} sm={4}>
              <img
                style={{
                  width: '100%',
                  height: '210px',
                }}
                alt={item}
                src={item}
              />
            </Grid>
          ) : (
            <Grid item xs={12} sm={4}>
              <ImagePlaceHolder
                setestateData={setestateData}
                estateData={estateData}
                index={index}
              />
            </Grid>
          )
        )}
        {estateData.image.length !== 0 ? (
          <Grid item xs={12} sm={6}>
            <img
              style={{
                width: '100%',
                height: '210px',
              }}
              alt={estateData.image}
              src={estateData.image}
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={6}>
            <Stack
              sx={{
                height: '210px',
                border: '1px dashed black',
                cursor: 'pointer',
              }}
              justifyContent={'center'}
              alignItems="center"
            >
              <p>Cover Image</p>
              <FileBase64
                multiple={false}
                onDone={async ({ base64 }) => {
                  setestateData({ ...estateData, image: base64 });
                }}
              />
            </Stack>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};

export default EstateForm;
