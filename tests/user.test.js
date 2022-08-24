import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'Mike@example.com',
  password: '56what!!',
  contact: { phone: [2211335544] },
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};
const userTwo = {
  _id: userTwoId,
  name: 'user 2',
  email: 'user2@example.com',
  password: 'user2404',
  contact: { phone: [2211335544] },
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
  isAdmin: true,
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
});
afterAll(function (done) {
  mongoose.disconnect();
  return done();
});

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users/register')
    .send({
      name: 'Midou',
      email: 'midou.midou@hotmail.com',
      password: '123456789',
      contact: { phone: [52035592] },
    });
  expect(response.statusCode).toBe(201);
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    user: {
      name: 'Midou',
    },
    token: user.tokens[0].token,
  });
});

test('Should login a new user', async () => {
  const response = await request(app).post('/users/login').send({
    email: 'Mike@example.com',
    password: '56what!!',
  });
  expect(response.statusCode).toBe(200);
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    user: {
      name: 'Mike',
    },
    token: user.tokens[1].token,
  });
  expect(user.password).not.toBe('56what!!');
});

test('Should NOT login a new user', async () => {
  const response = await request(app).post('/users/login').send({
    email: 'Mike@example.com',
    password: '56whap!!',
  });
  expect(response.statusCode).toBe(400);
});

test('Should Get Profile', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});
test('Should NOT Get Profile Without AUTH', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('Should NOT Delete Other users Without ADMIN', async () => {
  await request(app)
    .delete('/users/' + userTwoId)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(401);
});

test('Should Delete', async () => {
  const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send();
  expect(response.statusCode).toBe(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull;
  expect(response.body.message).toBe('deleted');
});

test('Should Allow Admin to Delete Users', async () => {
  await request(app)
    .delete('/users/' + userOneId)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should NOT Delete without auth', async () => {
  await request(app)
    .delete('/users/' + userOneId)
    .send()
    .expect(401);
});

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ name: 'mike hannigon' })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).not.toBe('Mike');
});
test('Should Not update invalid fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ location: 'Ben arous' })
    .expect(400);
});
