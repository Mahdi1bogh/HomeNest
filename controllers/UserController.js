import User from '../models/userModel.js';

export const register = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    contact: req.body.contact,
  });

  try {
    const user = await newUser.save();
    const token = await newUser.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
export async function login(req, res) {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
}
export async function logOut(req, res) {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.status(200).send({ message: 'Logged Out' });
  } catch (error) {
    res.status(400).send(error);
  }
}
export async function logOutAll(req, res) {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.status(200).send({ message: 'Logged Out from All Devices !!' });
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function getProfile(req, res) {
  const { user } = req;
  res.status(200).send(user);
}
export async function updateProfile(req, res) {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'oldPassword'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (req.body.oldPassword)
    await User.findByCredentials(req.user.email, req.body.oldPassword);

  try {
    updates.map((update) => {
      if (update !== 'oldPassword') {
        req.user[update] = req.body[update];
      }
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
}
export async function deleteProfile(req, res) {
  try {
    await req.user.remove();
    res.send({ message: 'deleted' });
  } catch (error) {
    res.status(500).send();
  }
}
export async function OwnerEstates(req, res) {
  const { user } = req;
  try {
    await user.populate('Estates');

    res.send(user['Estates']);
  } catch (error) {
    res.status(500).send(error);
  }
}

//ADMIN
//Get all users
//Get User by id
//Update User
//Delete User

export async function readUsers(req, res) {
  const { page } = req.query || 1;
  const PageSize = 8;
  const usersCount = await User.countDocuments();
  const users = await User.find()
    .select({ email: 0, contact: 0 })
    .skip(PageSize * (page - 1))
    .limit(PageSize);
  res.send({ users, usersCount });
}

export async function readSingleUser(req, res) {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
}

export async function updateUserProfile(req, res) {
  console.log(req.body);
  const updates = Object.keys(req.body);
  const isValidOperation = updates.length === 1 && updates[0] === 'isAdmin';
  if (!isValidOperation) return res.status(400).send('Error : Invalid Update');
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { isAdmin: req.body.isAdmin }
    );
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
}

export async function deleteUserProfile(req, res) {
  try {
    const user = await User.findById({ _id: req.params.id });
    await user.remove();
    res.status(200).send({ message: 'deleted ', user });
  } catch (error) {
    res.status(500).send();
  }
}
