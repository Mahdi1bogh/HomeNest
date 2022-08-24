import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import FilterLink from './FilterLink';

import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import VillaOutlinedIcon from '@mui/icons-material/VillaOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';

const PrimaryFilters = ({ handleClick }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        marginTop: '60px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: { xs: '90%', sm: '40%' },
          minWidth: '400px',
        }}
      >
        {[
          { label: 'Beach', icon: BeachAccessOutlinedIcon },
          { label: 'Apartment', icon: ApartmentOutlinedIcon },
          { label: 'House', icon: CottageOutlinedIcon },
          { label: 'Studio', icon: VillaOutlinedIcon },
          { label: 'Land', icon: ForestOutlinedIcon },
        ].map(
          (item) => (
            <FilterLink
              key={item.label}
              icon={<Box color="gray" as={item.icon} />}
              label={item.label}
              handleClick={handleClick}
            />
          )
          // 'Hii'
        )}
      </Box>
    </Container>
  );
};

export default PrimaryFilters;
