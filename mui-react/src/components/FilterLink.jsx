import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const FilterLink = ({ label, icon, handleClick }) => {
  return (
    <Link sx={{ textDecoration: 'none' }} href="#">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 'max-content',
          borderBottom: '2px solid white',
          '&:hover': {
            borderBottomColor: 'secondary.main',
          },
          padding: '.2em',
        }}
        onClick={() => handleClick(label)}
      >
        {icon}
        <Typography
          color="gray"
          sx={{
            paddingTop: '4px',
          }}
        >
          {label}
        </Typography>
      </Box>
    </Link>
  );
};

export default FilterLink;
