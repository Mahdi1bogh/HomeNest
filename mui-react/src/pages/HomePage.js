import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import PrimaryFilters from '../components/PrimaryFilters';
import ImageContainer from '../components/ImageContainer';
import SecondaryFilters from '../components/SecondaryFilters';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const [filters, setFilters] = useState({
    city: 'all',
    propertyType: 'all',
    purpose: '',
    rentFrequency: '',
    price: '',
    minSurface: 0,
    minRooms: 0,
    minBaths: 0,
    furnishingStatus: '',
  });
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setPage(1);
  };

  const handleClick = (label) => {
    setFilters({ ...filters, propertyType: label });
  };
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  console.log(sp);

  console.log(filters);
  return (
    <Box>
      <PrimaryFilters handleClick={handleClick} />
      <SecondaryFilters handleChange={handleChange} />
      <Box
        sx={{
          width: '100%',
          marginTop: '20px',
          padding: { xs: '0', sm: '1em 5em' },
        }}
      >
        <ImageContainer setPage={setPage} page={page} filters={filters} />
      </Box>
    </Box>
  );
};

export default HomePage;
