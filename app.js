import express from 'express';
import mongoose from 'mongoose';
import realEstateRouter from './routes/realEstateRouter.js';
import userRouter from './routes/userRouter.js';
import cors from 'cors';

const app = express().use('*', cors());
mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => console.log('connected to database'))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/estates', realEstateRouter);
app.use('/users', userRouter);

export default app;
