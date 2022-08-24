import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import HotelTwoToneIcon from '@mui/icons-material/HotelTwoTone';
import BathtubTwoToneIcon from '@mui/icons-material/BathtubTwoTone';
import CropTwoToneIcon from '@mui/icons-material/CropTwoTone';
import { useLocation } from 'react-router-dom';

import {
  Link,
  Grid,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from '@mui/material';
import { axiosInstance } from '../utils';

function Content({ page, setPage, count }) {
  return (
    <Pagination
      color="secondary"
      page={page}
      count={count}
      onChange={(event, value) => {
        setPage(value);
      }}
    />
  );
}
export default function ImageContainer({ filters, page, setPage }) {
  const [data, setData] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(1);
  const count = Math.ceil(pageCount / 8) || 1;
  console.log(page);

  let {
    minRooms,
    purpose,
    rentFrequency,
    price,
    minSurface,
    minBaths,
    furnishingStatus,
    propertyType,
  } = filters;
  React.useEffect(() => {
    let pending = true;

    const fetchApi = () => {
      axiosInstance
        .get(
          `/estates/search?page=${page}&purpose=${purpose}&rentFrequency=${rentFrequency}&price=${price}&minSurface=${Number(
            minSurface
          )}&minRooms=${Number(minRooms)}&minBaths=${Number(
            minBaths
          )}&furnishingStatus=${furnishingStatus}&propertyType=${propertyType}`
        )
        .then((response) => {
          setData(response.data.estates);
          setPageCount(response.data.countEstates);
        })
        .catch((e) => console.log(e));
    };
    console.log(propertyType);
    fetchApi();
    return () => {
      pending = false;
    };
  }, [
    minRooms,
    purpose,
    rentFrequency,
    price,
    minSurface,
    minBaths,
    furnishingStatus,
    propertyType,
    pageCount,
    page,
  ]);

  return (
    <Stack alignItems={'center'}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data?.map((item, index) => (
          <Grid item xs={12} sm={4} md={3} key={index + item._id}>
            <Link href={`/${item._id}`} sx={{ textDecoration: 'none' }}>
              <ImageListItem>
                <img
                  src={`${item?.image}`}
                  srcSet={`${item?.image}`}
                  alt={item?.title}
                />
                <ImageListItemBar
                  title={item?.title}
                  subtitle={
                    <Stack>
                      <Stack
                        direction={'row'}
                        justifyContent="space-between"
                        alignItems={'flex-end'}
                      >
                        <Typography>
                          <BathtubTwoToneIcon fontSize="small" /> {item?.baths}
                        </Typography>
                        <Typography>
                          <HotelTwoToneIcon fontSize="small" />
                          {item?.rooms}
                        </Typography>
                        <Typography>
                          <CropTwoToneIcon fontSize="small" />
                          {item?.surface?.toFixed(3)}
                        </Typography>
                      </Stack>
                      <Typography variant="h6">{item.price} DT</Typography>
                    </Stack>
                  }
                  position="below"
                />
              </ImageListItem>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Content count={count} setPage={setPage} page={page} />
    </Stack>
  );
}
