import {
  ImageList,
  ImageListItem,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HotelTwoToneIcon from '@mui/icons-material/HotelTwoTone';
import BathtubTwoToneIcon from '@mui/icons-material/BathtubTwoTone';
import CropTwoToneIcon from '@mui/icons-material/CropTwoTone';
import CustomDrawer from '../components/Drawer';
import { axiosInstance } from '../utils';

const EstateDetailsPage = () => {
  const [estate, setEstate] = useState(null);

  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const fetchApi = () => {
      axiosInstance
        .get(`/estates/${id}`)
        .then((response) => setEstate(response.data))
        .catch((e) => console.log(e));
    };

    fetchApi();
  }, [id]);
  let dummy = [];
  const newArr = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      borderRadius: '13px 0 0 13px',
      rows: 4,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      rows: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      rows: 2,
      borderRadius: '0 13px 0 0',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      borderRadius: '0 0 13px 0',
      rows: 2,
      cols: 2,
    },
  ];
  dummy = newArr.map((item, index) => {
    if (index < 4) return { ...item, img: estate?.images[index] };
  });

  if (estate !== null)
    return (
      <Container maxWidth="lg" sx={{ marginTop: '40px', padding: '1em 2em' }}>
        <Stack spacing={2} width={'100%'}>
          <Typography fontWeight={'bolder'} variant="h5">
            {estate?.title}
          </Typography>
          <Link href="#" sx={{ display: 'flex' }}>
            <LocationOnOutlinedIcon />
            <Typography variant={'subtitle1'}>{estate?.city}</Typography>
          </Link>
          <Stack spacing={2} width={'100%'}>
            <ImageList
              sx={{
                height: '450px',
                overflow: 'hidden',
                position: 'relative',
              }}
              variant="quilted"
              cols={4}
              rowHeight={110}
            >
              {dummy?.map((item, idx) => {
                if (idx < 4)
                  return (
                    <ImageListItem
                      key={item.img}
                      cols={item?.cols || 1}
                      rows={item?.rows || 1}
                    >
                      <img
                        style={{ borderRadius: item?.borderRadius }}
                        src={item.img}
                        alt={idx + item}
                        loading="lazy"
                      />
                    </ImageListItem>
                  );
              })}
              <Box sx={{ position: 'absolute', right: '40px', bottom: '10px' }}>
                <CustomDrawer arr={estate} />
              </Box>
            </ImageList>
          </Stack>
          <Stack direction={'row'}>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <BathtubTwoToneIcon fontSize="small" /> {estate?.baths}
            </Typography>
            &nbsp;&nbsp;&nbsp;
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <HotelTwoToneIcon fontSize="small" />
              {estate?.rooms}
            </Typography>
            &nbsp;&nbsp;&nbsp;
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <CropTwoToneIcon fontSize="small" />
              {estate?.surface?.toFixed(3)}
            </Typography>
            &nbsp;&nbsp;&nbsp;
            <Typography sx={{ marginLeft: ' auto' }}>
              {estate?.price}Dt
            </Typography>
          </Stack>
        </Stack>
      </Container>
    );
};

export default EstateDetailsPage;
