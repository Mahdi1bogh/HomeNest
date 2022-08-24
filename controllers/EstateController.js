import mongoose from 'mongoose';
import { Estate } from '../models/estateModel.js';
import User from '../models/userModel.js';

export const getEstates = async (req, res) => {
  const pageSize = 6;
  const { page } = req.query || 1;
  const countProperties = await Estate.countDocuments();
  const estates = await Estate.find()
    .select({ _id: 1, title: 1, purpose: 1, createdAt: 1, updatedAt: 1 })
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.status(200).send({ estates, countProperties });
};

export const createEstate = async (req, res) => {
  const newEstate = new Estate({
    ...req.body,
    Owner: req.user._id,
  });

  try {
    await newEstate.save();
    res.status(201).send(newEstate);
  } catch (e) {
    res.status(400).send(e);
  }
};
export const updateEstate = async (req, res) => {
  const _id = req.params.id;
  const updatedEstate = await Estate.findOne({ _id, Owner: req.user._id });
  const updates = Object.keys(req.body);
  const validUpdates = [
    'title',
    'price',
    'slug',
    'image',
    'images',
    'purpose',
    'description',
    'geography',
    'rooms',
    'baths',
    'surface',
  ];
  const isValidOperation = updates.every((update) =>
    validUpdates.includes(update)
  );
  if (!updatedEstate) {
    return res.status(404).send('Not Found');
  }
  if (isValidOperation) {
    updates.map((update) => (updatedEstate[update] = req.body[update]));
    await updatedEstate.save();
    res.status(200).send({ message: 'updatedEstate Updated', updatedEstate });
  } else {
    res.status(404).send({ message: 'Invalid Operation' });
  }
};

export const deleteEstate = async (req, res) => {
  const estate = await Estate.findOne({
    _id: req.params.id,
    Owner: req.user._id,
  });
  if (!estate) {
    return res.status(404).send();
  } else {
    estate.remove();
    res.status(200).send({ message: 'deleted successfully' });
  }
};

export const getEstateById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send({ message: 'Estate Not Found' });

  const estate = await Estate.findById(req.params.id);
  await estate.populate('Owner', 'contact');
  res.send(estate);
};
const PageSize = 8;

export const searchEstates = async (req, res) => {
  const { query } = req;
  const purpose = query.purpose || '';
  const price = query.price || '';
  const minBaths = query.minBaths || '';
  const propertyType = query.propertyType || '';
  const minRooms = query.minRooms || '';
  const minSurface = query.minSurface || '';
  const page = query.page || 1;
  const purposeFilter = purpose && purpose !== 'all' ? { purpose } : {};
  const propertyTypeFilter =
    propertyType && propertyType !== 'all' ? { propertyType } : {};
  const priceFilter =
    price && price !== 'all'
      ? {
          // 1-50
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const bathsFilter = minBaths ? { baths: { $gte: Number(minBaths) } } : {};
  const roomsFilter = minRooms ? { rooms: { $gte: Number(minRooms) } } : {};
  const surfaceFilter = minSurface
    ? { surface: { $gte: Number(minSurface) } }
    : {};

  const countEstates = await Estate.countDocuments({
    ...purposeFilter,
    ...priceFilter,
    ...bathsFilter,
    ...roomsFilter,
    ...surfaceFilter,
    ...propertyTypeFilter,
  });
  const estates = await Estate.find({
    ...purposeFilter,
    ...priceFilter,
    ...bathsFilter,
    ...roomsFilter,
    ...surfaceFilter,
    ...propertyTypeFilter,
  })
    .skip(PageSize * (page - 1))
    .limit(PageSize);
  res.status(200).send({ estates, countEstates });
};

//********Admin
export const deleteUserEstate = async (req, res) => {
  await Estate.findByIdAndDelete({ _id: req.params.id });
  res.status(200).send({ message: 'deleted successfully' });
};
export const getEstatesDates = async (req, res) => {
  const dates = await Estate.find().select({ createdAt: 1, propertyType: 1 });
  const countUsers = await User.countDocuments();
  res.status(200).send({ dates, countUsers });
};
