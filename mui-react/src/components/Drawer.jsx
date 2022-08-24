import React from 'react';

import {
  Button,
  Container,
  Drawer,
  IconButton,
  ImageList,
  ImageListItem,
} from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AppsIcon from '@mui/icons-material/Apps';
const CustomDrawer = ({ arr }) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <>
      <Button
        sx={{
          color: 'black',
          backgroundColor: '#fff',
          width: '170px',
          '&:hover': {
            backgroundColor: '#fff',
          },
          border: '1px solid black',
        }}
        startIcon={<AppsIcon />}
        onClick={toggleDrawer('bottom', true)}
      >
        View All Photo
      </Button>
      <Drawer
        anchor={'bottom'}
        open={state['bottom']}
        onClose={toggleDrawer('bottom', false)}
        sx={{ height: '100vh' }}
      >
        <Container
          maxWidth="xl"
          sx={{
            height: '100vh',
            width: '100vw',

            padding: '1em 2em',
          }}
        >
          <IconButton
            sx={{ color: 'black' }}
            onClick={() => {
              setState('bottom', false);
            }}
          >
            <KeyboardArrowDownOutlinedIcon />
          </IconButton>
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <ImageList
              sx={{
                height: '60%',
                width: { md: '60%', xs: '100%' },
                overflow: 'hidden',
              }}
              rowHeight={164}
              cols={4}
            >
              {arr?.images?.map((item, idx) => {
                return (
                  <ImageListItem
                    key={item}
                    cols={idx % 3 === 0 ? 4 : 2}
                    rows={idx % 3 === 0 ? 4 : 2}
                    sx={{ boxSizing: 'border-box' }}
                  >
                    <img
                      style={{ borderRadius: item?.borderRadius }}
                      src={item}
                      alt={idx + item}
                      loading="lazy"
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Container>
        </Container>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
