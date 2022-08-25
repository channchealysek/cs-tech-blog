const { User } = require('../models');

const userdata =
[
  {
    "username": "a1",
    "email": 'a1@gmail.com',
    "password": "12345678"
  },
  {
    "username": "a2",
    "email": 'a2@gmail.com',
    "password": "12345678"
  },
  {
    "username": "a3",
    "email": 'a3@gmail.com',
    "password": "12345678"
  }
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;