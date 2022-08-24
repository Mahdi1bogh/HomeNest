import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Container } from '@mui/system';
import axios from 'axios';
import UserInfoContext from '../contexts/userInfo';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { axiosInstance } from '../utils';

// Generate Sales Data
function createData(time, estates) {
  return { time, estates };
}
function count(month, dates) {
  return dates.filter((date) => date.slice(5, 7) === month).length;
}
function countProperty(str, data) {
  return data.filter((property) => property === str).length;
}

export default function UserDashboardPage() {
  const [dates, setDates] = React.useState([]);
  const [properties, setProperties] = React.useState([]);
  const [countUsers, setCountUsers] = React.useState(null);

  const { user } = React.useContext(UserInfoContext);
  const controller = new AbortController();
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/estates/dates', {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const newState = res.data.dates.map((item) => item.createdAt);
      const newPropertyState = res.data.dates.map((item) => item.propertyType);
      setDates(newState);
      setCountUsers(res.data.countUsers);
      setProperties(newPropertyState);
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);
  const data = [
    createData('Jan', count('01', dates)),
    createData('Feb', count('02', dates)),
    createData('Mar', count('03', dates)),
    createData('Apr', count('04', dates)),
    createData('May', count('05', dates)),
    createData('Jun', count('06', dates)),
    createData('Jul', count('07', dates)),
    createData('Aug', count('08', dates)),
    createData('Sep', count('09', dates)),
    createData('Oct', count('10', dates)),
    createData('Nov', count('11', dates)),
    createData('Dev', count('12', dates)),
  ];
  const propertyTypeData = [
    { propertyType: 'Land', Number: countProperty('Land', properties) },
    {
      propertyType: 'Apartment',
      Number: countProperty('Apartment', properties),
    },
    { propertyType: 'House', Number: countProperty('House', properties) },
    { propertyType: 'Studio', Number: countProperty('Studio', properties) },
    { propertyType: 'Beach', Number: countProperty('Land', properties) },
    { propertyType: 'Land', Number: countProperty('Land', properties) },
  ];
  const theme = useTheme();
  if (dates && properties && countUsers)
    return (
      <Stack
        sx={{
          marginTop: '30px',
          padding: '0 20px',
        }}
      >
        <Typography variant="h4" component={'p'}>
          Dashboard
        </Typography>

        <Stack direction="row" gap="50px" sx={{ padding: ' 3em 0' }}>
          <Box
            sx={{
              width: '100%',
              maxWidth: 200,
              bgcolor: 'background.paper',
              padding: '1em 2em',
              border: '1px solid gray',
              borderRadius: '9px',
            }}
          >
            <Typography variant="p" component={'p'}>
              Total Users
            </Typography>
            <Typography variant="h5" component={'p'}>
              {countUsers}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              maxWidth: 200,
              bgcolor: 'background.paper',
              padding: '1em 2em',
              border: '1px solid gray',
              borderRadius: '9px',
            }}
          >
            <Typography variant="p" component={'p'}>
              Total Estates
            </Typography>
            <Typography variant="h5" component={'p'}>
              {dates?.length}
            </Typography>
          </Box>
        </Stack>
        <Container
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            marginTop: '40px',
          }}
        >
          <ResponsiveContainer height="40%" width={'100%'}>
            <AreaChart
              width="100%"
              height={250}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time">
                <Label
                  offset={0}
                  position="insideBottom"
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                >
                  time
                </Label>
              </XAxis>

              <YAxis>
                <Label
                  angle={270}
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                >
                  Estates
                </Label>
              </YAxis>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip title="dunno" />
              <Legend />
              <Area
                type="monotone"
                dataKey="estates"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="time"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={propertyTypeData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="propertyType" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Number" fill="#8884d8" />
          </BarChart>
        </Container>
      </Stack>
    );
}
