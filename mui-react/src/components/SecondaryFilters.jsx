import {
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  Stack,
} from '@mui/material';
import { Container } from '@mui/system';
import { filterData } from '../filterValues';

const CustomSelect = ({ label, name, opts }) => {
  return (
    <>
      <NativeSelect
        inputProps={{
          name,
          id: 'uncontrolled-native',
        }}
      >
        <option value="" selected>
          {label}
        </option>
        {opts.map((item, index) => (
          <option key={label + index + 'option'} value={item.value}>
            {item.name}
          </option>
        ))}
      </NativeSelect>
    </>
  );
};
const SecondaryFilters = ({ handleChange }) => {
  return (
    <>
      <Container maxWidth="lg" disableGutters>
        <Stack
          direction={'row'}
          justifyContent="space-between"
          sx={{ width: '100%', flexDirection: { xs: 'column', md: 'row' } }}
        >
          {filterData.map((item, index) => {
            return (
              <FormControl
                key={item.placeholder + index}
                onChange={handleChange}
                sx={{ width: { xs: '100%', md: '120px' } }}
              >
                <CustomSelect
                  label={item.placeholder}
                  name={item.queryName}
                  opts={item.items}
                />
              </FormControl>
            );
          })}
        </Stack>
      </Container>
    </>
  );
};

export default SecondaryFilters;
