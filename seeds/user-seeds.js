const { User } = require('../models');

const userdata =
[
  {
    "username": "Can",
    "email": 'bb@gmail.com',
    "password": "12345678"
  },
  {
    "username": "Ali",
    "email": 'aa@gmail.com',
    "password": "12345678"
  },
  {
    "username": "Bono",
    "email": 'cc@gmail.com',
    "password": "12345678"
  }
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;