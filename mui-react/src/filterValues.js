export const filterData = [
  {
    items: [
      { name: 'Buy', value: 'for-sale' },
      { name: 'Rent', value: 'for-rent' },
    ],
    placeholder: 'Purpose',
    queryName: 'purpose',
  },
  {
    items: [
      { name: 'Daily', value: 'daily' },
      { name: 'Weekly', value: 'weekly' },
      { name: 'Monthly', value: 'monthly' },
      { name: 'Yearly', value: 'yearly' },
    ],
    placeholder: 'Rent Frequency',
    queryName: 'rentFrequency',
  },
  {
    items: [
      { name: '4000-5000', value: '4000-5000' },
      { name: '5000-7000', value: '5000-7000' },
      { name: '7000-10000', value: '7000-10000' },
      { name: '10000-20000', value: '10000-20000' },
      { name: '20000-30000', value: '20000-30000' },
      { name: '30000-60000', value: '30000-60000' },
      { name: '60000-120000', value: '60000-120000' },

      { name: '120000+', value: '120000-9999999' },
    ],
    placeholder: 'Price(DT)',
    queryName: 'price',
  },

  {
    items: [
      { name: '50', value: '50' },
      { name: '60', value: '60' },
      { name: '70', value: '70' },
      { name: '80', value: '80' },
      { name: '90', value: '90' },
      { name: '100', value: '100' },
      { name: '110', value: '110' },
      { name: '120', value: '120' },
      { name: '130', value: '130' },
      { name: '140', value: '140' },
      { name: '180', value: '180' },
      { name: '250', value: '250' },
    ],
    placeholder: 'Min Area(sqft)',
    queryName: 'minSurface',
  },
  {
    items: [
      { name: '1', value: 1 },
      { name: '2', value: 2 },
      { name: '3', value: 3 },
      { name: '4', value: 4 },
      { name: '5', value: 5 },
      { name: '6', value: 6 },
      { name: '7', value: 7 },
      { name: '8', value: 8 },
      { name: '9', value: 9 },
      { name: '10', value: 10 },
    ],
    placeholder: 'Rooms',
    queryName: 'minRooms',
  },
  {
    items: [
      { name: '1', value: 1 },
      { name: '2', value: 2 },
      { name: '3', value: 3 },
      { name: '4', value: 4 },
      { name: '5', value: 5 },
      { name: '6', value: 6 },
      { name: '7', value: 7 },
      { name: '8', value: 8 },
      { name: '9', value: 9 },
      { name: '10', value: 10 },
    ],
    placeholder: 'Baths',
    queryName: 'minBaths',
  },
  // {
  //   items: [
  //     { name: 'Furnished', value: 'furnished' },
  //     { name: 'Unfurnished', value: 'unfurnished' },
  //   ],
  //   placeholder: 'Furnish Type',
  //   queryName: 'furnishingStatus',
  // },
];

export const getFilterValues = (filterValues) => {
  const {
    purpose,
    rentFrequency,
    price,
    minSurface,
    minRooms,
    minBaths,
    sort,
    furnishingStatus,
  } = filterValues;

  const values = [
    {
      name: 'purpose',
      value: purpose,
    },
    {
      name: 'rentFrequency',
      value: rentFrequency,
    },
    {
      name: 'price',
      value: price,
    },
    {
      name: 'minSurface',
      value: minSurface,
    },
    {
      name: 'minRooms',
      value: minRooms,
    },
    {
      name: 'minBaths',
      value: minBaths,
    },
    {
      name: 'sort',
      value: sort,
    },
    {
      name: 'furnishingStatus',
      value: furnishingStatus,
    },
  ];

  return values;
};
