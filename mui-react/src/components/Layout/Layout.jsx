import React from 'react';
import { Box, Stack } from '@mui/material';
import Sidebar from './sidebar/Sidebar';
const Layout = (props) => {
  return (
    <Stack direction="row" spacing={2} sx={{ position: 'relative' }}>
      <Sidebar />
      <Box
        sx={{
          paddingBottom: { xs: '70px', md: '0' },
          flexGrow: '2',
          maxHeight: '100vh',
          overflow: 'auto',
        }}
      >
        {props.children}
      </Box>
    </Stack>
  );
};

export default Layout;
